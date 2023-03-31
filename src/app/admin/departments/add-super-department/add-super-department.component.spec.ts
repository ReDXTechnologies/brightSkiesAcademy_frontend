import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AddSuperDepartmentComponent } from './add-super-department.component';

describe('AddDepartmentComponent', () => {
  let component: AddSuperDepartmentComponent;
  let fixture: ComponentFixture<AddSuperDepartmentComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSuperDepartmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSuperDepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
