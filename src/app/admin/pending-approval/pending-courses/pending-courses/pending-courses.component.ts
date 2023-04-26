import {Component, OnInit} from '@angular/core';
import {CourseService} from "../../../../core/service/course.service";
import {Course} from "../../../../core/models/course";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from '@angular/router';
import {Teacher} from "../../../../core/models/teacher";
import {TeacherService} from "../../../../core/service/teacher.service";
import {ReviewService} from "../../../../core/service/review.service";
import {Observable, of} from "rxjs";
import {Department} from "../../../../core/models/department";
import {DepartmentService} from "../../../../core/service/department.service";
import {AuthService} from "../../../../core/service/auth.service";
import {HttpClient} from "@angular/common/http";
import {DeleteDialogComponent} from "../../../departments/all-departments/dialogs/delete/delete.component";
import {MatDialog} from "@angular/material/dialog";
import {RejectionEmail} from "./rejection-email/rejection-email";

@Component({
  selector: 'app-coursefourmain',
  templateUrl: './pending-courses.component.html',
  styleUrls: ['./pending-courses.component.scss']
})
export class PendingCoursesComponent implements OnInit {
  courses: Course[];
  updatedCourses: Course[];
  teacher: Teacher;
  shopCatActive: boolean = false;
  selectedSubDepartments: string[] = [];
  level = '';
  workload = '';
  searchInput = ''
  departments: Department[];
  userId: number;
  user_id: string;
  role: any
  department: any
  pages = [];
  updatedCoursePages = [];
  currentPage = 1;
  updatedcurrentPage = 1;
  totalPages = 0;
  totalPagesUpdated = 0;
  returnedItems = 9;
  coursesData: any;
  updatedCoursesData: any;
  selectedIndex = 0;

  constructor(public courseService: CourseService,
              private teacherService: TeacherService,
              private departmentService: DepartmentService,
              private authService: AuthService,
              private httpClient: HttpClient,
              private router: Router, private snackBar: MatSnackBar,
              public dialog: MatDialog,

  ) {
    this.role = this.authService.currentUserValue.role[0];
    this.user_id = localStorage.getItem('id');
    this.userId = parseInt(this.user_id)
  }

  ngOnInit(): void {
    this.getAllPendingCourses();
    this.getAllPendingUpdatedCourses()
    this.getDepatments();
  }

  getAllPendingCoursesPerPage(page: number) {
    if (this.role === 'Super_Admin') {
      this.courseService.getPendingCoursesPerPage(page).subscribe(
        (data) => {
          console.log(data)
          this.coursesData = data
          this.totalPages = Math.ceil(data.count / this.returnedItems)
          this.courses = data.results;
          console.log(this.courses)
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
    } else if (this.role === 'head_super_department') {
      this.teacherService.getSuperDepId(this.userId).subscribe(res => {
        this.courseService.getSuperDepPendingCoursesPerPage(res,page).subscribe(
          (data) => {
            this.coursesData = data
            this.totalPages = Math.ceil(data.count / this.returnedItems)
            this.courses = data.results;
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
      })


    } else if (this.role === 'head_sub_department') {
      this.teacherService.getSubDepId(this.userId).subscribe(res => {
        this.courseService.getSubDepPendingCoursesPerPage(res,page).subscribe(
          (data) => {
            this.coursesData = data
            this.totalPages = Math.ceil(data.count / this.returnedItems)
            this.courses = data.results;
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
      })

    }

  }

  getAllPendingUpdatedCoursesPerPage(page: number) {
    if (this.role === 'Super_Admin') {
      this.courseService.getPendingUpdatedCoursesPerPage(page).subscribe(
        (data) => {
          console.log(data)
          this.updatedCoursesData = data
          this.totalPagesUpdated = Math.ceil(data.count / this.returnedItems)
          this.updatedCourses = data.results;
          console.log(this.courses)
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
    } else if (this.role === 'head_super_department') {
      this.teacherService.getSuperDepId(this.userId).subscribe(res => {
        this.courseService.getSuperDepUpdatedPendingCoursesPerPage(res,page).subscribe(
          (data) => {
            this.updatedCoursesData = data
            this.totalPagesUpdated = Math.ceil(data.count / this.returnedItems)
            this.updatedCourses = data.results;
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
      })


    } else if (this.role === 'head_sub_department') {
      this.teacherService.getSubDepId(this.userId).subscribe(res => {
        this.courseService.getSubDepUpdatedPendingCoursesPerPage(res,page).subscribe(
          (data) => {
            this.updatedCoursesData = data
            this.totalPagesUpdated = Math.ceil(data.count / this.returnedItems)
            this.updatedCourses = data.results;
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
      })

    }
  }

  calculatePages() {
    for (let i = 1; i <= this.totalPages; i++) {
      this.pages.push(i);
    }
  }
  calculatePagesUpdated() {
    for (let i = 1; i <= this.totalPagesUpdated; i++) {
      this.updatedCoursePages.push(i);
    }
  }

  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, '', {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
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

  previous_next(url: any) {

    this.httpClient.get<any>(url).subscribe(data => {
      this.coursesData = data;
      this.courses = data.results;
    });
  }

  previous_next_updated(url: any) {

    this.httpClient.get<any>(url).subscribe(data => {
      this.updatedCoursesData = data;
      this.updatedCourses = data.results;
    });
  }

  getAllPendingCourses() {
    if (this.role === 'Super_Admin') {
      this.courseService.getPendingCourses().subscribe(
        (data) => {
          console.log(data)
          this.coursesData = data
          this.totalPages = Math.ceil(data.count / this.returnedItems)
          this.courses = data.results;
          this.calculatePages()
          console.log(this.courses)
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
    } else if (this.role === 'head_super_department') {
      this.teacherService.getSuperDepId(this.userId).subscribe(res => {
        this.courseService.getSuperDepPendingCourses(res).subscribe(
          (data) => {
            this.coursesData = data
            this.totalPages = Math.ceil(data.count / this.returnedItems)
            this.courses = data.results;
            this.calculatePages()
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
      })


    } else if (this.role === 'head_sub_department') {
      this.teacherService.getSubDepId(this.userId).subscribe(res => {
        this.courseService.getSubDepPendingCourses(res).subscribe(
          (data) => {
            this.coursesData = data
            this.totalPages = Math.ceil(data.count / this.returnedItems)
            this.courses = data.results;
            this.calculatePages()
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
      })

    }


  }
  getAllPendingUpdatedCourses() {
    if (this.role === 'Super_Admin') {
      this.courseService.getPendingUpdatedCourses().subscribe(
        (data) => {
          console.log(data)
          this.updatedCoursesData = data
          this.totalPagesUpdated = Math.ceil(data.count / this.returnedItems)
          this.updatedCourses = data.results;
          this.calculatePagesUpdated()
          console.log(this.courses)
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
    } else if (this.role === 'head_super_department') {
      this.teacherService.getSuperDepId(this.userId).subscribe(res => {
        this.courseService.getSuperDepUpdatedPendingCourses(res).subscribe(
          (data) => {
            this.updatedCoursesData = data
            this.totalPagesUpdated = Math.ceil(data.count / this.returnedItems)
            this.updatedCourses = data.results;
            this.calculatePagesUpdated()
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
      })


    } else if (this.role === 'head_sub_department') {
      this.teacherService.getSubDepId(this.userId).subscribe(res => {
        this.courseService.getSubDepUpdatedPendingCourses(res).subscribe(
          (data) => {
            this.updatedCoursesData = data
            this.totalPagesUpdated = Math.ceil(data.count / this.returnedItems)
            this.updatedCourses = data.results;
            this.calculatePagesUpdated()
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
      })

    }


  }
  viewDetails(course: Course) {
    const courseJson = JSON.stringify(course);
    const teacher_id = course.teachers[0]
    this.teacherService.getTeacherById(teacher_id).subscribe(
      (teacher: Teacher) => {
        this.teacher = teacher;
        const teacherJson = JSON.stringify(teacher);

        this.router.navigate(['/shared/Lab-course-details'],
          {
            queryParams: {
              courseId: course.id,
              teacher: teacherJson
            }
          });

      },
      (error) => {
        console.error(error);
      }
    );
  }

  navigateToCoursesTab(tabId: string) {
    this.router.navigateByUrl('/shared/courses#' + tabId);
  }

  approve(courseId: number) {
    this.courseService.approveCourse(courseId)
      .subscribe((course) => {
        console.log(`Course ${courseId} has been approved.`);
        // do something with the updated course data
        this.getAllPendingCourses();
        this.showNotification(
          'snackbar-success',
          'course approved Successfully...!!!',
          'center',
          'center'
        );
        this.navigateToCoursesTab('0')

      });
  }

  reject(row) {
    const dialogRef = this.dialog.open(RejectionEmail, {
      data:{
        courseId: row.id,
        courseName :row.title,
      } ,
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result)
        // this.superDeploadData();
      if(result){
        this.showNotification(
          'snackbar-danger',
          'Email sent and course rejected !',
          'bottom',
          'center'
        );
        this.getAllPendingCoursesPerPage(1);
      }

      })
  }

  shopCat() {
    this.shopCatActive = this.shopCatActive == false;
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

  getFilteredCourses() {
    this.courseService.getFilteredPendingCourses(this.selectedSubDepartments)
      .subscribe(response => {
        this.courses = response.results;
      });
  }

  private getDepatments() {

    if (this.role === 'Super_Admin') {
      this.departmentService.getSubDepartments().subscribe(value => {
        if (!!value) {
          this.departments = value;
        }
      });
    } else if (this.role === 'head_super_department') {
      this.teacherService.getSuperDepId(this.userId).subscribe(res => {
        this.departmentService.getSubDepartmentsBySuperDepId(res).subscribe(value => {
          if (!!value) {
            this.departments = value;
          }
        });
      })


    } else if (this.role === 'head_sub_department') {
      this.teacherService.getSubDepId(this.userId).subscribe(res => {
        this.departmentService.getSubDepartmentById(res).subscribe(value => {
          if (!!value) {
            console.log(value)
            this.department = value;
          }
        });
      })
    }
  }

}
