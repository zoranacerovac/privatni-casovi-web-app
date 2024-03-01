import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { TeacherService } from 'src/services/teacher.service';
import { UserService } from 'src/services/user.service';
import { Router } from '@angular/router';
import { LessonService } from 'src/services/lesson.service';
import { Lesson } from '../models/lesson';

@Component({
  selector: 'app-teacher-lessons-page',
  templateUrl: './teacher-lessons-page.component.html',
  styleUrls: ['./teacher-lessons-page.component.css']
})
export class TeacherLessonsPageComponent implements OnInit{

  currUser: User = new User();
  fiveLessons: Lesson[] = [];
  lessons: Lesson[] = [];
  mess: string = "";

  description: string = "";

  constructor(private servis: TeacherService, private servisUser: UserService, private router: Router, private servisLesson: LessonService){}

  ngOnInit(): void {
    let user = localStorage.getItem('currUser');
    if (user){
      this.servisUser.getSpecificUser(user).subscribe((u)=>{
        if (u){
          this.currUser = u;
          this.servisLesson.getLessonRequest(this.currUser.username).subscribe((l: Lesson[]) =>{
            this.lessons = l;
              this.servisLesson.getFiveLessons(this.currUser.username).subscribe((fiveLessons: Lesson[]) =>{
                if (fiveLessons){
                  this.fiveLessons = fiveLessons;
                }
              })
          })
        }
      })
    }
  }

  acceptLesson(l: Lesson){
    this.servisLesson.acceptLesson(l._id).subscribe((l: String) =>{
      if (l){
        this.ngOnInit();
      }
        
    })

  }
 
  deniedLesson(l: Lesson){
    if (l.description == "") {
      l.mess = "Morate napisati obrazloženje pre nego što odbijete čas."
    }else{
      l.mess = "";
      this.servisLesson.deniedLesson(l._id, l.description).subscribe((str: String) =>{
        if(str){
          this.ngOnInit();
        }
      })
    }
    

  }

}
