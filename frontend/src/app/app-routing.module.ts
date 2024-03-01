import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { UserComponent } from './user/user.component';
import { TeacherComponent } from './teacher/teacher.component';
import { AdminComponent } from './admin/admin.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { HomeComponent } from './home/home.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { UserTeacherPageComponent } from './user-teacher-page/user-teacher-page.component';
import { UserLessonPageComponent } from './user-lesson-page/user-lesson-page.component';
import { TeacherLessonsPageComponent } from './teacher-lessons-page/teacher-lessons-page.component';
import { TeacherStudentPageComponent } from './teacher-student-page/teacher-student-page.component';
import { UserShowDetailsProfessorComponent } from './user-show-details-professor/user-show-details-professor.component';
import { TeacherShowDetailsStudentComponent } from './teacher-show-details-student/teacher-show-details-student.component';

const routes: Routes = [
  {path: "login", component: LoginComponent},
  {path: "reg", component: RegistrationComponent}, //reg
  {path: "user", component: UserComponent},
  {path: "profesor", component: TeacherComponent},
  {path: "admin", component: AdminComponent},
  {path: "adminLogin", component: AdminLoginComponent},
  {path: "", component: HomeComponent},
  {path: "changePass", component: ChangePasswordComponent},
  {path: "user/profesors", component: UserTeacherPageComponent},
  {path: "user/lessons", component: UserLessonPageComponent},
  {path: "profesor/user", component: TeacherLessonsPageComponent},
  {path: "profesor/lessons", component: TeacherStudentPageComponent},
  {path: "user/professorDetails", component: UserShowDetailsProfessorComponent},
  {path: "profesor/studentDetail", component: TeacherShowDetailsStudentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
