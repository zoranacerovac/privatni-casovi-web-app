import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Sub } from 'src/app/models/subject';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { }

  getStudents(){
    return this.http.get<number>("http://localhost:4000/user/getStudents");
  }

  getTeacher(){
    return this.http.get<number>("http://localhost:4000/user/getTeacher");
  }

  getAllSubject(){
    return this.http.get<Sub[]>("http://localhost:4000/sub/getAllSubject");
  }

}
