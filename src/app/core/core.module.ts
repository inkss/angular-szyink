import {NgModule, Optional, SkipSelf} from '@angular/core';
import { TranslatorService } from './translator/translator.service';

import { throwIfAlreadyLoaded } from './module-import-guard';
import {UserService} from './user/user.service';

@NgModule({
  declarations: [],
  imports: [],
  providers: [
    TranslatorService,
    UserService
  ]
})
export class CoreModule {
  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
