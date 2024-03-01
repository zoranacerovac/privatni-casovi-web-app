import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { AdminService } from 'src/services/admin.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {

  constructor(private servis: AdminService, private router: Router){}

  username: string = "";
  password: string = "";
  mess: string = "";

  login(){
    if (this.username == "" || this.password == ""){
      this.mess = "Molimo vas da popunite sva polja.";
    }else{
      this.servis.login(this.username, this.password).subscribe((u:User) =>{
        if (u){
            localStorage.setItem('currUser', JSON.stringify(u));
            this.router.navigate(["/admin"]);
          }else{
            this.mess = "Niste uneli ispravne podatke."
          }
      });
    }

  }

}
