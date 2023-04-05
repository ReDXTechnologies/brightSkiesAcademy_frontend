import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayCurriculumVideosComponent } from './displayCurriculumVideos.component';

describe('CoursevideoComponent', () => {
  let component: DisplayCurriculumVideosComponent;
  let fixture: ComponentFixture<DisplayCurriculumVideosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayCurriculumVideosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayCurriculumVideosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
