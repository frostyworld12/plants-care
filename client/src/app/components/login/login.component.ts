import { Component, OnInit } from "@angular/core";
import { ToastrService }     from 'ngx-toastr';
import { AppConsts }         from "src/app/util/Consts";
import { MakeRequest }       from "src/app/services/makeRequest";
import { AppStorage }        from "src/app/services/appStorage";
import { Router }            from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class Login implements OnInit {
  userEmail :string = '';
  userPassword :string = '';

  ngOnInit(): void {

  }

  constructor(
    private toastr: ToastrService,
    private request: MakeRequest,
    private appStorage: AppStorage,
    private router: Router
  ) { }

  authUser(): void {
    const body = {
      email: this.userEmail,
      password: this.userPassword
    }

    this.request.get(AppConsts.AUTH_USER, body)
      .subscribe({
        next: (response) => {
          console.log(response);

          this.appStorage.storeUser(response.user);
          this.router.navigate(['/app-home']);
        },
        error: (e) => {
          this.toastr.error(e.error.message);
          console.log(e.message)
        },
      });
  }
}