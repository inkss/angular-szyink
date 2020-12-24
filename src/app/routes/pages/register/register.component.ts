import {Component, Injector, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less']
})
export class RegisterComponent implements OnInit {
  passwordVisible = false;
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
  };

  submitForm(): void {

  }

}
