import {Component, Injector, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TranslatorService} from 'src/app/core/translator/translator.service';
import {SettingsService} from '../../../core/settings/settings.service';
import {Title} from '@angular/platform-browser';
import {UserService} from '../../../core/user/user.service';
import {NzModalService} from 'ng-zorro-antd/modal';
import {NzMessageService} from 'ng-zorro-antd/message';
import {Router} from '@angular/router';
import {SimpleReuseStrategy} from 'src/app/core/interceptor/SimpleReuseStrategy';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  router: Router;
  validateForm: FormGroup;
  passwordVisible = false;
  languageList: Array<{ code: any, name: any }> = [];
  i18nObject: any = {};

  constructor(public settings: SettingsService,
              private translator: TranslatorService,
              private modal: NzModalService,
              private injector: Injector,
              private message: NzMessageService,
              private formBuilder: FormBuilder,
              private user: UserService,
              private title: Title) {
    SimpleReuseStrategy.deleteAllRouteSnapshot();  // 删除全部路由快照
    this.languageList = this.settings.getBGServices('language'); // 获取语言列表
    this.validateForm = this.formBuilder.group({
      account: [null, [Validators.required]],
      password: [null, [Validators.required]],
      language: [this.settings.getBGServices('defaultLanguage'), [Validators.required]]
    });
  }

  submitForm($event): void {
    $event.preventDefault();
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    if (this.validateForm.valid) {
      this.user.getUser().subscribe(value => {
        if (value) {

        } else {
          this.message.error(this.i18nObject['plzRegister']);
        }
      });
    }
  }

  navigateRegister(): void {
    this.router.navigate(['/register'], {
      queryParams: {}, skipLocationChange: true
    });
  }

  ngOnInit(): void {
    this.initLanguage();
    this.router = this.injector.get(Router);

    // 监听语言下拉框设置全局语言
    this.validateForm.get('language').valueChanges.subscribe(value => {
      this.translator.useLanguage(value);
      this.initLanguage();
    });
  }

  // 加载语言
  private initLanguage() {
    this.translator.getI18nObjectObserver(['appname', 'login']).subscribe(value => {
      this.title.setTitle(value.appname);
      this.i18nObject = value.login;
    });
  }

}
