import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {

  private fullName$ = new BehaviorSubject<string>("");
  private role$ = new BehaviorSubject<string>("");
  private userId$ = new BehaviorSubject<number>(0);

  constructor() { }

  public getRoleFromStore(){
    return this.role$.asObservable();
  }

  public setRoleForStore(role:string){
    this.role$.next(role)
  }

  public getUserIdFromStore(){
    return this.userId$.asObservable();
  }
  
  public getFullNameFromStore(){
    return this.fullName$.asObservable();
  }

  public setFullNameForStore(fullName:string){
    this.fullName$.next(fullName)
  }
}
