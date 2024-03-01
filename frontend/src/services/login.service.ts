import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Sub } from 'src/app/models/subject';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(username: string, password: string){

    const data={
      username: username,
      password: password
    }
    return this.http.post<User>("http://localhost:4000/user/login", data)
  }

  getAllSubjects(){
    return this.http.get<Sub[]>("http://localhost:4000/user/getAllSubjects")
  }

  register(username: string, password: string, firstname: string, lastname:string,
    gender:string, addres:string, phone:string, email:string, picture:string,
    isStudent:string, school:string, grade:string, isProfesor:string,
    status:string, cv:string, subjects: string[], subjectsAdd:string, grades: string[], comment:string ){

    const data = {
      username: username,
      password: password,
      firstname: firstname,
      lastname: lastname,
      gender: gender,
      addres: addres,
      phone: phone,
      email: email,
      picture: picture,
      isStudent: isStudent,
      school: school,
      grade: grade,
      isProfesor: isProfesor,
      status: status,
      cv: cv,
      subjects: subjects,
      subjectsAdd: subjectsAdd,
      grades: grades,
      comment:comment
    }

    //console.log(subjects);

    return this.http.post<String>("http://localhost:4000/user/register", data)
  }

  changePassword(username:string, oldPass: string, newPass:string){
    const data = {
      username: username,
      oldPass: oldPass,
      newPass: newPass
    };

    return this.http.post<string>("http://localhost:4000/user/changePassword", data)
  }
  
}
