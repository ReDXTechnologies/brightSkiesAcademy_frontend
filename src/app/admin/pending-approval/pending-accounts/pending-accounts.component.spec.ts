import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { PendingAccountsComponent } from './pending-accounts.component';
describe('AllstaffComponent', () => {
  let component: PendingAccountsComponent;
  let fixture: ComponentFixture<PendingAccountsComponent>;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [PendingAccountsComponent]
    }).compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(PendingAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
