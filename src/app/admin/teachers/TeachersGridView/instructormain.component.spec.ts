import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructormainComponent } from './instructormain.component';

describe('InstructormainComponent', () => {
  let component: InstructormainComponent;
  let fixture: ComponentFixture<InstructormainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstructormainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InstructormainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
