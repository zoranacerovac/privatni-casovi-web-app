import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Lesson } from 'src/app/models/lesson';
import { Sub } from 'src/app/models/subject';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  login(username: string, password: string){
    const data={
      username: username,
      password: password
    }
    
    return this.http.post<User>("http://localhost:4000/admin/login", data)
  }

  getPendingUsers(){
    return this.http.get<User[]>("http://localhost:4000/admin/getPendingUsers")
  }

  approved(u:User){
    const data = {
      username : u.username
    }
    return this.http.post<String>("http://localhost:4000/admin/approved", data)
  }

  denied(u:User){
    const data = {
      username : u.username
    }
    return this.http.post<String>("http://localhost:4000/admin/denied", data)
  }

  addSub(name: string){
    const data = {
      name: name
    }
    return this.http.post<String>("http://localhost:4000/admin/addSub", data)
  }
  
  //GRAFOVI

  //dohvata sve predmete iz baze
  getAllProfessorsAndSubjects(){
    return this.http.get<Sub[]>("http://localhost:4000/admin/getAllProfessorsAndSubjects")
  }
  //DOhvata sve usere koji su aktivni nastavnici
  getAllProfessorsAndGrades(){
    return this.http.get<User[]>("http://localhost:4000/admin/getAllProfessorsAndGrades")
  }

  //Gornja fja dohvata sve ovo isto
  // getAllProfessorsGender(){
  //   return this.http.get<User[]>("http://localhost:4000/admin/getAllProfessorsGender")
  // }

  //Dohvata sve studente
   getAllStudentsGender(){
    return this.http.get<User[]>("http://localhost:4000/admin/getAllStudentsGender")
  }

  getAllLessons(){
    return this.http.get<Lesson[]>("http://localhost:4000/admin/getAllLessons")

  }

  
}
