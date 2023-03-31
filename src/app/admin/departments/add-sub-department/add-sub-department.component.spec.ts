import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AddSubDepartmentComponent } from './add-sub-department.component';

describe('AddDepartmentComponent', () => {
  let component: AddSubDepartmentComponent;
  let fixture: ComponentFixture<AddSubDepartmentComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSubDepartmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSubDepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
