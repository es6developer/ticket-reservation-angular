import { Injectable } from '@angular/core';
@Injectable()

export class AuthService {
  constructor() { }
  // ...
  public isAuthenticated(): Boolean {
    const token = sessionStorage.getItem('user_id');
    return token != null ? true : false;
  }
  public setUserToken(value: string): Boolean {
    console.log("user_id");
    
    sessionStorage.setItem('user_id', value);
    return true
  }
}
