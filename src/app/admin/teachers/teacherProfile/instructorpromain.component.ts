import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Teacher} from "../../../core/models/teacher";
import {ActivatedRoute, Router} from "@angular/router";
import {TeacherService} from "../../../core/service/teacher.service";
import {Course} from "../../../core/models/course";
import {ReviewService} from "../../../core/service/review.service";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-instructorpromain',
  templateUrl: './instructorpromain.component.html',
  styleUrls: ['./instructorpromain.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class InstructorpromainComponent implements OnInit {
  followedActive: boolean = false;
  btnVal = "Follow";
  firstmanager: any
  secondmanager: any
  teacherApprovedCourses: Course[]
  reviews: any

  followedClick() {
    if (this.followedActive == false) {
      this.followedActive = true;
      this.btnVal = "Followed"
    } else {
      this.followedActive = false;
      this.btnVal = "Follow"
    }
  }

  teacher: Teacher;
  courses: Course[]
  teacherId: number;
  coursesData: any
  pages = [];
  currentPage = 1;
  totalPages = 0;

  constructor(
    private route: ActivatedRoute,
    private teacherService: TeacherService,
    private reviewService: ReviewService,
    private router: Router,
    private httpClient: HttpClient,
  ) {
  }

  ngOnInit(): void {
    this.teacherId = +this.route.snapshot.paramMap.get('id'); // Get the id parameter from the route and convert it to a number using the + operator
    this.getTeacherInfos();
      this.teacherService.getTeacherApprovedCourses(this.teacherId.toString(), 1).subscribe(
        (data) => {
          this.teacherApprovedCourses = data.results;
          this.totalPages=Math.ceil(data.count/6);
          this.calculatePages()
        },
        (error) => {
          console.log('Error getting approved courses:', error);
        })
      }
  calculatePages() {
    for (let i = 1; i <= this.totalPages; i++) {
      this.pages.push(i);
    }
  }
  previous_next(url: any) {

    this.httpClient.get<any>(url).subscribe(data => {
      this.coursesData = data;
      this.courses = data.results;
    });
  }

  getTeacherInfos() {
    this.teacherService.getTeacherManagers(this.teacherId).subscribe(managers => {
      console.log(managers)
      this.firstmanager = managers.head_of_sub_dep
      this.secondmanager = managers.head_of_super_dep
    })
    this.teacherService.getTeacherById(this.teacherId).subscribe(res => {
      this.teacher = res;
    })
  }


  getAllTeacherApprovedCourses(teacherId: any,page:number) {
    this.teacherService.getTeacherApprovedCourses(teacherId, page).subscribe(
      (data) => {
        this.teacherApprovedCourses = data.results;
        this.totalPages=data.count;
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
}
