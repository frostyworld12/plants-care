import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MakeRequest } from './services/makeRequest';
import { AppStorage } from './services/appStorage';
import { provideToastr } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';

import { Login } from './components/login/login.component';
import { Registration } from './components/registration/registration.component';
import { Home } from './components/home/home.component';
import { Plants } from './components/plantsCatalog/plantsCatalog.component';
import { Test } from './components/test/test.component';

@NgModule({
  declarations: [
    AppComponent,
    Login,
    Registration,
    Home,
    Plants,
    Test
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    FontAwesomeModule,
  ],
  providers: [
    provideToastr(),
    provideAnimations(),
    MakeRequest,
    AppStorage
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
