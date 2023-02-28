import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorpromainComponent } from './instructorpromain.component';

describe('InstructorpromainComponent', () => {
  let component: InstructorpromainComponent;
  let fixture: ComponentFixture<InstructorpromainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstructorpromainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InstructorpromainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
