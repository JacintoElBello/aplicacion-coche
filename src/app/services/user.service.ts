import { UsuarioModel } from './../models/user.model';

import { registerLocaleData } from '@angular/common';
import { ComponentFactoryResolver, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  loggedIn = false;
  usuarioLogged;
  usuarioLoggedName;

  constructor(private httpClient: HttpClient, private router: Router) {
    this.cargarUsusarioConectado();
  }

  register(credentials: any) {
    console.log(credentials, 'crdentials');
    const params = JSON.stringify(credentials);
    //const paramsOk = params.replace(/['”]+/g, '');
    // const paramsOk = params.replace(/"/g, "'");

    const url = 'http://localhost:3000/users/';
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient.post(url, params, { headers: headers });
  }

  resetPasswordEmail(email: any) {
    let objectParams = {
      email: email,
    };
    const params = JSON.stringify(objectParams);
    const url = 'http://localhost:3000/users/reset-password/';
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.httpClient.post(url, params, { headers: headers });
  }

  editUser(user) {
    if (user && user._id) {
      const params = user;
      const url = 'http://localhost:3000/users/' + user._id;
      const headers = new HttpHeaders().set('Content-Type', 'application/json');
      return this.httpClient.put(url, params, { headers: headers });
    }
  }

  login(credentials: any) {
    const params = JSON.stringify(credentials);

    const url = 'http://localhost:3000/users/login';
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.httpClient.post(url, params, { headers: headers });
  }

  logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('usuario');
    localStorage.removeItem('token');
    this.usuarioLogged = null;
    this.loggedIn = false;
    this.router.navigate(['/login']);
    //this.currentUserSubject.next(null);
  }

  getUserName() {
    this.usuarioLoggedName = String(localStorage.getItem('usuarioName'));

    return this.usuarioLoggedName;
  }
  getUser() {
    this.usuarioLogged = JSON.parse(localStorage.getItem('usuario'));
    return this.usuarioLogged;
  }

  getUsers() {
    const url = 'http://localhost:3000/users/';
    return this.httpClient.get(url);
  }
  getUserToken(token: string) {
    const url = 'http://localhost:3000/users/token/' + token;
    return this.httpClient.get(url);
  }
  checkUserLogin() {
    const url = 'http://localhost:3000/users/';
    return this.httpClient.get(url);
  }
  cargarUsusarioConectado() {
    if (localStorage.getItem('usuario')) {
      this.loggedIn = true;
      this.usuarioLogged = JSON.parse(localStorage.getItem('usuario'));
    }
  }
}
