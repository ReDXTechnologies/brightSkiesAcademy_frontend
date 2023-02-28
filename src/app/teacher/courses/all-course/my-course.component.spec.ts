import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MyCourseComponent } from './my-course.component';

describe('AllCourseComponent', () => {
  let component: MyCourseComponent;
  let fixture: ComponentFixture<MyCourseComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MyCourseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
