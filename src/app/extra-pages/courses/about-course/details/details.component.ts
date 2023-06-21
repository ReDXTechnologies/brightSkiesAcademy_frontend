import { CdkScrollable } from '@angular/cdk/scrolling';
import {AsyncPipe, DOCUMENT, formatDate, NgClass, NgFor, NgIf} from '@angular/common';
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
import {ActivatedRoute, Router} from '@angular/router';
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
import {Teacher} from "../../../../core/models/teacher";
import {TeacherService} from "../../../../core/service/teacher.service";
import {ReviewService} from "../../../../core/service/review.service";
import {Review} from "../../../../core/models/review";

@Component({
  selector       : 'academy-details',
  templateUrl    : './details.component.html',
  styleUrls: ['./details.component.scss', './details1.scss'],
  })
export class AcademyDetailsComponent implements OnInit, OnDestroy {
  @ViewChild('courseSteps', {static: true}) courseSteps: MatTabGroup;
  categories: Category[];
  course1: Course;
  course: Course1;
  currentStep = 0;
  drawerMode: 'over' | 'side' = 'side';
  drawerOpened = true;
  courseId: any;
  user: number;
  role: any;
  academyCourseSteps = [];
  currentVideo: Video;
  currentVideoIndex: number;
  teacher: Teacher;
  teacher_id: number;
  max_step = -1;
  reviews: Review[];
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
    private route: ActivatedRoute,
    private router: Router,
    private teacherService: TeacherService,
    private reviewService: ReviewService,
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
      this.user = params.user;
      this.teacher_id = params.teacher;
      this.courseService.getCourseById(params.courseId).subscribe(course => {
        this.course1 = course;
        console.log("bor passed by : ");
        console.log(this.teacher_id);
        console.log(this.course1);
        // Get the categories
        this.categories = categories;

        // Mark for check
        this._changeDetectorRef.markForCheck();


        // academy Course Steps

        let i = 0;
        const modules = this.course1.modules;

        modules.forEach((element) => {
          element.videos.map((video) => this.academyCourseSteps.push({
            order: i++,
            title: video.name,
            subtitle: video.name,
            content: ['video', video.video_file],
            module: element.id,
          }));

          element.quizzes.map((quiz) => this.academyCourseSteps.push({
            order: i++,
            title: quiz.name,
            subtitle: quiz.name,
            content: ['quizz', quiz],
            module: element.id,
          }));

          element.labs.map((lab) => this.academyCourseSteps.push({
            order: i++,
            title: lab.title,
            subtitle: lab.title,
            content: ['lab', lab],
            module: element.id,
          }));
        });
        this.academyCourseSteps.map((elem) => console.log(elem));
        this.courseService.getCurrentStep(this.courseId, this.user).subscribe(current => {
          console.log(current)
          this.course =  {
          id         : this.course1.id,
          title      : this.course1.title,
          slug       : 'basics-of-angular',
          description: this.course1.description,
          category   : 'web',
          duration   : this.course1.workload,
          totalSteps : this.course1.nbr_of_lessons,
          updatedAt  : this.course1.last_update_date,
          featured   : true,
          progress   : {
            currentStep: current.current_step - 1,
            completed  : 0,
          },
        };
          this.max_step = current.current_step - 2;
// Get the course directly from the service

          this.course.steps = this.academyCourseSteps;
        // Go to step
          this.goToStep(this.course.progress.currentStep);

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

    if (this.max_step < step - 1){
      return;
    }
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
    if (this.currentStep > this.max_step){
      this.max_step = this.currentStep;
      const formData = new FormData();
      formData.append('current_step', `${this.currentStep + 2}`);
      this.courseService.updateCurrentStep(this.courseId, formData, this.user).subscribe();
    }
    // Go to step

    // Set the current step
    this.currentStep = this.currentStep + 1;

    // Go to the step
    this.courseSteps.selectedIndex = this.currentStep;

    // Mark for check
    this._changeDetectorRef.markForCheck();

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

  viewDetails(course: Course) {
    const teacher_id = course.teachers[0];
    this.teacherService.getTeacherById(teacher_id).subscribe(
      (teacher: Teacher) => {
        this.teacher = teacher;
        const teacherJson = JSON.stringify(this.teacher);
        this.reviewService.getCourseReviews(course.id).subscribe(
          (res) => {
            this.reviews = res;
            const reviewJson = JSON.stringify(this.reviews);
            const courseJson = JSON.stringify(course);
            this.router.navigate(['/shared/Lab-course-details'], {
              queryParams: {
                courseId: course.id,
                reviews: reviewJson,
                teacher: teacherJson
              }
            });
          },
          (error) => {
            console.error(error);
          }
        );
      },
      (error) => {
        console.error(error);
      }
    );
  }

}
