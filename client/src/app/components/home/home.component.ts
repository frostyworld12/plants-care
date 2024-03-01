import { Component, OnInit } from "@angular/core";
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AppStorage } from "src/app/services/appStorage";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class Home implements OnInit {
  user: any = null;

  constructor(
    private router: Router,
    private appStorage: AppStorage,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.user = this.appStorage.getUser();
    if (!this.user) {
      this.toastr.error('User not found!');
      this.router.navigate(['/app-login']);
    }
  }

  navigateToPage(page: string): void {
    if (page === 'app-my-plants') {
      this.router.navigate([page, { state: 'User' }]);
    } else {
      this.router.navigate([page]);
    }
  }

  handleLogOut(): void {
    this.user = this.appStorage.removeUser();
    this.router.navigate(['/app-login']);
  }
}