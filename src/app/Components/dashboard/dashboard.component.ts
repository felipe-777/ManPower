import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/Services/api.service';
import { AuthService } from 'src/app/Services/auth.service';
import { UserStoreService } from 'src/app/Services/user-store.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public users : any = [];
  public points : any  = [];
  public fullName: string = "";
  constructor(
    private api : ApiService,
    private auth : AuthService,
    private userStore: UserStoreService
  ){}

  ngOnInit() {
    this.api.getUsers()
    .subscribe(res => {
      this.users = res;
    });

    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1); 
  
    const initialDate = today;
    const finalDate = tomorrow;

    this.api.getTimeKeeping(initialDate, finalDate).subscribe(res => {
      console.log(res);
      this.points = res;
    });

    this.userStore.getFullNameFromStore()
    .subscribe(val=>{
      let fullNameFromToken = this.auth.getfullNameFromToken();
      this.fullName = val || fullNameFromToken 
    })

    //colocar dados nos campos da tabela
  }

  Logout(){
    this.auth.Logout();
  }

}
