import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private user: any = {
    uid: '',
    name: '',
    pwd: '',
    email: '',
    tel: ''
  }

  constructor() { }
}
