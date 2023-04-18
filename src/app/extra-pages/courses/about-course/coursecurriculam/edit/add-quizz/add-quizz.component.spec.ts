import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AddQuizzComponent } from './add-quizz.component';

describe('FormDialogComponent', () => {
  let component: AddQuizzComponent;
  let fixture: ComponentFixture<AddQuizzComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddQuizzComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddQuizzComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
