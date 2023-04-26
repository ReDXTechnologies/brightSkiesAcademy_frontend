import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RejectionEmail } from './rejection-email';

describe('DeleteComponent', () => {
  let component: RejectionEmail;
  let fixture: ComponentFixture<RejectionEmail>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RejectionEmail ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RejectionEmail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
