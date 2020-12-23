import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import {SlideVerifyComponent} from './slide-verify/slide-verify.component';


@NgModule({
  declarations: [SlideVerifyComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    SlideVerifyComponent
  ]
})
export class ComponentModule {
}
