import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursereviewComponent } from './coursereview.component';

describe('CoursereviewComponent', () => {
  let component: CoursereviewComponent;
  let fixture: ComponentFixture<CoursereviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoursereviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursereviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
