import { Component, OnInit }      from "@angular/core";
import { ToastrService }          from 'ngx-toastr';
import { AppConsts }              from "src/app/util/Consts";
import { ActivatedRoute, Router } from '@angular/router';
import { AppStorage }             from "src/app/services/appStorage";
import { MakeRequest }            from "src/app/services/makeRequest";
import { UiHelpers }              from "src/app/util/uiHelpers";

@Component({
  selector: 'app-plants',
  templateUrl: './plantsCatalog.component.html',
  styleUrls: ['./plantsCatalog.component.css']
})
export class Plants implements OnInit {

  pageState: string = 'All';
  plantModalState: string = 'View';
  isLoading: boolean = false;
  isPlantModalVisible: boolean = false;
  isAddNewOperation: boolean = false;
  isPlantNameEditing: boolean = false;
  isRequestModalVisible: boolean = false;

  user: any = null;
  plants: any[] = [];
  plantsTypes: any[] = [];

  currentPlantData: any = {};
  newCareOperation: any = {
    name: '',
    frequency: 0
  };
  currentPlantName: string = '';
  requestDescription: string = '';

  plantModalHeader: string = '';
  searchQuery: string = '';

  modalFieldsConfig: any[] = [
    'plant-image',
    'plant-name',
    'plant-origin',
    'plant-type',
    'plant-description',
    'plant-care-frequency',
    'plant-care-name'
  ];

  constructor(
    private route: ActivatedRoute,
    private appStorage: AppStorage,
    private toastr: ToastrService,
    private request: MakeRequest,
    private uiHelpers: UiHelpers,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.pageState = this.route.snapshot.paramMap.get('state') || 'All';

    this.user = this.appStorage.getUser();
    if (!this.user) {
      this.toastr.error('User not found!');
      this.router.navigate(['/app-login']);
    }

    this.getPlantsList();
  }

  handlePlantWindow(displayState: boolean, modalState: string, plantId: string): void {
    this.isPlantModalVisible = displayState;
    this.plantModalState = modalState;

    if (displayState) {
      if (modalState === 'View' || modalState === 'Edit') {
        const currentPlant = this.plants.find(plant => plant.id === plantId);

        this.currentPlantData = {
          id: currentPlant.id,
          imageUrl: currentPlant.imageUrl,
          name: currentPlant.name,
          origin: currentPlant.origin,
          description: currentPlant.description,
          plantType: currentPlant.plantType,
          plantCare: currentPlant.plantCare,
          userPlantId: currentPlant.userPlantId
        };
        this.isAddNewOperation = !currentPlant.plantCare.id;
      } else if (modalState === 'Add') {
        this.currentPlantData = {
          id: null,
          imageUrl: '',
          name: '',
          origin: '',
          description: '',
          plantType: {
            id: '',
            name: ''
          },
          plantCare: {
            id: '',
            operations: []
          }
        };
        this.isAddNewOperation = true;
      }
    }
  }

  handleFileUpload(event: any): void {
    const file = event.target?.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.currentPlantData.imageUrl = e.target?.result;
      };
      reader.readAsDataURL(file);
      this.currentPlantData.imageFile = file;
      this.currentPlantData.isNewImage = true;
    }
  }

  handleImageLoadError(plantId: string) {
    const currentPlant = this.plants.find(plant => plant.id === plantId);
    currentPlant.isErrorImage = true;

    return true;
  }

  handleSearch(event: any): void {
    if (event?.key === 'Enter' || event === 'Click') {
      this.getPlantsList();
    }
  }

  handleOptionSelect(option: string): void {
    const plantType = this.plantsTypes.find((type: any) => type.id === option);

    this.currentPlantData.plantType = {
      id: plantType ? option : null,
      name: plantType ? plantType.name : option
    };
  }

  handleAddCareOperation(): void {
    let operations = this.currentPlantData.plantCare.operations;

    if (this.newCareOperation.name && this.newCareOperation.frequency) {
      if (operations) {
        operations.push({
          name: this.newCareOperation.name,
          frequency: this.newCareOperation.frequency
        });
      } else {
        operations = [{
          name: this.newCareOperation.name,
          frequency: this.newCareOperation.frequency
        }];
      }

      console.log(this.currentPlantData.plantCare?.operations);

      this.newCareOperation = {
        name: '',
        frequency: 0
      };
      this.isAddNewOperation = false;
    } else {
      this.isAddNewOperation = true;
    }
  }

  handleRemoveCareOperation(operation: any): void {
    const operations = this.currentPlantData.plantCare.operations;

    if (operations) {
      const operationIndex = operations.indexOf(operation);
      operations.splice(operationIndex, 1);

      if (operations.length === 0) {
        this.isAddNewOperation = true;
      }
    }
  }

  handlePlant(): void {
    const invalidFields: any[] = this.uiHelpers.validateFields(this.modalFieldsConfig);
    if (invalidFields.length > 0) {
      this.uiHelpers.applyFieldsErrorState(invalidFields, true);
      this.toastr.error('Fill in all required fields!');
      window.setTimeout(() => this.uiHelpers.applyFieldsErrorState(invalidFields, false), 1500);
    } else {
      this.processPlant();
    }
  }

  handleRemovePlant(plant: any): void {
    const plantId = this.user.userType === 'User' ? plant.userPlantId : plant.id;
    this.removePlant(plantId);
  }

  handleAddPlantToCatalog(plantId: string): void {
    this.addPlantToCatalog(plantId);
  }

  handleEditPlantName(isSave: boolean): void {
    this.isPlantNameEditing = !isSave;

    if (isSave) {
      this.updateUserPlantName();
    }
  }

  handleCreateRequest(state: boolean, isSave: boolean): void {
    this.isRequestModalVisible = state;
    const invalidInputs: any[] = this.uiHelpers.validateFields(['request-description']);
    if (invalidInputs.length > 0) {
      this.uiHelpers.applyFieldsErrorState(invalidInputs, true);
    } else {
      this.uiHelpers.applyFieldsErrorState(invalidInputs, false);

      if (isSave) {
        this.createRequest();
        this.requestDescription = '';
        this.isRequestModalVisible = false;
      }
    }
  }

  handleOpenMyTasks(): void {
    this.router.navigate(['/app-user-tasks']);
  }




  /* <============================ REQUESTS ==============================> */

  processPlant(): void {
    const formData = new FormData();
    formData.append('plantImage', this.currentPlantData.imageFile);

    const plantData: any = {
      id: this.currentPlantData.id,
      name: this.currentPlantData.name,
      origin: this.currentPlantData.origin,
      description: this.currentPlantData.description,
      imageUrl: !this.currentPlantData.imageFile ? this.currentPlantData.imageUrl : null,
      plantType:{
        id: this.currentPlantData.plantType.id || null,
        name: this.currentPlantData.plantType.name
      },
      plantCare: {
        id: this.currentPlantData.plantCare.id || null,
        operations: this.currentPlantData.plantCare.operations
      }
    };

    formData.append('plantData', JSON.stringify(plantData));

    this.isLoading = true;
    this.request.post(AppConsts.CREATE_PLANT, formData, {})
    .subscribe({
      next: (response) => {
        this.toastr.success('Plant successfully saved!');
        this.isPlantModalVisible = false;
        this.isLoading = false;
        this.getPlantsList();
      },
      error: (e) => {
        this.toastr.error('Could not save plant!');
        this.isPlantModalVisible = false;
        this.isLoading = false;
      },
    });
  }

  getPlantsList(): void {
    this.isLoading = true;

    const params: any = {};
    if (this.searchQuery) {
      params.name = this.searchQuery;
    }

    const isUserPlants = this.user.userType === 'User' && this.pageState === 'User';
    if (isUserPlants) {
      params.userId = this.user.id;
    }

    const url = !isUserPlants ? AppConsts.GET_PLANTS : AppConsts.GET_USER_PLANTS;

    this.request.get(url, params)
    .subscribe({
      next: (response) => {
        console.log(response);
        if (response) {
          this.plants = response.plants.map((plant: any) => {
            return {
              id: plant.id,
              imageUrl: plant.imageUrl,
              name: plant.userPlantName || plant.name,
              origin: plant.origin,
              description: plant.description,
              userPlantId: plant.userPlantId,
              plantType: {
                id: plant.plantTypeId || null,
                name: plant.plantType || ''
              },
              plantCare: {
                id: plant.plantCareId || null,
                operations: plant.plantCareOperations ? JSON.parse(plant.plantCareOperations) : []
              }
            };
          });

          this.plantsTypes = response.plantsTypes;
        }
        this.isLoading = false;
      },
      error: (e) => {
        this.isLoading = false;
      },
    });
  }

  removePlant(plantId: string): void {
    this.isLoading = true;
    this.request.delete(AppConsts.DELETE_PLANT, {plantId: plantId, isUserPlant: this.user.userType === 'User'})
    .subscribe({
      next: () => {
        this.toastr.success('Plant successfully deleted!');
        this.isLoading = false;
        this.getPlantsList();
      },
      error: () => {
        this.toastr.error('Could not delete plant!');
        this.isLoading = false;
      },
    });
  }

  addPlantToCatalog(plantId: string): void {
    this.isLoading = true;
    this.request.post(AppConsts.ADD_PLANT_TO_USER_CATALOG, {plantId: plantId, userId: this.user.id}, {})
    .subscribe({
      next: () => {
        this.toastr.success('Plant successfully added!');
        this.isLoading = false;
      },
      error: () => {
        this.toastr.error('Could not add plant!');
        this.isLoading = false;
      },
    });
  }

  updateUserPlantName(): void {
    this.isLoading = true;

    const plantData = {
      userPlantId: this.currentPlantData.userPlantId,
      name: this.currentPlantData.name
    };

    console.log(plantData)

    this.request.post(AppConsts.CHANGE_USER_PLANT_NAME, plantData, {})
    .subscribe({
      next: () => {
        this.toastr.success('Plant name successfully updated!');
        this.isLoading = false;
        this.getPlantsList();
      },
      error: () => {
        this.toastr.error('Could not update plant name!');
        this.isLoading = false;
      },
    });
  }

  createRequest(): void {
    this.isLoading = true;

    const requestData = {
      plantId: this.currentPlantData.id,
      userId: this.user.id,
      description: this.requestDescription
    };

    this.request.post(AppConsts.CREATE_REQUEST, requestData, {})
    .subscribe({
      next: () => {
        this.toastr.success('Request successfylly created!');
        this.isLoading = false;
      },
      error: () => {
        this.toastr.error('Could not create request!');
        this.isLoading = false;
      },
    });
  }

}