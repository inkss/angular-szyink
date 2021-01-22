import {Component, OnInit} from '@angular/core';
import {SettingsService} from '../../../core/settings/settings.service';
import {NzModalService} from 'ng-zorro-antd/modal';
import {SimpleReuseStrategy} from '../../../core/interceptor/SimpleReuseStrategy';

@Component({
  selector: 'app-error500',
  templateUrl: './error500.component.html'
})
export class Error500Component implements OnInit {

  constructor(public settings: SettingsService,
              private modal: NzModalService) {
    this.modal.closeAll();
    SimpleReuseStrategy.deleteAllRouteSnapshot();
  }

  ngOnInit(): void {
  }

}
