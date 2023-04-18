import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { StartQuizzComponent } from './start-quizz.component';

describe('FormDialogComponent', () => {
  let component: StartQuizzComponent;
  let fixture: ComponentFixture<StartQuizzComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ StartQuizzComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartQuizzComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
