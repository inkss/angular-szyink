import {Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Injectable()
export class TranslatorService {

  defaultLanguage = 'zh-CN';
  availableLang: any;

  constructor(private translate: TranslateService) {
    translate.setDefaultLang(this.defaultLanguage);

    this.availableLang = [
      {code: 'zh-CN', text: '简体中文'}
    ];

    this.useLanguage();
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
}
