import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Login }        from './components/login/login.component';
import { Registration } from './components/registration/registration.component';
import { Home }         from './components/home/home.component';
import { Plants }       from './components/plantsCatalog/plantsCatalog.component';
import { Managment }    from './components/managment/managment.component';
import { UserProfile }  from './components/userProfile/userProfile.component';
import { UserTasks }    from './components/userTasks/userTasks.component';

const routes: Routes = [
  { path:''                , component: Home         },
  { path:'app-login'       , component: Login        },
  { path:'app-registration', component: Registration },
  { path:'app-home'        , component: Home         },
  { path:'app-plants'      , component: Plants       },
  { path:'app-my-plants'   , component: Plants       },
  { path:'app-user-profile', component: UserProfile  },
  { path:'app-managment'   , component: Managment    },
  { path:'app-user-tasks'  , component: UserTasks    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
