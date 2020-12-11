import {Routes} from '@angular/router';
import {AuthguardGuard} from '../core/guard/authguard.guard';
import {CanDeactivateGuard} from '../core/guard/can-deactivate-guard.service.service';
import {LayoutComponent} from '../layout/layout.component';
import {AuthCanActivateMgrGuard} from '../core/guard/auth-can-activate-mgr.guard';
import {LoginComponent} from './pages/login/login.component';
import {RegisterComponent} from './pages/register/register.component';
import {Error404Component} from './pages/error404/error404.component';
import {Error500Component} from './pages/error500/error500.component';

export const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'login'},
  {
    path: 'layout',
    component: LayoutComponent,
    canActivate: [AuthguardGuard],
    canDeactivate: [CanDeactivateGuard],
    children: []
  },
  {
    path: 'login',
    canActivate: [AuthCanActivateMgrGuard],
    canDeactivate: [CanDeactivateGuard],
    component: LoginComponent
  },
  {path: 'register', component: RegisterComponent},
  {path: '404', component: Error404Component},
  {path: '500', component: Error500Component},
];
