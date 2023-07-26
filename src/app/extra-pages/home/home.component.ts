import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Category } from "../courses/about-course/details/academy.types";
import { Course } from "../../core/models/course";
import { BehaviorSubject, forkJoin, mergeMap, of, Subject } from "rxjs";
import { toArray, switchMap } from 'rxjs/operators';
import { ActivatedRoute, Router } from "@angular/router";
import { CourseService } from "../../core/service/course.service";
import { StudentService } from "../../core/service/student.service";
import { DepartmentService } from "../../core/service/department.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AuthService} from "../../core/service/auth.service";
import {
  EditCourseModuleComponent
} from "../courses/about-course/LabCourse/edit/edit-course-overview/form-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {EditRoadmapComponent} from "./edit/edit-roadmap/edit-roadmap.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  categories: Category[] = [];
  filteredCourses: Course[] = [];
  user_id: string;
  userId: number;
  role: any;
  filters: {
    categorySlug$: BehaviorSubject<string>;
    query$: BehaviorSubject<string>;
    hideCompleted$: BehaviorSubject<boolean>;
  } = {
    categorySlug$: new BehaviorSubject('all'),
    query$: new BehaviorSubject(''),
    hideCompleted$: new BehaviorSubject(false),
  };

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  /**
   * Constructor
   */
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _changeDetectorRef: ChangeDetectorRef,
    private _router: Router,
    private courseService: CourseService,
    private studentService: StudentService,
    private departmentService: DepartmentService,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
  ) {
    this.role = this.authService.currentUserValue.role[0];
    this.user_id = localStorage.getItem('id');
    this.userId = parseInt(this.user_id)
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    this.courseService.getRoadmaps().pipe(
      mergeMap((el) => forkJoin(
        el.map(course => {
          const observables = course.courses.map(id => this.courseService.getCourseById(id));
          return forkJoin(observables).pipe(
            switchMap((coursesArray: Course[]) => {
              const currentStepObservables = coursesArray.map(course1 => {
                return this.studentService.isEnrolled(course1.id, this.userId).pipe(
                  switchMap((result) => {
                    if (result === 'true') {
                      return this.courseService.getCurrentStep(course1.id, this.userId);
                    } else {
                      return of({ current_step: 0 }); // Return a default value if not enrolled
                    }
                  })
                );
              });
              return forkJoin(currentStepObservables).pipe(
                mergeMap((currentSteps: any[]) => {
                  let time = 0;
                  let totalSteps = 0;
                  let currentStep = 0;
                  let price = 0;
                  currentSteps.forEach(({ current_step }) => {
                    currentStep += current_step;
                  });
                  let id;
                  coursesArray.forEach(course1 => {
                    totalSteps += course1.nbr_of_lessons;
                    time += course1.workload;
                    id = course1.id;
                    price += course1.price;
                  });

                  // Use a new observable to get the subdepartments by course ID
                  const subDepartments$ = this.departmentService.getSubDepartmentsByCourseId(id);

                  // Combine the subdepartments observable with the course values using forkJoin
                  return forkJoin([subDepartments$, of(course)]).pipe(
                    mergeMap(([dubdepnam, originalCourse]) => {
                      console.log(dubdepnam.name);
                      this.categories.push({
                        id,
                        title: dubdepnam.name,
                        slug: dubdepnam.name
                      });
                      const updatedCourse = {
                        ...originalCourse,
                        workload: time,
                        totalSteps,
                        currentStep,
                        category: dubdepnam.name,
                        price,
                      };
                      console.log(updatedCourse);
                      return of(updatedCourse);
                    })
                  );
                })
              );
            })
          );
        })
      )),
      toArray()
    ).subscribe((filteredCourses: any[]) => {
      this.filteredCourses = filteredCourses[0];
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

  viewDetails(course: Course) {
    const idTab: number[] = [];
    course.courses.forEach((id) => idTab.push(id));
    const courseJson = JSON.stringify(idTab);
    const titleJson = JSON.stringify(course.title);
    console.log(courseJson);
    this._router.navigate(['/shared/roadmapDisplay'], {
      queryParams: {
        coursesId: courseJson,
        title: titleJson
      }
    });
  }
  deleteRoadmap(title: string) {
    this.courseService.deleteRoadmap(title).subscribe(res => {
      this.showNotification(
        'snackbar-danger',
        'Roadmap deleted Successfully...!!!',
        'center',
        'center'
      );
      window.location.reload();
    });
  }
  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, '', {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }
  editCall(course) {
    const idTab: number[] = [];
    console.log(course)
    course.courses.forEach((id) => idTab.push(id));
    const dialogRef = this.dialog.open(EditRoadmapComponent, {
      width: '70%',
      data: {
        coursesId: idTab,
        name: course.title,
        certified: course.certified,
        action: 'edit',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // this.courseService.updateCourse(this.course.id, result.formData, this.course.free, this.course.certificate)
        //   .subscribe((res) => {
        //     console.log(res);
        //     window.location.reload();
        //   });
      }
    });
  }
}
