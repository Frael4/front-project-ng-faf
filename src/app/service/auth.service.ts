import { Injectable } from '@angular/core';

interface User {
  id: string,
  username: string,
  email: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: {} = {}
  logeado: boolean = false
  
  constructor() { }
}
