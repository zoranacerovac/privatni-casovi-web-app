import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/services/login.service';
import { Sub } from '../models/subject';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit{

  subjectsFromDB: Sub [] = [];
  gradesValueProfesor: string[] = ["Osnovna škola 1-4. razred", "Osnovna škola 5-8. razred", "Srednja škola"];
  schoolValueStudent: string[] = ["osnovna", "srednja-gimnazija", "srednja-stručna",  "srednja-umetnička"];
  grade1: string[] = ["1","2","3","4","5","6","7","8"];
  grade2: string[] = ["1","2","3","4"];

  constructor(private servis: LoginService, private router: Router){}

  ngOnInit(): void {
    this.servis.getAllSubjects().subscribe((sub: Sub[])=>{
      if(sub){
        this.subjectsFromDB = sub;
      }
    })
  }

  username: string = "";
  password: string = "";
  firstname: string = "";
  lastname: string = "";
  gender: string = "";
  addres: string = "";
  phone: string = "";
  email: string = "";
  picture: any = "";

  isStudent: boolean = false;
  school: string = "";
  grade: string = "";

  isProfesor: boolean = false;
  status: string = "";
  cv: any = "";
  subjects: string[] = [];
  subjectsAdd: string = "";
  grades: string[] = [];
  comment: string = "";

  mess: string = "";

  profesor(){
    this.isStudent = false;
    this.isProfesor = true;
    this.mess = "";
  }

  student(){
    this.isProfesor = false;
    this.isStudent = true;
    this.mess = "";
  }

  chooseGradeScale(){
    if (this.school == "osnovna"){
      return this.grade1;
    }else{
      return this.grade2;
    }
  }
  

  register(){
   // console.log(this.subjects);
    if(this.checkInput()){

      if(this.isProfesor == true){
        //this.status = "pending";
        this.servis.register(this.username,this.password,this.firstname,this.lastname,
          this.gender,this.addres,this.phone,this.email,this.picture,"false",this.school,
          this.grade, "true", "pending", this.cv,this.subjects,this.subjectsAdd, this.grades, this.comment)
          .subscribe((str:String)=>{
            if (str == "OK") this.mess = "Uspesno ste registrovali."
            if (str == "username") this.mess = "Korisnicko ime je blokirano."
            if (str == "email") this.mess = "Mejl adresa je blokirana."
            if (str == "exist") this.mess = "Izaberite drugo korisnicko ime. Mora biti jedinstveno."
            console.log(str);
          })
      }else{
        this.servis.register(this.username,this.password,this.firstname,this.lastname,
          this.gender,this.addres,this.phone,this.email,this.picture,"true",this.school,
          this.grade, "false", "", this.cv,this.subjects,this.subjectsAdd, this.grades, this.comment)
          .subscribe((str:String)=>{
            if (str == "OK") this.mess = "Uspesno ste registrovali."
            if (str == "username") this.mess = "Korisnicko ime je blokirano."
            if (str == "email") this.mess = "Mejl adresa je blokirana."
            if (str == "exist") this.mess = "Izaberite drugo korisnicko ime. Mora biti jedinstveno."
            console.log(str);
          })
      }
      this.username= "";
      this.password= "";
      this.firstname = "";
      this.lastname= "";
      this.gender = "";
      this.addres= "";
      this.phone = "";
      this.email = "";
      this.picture= "";
    
     // this.isStudent = false;
      this.school ="";
      this.grade= "";
    
      //this.isProfesor = false;
      this.status = "";
      this.cv= "";
      this.subjects = [];
      this.subjectsAdd= "";
      this.grades = [];
      this.comment = "";

     this.pictureUploaded = "";
     this.cvUploaded = "";
    }
  }


  checkInput(): boolean{
    if(this.username == ""){
      this.mess = "Niste popunili polje koriscko ime."
      return false;
    }

    if(this.password == ""){
      this.mess = "Niste popunili polje lozinka."
      return false;
    }

    // const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z].*[a-z].*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z]\w{5,9}$/;
    // if (!passwordRegex.test(this.password)) {
    //   this.mess = "Lozinka mora da sadrži jedno veliko slovo,tri mala, jedan broj, jedan spec karakter i mora počinjati slovom."
    //   return true;
    // }

    if(this.firstname == ""){
      this.mess = "Unesite ime."
      return false;
    }

    if(this.lastname == ""){
      this.mess = "Unesite prezime."
      return false;
    }

    if(this.gender == ""){
      this.mess = "Unesite pol."
      return false;
    }

    if(this.addres == ""){
      this.mess = "Unesite adresu."
      return false;
    }

    if(this.phone == ""){
      this.mess = "Unesite broj telefona."
      return false;
    }

    // const phoneRegex = /^\+\d{10,12}$/;
    // if (!phoneRegex.test(this.phone)) {
    //   this.mess = "Unesite ispravan format +..."
    //   return true;
    // }

    if(this.email == ""){
      this.mess = "Unesite e-mail adresu."
      return false;
    }

    const emailRegex = /^[a-zA-Z][a-zA-Z0-9]*(?:[.][a-zA-Z0-9]+)*@gmail\.com$/;
    if (!emailRegex.test(this.email)) {
      this.mess = "Unesite e-mail u ispravnom formatu."
      return true;
    }

    if(this.picture == ""){
      this.picture = "../../assets/avatar.jpg";
      return false;
    }

    if(this.isProfesor == true){
      //Profesor registration
      if (this.cv == ""){
        this.mess = "Morate priložiti CV datoteku."
        return false;
      }
      if (this.subjects.length == 0){
        this.mess = "Izaberite predmet."
        return false;
      }
      if (this.grades.length == 0){
        this.mess = "Izaberite uzrast."
        return false;
      }
      if (this.comment == ""){
        this.mess = "Unesite komentar."
        return false;
      }
      return true;
    }else{
      //Sttudent registration
      if (this.school == ""){
        this.mess = "Unesite skolu."
        return false;
      }
      if (this.grade == ""){
        this.mess = "Unesite razred."
        return false;
      }
      return true;
    }
  }

  pictureUploaded: string = "";
  onFileChange(event: any) {
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
            // this.picture = "../../assets/avataar.jpg";
            this.mess = "Slika mora da bude veličine između 100x100 i 300x300 piksela."
          }
          else {
            this.picture = reader.result;
            this.pictureUploaded = "Slika je uspesno dodata.";
            this.mess = ""
          }
        };

      };

    }
  }

  cvUploaded: string = "";

//   onPdfChange(event: any) {
//     const file = event.target.files[0];
    
//     if (file && file.type === 'application/pdf') {
//         const reader = new FileReader();
//         reader.readAsDataURL(file);
        
//         reader.onload = () => {
//             this.cv = reader.result as string;
//             this.cvUploaded = "CV je uspešno dodat.";
//         };
//     } else {
//         this.cvUploaded = "";
//     }
// }
onPdfChange(event: any) {
  const file = event.target.files[0];
  if (file && file.type === 'application/pdf') {
    const reader = new FileReader();

    reader.onload = () => {
      const base64String = reader.result as string;
      this.cv = base64String;
      this.cvUploaded = "CV je uspešno dodat.";
    };
    reader.readAsDataURL(file);
  }else{
    this.cvUploaded = "";
  } 
}


}
