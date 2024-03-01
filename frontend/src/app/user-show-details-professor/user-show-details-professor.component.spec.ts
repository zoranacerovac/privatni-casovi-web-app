import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserShowDetailsProfessorComponent } from './user-show-details-professor.component';

describe('UserShowDetailsProfessorComponent', () => {
  let component: UserShowDetailsProfessorComponent;
  let fixture: ComponentFixture<UserShowDetailsProfessorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserShowDetailsProfessorComponent]
    });
    fixture = TestBed.createComponent(UserShowDetailsProfessorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
