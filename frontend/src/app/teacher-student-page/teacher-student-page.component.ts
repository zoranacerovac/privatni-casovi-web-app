import { Component } from '@angular/core';
import { User } from '../models/user';
import { TeacherService } from 'src/services/teacher.service';
import { UserService } from 'src/services/user.service';
import { Router } from '@angular/router';
import { LessonService } from 'src/services/lesson.service';
import { Lesson } from '../models/lesson';

@Component({
  selector: 'app-teacher-student-page',
  templateUrl: './teacher-student-page.component.html',
  styleUrls: ['./teacher-student-page.component.css']
})
export class TeacherStudentPageComponent {

  currUser: User = new User();
  myStudents: Lesson[] = []; //casovi koje je odrzao profesor, fitrirano da ne postoji vise casova za ucenika. Da bih pokupila sve username za razlicite ucenike kome je odrzao casove.
  tableFlag: boolean = false;

  constructor(private servis: TeacherService, private servisUser: UserService, private router: Router, private servisLesson: LessonService){}

  ngOnInit(): void {
    let user = localStorage.getItem('currUser');
    if (user){
      this.servisUser.getSpecificUser(user).subscribe((u)=>{
        if (u){
          this.currUser = u;
          this.servisLesson.getMyStudents(this.currUser.username).subscribe((u: Lesson[])=>{
            if(u){
              this.myStudents = u;
              console.log(u)
              if(u.length != 0 )
                this.tableFlag = true;
            }
          })
        }
      })
    }
  }

  showstudentDetail(username: string){
    localStorage.setItem("currStudent", username);
    localStorage.setItem("currprofessor", this.currUser.username);
  }
}
