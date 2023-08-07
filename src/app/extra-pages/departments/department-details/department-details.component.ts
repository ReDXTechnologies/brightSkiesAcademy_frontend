import {Component, OnInit} from '@angular/core';
import {CourseService} from "../../../core/service/course.service";
import {ReviewService} from "../../../core/service/review.service";
import {TeacherService} from "../../../core/service/teacher.service";
import {AuthService} from "../../../core/service/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {DepartmentService} from "../../../core/service/department.service";
import {combineLatest} from "rxjs";
import {Course} from "../../../core/models/course";

@Component({
  selector: 'app-department-details',
  templateUrl: './department-details.component.html',
  styleUrls: ['./department-details.component.scss']
})
export class DepartmentDetailsComponent implements OnInit{
  constructor(
    private courseService: CourseService,
    private reviewService: ReviewService,
    private teacherService: TeacherService,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute,
    private httpClient: HttpClient,
    private departmentService: DepartmentService,
    private activatedRoute: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params.departmentId) {
        const departmentId = JSON.parse(params.departmentId);
        this.departmentService.getSuperdepById(departmentId).subscribe((superDep) => {
            console.log(superDep);
          });
      }
    });
  }
}
