import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Login } from './components/login/login.component';
import { Registration } from './components/registration/registration.component';
import { Home } from './components/home/home.component';
import { Plants } from './components/plantsCatalog/plantsCatalog.component';
import { Managment } from './components/managment/managment.component';

const routes: Routes = [
  { path:'', component: Home },
  { path:'app-login', component: Login },
  { path:'app-registration', component: Registration },
  { path:'app-home', component: Home },
  { path:'app-plants', component: Plants },
  { path:'app-profile', component: Home },
  { path: 'app-managment', component: Managment }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
