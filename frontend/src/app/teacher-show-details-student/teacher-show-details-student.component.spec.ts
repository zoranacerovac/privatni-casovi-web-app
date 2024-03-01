import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherShowDetailsStudentComponent } from './teacher-show-details-student.component';

describe('TeacherShowDetailsStudentComponent', () => {
  let component: TeacherShowDetailsStudentComponent;
  let fixture: ComponentFixture<TeacherShowDetailsStudentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TeacherShowDetailsStudentComponent]
    });
    fixture = TestBed.createComponent(TeacherShowDetailsStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
