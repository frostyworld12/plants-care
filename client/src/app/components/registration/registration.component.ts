import { Component, OnInit } from "@angular/core";
import { ToastrService } from 'ngx-toastr';
import { AppConsts } from "src/app/util/Consts";
import { MakeRequest } from "src/app/services/makeRequest";
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class Registration implements OnInit {
  userEmail :string = '';
  userFirstName :string = '';
  userLastName :string = '';
  userPassword :string = '';

  constructor(
    private toastr: ToastrService,
    private request: MakeRequest,
    private router: Router
  ) { }

  ngOnInit(): void {

  }

  createUser(): void {
    const body = {
      email: this.userEmail,
      firstName: this.userFirstName,
      lastName: this.userLastName,
      password: this.userPassword
    }

    this.request.post(AppConsts.CREATE_USER, body, {})
      .subscribe({
        next: (response) => {
          this.toastr.success('User successfully created!');
          console.log(response)
          this.router.navigate(['/app-home']);
        },
        error: (e) => {
          this.toastr.error(e.error.message);
          console.log(e.message)
        },
      });
  }
}