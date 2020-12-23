import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TranslatorService} from 'src/app/core/translator/translator.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  validateForm: FormGroup;

  passwordVisible = false;
  i18nObject: any = {}; // 国际化
  language = 'zh';

  constructor(private translator: TranslatorService,
              private formBuilder: FormBuilder,) {
    this.i18nObject = this.translator.getI18nObject(['login']);
    this.validateForm = this.formBuilder.group({
      account: [null, [Validators.required]],
      password: [null, [Validators.required]]
    });
  }

  ngOnInit(): void {

  }

}
