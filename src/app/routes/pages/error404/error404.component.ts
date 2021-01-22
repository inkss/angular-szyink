import {Component, OnInit} from '@angular/core';
import {SettingsService} from '../../../core/settings/settings.service';
import {SimpleReuseStrategy} from '../../../core/interceptor/SimpleReuseStrategy';
import {NzModalService} from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-error404',
  templateUrl: './error404.component.html'
})
export class Error404Component implements OnInit {

  constructor(public settings: SettingsService,
              private modal: NzModalService) {
    this.modal.closeAll();
    SimpleReuseStrategy.deleteAllRouteSnapshot();
  }

  ngOnInit(): void {
  }

}
