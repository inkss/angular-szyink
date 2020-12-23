import {NgModule} from '@angular/core';
import {LoginComponent} from './login/login.component';
import {SharedModule} from '../../shared/shared.module';
import {Error404Component} from './error404/error404.component';
import {Error500Component} from './error500/error500.component';
import {RegisterComponent} from './register/register.component';
import {ComponentModule} from '../../component/component.module';


@NgModule({
  declarations: [LoginComponent, Error404Component, Error500Component, RegisterComponent],
  imports: [
    SharedModule,
    ComponentModule
  ],
  exports: [LoginComponent]
})
export class PageModule {
}
