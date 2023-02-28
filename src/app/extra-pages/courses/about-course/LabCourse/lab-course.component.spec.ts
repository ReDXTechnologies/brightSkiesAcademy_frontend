import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LabCourseComponent } from './lab-course.component';

describe('AboutCourseComponent', () => {
  let component: LabCourseComponent;
  let fixture: ComponentFixture<LabCourseComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LabCourseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
