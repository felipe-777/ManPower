import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http" 
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = "https://localhost:7256/api/User/"
  constructor(
    private http: HttpClient,
    private router: Router
  ){}


  signUp(user: any){
    return this.http.post<any>(`${this.baseUrl}create`, user)
  }

  login(user: any){
    return this.http.post<any>(`${this.baseUrl}authenticate`, user)
  }

  Logout(){
    localStorage.clear();
    this.router.navigate(['login'])
  }

  storeToken(tokenValue: string){
    localStorage.setItem('token', tokenValue)
  }

  getToken(){
    return localStorage.getItem('token')
  }

  isLoggedIn(): boolean{
    return !!localStorage.getItem('token')
  }
}
