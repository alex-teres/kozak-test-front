import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export const localServerUrl = 'http://localhost:3000';

export interface User {
  username: string;
  password: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(credentials: {username: string, password: string}) {
    return this.http.post(`${localServerUrl}/login`, credentials);
  }

  signUp(data: User) {
    return this.http.post(`${localServerUrl}/signUp`, data);
  }

}
