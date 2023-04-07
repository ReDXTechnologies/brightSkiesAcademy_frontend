import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HeadDepProfileComponent } from './head-dep-profile.component';
describe('ProfileComponent', () => {
  let component: HeadDepProfileComponent;
  let fixture: ComponentFixture<HeadDepProfileComponent>;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [HeadDepProfileComponent]
    }).compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(HeadDepProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
