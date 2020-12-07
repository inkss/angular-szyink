import zh from '@angular/common/locales/zh';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {IconsProviderModule} from './icons-provider.module';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NZ_I18N, zh_CN} from 'ng-zorro-antd/i18n';
import {registerLocaleData} from '@angular/common';
import {NgZorroAntdModule} from './ng-zorro-antd.module';
import {RoutesModule} from './routes/routes.module';
import {SharedModule} from './shared/shared.module';

registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    SharedModule,
    NgZorroAntdModule,
    IconsProviderModule,
    BrowserModule,
    RoutesModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [{provide: NZ_I18N, useValue: zh_CN}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
