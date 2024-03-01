import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from 'src/services/user.service';
import { Router } from '@angular/router';
import { Lesson } from '../models/lesson';
import { LessonService } from 'src/services/lesson.service';

@Component({
  selector: 'app-user-show-details-professor',
  templateUrl: './user-show-details-professor.component.html',
  styleUrls: ['./user-show-details-professor.component.css']
})
export class UserShowDetailsProfessorComponent implements OnInit {

  currUser: User = new User();
  currProfessor: User = new User();
  mess: string = "";
  newLesson: Lesson = new Lesson();
  
  constructor(private servisUser: UserService,private servisLesson: LessonService, private router: Router){}

  ngOnInit(): void {
    let user = localStorage.getItem('currUser');
    if (user){
      this.servisUser.getSpecificUser(user).subscribe((u)=>{
        if (u){
          this.currUser = u;
          console.log(u);
          let professor = localStorage.getItem('prof');
          if (professor){
            this.servisUser.getSpecificUser(professor).subscribe((p)=>{
              this.currProfessor = p;
              console.log(p);
            });
          }
        }
      })
    } 
  }

  reserveLesson(){
    let today = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000);
    if (new Date(this.newLesson.date) < today){
      this.mess = "Nije ispravno unet datum."
    }else{
      if (this.currProfessor.subjects.length === 1) {
        this.newLesson.subject = this.currProfessor.subjects[0];
      }

      if ( this.newLesson.subject == "" || this.newLesson.date == "" || this.newLesson.commentStudent == ""){
        this.mess = "Popunite sva polja kako biste zakazali čas."
      } else {
        this.newLesson.studentUsername = this.currUser.username;
        this.newLesson.studentFirstname = this.currUser.firstname;
        this.newLesson.studentLastname = this.currUser.lastname;

        this.newLesson.professorUsername = this.currProfessor.username;
        this.newLesson.professorFirstname = this.currProfessor.firstname;
        this.newLesson.professorLastname = this.currProfessor.lastname;

        // console.log(this.newLesson);
        this.servisLesson.addLesson(this.newLesson).subscribe((str) =>{
          if (str){
            this.mess = str.toLowerCase();
            this.newLesson = new Lesson();
          }

        })
      }
    }

  }


}
