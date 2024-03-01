import { Component, OnInit } from "@angular/core";
import { animate, style, transition, trigger } from "@angular/animations";

import { ToastrService } from 'ngx-toastr';
import { AppConsts } from "src/app/util/Consts";
import { MakeRequest } from "src/app/services/makeRequest";
import { AppStorage } from "src/app/services/appStorage";
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-requests',
  templateUrl: './userRequests.component.html',
  styleUrls: ['./userRequests.component.css']
})
export class UserRequests implements OnInit {
  user: any = null;
  requests: any[] = [];

  requestStatuses: any[] = [
    'In review',
    'Approved',
    'Canceled'
  ];
  selectedStatus: string = '';

  constructor(
    private toastr: ToastrService,
    private appStorage: AppStorage,
    private request: MakeRequest,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.user = this.appStorage.getUser();
    if (!this.user) {
      this.toastr.error('User not found!');
      this.router.navigate(['/app-login']);
    }

    this.getUserRequests();
  }

  handleStatusClick(status: any): void {
    this.selectedStatus = status === this.selectedStatus ? '' : status;
    this.getUserRequests();
  }

  /* <============================ REQUESTS ==============================> */
  getUserRequests(): void {
    this.request.get(AppConsts.GET_USER_REQUESTS, { userId: this.user.id, status: this.selectedStatus })
    .subscribe({
      next: (response) => {
        this.requests = response.userRequests;
      },
      error: (e) => {
        this.toastr.error('Error while retrieving users requests!');
      },
    });
  }
}