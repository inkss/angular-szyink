import {Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {SettingsService} from '../settings/settings.service';
import {Observable, Observer} from 'rxjs';
import {NzI18nService, zh_CN, zh_TW} from 'ng-zorro-antd/i18n';

@Injectable()
export class TranslatorService {

  defaultLanguage = 'zh-CN';
  availableLang: any;

  constructor(private translate: TranslateService,
              private settings: SettingsService,
              private i18n: NzI18nService) {

    translate.setDefaultLang(this.defaultLanguage);
    this.availableLang = this.settings.getBGServices('language')
      ? this.settings.getBGServices('language')
      : [{code: 'zh-CN', text: '简体中文'}];
    const language = this.settings.getBGServices('defaultLanguage')
      ? this.settings.getBGServices('defaultLanguage')
      : this.defaultLanguage;
    this.useLanguage(language);
  }

  useLanguage(lang: string = this.defaultLanguage) {
    this.translate.use(lang);
    switch (lang) {
      case 'zh-CN':
        this.i18n.setLocale(zh_CN);
        break;
      case 'zh-TW':
        this.i18n.setLocale(zh_TW);
        break;
      default:
        this.i18n.setLocale(zh_CN);
        break;
    }
  }

  getAvailableLanguages() {
    return this.availableLang;
  }

  getI18nObject(key: string | Array<string>) {
    return this.translate.instant(key);
  }

  getI18nObjectObserver(key: string | Array<string>) {
    return new Observable((observer: Observer<any>) => {
      this.translate.get(key).subscribe(value => {
        observer.next(value);
        observer.complete;
      });
    });
  }
}
