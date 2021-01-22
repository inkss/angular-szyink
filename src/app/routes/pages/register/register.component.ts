import {Component, Injector, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {NzModalService} from 'ng-zorro-antd/modal';
import {NzMessageService} from 'ng-zorro-antd/message';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less']
})
export class RegisterComponent implements OnInit {
  pwdVisible = false;
  confirmPwdVisible = false;
  validateForm: FormGroup;
  router: Router;

  constructor(private fb: FormBuilder,
              private injector: Injector,
              private modal: NzModalService,
              private message: NzMessageService) {
  }

  ngOnInit(): void {
    this.router = this.injector.get(Router);

    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      userPwd: [null, [Validators.required, this.validList.validateWeakPwd]],
      confirmPwd: [null, [Validators.required, this.validList.validateCheckPwd]],
      agree: [false, [Validators.requiredTrue]],
      captchaSliding: [false, [Validators.requiredTrue]],
    });
  }

  validList = {
    validateWeakPwd: (control: FormControl): { [s: string]: boolean } => {
      const testString = /^(?=.*[a-zA-Z])(?=.*\d).{8,16}$/;
      if (!control.value) {
        return {required: true};
      } else if (!testString.test(control.value)) {
        return {weakPwd: true, error: true};
      }
      return {};
    },
    validateCheckPwd: (control: FormControl): { [s: string]: boolean } => {
      if (!control.value) {
        return {required: true};
      } else if (control.value !== this.validateForm.controls.userPwd.value) {
        return {confirm: true, error: true};
      }
      return {};
    },
    confirmPassword: () => {
      setTimeout(() => this.validateForm.controls.confirmPwd.updateValueAndValidity());
    },
    onVerifyChecked: (result: boolean) => {
      this.validateForm.get('captchaSliding').setValue(result);
    },
  };

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
  }

  // 服务协议
  openAgreement(e: MouseEvent): void {
    e.preventDefault();
    e.stopPropagation();
    const modal = this.modal.create({
      nzTitle: '隐私协议',
      nzContent: '这里是隐私协议',
      nzWidth: 750,
      nzFooter: [
        {
          label: '取消', onClick: () => {
            this.validateForm.get('agree').setValue(false);
            modal.destroy()
          }
        },
        {
          label: '确认', onClick: () => {
            this.validateForm.get('agree').setValue(true);
            modal.destroy();
          }
        }
      ]
    });
  }

}
