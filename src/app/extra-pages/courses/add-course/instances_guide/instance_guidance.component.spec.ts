import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Instance_guidanceComponent } from './instance_guidance.component';
describe('DialogformComponent', () => {
  let component: Instance_guidanceComponent;
  let fixture: ComponentFixture<Instance_guidanceComponent>;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [Instance_guidanceComponent]
    }).compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(Instance_guidanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
