import { Component, OnInit } from "@angular/core";
import { ToastrService }     from 'ngx-toastr';
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
  tabs: any[] = [
    'Users',
    'Managment'
  ];
  selectedTab: string = 'Users';
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
      this.router.navigate(['/app-login']);
    }

    if (this.user.userType !== 'Admin') {
      this.toastr.error('You have no permissions to view this page!');
      this.router.navigate(['/app-login']);
    }
  }

  handleSelectTab(tab: string): void {
    this.selectedTab = tab;
  }

  handleLoading(isLoading: boolean): void {
    this.isLoading = isLoading;
  }

  /* <============================ REQUESTS ==============================> */
}