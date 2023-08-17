import {Component, OnInit, ViewChild} from '@angular/core';
import {
  ChartComponent,
} from 'ng-apexcharts';
import {CourseService} from "../../../core/service/course.service";
import {DepartmentService} from "../../../core/service/department.service";
import {AdminService} from "../../../core/service/admin.service";
import {combineLatest, forkJoin, Observable, of} from "rxjs";
import {TeacherService} from "../../../core/service/teacher.service";
import {Teacher} from "../../../core/models/teacher";
import {catchError, map, switchMap} from "rxjs/operators";
import {AuthService} from "../../../core/service/auth.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  @ViewChild('chart') chart: ChartComponent;
  public subDepartments$: Observable<any[]>;
  departments: any[] = [];
  subDepartments: any[] = [];
  teachers: Teacher[] = [];
  currentPage = 1;
  totalPages = 0;
  returnedItems = 6;
  currentPageStudent = 1;
  currentPageSub = 1;
  itemsPerPage: number = 6;
  totalPagesStudent = 0;
  percentage: number;
  total_courses: number;
  students: any;
  role: any;
  studentsDisplay: any;
  breadscrums = [
    {
      title: 'Dashboad',
      items: [],
      active: 'Dashboard 1',
    },
  ];
  constructor(private courseService: CourseService,
              private departmentService: DepartmentService,
              private adminService: AdminService,
              private teacherService: TeacherService,
              private authService: AuthService) {
    this.role = this.authService.currentUserValue.role[0];
    this.courseService.getCourseStats().subscribe((res) => {
      this.percentage = res.percentage_difference;
      this.total_courses = res.total_courses;
    });
    this.departmentService.getSuperDepartments().subscribe((res) => {
      this.departments = res;
    });
    this.teacherService.getTeachers(this.currentPage).subscribe((res) => {
      this.teachers = res.results;
      this.totalPages = Math.ceil(res.count / this.returnedItems);
    });
    this.courseService.getCourseCompletion().subscribe((res) => {
      // Create an array of observables to fetch user details for each student
      const userObservables = res.map((el1) => this.adminService.getUser(el1.user));

      // Use forkJoin to wait for all userObservables to complete
      forkJoin(userObservables).subscribe((userDetailsArray) => {
        // Combine the course completion data with the user details
        this.students = res.map((el1, index) => ({
          ...el1,
          user: userDetailsArray[index],
        }));
        this.totalPagesStudent = Math.ceil(this.students.length / this.itemsPerPage);
        this.studentsDisplay = this.getPaginatedStudents();
      });
    });
  }

  ngOnInit() {
    this.subDepartments$ = this.departmentService.getSubDepartmentsPerPage(this.currentPageSub).pipe(
      switchMap((res) => {
        const subDepartmentObservables: Observable<any>[] = res.results.map((subDep) => {
          const coursesObservable = this.courseService.getFilteredCourses([subDep.name], '', '', '', '', '');
          const teachersObservable = this.teacherService.getSubDepTeachers(subDep.id);

          return combineLatest([coursesObservable, teachersObservable]).pipe(
            catchError(() => of([])), // Handle errors gracefully by returning an empty array
            map(([courses, teachers]) => ({
              ...subDep,
              coursesCount: courses.length,
              teachersCount: teachers.length
            }))
          );
        });

        return combineLatest(subDepartmentObservables);
      })
    );
    this.loadChartData();
  }
  next_previous(action: string) {
    if (action === 'next') {
      this.currentPage = Math.min(this.currentPage + 1, this.totalPages);
      console.log(this.currentPage);
    } else if (action === 'previous') {
      this.currentPage = Math.max(this.currentPage - 1, 1);
      console.log(this.currentPage);
    }
    this.teacherService.getTeachers(this.currentPage).subscribe((res) => {
      console.log(res);
      this.teachers = res.results;
    });
  }
  onPageChanged(page: number) {
    this.currentPage = page;
    this.teacherService.getTeachers(this.currentPage).subscribe((res) => {
      console.log(res);
      this.teachers = res.results;
      console.log(this.teachers);
    });
  }
  onPageChangedStudent(pageNumber: number): void {
    this.currentPageStudent = pageNumber;
    this.studentsDisplay = this.getPaginatedStudents();
  }

  next_previous_student(action: 'previous' | 'next'): void {
    if (action === 'previous' && this.currentPageStudent > 1) {
      this.currentPageStudent--;
    } else if (action === 'next' && this.currentPageStudent < this.totalPagesStudent) {
      this.currentPageStudent++;
    }
    this.studentsDisplay = this.getPaginatedStudents();
  }

  getPaginatedStudents(): any[] {
    const startIndex = (this.currentPageStudent - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.students.slice(startIndex, endIndex);
  }
  loadChartData(): void {
    this.departmentService.getSuperDepartments().subscribe((departments) => {
      this.departments = departments;

      // Loop through departments to fetch sub-department data
      this.departments.forEach((department) => {
        this.departmentService.getSubDepartmentsPerPage(this.currentPageSub).subscribe((subDepartments) => {
          this.subDepartments = subDepartments.results;

          // Filter sub-departments for the current department
          const relevantSubDepartments = this.subDepartments.filter(subDept => subDept.super_department_name === department.name);

          // Calculate total budget for relevant sub-departments
          const totalBudget = relevantSubDepartments.reduce((sum, subDept) => sum + subDept.budget, 0);

          // Calculate remaining budget for the super department
          const remainingBudget = department.budget;

          // Generate chart data for the current department
          const numSubDepartments = relevantSubDepartments.length;
          const colors = this.generateColors(numSubDepartments);
          const remainingBudgetColor = '#EEE9DA'; // Color for remaining budget

          const series = [...relevantSubDepartments.map(subDept => subDept.budget), remainingBudget];
          const seriesColors = [...colors, remainingBudgetColor]; // Add remaining budget color

          const chartOptions = {
            // Set chart properties
            series: series,
            chart: {
              type: 'pie',
              height: 400,
            },
            // Set other chart options...

            labels: [...relevantSubDepartments.map(subDept => subDept.name), 'Remaining Budget'],
            colors: seriesColors,
            // ... Other options ...
          };

          department.chartOptions = chartOptions; // Store chart options in the department object
        });
      });
    });
  }

  generateColors(numColors: number): string[] {
    const colors = ['#6096B4', '#8EA7E9', '#93C6E7', '#FFF2F2'];
    const generatedColors = [];

    for (let i = 0; i < numColors; i++) {
      const colorIndex = i % colors.length; // Wrap around colors if there are more sub-departments than colors
      generatedColors.push(colors[colorIndex]);
    }

    return generatedColors;
  }


}
