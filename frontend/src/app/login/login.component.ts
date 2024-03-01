import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/services/login.service';
import { User } from '../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private servis: LoginService, private router: Router){}

  username: string = "";
  password: string = "";
  mess: string = "";

  changePass: boolean = false;
  oldPass: string = "";
  newPass: string = "";
  repeatPass: string = "";
  messPass: string = "";

  login(){
    if (this.username == "" || this.password == ""){
      this.mess = "Molimo vas da popunite sva polja.";
    }else{
      this.servis.login(this.username, this.password).subscribe((u:User) =>{
        if (u){
          if(u.isStudent == "true"){
            localStorage.setItem('currUser', u.username);
            this.router.navigate(['user']);
          }else if(u.isProfesor =="true" && u.status == "approved"){
            localStorage.setItem('currUser', u.username);
            this.router.navigate(['profesor']);
          }else{
            this.mess = "Nastavnice nije vam odobrena registracija."
          }
        }else{
          this.mess = "Korisnik ne postoji."
        }
      })
    }

  }

  changePasswordFlag(){
    this.changePass = true;
  }

  changePassword(){

  }

}
