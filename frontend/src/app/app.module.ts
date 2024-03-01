import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { TeacherComponent } from './teacher/teacher.component';
import { UserComponent } from './user/user.component';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { HomeComponent } from './home/home.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { UserTeacherPageComponent } from './user-teacher-page/user-teacher-page.component';
import { UserLessonPageComponent } from './user-lesson-page/user-lesson-page.component';
import { TeacherLessonsPageComponent } from './teacher-lessons-page/teacher-lessons-page.component';
import { TeacherStudentPageComponent } from './teacher-student-page/teacher-student-page.component';
import { UserShowDetailsProfessorComponent } from './user-show-details-professor/user-show-details-professor.component';
import { TeacherShowDetailsStudentComponent } from './teacher-show-details-student/teacher-show-details-student.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    LoginComponent,
    RegistrationComponent,
    TeacherComponent,
    UserComponent,
    AdminLoginComponent,
    HomeComponent,
    ChangePasswordComponent,
    UserTeacherPageComponent,
    UserLessonPageComponent,
    TeacherLessonsPageComponent,
    TeacherStudentPageComponent,
    UserShowDetailsProfessorComponent,
    TeacherShowDetailsStudentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
