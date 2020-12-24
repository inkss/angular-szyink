import {Component} from '@angular/core';
import {SettingsService} from './core/settings/settings.service';
import {TranslatorService} from './core/translator/translator.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {

  constructor(public settings: SettingsService,
              private translator: TranslatorService,) {
    this.translator.useLanguage();
  }

  ngOnInit() {

  }
}
