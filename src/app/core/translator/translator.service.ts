import {Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {SettingsService} from '../settings/settings.service';
import {Observable, Observer} from 'rxjs';

@Injectable()
export class TranslatorService {

  defaultLanguage = 'zh-CN';
  availableLang: any;

  constructor(private translate: TranslateService,
              private settings: SettingsService) {

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
