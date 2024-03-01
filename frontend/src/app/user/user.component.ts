import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/services/user.service';
import { User } from '../models/user';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit{

  newDatas: User = new User();
  currUser: User = new User();
  changeData: boolean = false;
  mess: string = "";
  schoolValueStudent: string[] = ["osnovna", "srednja-gimnazija", "srednja-stručna",  "srednja-umetnička"];

  constructor(private servis: UserService, private router: Router){}

  ngOnInit(): void {
    let user = localStorage.getItem('currUser');
    if (user){
      this.servis.getSpecificUser(user).subscribe((u)=>{
        if (u){
          //console.log(u);
          this.currUser = u;
        }
      })
    }
  }

  //pokupi sve parametre i posalji zahtev za izmenom 
  saveChanges(){
    if( this.newDatas.firstname == "" && this.newDatas.lastname == "" && this.newDatas.addres == "" && this.newDatas.email == ""
    && this.newDatas.phone == "" && this.newDatas.school == "" && this.newDatas.grade == "" && this.newDatas.picture == ""){
            this.mess = "Niste izmenili nijedan podatak."
        }else{
            if (this.newDatas.firstname != ""){
              this.newDatas.firstname = this.newDatas.firstname;
            }
            if (this.newDatas.lastname != ""){
              this.currUser.lastname = this.newDatas.lastname;
            }
            if (this.newDatas.addres != ""){
              this.currUser.addres = this.newDatas.addres;
            }
            if (this.newDatas.email != ""){
              this.currUser.email = this.newDatas.email;
            }
            if (this.newDatas.phone != ""){
              this.currUser.phone = this.newDatas.phone;
            }
            if (this.newDatas.school != ""){
              this.currUser.school = this.newDatas.school;
            }
            if (this.newDatas.grade != ""){
              this.currUser.grade = this.newDatas.grade;
            }
            if (this.newDatas.picture != ""){
              this.currUser.picture = this.newDatas.picture;
            }
            this.servis.changeDataUser(this.currUser).subscribe((s: String)=>{
              this.mess = "Uspesno ste izmenili podatke."
            })
        }
    
    this.changeData = false;
  }

  changeDataMethod(){
    if(this.changeData == false){
      this.changeData = true;
      this.mess = "";
    }else{
      this.changeData = false;
      this.newDatas = new User();
      this.mess = "";
    }

  }

  getMaxGrade(): number {
    if (this.newDatas.school == ""){
      if (this.currUser.school == "osnovna"){
        return 8;
      }else{
        return 4;
      }
    }else{
      if (this.newDatas.school == "osnovna"){
        return 8;
      }else{
        return 4;
      }
    } 
  }

  pictureUploaded: string = "";
  onFileChange(event: any){
    const reader = new FileReader();
    
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {

        let img: any;
        img = reader.result;

        const image = new Image();
        image.src = img;
        image.onload = () => {
          if (image.width < 100 || image.width > 300 || image.height < 100 || image.height > 300) {
            // this.picture = "../../assets/avatar.jpg";
            this.mess = "Slika mora da bude veličine između 100x100 i 300x300 piksela."
          }
          else {
            this.newDatas.picture = reader.result;
            this.pictureUploaded = "Slika je uspesno dodata.";
          }
        };

      };

    }
  }

  showPicture(): string{
    if(this.pictureUploaded){
      return this.newDatas.picture;
    }
    return this.currUser.picture;
  }

  

}
