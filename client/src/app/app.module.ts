import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MakeRequest } from './services/makeRequest';
import { provideToastr } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';

import { Login } from './components/login/login.component';
import { Registration } from './components/registration/registration.component';
import { Home } from './components/home/home.component';
import { UsersPlants } from './components/usersPlants/usersPlants.component';

@NgModule({
  declarations: [
    AppComponent,
    Login,
    Registration,
    Home,
    UsersPlants
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
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
