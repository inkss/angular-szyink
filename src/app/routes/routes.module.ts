import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {routes} from './routes';
import {AuthguardGuard} from '../core/guard/authguard.guard';
import {CanDeactivateGuard} from '../core/guard/can-deactivate-guard.service.service';
import {AuthCanActivateMgrGuard} from '../core/guard/auth-can-activate-mgr.guard';
import {PageModule} from './pages/page.module';

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes, {useHash: true}),
    PageModule
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
