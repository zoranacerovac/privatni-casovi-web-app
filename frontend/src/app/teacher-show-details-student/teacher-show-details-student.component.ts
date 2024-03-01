import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { TeacherService } from 'src/services/teacher.service';
import { UserService } from 'src/services/user.service';
import { Router } from '@angular/router';
import { LessonService } from 'src/services/lesson.service';
import { Lesson } from '../models/lesson';

@Component({
  selector: 'app-teacher-show-details-student',
  templateUrl: './teacher-show-details-student.component.html',
  styleUrls: ['./teacher-show-details-student.component.css']
})
export class TeacherShowDetailsStudentComponent implements OnInit{

  currStudent: User = new User();
  currProfessor: User = new User();
  allLessons: Lesson[] = [];
  mess: string= "";

  constructor(private servis: TeacherService, private servisUser: UserService, private router: Router, private servisLesson: LessonService){}

  ngOnInit(): void {
    let user = localStorage.getItem('currStudent');
    if (user){
      this.servisUser.getSpecificUser(user).subscribe((u)=>{
        if (u){
          this.currStudent = u;
          let user = localStorage.getItem('currprofessor');
          if (user){
            this.servisUser.getSpecificUser(user).subscribe((u)=>{
              if (u){
                this.currProfessor = u;
                this.servisLesson.getLessons(this.currStudent.username, this.currProfessor.username).subscribe((l: Lesson[]) =>{
                  if (l){
                    console.log(l)
                    this.allLessons = l;
                  }
                })
              }
            })
          }
        }
      })
    }
  }

  sendCommentandRating(l:Lesson){
    l.mess="";
    if(l.rating == 0 || l.commentProfessor== ""){
      l.mess = "Niste uneli vaše utiske."
    }else{
      if(l.rating <1 || l.rating > 5){
        l.mess = "Ocena mora biti od 1 do 5."
      }else {
        this.servisLesson.sendCommentandRating(l).subscribe((str) =>{
          if (str){
            l.mess = "Uspešno ste uneli utiske nakon časa."
          }
        })
      }

    }
   
  }

  subtractOneHour(time: Date): Date {
    const newTime = new Date(time);
    newTime.setHours(newTime.getHours() - 1);
    return newTime;
}

checkIfRatingSent(l: Lesson): boolean{
  if(l.rating != 0 && l.commentProfessor != "") return false
  return true;

}

}
