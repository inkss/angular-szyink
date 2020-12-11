import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {routes} from './routes';
import {AuthguardGuard} from '../core/guard/authguard.guard';
import {CanDeactivateGuard} from '../core/guard/can-deactivate-guard.service.service';
import {AuthCanActivateMgrGuard} from '../core/guard/auth-can-activate-mgr.guard';

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes, {useHash: true}),
  ],
  providers: [
    AuthCanActivateMgrGuard,
    CanDeactivateGuard,
    AuthguardGuard
  ],
  exports: [RouterModule]
})
export class RoutesModule {
}
