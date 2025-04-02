import { Routes } from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {AuthComponent} from './pages/admin/auth/auth.component';
import {BaseComponent} from './pages/admin/base/base.component';
import {ErrorComponent} from './pages/error/error.component';

export const routes: Routes = [
  {
    path : "",
    component : HomeComponent
  },  {
    path : "admin/auth",
    component : AuthComponent
  },{
    path : "admin/:page",
    component : BaseComponent
  },{
    path : "error",
    component : ErrorComponent
  }
];
