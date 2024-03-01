import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ToastrService }     from 'ngx-toastr';
import { AppConsts }         from 'src/app/util/Consts';
import { Router }            from '@angular/router';
import { AppStorage }        from 'src/app/services/appStorage';
import { MakeRequest }       from 'src/app/services/makeRequest';

@Component({
  selector: 'managment-backup-view',
  templateUrl: './managmentBackupView.component.html',
  styleUrls: ['./managmentBackupView.component.css']
})
export class ManagmentBackupView implements OnInit {
  @Output() onBackupClose = new EventEmitter<boolean>();

  user: any = null;

  dbBackups: any = [];
  downloadBackupLink: string = '';

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

    this.downloadBackupLink = AppConsts.DOWNLOAD_DB_BACKUP_FILE;
    this.getBackupsFilesList();
  }

  handleBackupClose(): void {
    this.onBackupClose.emit(false);
  }

  handleCreateBackup(): void {
    this.startDatabaseBackup();
  }


  /* <============================ REQUESTS ==============================> */
  getBackupsFilesList(): void {
    this.request.get(AppConsts.GET_DB_BACKUP_FILES, {})
    .subscribe({
      next: (response) => {
        this.dbBackups = response.dumpsFiles;
      },
      error: (e) => {
        this.toastr.error(e.error.message || e.error);
      },
    });
  }

  startDatabaseBackup(): void {
    this.request.get(AppConsts.START_DB_BACKUP, {})
    .subscribe({
      next: (response) => {
        this.toastr.success('Backup successfully created!');
        this.getBackupsFilesList();
      },
      error: (e) => {
        this.toastr.error(e.error.message || e.error);
      },
    });
  }
}