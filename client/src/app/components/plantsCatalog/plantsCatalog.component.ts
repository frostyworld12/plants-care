import { Component, OnInit } from "@angular/core";
import { ToastrService }     from 'ngx-toastr';
import { AppConsts }         from "src/app/util/Consts";
import { Router }            from '@angular/router';
import { AppStorage }        from "src/app/services/appStorage";
import { MakeRequest }       from "src/app/services/makeRequest";

@Component({
  selector: 'app-plants',
  templateUrl: './plantsCatalog.component.html',
  styleUrls: ['./plantsCatalog.component.css']
})
export class Plants implements OnInit {
  user: any = null;
  plants: any[] = [];
  plantsTypes: any[] = [];

  isAddNewOperation = false;
  newCareOperation: any = {
    name: '',
    frequency: 0
  };

  currentPlantData: any = {};

  isPlantModalVisible: boolean = false;
  plantModalHeader: string = '';
  plantModalState: string = 'View';
  isLoading: boolean = false;

  searchQuery: string = '';

  constructor(
    private router: Router,
    private appStorage: AppStorage,
    private toastr: ToastrService,
    private request: MakeRequest,
  ) { }

  ngOnInit(): void {
    this.user = this.appStorage.getUser();
    if (!this.user) {
      this.toastr.error('User not found!');
    }

    this.getPlantsList();
  }

  handlePlantWindow(displayState: boolean, modalState: string, plantId: string): void {
    this.isPlantModalVisible = displayState;
    this.plantModalState = modalState;

    if (displayState) {
      if (modalState === 'View' || modalState === 'Edit') {
        const currentPlant = this.plants.find(plant => plant.id === plantId);

        this.plantModalHeader = modalState === 'View' ? currentPlant.name : 'Edit Plant';
        this.currentPlantData = {
          id: currentPlant.id,
          imageUrl: currentPlant.imageUrl,
          name: currentPlant.name,
          origin: currentPlant.origin,
          description: currentPlant.description,
          plantType: currentPlant.plantType,
          plantCare: currentPlant.plantCare
        };
        this.isAddNewOperation = !currentPlant.plantCare.id;
      } else if (modalState === 'Add') {
        this.plantModalHeader = 'New Plant';
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

  handleErrorState(elementId: string, isError: boolean) {
    const element: any = document.getElementById(elementId);
    const error: any = document.getElementById(`error-${elementId}`);
    if (isError) {
      element.classList.add('slds-has-error');
      error.classList.add('visible');
    } else {
      element.classList.remove('slds-has-error');
      error.classList.remove('visible');
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

  handleComboboxDisplaying(listType: string, state: boolean): void {
    const combobox = document.getElementById(listType);

    if (state) {
      if (listType === 'plant-type' && this.plantsTypes.length === 0) {
        return;
      }
      combobox?.classList.add('slds-is-open');
    } else {
      window.setTimeout(() => combobox?.classList.remove('slds-is-open'), 100);
    }
  }

  handleListSelect(listType: string, option: any): void {
    switch(listType) {
      case 'plant-type':
        this.currentPlantData.plantTypeId = option.id;
        this.currentPlantData.plantType = option.name;
        break;
    }
  }

  handleAddCareOperation() {
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

  handleRemoveCareOperation(operation: any) {
    const operations = this.currentPlantData.plantCare.operations;

    if (operations) {
      const operationIndex = operations.indexOf(operation);
      operations.splice(operationIndex, 1);

      if (operations.length === 0) {
        this.isAddNewOperation = true;
      }
    }
  }

  handleRemovePlant(plantId: string) {
    this.isLoading = true;
    this.request.delete(AppConsts.DELETE_PLANT, {plantId: plantId})
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

  handlePlant(): void {
    if (!this.currentPlantData.imageUrl || (!this.currentPlantData.imageFile && this.currentPlantData.isNewImage)) {
      return this.handleErrorState('plant-image', true);
    }

    if (!this.currentPlantData.name) {
      return this.handleErrorState('plant-name', true);
    }

    if (!this.currentPlantData.origin) {
      return this.handleErrorState('plant-origin', true);
    }

    if (!this.currentPlantData.description) {
      return this.handleErrorState('plant-description', true);
    }

    const formData = new FormData();
    formData.append('plantImage', this.currentPlantData.imageFile);

    const plantData: any = {
      id: this.currentPlantData.id,
      name: this.currentPlantData.name,
      origin: this.currentPlantData.origin,
      description: this.currentPlantData.description,
      imageUrl: this.currentPlantData.imageUrl,
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

    this.request.get(AppConsts.GET_PLANTS, params)
    .subscribe({
      next: (response) => {
        console.log(response);
        if (response) {
          this.plants = response.plants.map((plant: any) => {
            return {
              id: plant.id,
              imageUrl: plant.imageUrl,
              name: plant.name,
              origin: plant.origin,
              description: plant.description,
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
          console.log(this.plants);
          this.plantsTypes = response.plantsTypes;
        }
        this.isLoading = false;
      },
      error: (e) => {
        console.log(e.message);
        this.isLoading = false;
      },
    });
  }
}