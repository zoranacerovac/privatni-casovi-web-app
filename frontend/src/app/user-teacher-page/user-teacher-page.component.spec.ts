import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTeacherPageComponent } from './user-teacher-page.component';

describe('UserTeacherPageComponent', () => {
  let component: UserTeacherPageComponent;
  let fixture: ComponentFixture<UserTeacherPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserTeacherPageComponent]
    });
    fixture = TestBed.createComponent(UserTeacherPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
