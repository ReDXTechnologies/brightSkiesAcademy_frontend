import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AddNewModule } from './add-new-module.component';

describe('FormDialogComponent', () => {
  let component: AddNewModule;
  let fixture: ComponentFixture<AddNewModule>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewModule);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
