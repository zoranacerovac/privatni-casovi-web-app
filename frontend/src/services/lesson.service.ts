import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Lesson } from 'src/app/models/lesson';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class LessonService {

  constructor(private http: HttpClient) { }

  addLesson(lesson: Lesson){
   const data = {
    "name": lesson.subject,
    "studentUsername": lesson.studentUsername,
    "studentFirstname":  lesson.studentFirstname,
    "studentLastname":  lesson.studentLastname,
    "professorUsername":  lesson.studentUsername,
    "professorFirstname": lesson.studentFirstname,
    "professorLastname": lesson.studentLastname,
    "date": "",
    "start": "",
    "end": "",
    "commentStudent": lesson.commentStudent,
    "commentProfessor": "",
    "double": lesson.double,
    "description": "",
    "explanation": "", 
    "confirmation": false
   }

   const data2 = {
    "lesson" : lesson
   }
    return this.http.post<String>("http://localhost:4000/lesson/addLesson", data2);
  }

  getAllFutureLessons(username: string){
    const data = {
     "username": username
    }

     return this.http.post<Lesson[]>("http://localhost:4000/lesson/getAllFutureLessons", data);
   }

   getAllPassLessons(username: string){
    const data = {
     "username": username
    }
    
     return this.http.post<Lesson[]>("http://localhost:4000/lesson/getAllPassLessons", data);
   }

   getLessonRequest(username: string){
    const data = {
     "username": username
    }
     return this.http.post<Lesson[]>("http://localhost:4000/lesson/getLessonRequest", data);
   }

   acceptLesson(id: string){
    const data = {
     "id": id
    }
    console.log("Servis", id)
     return this.http.post<String>("http://localhost:4000/lesson/acceptLesson", data);
   }

   deniedLesson(id: string, description: string){
    const data = {
     "id": id,
     "description": description
    }

     return this.http.post<String>("http://localhost:4000/lesson/deniedLesson", data);
   }

   getFiveLessons(username: string){
    const data = {
     "username": username
    }

     return this.http.post<Lesson[]>("http://localhost:4000/lesson/getFiveLessons", data);
   }

   getMyStudents(username: string){
    const data = {
      "username": username
    }

    return this.http.post<Lesson[]>("http://localhost:4000/lesson/getMyStudents", data);
   }

   //dohvatam casove od specificnog ucenika i nastavnika
   getLessons(studentUsername: string, professorUsername: string){
    const data = {
      "studentUsername" : studentUsername,
      "professorUsername" : professorUsername
    }

    return this.http.post<Lesson[]>("http://localhost:4000/lesson/getLessons", data);
   }

   sendCommentandRating(l: Lesson){
    const data = {
      lesson: l
    }

    return this.http.post<String[]>("http://localhost:4000/lesson/sendCommentandRating", data);
   }

   getLessonForLastWeek(){
    return this.http.get<number>("http://localhost:4000/lesson/getLessonForLastWeek");
   }

   getLessonForLastMonth(){
    return this.http.get<number>("http://localhost:4000/lesson/getLessonForLastMonth");
   }


}
