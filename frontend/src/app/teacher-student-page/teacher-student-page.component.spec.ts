import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherStudentPageComponent } from './teacher-student-page.component';

describe('TeacherStudentPageComponent', () => {
  let component: TeacherStudentPageComponent;
  let fixture: ComponentFixture<TeacherStudentPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TeacherStudentPageComponent]
    });
    fixture = TestBed.createComponent(TeacherStudentPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
