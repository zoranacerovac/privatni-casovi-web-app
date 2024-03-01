import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { AdminService } from 'src/services/admin.service';
import Chart from 'chart.js/auto'
import { Professors } from '../models/professor';
import { Lesson } from '../models/lesson';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  pendingUsers: User[] = [];
  showFlag: boolean = false;

  constructor(private servis: AdminService, private router: Router){}

  ngOnInit(): void {
   //list all user requset
   this.servis.getPendingUsers().subscribe((u: User[])=>{
    if (u){
      this.pendingUsers = u;
      this.showFlag = true;
    }
    this.getAllProfessorsAndSubjects();
    this.getAllProfessorsAndGrades();
    this.getAllProfessorsGender();
    this.getAllStudentsGender();
    this.getLessonsPerDays();
     })
  }

  approved(u:User){
    this.servis.approved(u).subscribe((s:String) => {
      if (s){
        this.ngOnInit();
      }
    })

  }

  denied(u: User){
    this.servis.denied(u).subscribe((s:String) => {
      if (s){
        this.ngOnInit();
      }
    })
    
  }

  logout(){
    localStorage.removeItem("currUser");
    this.router.navigate(['']);
  }

  subName: string = "";
  mess: string = "";
  addSub(){
    this.servis.addSub(this.subName).subscribe((str)=>{
      if (str){
        this.mess = "Novi predmet je uspešno dodat."
      }
    })


  }

  acceptSub(){

  }

  //GRAFOVI

  chart: any;
  lineChart: any;
  allProfessorsAndSubjects: any[]=[];
  allProfessorsAndGrades: any[]=[];
  allProfessorsGender: any[]=[];
  allStudentsGender: any[]=[];
  allLessons:any[]=[];

  getAllProfessorsAndSubjects(){
    this.servis.getAllProfessorsAndSubjects().subscribe((u) =>{
      if(u){
        this.allProfessorsAndSubjects = u;
        this.chartAllProfessorsAndSubjects();
      }

    })

  }

  getAllProfessorsAndGrades(){
    this.servis.getAllProfessorsAndGrades().subscribe((u) =>{
        this.allProfessorsAndGrades = u;
         this.chartAllProfessorsAndGrades();
     })
  }

  getAllProfessorsGender(){
    this.servis.getAllProfessorsAndGrades().subscribe((u) =>{
      this.allProfessorsGender = u;
       this.chartAllProfessorsGender();
    })
  }

  getAllStudentsGender(){
    this.servis.getAllStudentsGender().subscribe((u) =>{
      this.allStudentsGender = u;
      this.chartAllStudentsGender();
    })
    
 }

 getLessonsPerDays(){
  this.servis.getAllLessons().subscribe((l) =>{
    this.allLessons = l;
    this.chartLessonsPerDays();
  })
      
 }

  chartAllProfessorsAndSubjects(){
    let data = [];
    this.allProfessorsAndSubjects.forEach(predmet=>{
      data.push({predmet:predmet.name, number:predmet.professors.length})
    });

    const labels = data.map(item => item.predmet);
    const values = data.map(item => item.number);
    // console.log(labels);
    // console.log(values)

    this.chart = new Chart('chartAllProfessorsAndSubjects', {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            data: values,
            label: 'Broj nastavnika po predmetu',
            backgroundColor: 'rgb(69, 71, 75)',
            borderColor: 'rgb(25, 25, 25)',
            borderWidth: 1
          }
        ]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1
            },
          }
        }
      }
    });

  }

  gradesValueProfesor: string[] = ["Osnovna škola 1-4. razred", "Osnovna škola 5-8. razred", "Srednja škola"];
  

  chartAllProfessorsAndGrades(){
    let data = [];
    const labels = this.gradesValueProfesor;
    let values = [0,0,0]
    this.allProfessorsAndGrades.forEach(professor=>{
      professor.grades.forEach(grade=>{
        if (grade == "Osnovna škola 1-4. razred") values[0]++
        if (grade == "Osnovna škola 5-8. razred") values[1]++
        if (grade == "Srednja škola") values[2]++
      })
    });

    // console.log(labels);
    // console.log(values);
    this.chart = new Chart('chartAllProfessorsAndGrades', {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            data: values,
            label: 'Broj nastavnika po uzrastu',
            backgroundColor: 'rgb(69, 71, 75)',
            borderColor: 'rgb(25, 25, 25)',
            borderWidth: 1
          }
        ]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1
            },
          }
        }
      }
    });

  }

  chartAllProfessorsGender(){
    let labels = ["M", "Ž"];
    let values = [0,0];
    this.allProfessorsAndGrades.forEach(professor => {
      if(professor.gender == "M") values[0]++;
      else values[1]++;
    });
    this.chart = new Chart('chartAllProfessorsGender', {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [{
          data: values,
          backgroundColor: [
            'rgb(73, 94, 87)', 
            'rgb(69, 71, 75)'
          ],
          borderColor: 'black', 
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1
            },
            display: false
          }
        }
      }
    });

  }

  chartAllStudentsGender(){
    let labels = ["M", "Ž"];
    let values = [0,0];
    this.allStudentsGender.forEach(student => {
      if(student.gender == "M") values[0]++;
      else values[1]++;
    });

    
    // console.log(labels);
    // console.log(values);
    this.chart = new Chart('chartAllStudentsGender', {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [{
          data: values,
          backgroundColor: [
            'rgb(73, 94, 87)', 
            'rgb(69, 71, 75)'
          ],
          borderColor: 'black', 
          borderWidth: 1
        }]
      }
    });

  }

  chartLessonsPerDays(){
    let labels = ["Nedelja","Ponedaljak", "Utorak", "Sreda", "Četvrtak", "Petak", "Subota"];
    let values = [0,0,0,0,0,0,0];

    let numOfLesson = this.allLessons.length; 
    this.allLessons.forEach(lesson => {
        let day = new Date(lesson.start).getDay();
        values[day]++;
    });
    let newValue = []
    values.forEach(value =>{
      newValue.push(Math.floor(value/numOfLesson * 100))
    })
    
    console.log(labels);
    console.log(newValue);

    this.chart = new Chart('chartLessonsPerDays', {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          data: newValue,
          label: 'Prosečan broj održanih časova',
          backgroundColor: [
            'rgb(73, 94, 87)'
          ],
          borderColor: 'black', 
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

  }


  downloadPdf(cv:string) {
    if (cv) {
      const byteCharacters = atob(cv.split(',')[1]);
      const byteNumbers = new Array(byteCharacters.length);

      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: 'application/pdf' });

      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'cv.pdf';
      link.click();
      URL.revokeObjectURL(url);
    }
  }
}
