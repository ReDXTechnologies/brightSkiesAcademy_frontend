import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { PendingEnrollementComponent } from './pending-enrollement.component';
describe('AllstaffComponent', () => {
  let component: PendingEnrollementComponent;
  let fixture: ComponentFixture<PendingEnrollementComponent>;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [PendingEnrollementComponent]
    }).compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(PendingEnrollementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
