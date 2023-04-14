import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AddLabComponent } from './add-lab.component';

describe('FormDialogComponent', () => {
  let component: AddLabComponent;
  let fixture: ComponentFixture<AddLabComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddLabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
