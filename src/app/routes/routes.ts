import {Routes} from '@angular/router';
import {AuthguardGuard} from '../core/guard/authguard.guard';
import {CanDeactivateGuard} from '../core/guard/can-deactivate-guard.service.service';
import {LayoutComponent} from '../layout/layout.component';
import {AuthCanActivateMgrGuard} from '../core/guard/auth-can-activate-mgr.guard';
import {LoginComponent} from '../page/login/login.component';

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
    path: 'login', canActivate: [AuthCanActivateMgrGuard],
    canDeactivate: [CanDeactivateGuard], component: LoginComponent
  }
];
