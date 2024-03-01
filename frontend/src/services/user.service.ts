import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Sub } from 'src/app/models/subject';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getSpecificUser(username: string){
    const data = {
      username : username
    }

    return this.http.post<User>("http://localhost:4000/user/getSpecificUser", data)
  }

  changeDataUser(user: User){
    let data = {
      user: user
    }

    return this.http.post<String>("http://localhost:4000/user/changeDataUser", data)
  }

  getSpecificSubject(grade: string){
    const data = {
      grade: grade
    }
    return this.http.post<Sub[]>("http://localhost:4000/sub/getSpecificSubject", data);
  }
}
