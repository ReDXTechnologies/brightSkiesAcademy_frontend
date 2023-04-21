import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Teacher} from "../../../core/models/teacher";
import {ActivatedRoute, Router} from "@angular/router";
import {TeacherService} from "../../../core/service/teacher.service";
import {Course} from "../../../core/models/course";
import {ReviewService} from "../../../core/service/review.service";

@Component({
  selector: 'app-instructorpromain',
  templateUrl: './instructorpromain.component.html',
  styleUrls: ['./instructorpromain.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class InstructorpromainComponent implements OnInit {
  followedActive: boolean = false;
  btnVal = "Follow";
  firstmanager : any
  secondmanager : any
  teacherApprovedCourses: Course[]
  reviews : any
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
  courses : Course[]
teacherId : number;
  constructor(
    private route: ActivatedRoute,
    private teacherService: TeacherService,
    private reviewService: ReviewService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.teacherId = +this.route.snapshot.paramMap.get('id'); // Get the id parameter from the route and convert it to a number using the + operator
    this.getTeacherInfos();
    this.getAllTeacherApprovedCourses(this.teacherId);
  }

  getTeacherInfos() {
    this.teacherService.getTeacherManagers(this.teacherId).subscribe(managers=>{
      console.log(managers)
      this.firstmanager = managers.head_of_sub_dep
      this.secondmanager = managers.head_of_super_dep
    })
    this.teacherService.getTeacherById(this.teacherId).subscribe(res => {
      this.teacher = res;
    })
  }
  getTeacherCourses() {
    // const id = +this.route.snapshot.paramMap.get('id'); // Get the id parameter from the route and convert it to a number using the + operator
    // this.teacherService.getApprovedCourses(id).subscribe(res => {
    //   this.courses = res;
    // })
  }
  getAllTeacherApprovedCourses(teacherId: any) {
    this.teacherService.getTeacherApprovedCourses(teacherId).subscribe(
      (data) => {
        this.teacherApprovedCourses = data.results;
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
