import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {TeacherService} from "../../../core/service/teacher.service";
import {Teacher} from "../../../core/models/teacher";
import {AuthService} from "../../../core/service/auth.service";
import {HttpClient} from "@angular/common/http";
import {Department} from "../../../core/models/department";
import {DepartmentService} from "../../../core/service/department.service";

@Component({
  selector: 'app-instructormain',
  templateUrl: './instructormain.component.html',
  styleUrls: ['./instructormain.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class InstructormainComponent implements OnInit {

  teachers: Teacher[] = [];
  teachersData: any
  userId: number;
  user_id: string;
  role: any
  pages = [];
  currentPage = 1;
  totalPages = 0;
  returnedItems = 8;
  firstName = '';
  lastName = '';
  subDepartment = '';
  departments: Department[];
  department : Department;
  constructor(private teacherService: TeacherService, private httpClient: HttpClient,
              private authService: AuthService,              private departmentService: DepartmentService,

  ) {
    this.user_id = localStorage.getItem('id');
    this.userId = parseInt(this.user_id)
    this.role = this.authService.currentUserValue.role[0];
  }

  ngOnInit(): void {

    this.getTeachers()
    this.getDepatments()
  }
  previous_next(url:any) {

    this.httpClient.get<any>(url).subscribe(data=>{
      this.teachersData= data;
      this.teachers=data.results;
    });
  }

  next_previous(action: string) {
    if (action === 'next') {
      this.currentPage = Math.min(this.currentPage + 1, this.totalPages);
      console.log(this.currentPage)
    } else if (action === 'previous') {
      this.currentPage = Math.max(this.currentPage - 1, 1);
      console.log(this.currentPage)
    }
    if (this.role === 'Super_Admin') {
      this.teacherService.getTeachersperPage(this.currentPage).subscribe(data=>{
        this.teachers = data.results;
      });
    } else if (this.role === 'head_super_department') {
      this.teacherService.getSuperDepId(this.userId).subscribe(res => {
        this.teacherService.getSuperDepTeachersperPage(res,this.currentPage).subscribe(
          (teachers: any) => {
            this.teachers = teachers.results;

          })})

    } else if (this.role === 'head_sub_department') {
      this.teacherService.getSubDepId(this.userId).subscribe(res => {
        this.teacherService.getSubDepTeachersperPage(res,this.currentPage).subscribe(
          (teachers: any) => {
            this.teachers = teachers.results;

          })})
    }
  }
  onPageChanged(page: number) {
    this.currentPage = page;
    if (this.role === 'Super_Admin') {
      this.teacherService.getTeachersperPage(page).subscribe(data=>{
        this.teachers = data.results;
      });
    } else if (this.role === 'head_super_department') {
      this.teacherService.getSuperDepId(this.userId).subscribe(res => {
        this.teacherService.getSuperDepTeachersperPage(res,this.currentPage).subscribe(
          (teachers: any) => {
            this.teachers = teachers.results;

          })})

    } else if (this.role === 'head_sub_department') {
      this.teacherService.getSubDepId(this.userId).subscribe(res => {
        this.teacherService.getSubDepTeachersperPage(res,this.currentPage).subscribe(
          (teachers: any) => {
            this.teachers = teachers.results;

          })})
    }

  }
  onSearchFirstName(query: string) {
    console.log(query)
    this.firstName = query;
    this.getFilteredTeachers()
  }
  onDepartmentSelect(query:string){
    console.log(query)
    this.subDepartment = query;
    this.getFilteredTeachers()
  }
  onSearchLastName(query: string) {
    console.log(query)
    this.lastName = query;
    this.getFilteredTeachers()
  }
  getFilteredTeachers() {

    if (this.role === 'Super_Admin') {
      this.teacherService.getFilteredTeachersGrid(this.firstName, this.lastName, this.subDepartment)
        .subscribe(response => {
          this.teachers = response.results;
          this.totalPages=Math.ceil(response.count/this.returnedItems)
        });
    }
    else if (this.role === 'head_super_department') {
      console.log('here')
      this.teacherService.getSuperDepId(this.userId).subscribe(res => {
        this.teacherService.getSuperDepFilteredTeachersGrid(res,this.firstName, this.lastName, this.subDepartment).subscribe(

          (teachers: any) => {
            this.teachers = teachers.results;
            this.totalPages=Math.ceil(teachers.count/this.returnedItems)
          },
          (error) => {
            console.error(error);
          }
        );
      })

    }else if (this.role === 'head_sub_department') {
      this.teacherService.getSubDepId(this.userId).subscribe(res => {
        this.teacherService.getSubDepFilteredTeachersGrid(res,this.firstName, this.lastName, this.subDepartment).subscribe(

          (teachers: any) => {
            this.teachers = teachers.results;
            this.totalPages=Math.ceil(teachers.count/this.returnedItems)
          },
          (error) => {
            console.error(error);
          }
        );
      })
    }
  }
  getTeachers() {
    if (this.role === 'Super_Admin') {
      this.teacherService.getTeachersperPage(1).subscribe(
        (teachers: any) => {
          this.teachersData = teachers
         this.totalPages=Math.ceil(teachers.count/this.returnedItems)
          this.teachers = teachers.results;
        },
        (error) => {
          console.error(error);
        }
      );
    } else if (this.role === 'head_super_department') {
      this.teacherService.getSuperDepId(this.userId).subscribe(res => {
        this.teacherService.getSuperDepTeachersperPage(res,1).subscribe(

          (teachers: any) => {
            this.teachersData = teachers
            this.totalPages=Math.ceil(teachers.count/this.returnedItems)
            this.teachers = teachers.results;

            console.log(teachers.count)
          },
          (error) => {
            console.error(error);
          }
        );
      })

    } else if (this.role === 'head_sub_department') {
      this.teacherService.getSubDepId(this.userId).subscribe(res => {
        this.teacherService.getSubDepTeachersperPage(res,1).subscribe(
          (teachers: any) => {
            this.teachersData = teachers
            this.totalPages=Math.ceil(teachers.count/this.returnedItems)
            this.teachers = teachers.results;
          },
          (error) => {
            console.error(error);
          }
        );
      })

    }
  }
  private getDepatments() {

    if (this.role === 'Super_Admin') {
      this.departmentService.getSubDepartments().subscribe(value => {
        if (!!value) {
          this.departments = value;
        }
      });
    } else if (this.role === 'head_super_department') {
      this.teacherService.getSuperDepId(this.userId).subscribe(res=>{
        this.departmentService.getSubDepartmentsBySuperDepId(res).subscribe(value => {
          if (!!value) {
            this.departments = value;
          }
        });
      })


    } else if (this.role === 'head_sub_department') {
      this.teacherService.getSubDepId(this.userId).subscribe(res=>{
        this.departmentService.getSubDepartmentById(res).subscribe(value => {
          if (!!value) {
            this.department = value;
          }
        });
      })
    }
  }

}
