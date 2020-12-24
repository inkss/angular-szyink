import zh from '@angular/common/locales/zh';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NZ_I18N, zh_CN} from 'ng-zorro-antd/i18n';
import {registerLocaleData} from '@angular/common';
import {NgZorroAntdModule} from './shared/ng-zorro-antd.module';
import {RoutesModule} from './routes/routes.module';
import {SharedModule} from './shared/shared.module';
import {IconsProviderModule} from './shared/icons-provider.module';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {CoreModule} from './core/core.module';
import {RouteReuseStrategy} from '@angular/router';
import {SimpleReuseStrategy} from './core/interceptor/SimpleReuseStrategy';

registerLocaleData(zh);

export function CreateTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    SharedModule,
    NgZorroAntdModule,
    IconsProviderModule,
    CoreModule,
    BrowserModule,
    RoutesModule,
    HttpClientModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: CreateTranslateLoader,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    {provide: NZ_I18N, useValue: zh_CN},
    {provide: RouteReuseStrategy, useClass: SimpleReuseStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
