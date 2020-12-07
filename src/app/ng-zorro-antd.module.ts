import {NgModule} from '@angular/core';
import {NZ_CONFIG, NzConfig} from 'ng-zorro-antd/core/config';

// NG ZORRO 全局配置文件
const ngZorroConfig: NzConfig = {
  message: {nzTop: 100},
  notification: {nzTop: 300}
};

@NgModule({
  providers: [
    {provide: NZ_CONFIG, useValue: ngZorroConfig}
  ]
})
export class NgZorroAntdModule {
}
