import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LessonService } from 'src/services/lesson.service';
import { UserService } from 'src/services/user.service';
import { User } from '../models/user';
import { Lesson } from '../models/lesson';

@Component({
  selector: 'app-user-lesson-page',
  templateUrl: './user-lesson-page.component.html',
  styleUrls: ['./user-lesson-page.component.css']
})
export class UserLessonPageComponent  implements OnInit{

  currUser: User = new User();
  allFutureLessons: Lesson[] = [];
  allPastLessons: Lesson[] = [];
  constructor(private servisUser: UserService,private servisLesson: LessonService, private router: Router){}

  ngOnInit(): void {
    let user = localStorage.getItem('currUser');
    if (user){
      this.servisUser.getSpecificUser(user).subscribe((u)=>{
        if (u){
          this.currUser = u;
          this.servisLesson.getAllFutureLessons(u.username).subscribe((l: Lesson[]) => {
            if (l){
              this.allFutureLessons = l;

              this.allFutureLessons.sort((a, b) => {
                  const dateA = new Date(a.date);
                  const dateB = new Date(b.date);
                  
                  // Uporedi datume
                  if (dateA.getTime() !== dateB.getTime()) {
                      return dateA.getTime() - dateB.getTime(); // Sortiraj po datumu
                  } else {
                      // Ako su datumi jednaki, uporedi vreme početka časova
                      const timeA = a.start.getTime();
                      const timeB = b.start.getTime();
                      return timeA - timeB;
                  }
              });


              this.servisLesson.getAllPassLessons(u.username).subscribe((l: Lesson[]) => {
                this.allPastLessons = l;

                this.allPastLessons.sort((a, b) => {
                  const dateA = new Date(a.date);
                  const dateB = new Date(b.date);
                  
                  // Uporedi datume
                  if (dateA.getTime() !== dateB.getTime()) {
                      return dateB.getTime() - dateA.getTime(); // Sortiraj po datumu
                  } else {
                      // Ako su datumi jednaki, uporedi vreme početka časova
                      const timeA = a.start.getTime();
                      const timeB = b.start.getTime();
                      return timeB - timeA;
                  }
              });
              })
            }

          })

        }
      })
    }
  }

  subtractOneHour(time: Date): Date {
    const newTime = new Date(time);
    newTime.setHours(newTime.getHours() - 1);
    return newTime;
}


 
}
