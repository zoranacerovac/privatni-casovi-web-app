import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  constructor(private http: HttpClient) { }

  changeDataProfessor(user: User){
    let data = {
      user: user
    }

    return this.http.post<String>("http://localhost:4000/user/changeDataProfessor", data)
  }
  
}
