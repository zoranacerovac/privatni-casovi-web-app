import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TeacherService } from 'src/services/teacher.service';
import { User } from '../models/user';
import { UserService } from 'src/services/user.service';
import { Sub } from '../models/subject';
import { LoginService } from 'src/services/login.service';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent implements OnInit {

  //loginservis je potreban za dovlacenje svih predmeta iz baze
  //treba da razmislis da li ces da menjas sa jednim pozivom sa fronta i student ai iprofesora ili treba da razdvojis, trenutno ti ne radi jer je back podesen za studenta a na frontu si samo ovde izmenila podatke pri pozivu funkcije servisa za profesora sto ne moze tako mozda bolje sve da prekopiras i ponovo napises lakse(kao sto je bilo za studenta da uradi sve isto za profesora)
  // i dodatno za profesora kad m]enjas predmete moras da izmenis i u bazi sa predmeti da bi imala ispravnu evidenciju
  //jasn ima vise predmeta u list nego u predmetima zato sto sam ja rucno dodavala pa sam nesto zaboravilac :)
  constructor(private servis: TeacherService, private servisUser: UserService, private servisLogin: LoginService, private router: Router){}

  gradesValueProfesor: string[] = ["Osnovna škola 1-4. razred", "Osnovna škola 5-8. razred", "Srednja škola"];

  subjectsFromDB: Sub [] = []; 
  newDatas: User = new User();
  currUser: User = new User();
  changeData: boolean = false;
  mess: string = "";

  ngOnInit(): void {
    let user = localStorage.getItem('currUser');
    if (user){
      this.servisUser.getSpecificUser(user).subscribe((u)=>{
        if (u){
          //console.log(u);
          this.currUser = u;
        }
        this.servisLogin.getAllSubjects().subscribe((sub: Sub[])=>{
          if(sub){
            this.subjectsFromDB = sub;
          }
        })
      })
    }

  }

  saveChanges(){
    if( this.newDatas.firstname == "" && this.newDatas.lastname == "" && this.newDatas.addres == "" && this.newDatas.email == ""
    && this.newDatas.phone == "" && this.newDatas.subjects.length == 0 && this.newDatas.grades.length == 0 && this.newDatas.picture == ""){
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
            if (this.newDatas.grades.length != 0){
              this.currUser.grades = this.newDatas.grades;
            }
            if (this.newDatas.subjects.length != 0){
              this.currUser.subjects = this.newDatas.subjects;
            }
            if (this.newDatas.picture != ""){
              this.currUser.picture = this.newDatas.picture;
            }
            this.servis.changeDataProfessor(this.currUser).subscribe((s: String)=>{
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

  downloadPdf(cv:string) {
    if (cv) {
      const byteCharacters = atob(cv.split(',')[1]);
      const byteNumbers = new Array(byteCharacters.length);

      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: 'application/pdf' });

      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'cv.pdf';
      link.click();
      URL.revokeObjectURL(url);
    }
  }
}

