import {Component, Injector, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

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
              private injector: Injector,) {
  }

  ngOnInit(): void {
    this.router = this.injector.get(Router);

    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      userPwd: [null, [Validators.required, this.validList.validateWeakPwd]],
      confirmPwd: [null, [Validators.required, this.validList.validateCheckPwd]]
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
    }
  };

  submitForm(): void {

  }

}
