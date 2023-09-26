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

  newPlantData: any = {
    imageSrc: '',
    imageFile: {},
    name: '',
    origin: '',
    description: ''
  };

  editorOptions: any[] = [
    {
      name: 'bold',
      link: '/assets/icons/utility-sprite/svg/symbols.svg#bold'
    },
    {
      name: 'italic',
      link: '/assets/icons/utility-sprite/svg/symbols.svg#italic'
    },
    {
      name: 'underline',
      link: '/assets/icons/utility-sprite/svg/symbols.svg#underline'
    },
    {
      name: 'richtextbulletedlist',
      link: '/assets/icons/utility-sprite/svg/symbols.svg#richtextbulletedlist'
    },
    {
      name: 'remove_formatting',
      link: '/assets/icons/utility-sprite/svg/symbols.svg#remove_formatting'
    }
  ];

  isPlantModalVisible: boolean = false;
  plantModalState: string = 'View';
  isLoading: boolean = false;

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

    for (let index = 0; index < 50; index++) {
      this.plants.push({i: index});
    }

    console.log(this.plants)
  }

  handlePlantWindow(displayState: boolean, modalState: string): void {
    this.isPlantModalVisible = displayState;
    this.plantModalState = modalState;
    this.newPlantData = {
      imageSrc: '',
      imageFile: {},
      name: '',
      origin: '',
      description: ''
    }
  }

  handleFileUpload(event: any): void {
    const file = event.target?.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.newPlantData.imageSrc = e.target?.result;
      };
      reader.readAsDataURL(file);
      this.newPlantData.imageFile = file;
    }
  }

  handleClearErrorState(elementId: string) {
    let element: any;

    element = document.getElementById(elementId);
    element.classList.remove('slds-has-error');
    element = document.getElementById(`error-${elementId}`);
    element.classList.remove('visible');
  }

  handleCreatePlant(): void {
    let element: any;
    if (!this.newPlantData.imageSrc || !this.newPlantData.imageFile) {
      element = document.getElementById('plant-image');
      element.classList.add('slds-has-error');
      element = document.getElementById('error-plant-image');
      element.classList.add('visible');

      return;
    }

    if (!this.newPlantData.name) {
      element = document.getElementById('plant-name');
      element.classList.add('slds-has-error');
      element = document.getElementById('error-plant-name');
      element.classList.add('visible');

      return;
    }

    if (!this.newPlantData.origin) {
      element = document.getElementById('plant-origin');
      element.classList.add('slds-has-error');
      element = document.getElementById('error-plant-origin');
      element.classList.add('visible');

      return;
    }

    if (!this.newPlantData.description) {
      element = document.getElementById('plant-description');
      element.classList.add('slds-has-error');
      element = document.getElementById('error-plant-description');
      element.classList.add('visible');

      return;
    }

    const formData = new FormData();
    formData.append('plantImage', this.newPlantData.imageFile);
    formData.append('plantData', JSON.stringify({
      name: this.newPlantData.name,
      origin: this.newPlantData.origin,
      description: this.newPlantData.description
    }));

    this.isLoading = true;
    this.request.post(AppConsts.CREATE_PLANT, formData, {})
    .subscribe({
      next: (response) => {
        console.log(response);
        this.isPlantModalVisible = false;
        this.isLoading = false;
      },
      error: (e) => {
        console.log(e.message);
        this.isPlantModalVisible = false;
        this.isLoading = false;
      },
    });
  }
}