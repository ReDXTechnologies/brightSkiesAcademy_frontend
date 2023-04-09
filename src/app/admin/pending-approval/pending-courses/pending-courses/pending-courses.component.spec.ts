import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingCoursesComponent } from './pending-courses.component';

describe('CoursefourmainComponent', () => {
  let component: PendingCoursesComponent;
  let fixture: ComponentFixture<PendingCoursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendingCoursesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
