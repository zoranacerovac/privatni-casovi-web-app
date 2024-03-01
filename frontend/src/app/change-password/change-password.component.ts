import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/services/login.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {

  constructor(private servis: LoginService, private router: Router){}
  username: string = "";
  password: string = "";
  newPass: string = "";
  repeatPass: string = "";
  mess: string = "";
  passChanged: boolean = false; // flag da nestane forma i da samo pise da je sifra uspesno izmenjena i da ide nazad na prijavu


  changePassword(){
    if (this.checkInput()){
      this.servis.changePassword(this.username, this.password, this.newPass).subscribe((s:string) =>{
        if(s){
          if(s == "error"){
            this.mess = "Korisnik ne posotji u bazi. Registrujte se."
          }
          if(s == "OK"){
            this.passChanged = true;
            this.mess = "Uspešno ste promenili lozinku."
          }
        }
      })
    }

  }

  login(){
    this.router.navigate(["/login"]);
  }

  checkInput(): boolean{
    if (this.username == ""){
      this.mess = "Unesite korisničko ime.";
      return false;
    }
    
    if (this.password == ""){
      this.mess = "Unesite staru lozinku.";
      return false;
    }

    if (this.newPass == ""){
      this.mess = "Unesite novu lozinku."
      return false;
    }

    if (this.repeatPass == ""){
      this.mess = "Unesite potvrdu novu lozinku."
      return false;
    }

    if(this.repeatPass != this.newPass){
      this.mess = "Nova lozinka i potvrda nove lozinke nemaju istu vrednost."
      return false;
    }

    return true;
  }
 
}
