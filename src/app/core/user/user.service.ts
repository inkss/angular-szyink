import {Injectable} from '@angular/core';
import {StorageMap} from '@ngx-pwa/local-storage';
import {Observable, Observer} from 'rxjs';

interface User {
  uid: any,
  name: any,
  pwd: any,
  extInfo: any,
  ifSession: boolean
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private user: User = null;

  constructor(private storage: StorageMap) {
  }

  public clearUser() {
    this.storage.delete('user');
    this.user = null;
  }

  public setUser(user: any) {
    Object.assign(this.user, user);
    this.user = user;
    this.storage.set('user', this.user).subscribe(() => {
      console.info('用户信息：离线数据存储成功');
    }, data => {
      console.error('用户信息：离线数据存储失败', data);
    });
  }

  public getUser() {
    return new Observable((observer: Observer<any>) => {
      if (!this.user || this.user.uid === '') {
        this.storage.get('user').subscribe(value => {
          this.user = <User> value || null;
          if (this.user) {
            this.user.ifSession = true;
          }
          observer.next(this.user);
          observer.complete();
        }, () => {
          observer.next(null);
          observer.complete();
        });
      } else {
        observer.next(this.user);
        observer.complete();
      }
    });
  }
}
