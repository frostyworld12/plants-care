import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ToastrService }     from 'ngx-toastr';
import { AppConsts }         from 'src/app/util/Consts';
import { Router }            from '@angular/router';
import { AppStorage }        from 'src/app/services/appStorage';
import { MakeRequest }       from 'src/app/services/makeRequest';
import { UiHelpers }         from 'src/app/util/uiHelpers';
import { NgxPrintService }   from 'ngx-print';
import { PrintOptions }      from 'ngx-print';

@Component({
  selector: 'managment-admin',
  templateUrl: './managmentAdmin.component.html',
  styleUrls: ['./managmentAdmin.component.css']
})
export class ManagmentAdmin implements OnInit {
  @Output() onLoading = new EventEmitter<boolean>();
  user: any = null;

  dbRequest: string = '';
  columnsPerTable: any = {};
  currentTable: string = '';
  dragableTableName: string = '';
  dragableTableColumn: string = '';

  downloadLink: string = '';
  dumpDownloadLink: string = '';

  requestResultData: any[] = [];
  requestResultColumns: any[] = [];

  isRequestPerformed: boolean = false;

  objectKeys = Object.keys;

  isManagmentLogsOpen: boolean = false;
  isManagmentBackupOpen: boolean = false;

  constructor(
    private router: Router,
    private appStorage: AppStorage,
    private toastr: ToastrService,
    private request: MakeRequest,
    private uiHelpers: UiHelpers,
    private printService: NgxPrintService
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

    this.dumpDownloadLink = AppConsts.START_DB_BACKUP;
    this.getDBTablesInfo();
  }

  handleTableNameSelect(tableName: string): void {
    this.currentTable = tableName !== this.currentTable ? tableName : '';
  }

  handleTableNameDrag(tableName: string): void {
    this.dragableTableName = tableName;
  }

  handleTableColumnDrag(tableColumn: string): void {
    this.dragableTableColumn = tableColumn;
  }

  handleDrop(event: any): void {
    event.preventDefault();
    this.dbRequest += this.dragableTableName || this.dragableTableColumn;

    this.dragableTableName = '';
    this.dragableTableColumn = '';
    this.currentTable = '';
  }

  handleDragOver(event: any): void {
    event.preventDefault();
  }

  handlePerformRequest(): void {
    this.downloadLink = AppConsts.DOWNLOAD_DB_REQUEST + '?dbRequest=' + this.dbRequest;

    this.performRequest();
  }

  handlePrint(): void {
    const customPrintOptions: PrintOptions = new PrintOptions({
        printSectionId: 'print-section',
        printTitle: 'DB Data'
    });
    this.printService.print(customPrintOptions);
  }

  handleViewOpen(modalName: string): void {
    if (modalName === 'LOGS') {
      this.isManagmentLogsOpen = true;
    } else if (modalName === 'BACKUP') {
      this.isManagmentBackupOpen = true;
    }
  }

  handleModalsClose(isOpen: boolean, modalName: string): void {
    if (modalName === 'LOGS') {
      this.isManagmentLogsOpen = isOpen;
    } else if (modalName === 'BACKUP') {
      this.isManagmentBackupOpen = isOpen;
    }
  }

  /* <============================ REQUESTS ==============================> */
  getDBTablesInfo(): void {
    this.onLoading.emit(true);

    this.request.get(AppConsts.GET_DB_TABLES, {})
    .subscribe({
      next: (response) => {
        this.onLoading.emit(false);
        this.columnsPerTable = response.result;
      },
      error: (e) => {
        this.onLoading.emit(false);
        this.toastr.error(e.error.message || e.error);
      },
    });
  }

  performRequest(): void {
    this.onLoading.emit(true);

    this.request.get(AppConsts.PERFORM_DB_REQUEST, { dbRequest: this.dbRequest })
    .subscribe({
      next: (response) => {
        const result = response.result;
        if (result.length > 0) {
          this.requestResultData = result;
          this.requestResultColumns = Object.keys(result[0]);
        }

        this.isRequestPerformed = true;

        this.onLoading.emit(false);
      },
      error: (e) => {
        this.onLoading.emit(false);
        this.toastr.error(e.error.message || e.error);
      },
    });
  }
}