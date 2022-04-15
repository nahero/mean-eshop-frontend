import { Injectable } from '@angular/core';

const TOKEN = 'userToken';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {
  constructor() {}

  setToken(data: any) {
    localStorage.setItem(TOKEN, data);
  }

  getToken() {
    return localStorage.getItem(TOKEN);
  }

  removeToken() {
    localStorage.removeItem(TOKEN);
  }
}
