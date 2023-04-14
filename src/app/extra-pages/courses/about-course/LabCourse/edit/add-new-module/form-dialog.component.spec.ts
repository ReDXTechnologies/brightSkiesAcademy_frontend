import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EditCourseModuleComponent } from './add-new-module.component';

describe('FormDialogComponent', () => {
  let component: EditCourseModuleComponent;
  let fixture: ComponentFixture<EditCourseModuleComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCourseModuleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCourseModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
