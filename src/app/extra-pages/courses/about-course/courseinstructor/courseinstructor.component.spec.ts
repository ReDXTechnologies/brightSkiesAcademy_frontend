import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseinstructorComponent } from './courseinstructor.component';

describe('CourseinstructorComponent', () => {
  let component: CourseinstructorComponent;
  let fixture: ComponentFixture<CourseinstructorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseinstructorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseinstructorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
