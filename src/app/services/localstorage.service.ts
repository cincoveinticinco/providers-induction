import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  setInfo(information: any) {
    const info = {...this.getInfo(), ...information}
    localStorage.setItem('info', JSON.stringify(info));
  }

  getInfo() {
    return JSON.parse(localStorage.getItem('info')!) || {};
  }

  setToken(token: string) {
    localStorage.setItem('token', JSON.stringify(token));
  }

  getToken() {
    return JSON.parse(localStorage.getItem('token') || '');
  }

  clear() {
    localStorage.clear();
  }


}
