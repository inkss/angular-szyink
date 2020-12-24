import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  public app: any;
  public services: any;

  constructor() {
    this.initBGServices();

    this.app = {
      name: this.getBGServices('appname'),
      description: this.getBGServices('description'),
      year: ((new Date()).getFullYear())
    };
  }

  initBGServices() {
    const that = this;
    const xhr = new XMLHttpRequest();
    const url = 'assets/config/app-services.json';
    xhr.open('GET', url, false);
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4 && xhr.status == 200) {
        that.services = JSON.parse(xhr.responseText);
      }
    };
    xhr.send();
  }

  getBGServices(name) {
    return name ? this.services[name] : this.services;
  }

  setBGServices(name, value) {
    if (typeof this.services[name] !== 'undefined') {
      this.services[name] = value;
    }
  }

  getAppSetting(name) {
    return name ? this.app[name] : this.app;
  }

  setAppSetting(name, value) {
    if (typeof this.app[name] !== 'undefined') {
      this.app[name] = value;
    }
  }
}
