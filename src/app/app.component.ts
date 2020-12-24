import {Component} from '@angular/core';
import {SettingsService} from './core/settings/settings.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {

  constructor(public settings: SettingsService) {
  }

  ngOnInit() {

  }
}
