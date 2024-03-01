import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxPrintModule } from 'ngx-print';
import { MakeRequest } from './services/makeRequest';
import { AppStorage } from './services/appStorage';
import { provideToastr } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';

import { Login } from './components/login/login.component';
import { Registration } from './components/registration/registration.component';
import { Home } from './components/home/home.component';
import { Plants } from './components/plantsCatalog/plantsCatalog.component';
import { Managment } from './components/managment/managment.component';
import { UserProfile } from './components/userProfile/userProfile.component';
import { UserRequests } from './components/userRequests/userRequests.component';
import { UserTasks } from './components/userTasks/userTasks.component';
import { UserTasksDescription } from './components/userTasksDescription/userTasksDescription.component';
import { UserRequestsAdmin } from './components/userRequestsAdmin/userRequestsAdmin.component';
import { ManagmentUsers }  from "./components/managmentUsers/managmentUsers.component";
import { ManagmentAdmin }  from "./components/managmentAdmin/managmentAdmin.component";
import { ManagmentLogsView }  from "./components/managmentLogsView/managmentLogsView.component";
import { ManagmentBackupView }  from "./components/managmentBackupView/managmentBackupView.component";

import { Combobox }  from "./ui/combobox/combobox.component";
import { ConfirmationDialog }  from "./ui/confirmationDialog/confirmationDialog.component";
import { UiHelpers } from './util/uiHelpers';

@NgModule({
  declarations: [
    AppComponent,
    Login,
    Registration,
    Home,
    Plants,
    Managment,
    UserProfile,
    UserRequests,
    UserRequestsAdmin,
    Combobox,
    ConfirmationDialog,
    ManagmentUsers,
    ManagmentAdmin,
    ManagmentLogsView,
    ManagmentBackupView,
    UserTasks,
    UserTasksDescription
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    FontAwesomeModule,
    NgxPrintModule
  ],
  providers: [
    provideToastr(),
    provideAnimations(),
    MakeRequest,
    AppStorage,
    UiHelpers
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
