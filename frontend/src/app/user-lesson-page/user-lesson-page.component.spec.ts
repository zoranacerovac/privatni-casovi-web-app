import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserLessonPageComponent } from './user-lesson-page.component';

describe('UserLessonPageComponent', () => {
  let component: UserLessonPageComponent;
  let fixture: ComponentFixture<UserLessonPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserLessonPageComponent]
    });
    fixture = TestBed.createComponent(UserLessonPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
