import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoadmapDisplayComponent } from './roadmap-display.component';

describe('RoadmapDisplayComponent', () => {
  let component: RoadmapDisplayComponent;
  let fixture: ComponentFixture<RoadmapDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoadmapDisplayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoadmapDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
