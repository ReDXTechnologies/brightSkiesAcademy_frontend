import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Reset_passwordComponent } from './reset_password.component';
describe('LockedComponent', () => {
  let component: Reset_passwordComponent;
  let fixture: ComponentFixture<Reset_passwordComponent>;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [Reset_passwordComponent]
    }).compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(Reset_passwordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
