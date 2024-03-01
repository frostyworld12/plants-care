import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppStorage {
  constructor(
  ) {}

  public storeUser(user: any): void {
    window.localStorage.setItem('user', JSON.stringify(user));
  }

  public getUser(): any {
    const user = window.localStorage.getItem('user')
    return user ? JSON.parse(user) : null;
  }

  public removeUser(): void {
    window.localStorage.removeItem('user')
  }
}