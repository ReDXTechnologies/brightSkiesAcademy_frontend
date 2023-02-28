import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursecurriculamComponent } from './coursecurriculam.component';

describe('CoursecurriculamComponent', () => {
  let component: CoursecurriculamComponent;
  let fixture: ComponentFixture<CoursecurriculamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoursecurriculamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursecurriculamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
