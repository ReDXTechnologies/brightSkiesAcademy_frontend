import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { PendingHybridProfilesComponent } from './pending-hybrid-profiles.component';
describe('AllstaffComponent', () => {
  let component: PendingHybridProfilesComponent;
  let fixture: ComponentFixture<PendingHybridProfilesComponent>;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [PendingHybridProfilesComponent]
    }).compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(PendingHybridProfilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
