import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserStoreService } from './user-store.service';
import { AuthService } from 'src/app/Services/auth.service';
import { switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl: string = 'https://localhost:7256/api/User/';
  public userId: number = 0;
  constructor(
    private http: HttpClient,
    private userStore: UserStoreService,
    private auth : AuthService
  ){}

  getUsers(){
    return this.http.get<any>(this.baseUrl);
  }

  getTimeKeeping(initialDate: Date, finalDate: Date) {
    let userIdfromToken = this.auth.getIdUserFromToken();

    return this.userStore.getUserIdFromStore().pipe(
      switchMap(val => {
        const userId = val || userIdfromToken;

        const formatDate = (date: Date) => {
          const pad = (n: number) => (n < 10 ? '0' + n : n);
          return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} 00:00:00`;
        };

        const params = new HttpParams()
          .set('userId', userId)
          .set('initialDate', formatDate(initialDate))
          .set('finalDate',  formatDate(finalDate));

        return this.http.get<any>(`${this.baseUrl}getkbyuser`, { params });
      })
    );
  }
}
