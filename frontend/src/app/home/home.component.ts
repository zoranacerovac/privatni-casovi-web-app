import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from 'src/services/home.service';
import { Sub } from '../models/subject';
import { LessonService } from 'src/services/lesson.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  constructor(private servis: HomeService, private router: Router, private servisLesson: LessonService){}

  allSub: Sub[] = [];
  numStudent: number = 0;
  numTeacher: number = 0;
  lastWeek: number = 0;
  lastMonth: number = 0;

  ngOnInit(): void {
    if (!this.sort){
      this.servis.getStudents().subscribe((students) =>{
        if(students){
          this.numStudent = students;
        }
        this.servis.getTeacher().subscribe((teachers) =>{
          if(teachers){
            this.numTeacher = teachers;
          }
          this.servis.getAllSubject().subscribe((subj) =>{
            if (subj){
              this.allSub = subj;
              console.log(this.allSub)
              this.servisLesson.getLessonForLastMonth().subscribe((num:number) =>{
                this.lastMonth = num;
                this.servisLesson.getLessonForLastWeek().subscribe((num:number) =>{
                  this.lastWeek = num;
                })
              })
            }
          })
        })
      })
    }  
  }

  all(){
    this.searchBySubjectName = "";
    this.searchByFirstname = "";
    this.searchByLastname = "";

    this.sort = false;
    this.ngOnInit();
  }

  sort: boolean = false;
  sortBySubjectName(){
    this.allSub.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
    this.sort = true;
    this.ngOnInit();
  }

  sortProfessorsByFirstname(){
    this.allSub.forEach(sub => {
      sub.professors.sort((a, b) => {
        if (a.firstname < b.firstname) {
          return -1;
        }
        if (a.firstname > b.firstname) {
          return 1;
        }
        return 0;
      });
    });

    this.sort = true;
    this.ngOnInit();
    
  }

  sortProfessorsByLastname(){
    this.allSub.forEach(sub => {
      sub.professors.sort((a, b) => {
        if (a.lastname < b.lastname) {
          return -1;
        }
        if (a.lastname > b.lastname) {
          return 1;
        }
        return 0;
      });
    });

    this.sort = true;
    this.ngOnInit();
  }


  searchBySubjectName: string = "";
  searchByFirstname: string = "";
  searchByLastname: string = "";

  search() {
    const subjectName = this.searchBySubjectName ? this.searchBySubjectName.toLowerCase() : '';
    const firstname = this.searchByFirstname ? this.searchByFirstname.toLowerCase() : '';
    const lastname = this.searchByLastname ? this.searchByLastname.toLowerCase() : '';

    let filteredSub = this.allSub;
    if(this.searchBySubjectName == ""){
      //samo ime i/ili prezime 
      console.log("bez predmeta", filteredSub, firstname);
      filteredSub.forEach(sub => {
        sub.professors = sub.professors.filter(professor => {
          let profFirstnameMatch = false;
          let profLastnameMatch = false;
          if (firstname != "") {
            profFirstnameMatch = professor.firstname.toLowerCase().includes(firstname);
          }
          if (lastname != "") {
            profLastnameMatch = professor.lastname.toLowerCase().includes(lastname);
          }
          //izbacuje sve profesore koji ne zadovoljavaju uslov, ali ne i predmete
          return profFirstnameMatch || profLastnameMatch;
        });
      });
      //izbaci predmete
      filteredSub.forEach(sub => {
        filteredSub = filteredSub.filter(sub => sub.professors.length != 0);
      });

    }else{
      console.log(filteredSub);
      //sigurno pretraga predmeta
      filteredSub = filteredSub.filter(sub => sub.name.toLowerCase().includes(subjectName));
      if ( firstname != "" || lastname != ""){
        filteredSub.forEach(sub => {
          sub.professors = sub.professors.filter(professor => {
            let profFirstnameMatch = false;
            let profLastnameMatch = false;
            if (firstname != "") {
              profFirstnameMatch = professor.firstname.toLowerCase().includes(firstname);
            }
            if (lastname != "") {
              profLastnameMatch = professor.lastname.toLowerCase().includes(lastname);
            }
            //izbacuje sve profesore koji ne zadovoljavaju uslov, ali ne i predmete
            return profFirstnameMatch || profLastnameMatch;
          });
        });
      }
    }

    this.allSub = filteredSub;
    this.sort = true;
    this.ngOnInit();
  }





}
