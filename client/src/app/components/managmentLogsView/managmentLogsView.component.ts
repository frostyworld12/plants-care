import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ToastrService }     from 'ngx-toastr';
import { AppConsts }         from 'src/app/util/Consts';
import { Router }            from '@angular/router';
import { AppStorage }        from 'src/app/services/appStorage';
import { MakeRequest }       from 'src/app/services/makeRequest';

@Component({
  selector: 'managment-logs-view',
  templateUrl: './managmentLogsView.component.html',
  styleUrls: ['./managmentLogsView.component.css']
})
export class ManagmentLogsView implements OnInit {
  @Output() onLogsClose = new EventEmitter<boolean>();

  user: any = null;
  logs: any[] = [];

  interval: any;

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
    this.getLogs();

    this.interval = window.setInterval(() => this.getLogs(), 5000);
  }

  handleLogsClose(): void {
    window.clearInterval(this.interval);
    this.onLogsClose.emit(false);
  }


  /* <============================ REQUESTS ==============================> */
  getLogs(): void {
    console.log('GET LOGS');

    this.request.get(AppConsts.GET_DB_LOGS, { })
    .subscribe({
      next: (response) => {
        console.log(response);
        this.logs = response.result;
      },
      error: (e) => {
        this.toastr.error(e.error.message || e.error);
      },
    });
  }
}