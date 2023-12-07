import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowContributorComponent } from './show-contributor.component';

describe('ShowContributorComponent', () => {
  let component: ShowContributorComponent;
  let fixture: ComponentFixture<ShowContributorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowContributorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowContributorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
