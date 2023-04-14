import {Component, OnInit} from '@angular/core';
import {CourseService} from "../../../core/service/course.service";
import {Course} from "../../../core/models/course";
import {ReviewService} from "../../../core/service/review.service";
import {Teacher} from "../../../core/models/teacher";
import {Review} from "../../../core/models/review";
import {ActivatedRoute, Router} from "@angular/router";
import {TeacherService} from "../../../core/service/teacher.service";
import {Observable, of} from "rxjs";
import {AuthService} from "../../../core/service/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {DepartmentService} from "../../../core/service/department.service";
import {Department} from "../../../core/models/department";

@Component({
  selector: 'app-all-course',
  templateUrl: './all-course.component.html',
  styleUrls: ['./all-course.component.sass'],
})
export class AllCourseComponent implements OnInit {
  breadscrums = [
    {
      title: 'All Course',
      items: ['Course'],
      active: 'All Course',
    },
  ];
  courses: Course[];
  teacherApprovedCourses: Course[];
  teacherPendingCourses: Course[];
  reviews: Review[];
  teacher: Teacher;
  role: any
  selectedIndex = 0;
  departments: Department[];
  shopCatActive: boolean = false;
  shopDurationActive: boolean = false;
  shopLevelActive: boolean = false;
  selectedSubDepartments: string[] = [];
  level = '';
  price = '';
  workload = '';
  searchInput=''
  userId : number;
  user_id: string;
  constructor(private courseService: CourseService,
              private reviewService: ReviewService,
              private teacherService: TeacherService,
              private authService: AuthService,
              private snackBar: MatSnackBar,
              private router: Router,
              private route: ActivatedRoute,
              private departmentService: DepartmentService,
  ) {
    this.role = this.authService.currentUserValue.role[0];
    this.user_id = localStorage.getItem('id');
    this.userId = parseInt(this.user_id)
  }

  shopCat() {
    this.shopCatActive = this.shopCatActive == false;
  }

  shopLevel() {
    this.shopLevelActive = this.shopLevelActive == false;
  }

  shopDuration() {
    this.shopDurationActive = this.shopDurationActive == false;
  }
  onCourseSelect(selectedCourse: string) {
    this.disableAllWorkloadsCheckboxes()
    this.disableAllLevelsCheckboxes()
    if (selectedCourse === 'pending') {
      this.getAllPendingCourses(localStorage.getItem('id'));

    } else if (selectedCourse === 'available') {
      this.getAllTeacherApprovedCourses(localStorage.getItem('id'));
    }
  }
  getTeacherDetails(teacherIds: any): Observable<any[]> {
    const teachers = [];

    teacherIds.forEach(id => {
      this.teacherService.getTeacherById(id).subscribe(
        (data) => {
          teachers.push(data);
        },
        (error) => {
          console.log(`Error fetching teacher details for teacher ID ${id}:`, error);
        }
      );
    });

    return of(teachers);
  }

  ngOnInit(): void {
    this.route.fragment.subscribe(fragment => {
      if (fragment === 'my_available_courses') {
        this.selectedIndex = 1;
      } else if (fragment === 'my_pending_courses') {
        this.selectedIndex = 2;
      } else if (fragment === 'lab_courses') {
        this.selectedIndex = 3;
      } else if (fragment === 'tutorial_courses') {
        this.selectedIndex = 4;
      } else {
        this.selectedIndex = 0; // Set the index of the default tab
        this.selectedIndex = 0; // Set the index of the default tab
      }
    });
    this.getAllApprovedCourses();
    this.getDepatments();

  }
  onSearch(query: string) {
    console.log(query)
    this.searchInput = query;
   this.getFilteredCourses()
  }
  onSubDepartmentChange(event: any, subDepartment: string) {
    // Toggle selected sub-department
    if (event.target.checked) {
      this.selectedSubDepartments.push(subDepartment);
    } else {
      const index = this.selectedSubDepartments.indexOf(subDepartment);
      if (index > -1) {
        this.selectedSubDepartments.splice(index, 1);
      }
    }
    this.getFilteredCourses();
  }

  onWorkloadClick(workload: string) {
    console.log(workload)
    if (this.workload === workload) {
      this.workload = '';
      this.enableAllWorkloadsCheckboxes();
    } else {
      this.workload = workload;
      switch (workload) {
        case '1-2':
          this.disableWorkloadheckbox('w-2-5');
          this.disableWorkloadheckbox('w-5-10');
          this.disableWorkloadheckbox('w-10-20');
          break;
        case '2-5':
          this.disableWorkloadheckbox('w-1-2');
          this.disableWorkloadheckbox('w-5-10');
          this.disableWorkloadheckbox('w-10-20');
          break;
        case '5-10':
          this.disableWorkloadheckbox('w-1-2');
          this.disableWorkloadheckbox('w-2-5');
          this.disableWorkloadheckbox('w-10-20');
          break;
        case '10-20':
          this.disableWorkloadheckbox('w-1-2');
          this.disableWorkloadheckbox('w-2-5');
          this.disableWorkloadheckbox('w-5-10');
          break;
        default:
          this.enableAllWorkloadsCheckboxes();
          break;
      }
    }
    this.getFilteredCourses();
  }


  onLevelClick(level: string) {
    console.log(level)
    if (this.level === level) {
      this.level = '';
      this.enableAllLevelsCheckboxes();

    } else {
      this.level = level.toLowerCase();
      switch (level) {
        case 'entry':
          this.disableLevelCheckbox('intermediate');
          this.disableLevelCheckbox('advanced');
          break;
        case 'intermediate':
          this.disableLevelCheckbox('entry');
          this.disableLevelCheckbox('advanced');
          break;
        case 'advanced':
          this.disableLevelCheckbox('entry');
          this.disableLevelCheckbox('intermediate');
          break;
        default:
          this.enableAllLevelsCheckboxes();
          break;
      }
    }
    this.getFilteredCourses();
  }


  disableLevelCheckbox(level: string) {
    document.getElementById(`e-${level}`).setAttribute('disabled', 'disabled');
  }

  enableWorkloadCheckbox(workload: string) {
    console.log('rrrr',workload)
    document.getElementById(`${workload}`).removeAttribute('disabled');
  }
  disableWorkloadheckbox(workload: string) {
    console.log(workload)
    document.getElementById(`${workload}`).setAttribute('disabled', 'disabled');
  }

  enableLevelCheckbox(level: string) {
    document.getElementById(`e-${level}`).removeAttribute('disabled');
  }

  enableAllLevelsCheckboxes() {
    this.enableLevelCheckbox('entry');
    this.enableLevelCheckbox('intermediate');
    this.enableLevelCheckbox('advanced');
  }
  disableAllLevelsCheckboxes() {
    this.disableLevelCheckbox('entry');
    this.disableLevelCheckbox('intermediate');
    this.disableLevelCheckbox('advanced');
  }
  enableAllWorkloadsCheckboxes() {
    this.enableWorkloadCheckbox('w-1-2');
    this.enableWorkloadCheckbox('w-2-5');
    this.enableWorkloadCheckbox('w-5-10');
    this.enableWorkloadCheckbox('w-10-20');
  }

  disableAllWorkloadsCheckboxes() {
    this.disableWorkloadheckbox('w-1-2');
    this.disableWorkloadheckbox('w-2-5');
    this.disableWorkloadheckbox('w-5-10');
    this.disableWorkloadheckbox('w-10-20');
  }
  onPriceClick(price: string) {
    console.log(price)
    if (this.price === price) {
      this.level = '';
      this.enableAllLevelsCheckboxes();

    } else {
      this.price = price.toLowerCase();
      switch (price) {
        case 'free':
          this.disablePriceCheckbox('free');
          break;
        case 'premuim':
          this.disablePriceCheckbox('premuim');
          break;
        default:
          this.enableAllpriceCheckboxes();
          break;
      }
    }
    this.getFilteredCourses();
  }
  disablePriceCheckbox(price: string) {
    console.log(price)
    document.getElementById(`e-${price}`).setAttribute('disabled', 'disabled');
  }
  enablePriceCheckbox(price: string) {
    document.getElementById(`${price}`).removeAttribute('disabled');
  }
  enableAllpriceCheckboxes() {
    this.enablePriceCheckbox('e-premuim');
    this.enablePriceCheckbox('e-free');
  }
  getFilteredCourses() {
    this.courseService.getFilteredCourses(this.selectedSubDepartments, this.level, this.workload, this.searchInput,this.price)
      .subscribe(response => {
        this.courses = response;
      });
  }

  getAllApprovedCourses() {
    this.courseService.getApprovedCourses().subscribe(
      (data) => {
        this.courses = data;
        console.log(data)
        this.courses.forEach(course => {
          this.getTeacherDetails(course.teachers).subscribe(
            (teachers) => {
              course.teacherDetails = teachers;
            }
          );
        });
      },
      (error) => {
        console.log('Error getting approved courses:', error);
      }
    );
  }

  getAllTeacherApprovedCourses(teacherId: string) {
    this.teacherService.getTeacherApprovedCourses(teacherId).subscribe(
      (data) => {
        console.log(data)
        this.courses = data;
        this.courses.forEach(course => {
          this.getTeacherDetails(course.teachers).subscribe(
            (teachers) => {
              course.teacherDetails = teachers;
            }
          );
        });
      },
      (error) => {
        console.log('Error getting approved courses:', error);
      }
    );
  }

  getAllPendingCourses(teacherId: string) {
    this.teacherService.getPendingCourses(teacherId).subscribe(
      (data) => {
        console.log(data)
        this.courses = data;
        this.courses.forEach(course => {
          this.getTeacherDetails(course.teachers).subscribe(
            (teachers) => {
              course.teacherDetails = teachers;
            }
          );
        });
      },
      (error) => {
        console.log('Error getting approved courses:', error);
      }
    );
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

  editCourse(course: Course) {
    this.router.navigate(['/shared/add-course'], {queryParams: {edit: true, courseId: course.id}});
  }

  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, '', {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }

  navigateToCoursesTab(tabId: string) {
    this.router.navigateByUrl('/shared/courses#' + tabId);
  }

  deletePendingCourse(course: Course) {
    this.courseService.delete(course.id).subscribe(res => {
      console.log(res);
      this.getAllPendingCourses(localStorage.getItem('id'));
      this.showNotification(
        'snackbar-danger',
        'course deleted Successfully...!!!',
        'center',
        'center'
      );
      this.navigateToCoursesTab('2');

    })

  }

  deleteApprovedCourse(course: Course) {
    this.courseService.delete(course.id).subscribe(res => {
      console.log(res);
      this.getAllTeacherApprovedCourses(localStorage.getItem('id'));
      this.showNotification(
        'snackbar-danger',
        'course deleted Successfully...!!!',
        'center',
        'center'
      );
      this.navigateToCoursesTab('1');

    })

  }


  private getDepatments() {
    this.departmentService.getSubDepartments().subscribe(value => {
      if (!!value) {
        this.departments = value;
      }
    });
  }


}
