import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MyStudentsComponent } from './my-students.component';

describe('AllStudentsComponent', () => {
  let component: MyStudentsComponent;
  let fixture: ComponentFixture<MyStudentsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MyStudentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
