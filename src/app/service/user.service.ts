import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  createUser(user: any){
    return this.http.post<any>('https://localhost:7145/User/Register', user)
  }

  async logIn(user: any) {
    return this.http.post<any>('https://localhost:7145/User/login', user)
  }
}
