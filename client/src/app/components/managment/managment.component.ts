import { Component, OnInit } from "@angular/core";
import { ToastrService }     from 'ngx-toastr';
import { AppConsts }         from "src/app/util/Consts";
import { Router }            from '@angular/router';
import { AppStorage }        from "src/app/services/appStorage";
import { MakeRequest }       from "src/app/services/makeRequest";

@Component({
  selector: 'app-managment',
  templateUrl: './managment.component.html',
  styleUrls: ['./managment.component.css']
})
export class Managment implements OnInit {
  user: any = null;
  users: any[] = [];
  userTypes: any[] = [];

  currentUser: any = {
    id: null
  };

  isLoading: boolean = false;




  objectKeys = Object.keys;
  objectValues = Object.values;
  usersTableCellsConfig: any = {
    firstName: 'First Name',
    lastName: 'Last Name',
    email: 'Email',
    role: 'Role'
  };

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

    this.getUsers();
  }

  handleUserEdit(user: any): void {
    this.currentUser = user;
  }

  handleOptionSelect(option: string): void {
    console.log(option);
  }

  handleProcessUser(): void {
    console.log(this.currentUser);

    const fieldsToValidate: any[] = Object.keys(this.usersTableCellsConfig).map(field => (field + 'Input'));
    const invalidInputs = this.validateFields(fieldsToValidate);
    if (invalidInputs.length > 0) {
      this.applyFieldsErrorState(invalidInputs, true);
      this.toastr.error('Fill in all required fields!');
      return;
    }

    this.processUser();

    this.currentUser = {
      id: null
    };
  }



  /* <============================ REQUESTS ==============================> */

  getUsers(): void {
    this.isLoading = true;
    this.request.get(AppConsts.GET_USERS, {})
    .subscribe({
      next: (response) => {
        console.log(response);

        this.isLoading = false;
        this.users = response.users;
        this.userTypes = (response.userTypes || []).map((type: any) => ({
          id: type.id,
          name: type.name
        }));
        console.log(this.userTypes);

      },
      error: (e) => {
        this.isLoading = false;
        this.toastr.error('Error while receiving users!');
      },
    });
  }

  processUser(): void {
    this.isLoading = true;
    this.request.post(AppConsts.PROCESS_USER, {userData: this.currentUser}, {})
    .subscribe({
      next: (response) => {
        console.log(response);
        this.isLoading = false;
        this.getUsers();
      },
      error: (e) => {
        console.log(e);
        this.isLoading = false;
        this.toastr.error('Error while saving user!');
      },
    });
  }



  /* <============================ UTIL ==============================> */

  applyFieldsErrorState(fields: any[], isApplyInvalidState: boolean): void {
    fields.forEach((field: any) => {
      if (isApplyInvalidState) {
        field.classList.add('slds-has-error');
      } else {
        field.classList.remove('slds-has-error');
      }
    });
  }

  validateFields(fields: any[]): any[] {
    const ids = fields.map(field => ('#' + field)).join(', ');
    console.log(ids);

    const inputs: any[] = Array.from(document.querySelectorAll(ids));
    const invalidInputs = inputs.filter((input: any) => !input.validity.valid);

    return invalidInputs;
  }
}