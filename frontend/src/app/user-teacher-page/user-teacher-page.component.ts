import { Component, OnInit } from '@angular/core';
import { Sub } from '../models/subject';
import { HomeService } from 'src/services/home.service';
import { Router } from '@angular/router';
import { UserService } from 'src/services/user.service';
import { User } from '../models/user';

@Component({
  selector: 'app-user-teacher-page',
  templateUrl: './user-teacher-page.component.html',
  styleUrls: ['./user-teacher-page.component.css']
})
export class UserTeacherPageComponent implements OnInit {

  constructor(private servis: UserService, private router: Router){}

  searchFlag: boolean = false;
  searchBySubjectName: string = "";
  searchByFirstname: string = "";
  searchByLastname: string = "";
  allSub: Sub[] = [];
  currUser: User = new User();

  gradesValueProfesor: string[] = ["Osnovna škola 1-4. razred", "Osnovna škola 5-8. razred", "Srednja škola"];
  schoolValueStudent: string[] = ["osnovna", "srednja-gimnazija", "srednja-stručna",  "srednja-umetnička"];
  grade1: string[] = ["1","2","3","4","5","6","7","8"];
  grade2: string[] = ["1","2","3","4"];

  ngOnInit(): void {
    if (!this.searchFlag){
      let user = localStorage.getItem('currUser');
      if (user){
        this.servis.getSpecificUser(user).subscribe((u)=>{
          if (u){
            this.currUser = u;
            let grades = this.findGrades(this.currUser.grade, this.currUser.school);
            console.log(grades);
            this.servis.getSpecificSubject(grades).subscribe((subj) =>{
              if (subj){
                
                this.allSub = subj;
                console.log(this.allSub)
              }
            })
          }
        })
      } 
    }  
  }

  findGrades(grade: string, school: string): string{
    if (grade == "1" && school == "osnovna"){
      return "Osnovna škola 1-4. razred";
    }
    if (grade == "2" && school == "osnovna"){
      return "Osnovna škola 1-4. razred";
    }
    if (grade == "3" && school == "osnovna"){
      return "Osnovna škola 1-4. razred";
    }
    if (grade == "4" && school == "osnovna"){
      return "Osnovna škola 1-4. razred";
    }
    if (grade == "5" && school == "osnovna"){
      return "Osnovna škola 5-8. razred";
    }
    if (grade == "6" && school == "osnovna"){
      return "Osnovna škola 5-8. razred";
    }
    if (grade == "7" && school == "osnovna"){
      return "Osnovna škola 5-8. razred";
    }
    if (grade == "8" && school == "osnovna"){
      return "Osnovna škola 5-8. razred";
    }
    
    //Ako niije ispunjen nijedan gorji uslov, onda je u pitanju srednja skola.
    return "Srednja škola";

  }

  all(){
    this.searchBySubjectName = "";
    this.searchByFirstname = "";
    this.searchByLastname = "";

    this.searchFlag = false;
    this.ngOnInit();
  }

  showProfessorDetails(username: String){
    localStorage.setItem("prof", username.toLowerCase() );
  }

  search() {
    const subjectName = this.searchBySubjectName ? this.searchBySubjectName.toLowerCase() : '';
    const firstname = this.searchByFirstname ? this.searchByFirstname.toLowerCase() : '';
    const lastname = this.searchByLastname ? this.searchByLastname.toLowerCase() : '';

    let filteredSub = this.allSub;
    if(this.searchBySubjectName == ""){
      //samo ime i/ili prezime 
      console.log("bez predmeta", filteredSub, firstname);
      filteredSub.forEach(sub => {
        sub.professors = sub.professors.filter(professor => {
          let profFirstnameMatch = false;
          let profLastnameMatch = false;
          if (firstname != "") {
            profFirstnameMatch = professor.firstname.toLowerCase().includes(firstname);
          }
          if (lastname != "") {
            profLastnameMatch = professor.lastname.toLowerCase().includes(lastname);
          }
          //izbacuje sve profesore koji ne zadovoljavaju uslov, ali ne i predmete
          return profFirstnameMatch || profLastnameMatch;
        });
      });
      //izbaci predmete
      filteredSub.forEach(sub => {
        filteredSub = filteredSub.filter(sub => sub.professors.length != 0);
      });

    }else{
      console.log(filteredSub);
      //sigurno pretraga predmeta
      filteredSub = filteredSub.filter(sub => sub.name.toLowerCase().includes(subjectName));
      if ( firstname != "" || lastname != ""){
        filteredSub.forEach(sub => {
          sub.professors = sub.professors.filter(professor => {
            let profFirstnameMatch = false;
            let profLastnameMatch = false;
            if (firstname != "") {
              profFirstnameMatch = professor.firstname.toLowerCase().includes(firstname);
            }
            if (lastname != "") {
              profLastnameMatch = professor.lastname.toLowerCase().includes(lastname);
            }
            //izbacuje sve profesore koji ne zadovoljavaju uslov, ali ne i predmete
            return profFirstnameMatch || profLastnameMatch;
          });
        });
      }
    }

    this.allSub = filteredSub;
    this.searchFlag = true;
    this.ngOnInit();
  }

}
