import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { ToastrService }     from 'ngx-toastr';
import { AppConsts }         from "src/app/util/Consts";
import { Router }            from '@angular/router';
import { AppStorage }        from "src/app/services/appStorage";
import { MakeRequest }       from "src/app/services/makeRequest";
import { UiHelpers }         from "src/app/util/uiHelpers";

@Component({
  selector: 'managment-users',
  templateUrl: './managmentUsers.component.html',
  styleUrls: ['./managmentUsers.component.css']
})
export class ManagmentUsers implements OnInit {
  @Output() onLoading = new EventEmitter<boolean>();

  user: any = null;
  users: any[] = [];
  userTypes: any[] = [];

  currentUser: any = {id: null};

  isLoading: boolean = true;

  objectKeys = Object.keys;
  objectValues = Object.values;
  usersTableCellsConfig: any = {
    firstName: 'First Name',
    lastName: 'Last Name',
    email: 'Email',
    role: 'Role'
  };

  isUserCreateMode: boolean = false;
  isUserEditMode: boolean = false;

  isConfirmationOpen: boolean = false;

  constructor(
    private router: Router,
    private appStorage: AppStorage,
    private toastr: ToastrService,
    private request: MakeRequest,
    private uiHelpers: UiHelpers
  ) { }

  ngOnInit(): void {
    this.user = this.appStorage.getUser();
    if (!this.user) {
      this.toastr.error('User not found!');
      this.router.navigate(['/app-login']);
    }

    if (this.user.userType !== 'Admin') {
      this.toastr.error('You have no permissions to view this page!');
      this.router.navigate(['/app-login']);
    }

    this.getUsers();
  }

  handleUserEdit(user: any, state: boolean): void {
    this.currentUser = {...user};
    this.isUserCreateMode = false;
    this.isUserEditMode = state;
  }

  handleUserCreate(): void {
    this.currentUser = {};
    this.isUserCreateMode = true;
    this.isUserEditMode = false;
  }

  handleOptionSelect(option: string): void {
    this.currentUser.roleId = option;
    this.currentUser.role = this.userTypes.find(type => type.id === option).name;
  }

  handleProcessUser(): void {
    const fieldsToValidate: any[] = Object.keys(this.usersTableCellsConfig).map(field => (field + 'Input'));
    const invalidInputs = this.uiHelpers.validateFields(fieldsToValidate);
    if (invalidInputs.length > 0) {
      this.uiHelpers.applyFieldsErrorState(invalidInputs, true);
      this.toastr.error('Fill in all required fields!');
      return;
    }

    this.processUser();

    this.currentUser = {};
    this.isUserCreateMode = false;
    this.isUserEditMode = false;
  }

  handleDeleteUser(user: any): void {
    this.isConfirmationOpen = true;
    this.currentUser = {...user};
    this.currentUser.isDelete = true;
  }

  handleConfirm(event: any): void {
    this.isConfirmationOpen = false;

    if (event.state) {
      this.processUser();
      this.currentUser = {};
    }
  }

  /* <============================ REQUESTS ==============================> */

  getUsers(): void {
    this.onLoading.emit(true);

    this.request.get(AppConsts.GET_USERS, {})
    .subscribe({
      next: (response) => {
        this.onLoading.emit(false);

        this.users = response.users;
        this.userTypes = (response.userTypes || []).map((type: any) => ({
          id: type.id,
          name: type.name
        }));
      },
      error: (e) => {
        this.onLoading.emit(false);
        this.toastr.error('Error while receiving users!');
      },
    });
  }

  processUser(): void {
    this.onLoading.emit(true);

    this.request.post(AppConsts.PROCESS_USER, {userData: this.currentUser}, {})
    .subscribe({
      next: (response) => {
        this.onLoading.emit(false);
        this.toastr.success('Success!');
        this.getUsers();
      },
      error: (e) => {
        this.onLoading.emit(false);
        this.toastr.error('Error while saving user!');
      },
    });
  }
}