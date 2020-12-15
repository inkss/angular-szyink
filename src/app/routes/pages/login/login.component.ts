import {Component, OnInit} from '@angular/core';
import {TranslatorService} from 'src/app/core/translator/translator.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  i18nObject: any = {}; // 国际化

  constructor(private translator: TranslatorService) {
    this.i18nObject = this.translator.getI18nObject(['login']);
  }

  ngOnInit(): void {
  }

}
