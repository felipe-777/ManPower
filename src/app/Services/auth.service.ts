import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http" 
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = "https://localhost:7256/api/User/"
  private userPayload: any;
  constructor(
    private http: HttpClient,
    private router: Router
  ){
    this.userPayload = this.decodeToken();
  }


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

  decodeToken(){
    const jwtHelper = new JwtHelperService();
    const token = this.getToken()!;
    return jwtHelper.decodeToken(token)
  }

  getfullNameFromToken(){
    if(this.userPayload)
      return this.userPayload.name;
  }

  getIdUserFromToken(){
    if(this.userPayload)
      return this.userPayload.nameid;
  }

  getRoleFromToken(){
    if(this.userPayload)
      return this.userPayload.role;
  }
}
