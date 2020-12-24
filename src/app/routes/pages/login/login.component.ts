import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TranslatorService} from 'src/app/core/translator/translator.service';
import {SettingsService} from '../../../core/settings/settings.service';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  validateForm: FormGroup;
  passwordVisible = false;
  languageList: Array<{ code: any, text: any }> = [];

  constructor(private translator: TranslatorService,
              private settings: SettingsService,
              private formBuilder: FormBuilder,
              private title: Title) {
    this.languageList = this.settings.getBGServices('language');

    this.validateForm = this.formBuilder.group({
      account: [null, [Validators.required]],
      password: [null, [Validators.required]],
      language: ['zh-CN', [Validators.required]]
    });

    this.validateForm.get('language').valueChanges.subscribe(value => {
      this.translator.useLanguage(value);
      this.translator.getI18nObjectObserver('appname').subscribe(value => {
        this.title.setTitle(value);
      });
    });
  }

  ngOnInit(): void {

  }

}
