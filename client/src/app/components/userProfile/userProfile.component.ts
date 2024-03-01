import { Component, OnInit } from "@angular/core";
import { animate, style, transition, trigger } from "@angular/animations";
import { ActivatedRoute, Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { AppConsts } from "src/app/util/Consts";
import { MakeRequest } from "src/app/services/makeRequest";
import { AppStorage } from "src/app/services/appStorage";
import { UiHelpers } from "src/app/util/uiHelpers";

@Component({
  selector: 'app-user-profile',
  templateUrl: './userProfile.component.html',
  styleUrls: ['./userProfile.component.css'],
  animations: [
    trigger('grow', [
      transition('false <=> true', [
        style({height: '800px'}),
        animate('1s ease')
      ])
    ])
  ]
})
export class UserProfile implements OnInit {
  user: any = null;

  currentTab: string = 'Profile';
  isLoading = false;
  isProfileEditing = false;

  userInfo = {
    firstName: '',
    lastName: '',
    imageUrl: ''
  };

  userAvatar: any = null;

  isUserImageVisible = true;
  profileInfoInitialHeight: number = 0;

  constructor(
    private toastr: ToastrService,
    private appStorage: AppStorage,
    private request: MakeRequest,
    private uiHelpers: UiHelpers,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.user = this.appStorage.getUser();
    if (!this.user) {
      this.toastr.error('User not found!');
      this.router.navigate(['/app-login']);
    }

    if (this.user.userType !== 'User') {
      this.toastr.error('You do not have access to this page!');
      this.router.navigate(['/app-login']);
    }

    this.userInfo.firstName = this.user.firstName;
    this.userInfo.lastName = this.user.lastName;
    this.userInfo.imageUrl = this.user.imageUrl;
  }

  handleEditProfile(state: boolean): void {
    this.isProfileEditing = state;

    if (state) {
      const profileInfo = document.querySelector('#profile-content');
      if (profileInfo) {
        this.profileInfoInitialHeight = profileInfo.clientHeight;
      }
    } else {
      this.profileInfoInitialHeight = 0;
    }
  }

  handleSaveUser(): void {
    const invalidFields: any[] = this.uiHelpers.validateFields(['firstName', 'lastName']);
    if (invalidFields.length > 0) {
      this.uiHelpers.applyFieldsErrorState(invalidFields, true);
      this.toastr.error('Fill in all required fields!');

      window.setTimeout(() => {
        this.uiHelpers.applyFieldsErrorState(invalidFields, false);

        this.userInfo.firstName = this.user.firstName;
        this.userInfo.lastName = this.user.lastName;
      }, 1500);
    } else {
      this.updateUser();
      this.handleEditProfile(false);
    }
  }

  handleImageLoadError(): void {
    this.isUserImageVisible = false;
  }

  handleFileUpload(event: any): void {
    const file = event.target?.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl: any = e.target?.result;
        if (imageUrl) {
          this.userInfo.imageUrl = imageUrl;
          this.isUserImageVisible = true;
        }
      };
      reader.readAsDataURL(file);
      this.userAvatar = file;
    }
  }

  handleSelectTab(tabName: string): void {
    this.currentTab = tabName;
  }

  /* <============================ REQUESTS ==============================> */

  updateUser(): void {
    const formData = new FormData();
    formData.append('avatar', this.userAvatar);

    const userData = {
      id: this.user.id,
      firstName: this.userInfo.firstName,
      lastName: this.userInfo.lastName
    };

    formData.append('userData', JSON.stringify(userData));

    this.request.post(AppConsts.UPDATE_USER, formData, {})
    .subscribe({
      next: (response) => {
        this.isLoading = false;

        const user = {...this.user};
        user.firstName = this.userInfo.firstName;
        user.lastName = this.userInfo.lastName;
        user.imageUrl = `/assets/${this.userAvatar.name}`;

        this.appStorage.storeUser(user);
        this.toastr.success('User info successfully updated!');
      },
      error: (e) => {
        this.isLoading = false;
        this.toastr.error('Error while updating user info!');
      },
    });
  }
}