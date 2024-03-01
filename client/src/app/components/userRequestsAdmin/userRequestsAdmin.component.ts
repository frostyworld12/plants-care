import { Component, OnInit } from "@angular/core";
import { animate, style, transition, trigger } from "@angular/animations";

import { ToastrService } from 'ngx-toastr';
import { AppConsts } from "src/app/util/Consts";
import { MakeRequest } from "src/app/services/makeRequest";
import { AppStorage } from "src/app/services/appStorage";
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-requests-admin',
  templateUrl: './userRequestsAdmin.component.html',
  styleUrls: ['./userRequestsAdmin.component.css']
})
export class UserRequestsAdmin implements OnInit {
  user: any = null;
  requests: any[] = [];

  requestStatuses: any[] = [];

  requestStatusesFilters: any[] = [
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

    if (this.user.userType !== 'Admin' && this.user.userType !== 'Content Manager') {
      this.toastr.error('You have no permissions to view this page!');
      this.router.navigate(['/app-login']);
    }

    this.getUserRequests();
  }

  handleOptionSelect(option: string, requestId: string): void {
    console.log(option)

    const currentRequest = this.requests.find((request: any) => request.requestId === requestId);

    if (currentRequest.requestStatus.id !== option) {
      const request = {
        requestId: currentRequest.requestId,
        userRequestTypeId: option
      }
      this.updateUserRequest(request);
    }
  }

  handleStatusClick(status: any): void {
    this.selectedStatus = status === this.selectedStatus ? '' : status;
    this.getUserRequests();
  }

  /* <============================ REQUESTS ==============================> */
  getUserRequests(): void {
    this.request.get(AppConsts.GET_USER_REQUESTS_ADMIN, { status: this.selectedStatus })
    .subscribe({
      next: (response) => {
        this.requests = response.result.userRequests.map((request: any) => ({
          requestId: request.requestId,
          plantName: request.plantName,
          requestDescription: request.requestDescription,
          requestDate: request.requestDate,
          requestStatus: { id: request.userRequestTypeId, name: request.requestStatus }
        }));

        this.requestStatuses = (response.result.userRequestStatuses || [])
          .map((requestStatus: any) => ({ id: requestStatus.id, name: requestStatus.name }));
      },
      error: (e) => {
        this.toastr.error('Error while retrieving users requests!');
      },
    });
  }

  updateUserRequest(request: any): void {
    this.request.post(AppConsts.UPDATE_USER_REQUST, { request: request }, {})
    .subscribe({
      next: (response) => {
        console.log(response);
        this.toastr.success('Request status successfully updated!');
        this.getUserRequests();
      },
      error: (e) => {
        this.toastr.error('Error while retrieving users requests!');
      },
    });
  }
}