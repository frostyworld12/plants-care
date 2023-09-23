import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Login } from './components/login/login.component';
import { Registration } from './components/registration/registration.component';
import { Home } from './components/home/home.component';
import { UsersPlants } from './components/usersPlants/usersPlants.component';

const routes: Routes = [
  { path:'', component: Home },
  { path:'app-login', component: Login },
  { path:'app-registration', component: Registration },
  { path:'app-home', component: Home },
  { path:'app-users-plants', component: UsersPlants },
  { path:'app-catalog', component: Home },
  { path:'app-profile', component: Home }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
