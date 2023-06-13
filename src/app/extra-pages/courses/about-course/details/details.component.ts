import { CdkScrollable } from '@angular/cdk/scrolling';
import {AsyncPipe, DOCUMENT, NgClass, NgFor, NgIf} from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { MatTabGroup} from '@angular/material/tabs';
import {ActivatedRoute} from '@angular/router';
import { FuseMediaWatcherService } from 'D:/RedX/brightSkiesAcademy_frontend/src/@fuse/services/media-watcher';
import { Category, Course1} from './academy.types';
import {Course} from "../../../../core/models/course";
import { Subject, takeUntil } from 'rxjs';
import { categories, courses} from './data';
import {CourseService} from "../../../../core/service/course.service";
import {AuthService} from "../../../../core/service/auth.service";
import {Video} from "../../../../core/models/Module";
import {
  DisplayCurriculumVideosComponent
} from "../../about-course/displayCurriculumVideos/displayCurriculumVideos.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector       : 'academy-details',
  templateUrl    : './details.component.html',
  styleUrls: ['./details.component.scss'],
  })
export class AcademyDetailsComponent implements OnInit, OnDestroy {
  @Input() user: number;
  @Input() teacher_id: number;
  @ViewChild('courseSteps', {static: true}) courseSteps: MatTabGroup;
  categories: Category[];
  course1: Course;
  course: Course1;
  currentStep = 0;
  drawerMode: 'over' | 'side' = 'side';
  drawerOpened = true;
  courseId: any;
  role: any;
  academyCourseSteps = [];
  currentVideo: Video;
  currentVideoIndex: number;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  /**
   * Constructor
   */
  constructor(
    @Inject(DOCUMENT) private _document: Document,
    private _changeDetectorRef: ChangeDetectorRef,
    private _elementRef: ElementRef,
    private _fuseMediaWatcherService: FuseMediaWatcherService,
    private courseService: CourseService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    public dialog: MatDialog,
  ) {

  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    this.role = this.authService.currentUserValue.role[0];
    this.activatedRoute.queryParams.subscribe(params => {
      this.courseId = params.courseId;
      this.courseService.getCourseById(params.courseId).subscribe(course => {
        this.course1 = course;

        console.log("bor passed by : ");
        console.log(this.course1);
        // Get the categories
        this.categories = categories;

        // Mark for check
        this._changeDetectorRef.markForCheck();


        // academy Course Steps

        let i = 0;
        this.course1.modules.map((element) => element.videos.map((video) => this.academyCourseSteps.push({
          order: i++,
          title: video.name,
          subtitle: video.name,
          content: [video.video_file],
          module: element.id,
        })));
        this.course1.modules.map((element) => element.quizzes.map((quiz) => this.academyCourseSteps.push({
          order: i++,
          title: quiz.name,
          subtitle: quiz.name,
          content: ['quizz', quiz],
          module: element.id,
        })));
        this.course1.modules.map((element) => element.labs.map((lab) => this.academyCourseSteps.push({
          order: i++,
          title: lab.title,
          subtitle: lab.title,
          content: ['lab', lab],
          module: element.id,
        })));
        this.academyCourseSteps.map((elem) => console.log(elem));
        console.log("there yet ?");

// Get the course directly from the service
        this.course = courses[1];
        this.course.steps = this.academyCourseSteps;
        // Go to step
        this.goToStep(courses[1].progress.currentStep);

        // Mark for check
        this._changeDetectorRef.markForCheck();

        // Subscribe to media changes
        this._fuseMediaWatcherService.onMediaChange$
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe(({matchingAliases}) => {
              // Set the drawerMode and drawerOpened
              if (matchingAliases.includes('lg')) {
                this.drawerMode = 'side';
                this.drawerOpened = true;
              } else {
                this.drawerMode = 'over';
                this.drawerOpened = false;
              }

              // Mark for check
              this._changeDetectorRef.markForCheck();
            }
          );
      });
    });
  }


  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Go to given step
   *
   * @param step
   */
  displayVideo(video: string) {
    this.currentVideoIndex = 0;
    this.dialog.open(DisplayCurriculumVideosComponent, {
      width: '70%',
      data: {
        videoUrl: video,
        currentIndex: 0,

      }
    });
  }

  goToStep(step: number): void {
    // Set the current step
    this.currentStep = step;

    // Go to the step
    this.courseSteps.selectedIndex = this.currentStep;

    // Mark for check
    this._changeDetectorRef.markForCheck();
  }

  /**
   * Go to previous step
   */
  goToPreviousStep(): void {
    // Return if we already on the first step
    if (this.currentStep === 0) {
      return;
    }

    // Go to step
    this.goToStep(this.currentStep - 1);

    // Scroll the current step selector from sidenav into view
    this._scrollCurrentStepElementIntoView();
  }

  /**
   * Go to next step
   */
  goToNextStep(): void {
    // Return if we already on the last step
    if (this.currentStep === this.course.totalSteps - 1) {
      return;
    }

    // Go to step
    this.goToStep(this.currentStep + 1);

    // Scroll the current step selector from sidenav into view
    this._scrollCurrentStepElementIntoView();
  }

  /**
   * Track by function for ngFor loops
   *
   * @param index
   * @param item
   */
  trackByFn(index: number, item: any): any {
    return item.id || index;
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Private methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Scrolls the current step element from
   * sidenav into the view. This only happens when
   * previous/next buttons pressed as we don't want
   * to change the scroll position of the sidebar
   * when the user actually clicks around the sidebar.
   *
   * @private
   */
  private _scrollCurrentStepElementIntoView(): void {
    // Wrap everything into setTimeout so we can make sure that the 'current-step' class points to correct element
    setTimeout(() => {
      // Get the current step element and scroll it into view
      const currentStepElement = this._document.getElementsByClassName('current-step')[0];
      if (currentStepElement) {
        currentStepElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    });
  }
}
