import { Component, OnInit } from '@angular/core';
import {FileUploader} from "ng2-file-upload";
import {FormBuilder, FormGroup, UntypedFormControl, Validators} from "@angular/forms";
import {TeacherService} from "../../../core/service/teacher.service";
import {AdminService} from "../../../core/service/admin.service";
import {Course} from "../../../core/models/course";
import {Teacher} from "../../../core/models/teacher";
import {User} from "../../../core/models/user";
import {AuthService} from "../../../core/service/auth.service";
import {DepartmentService} from "../../../core/service/department.service";
import {Department} from "../../../core/models/department";
import {Router} from "@angular/router";
import {ReviewService} from "../../../core/service/review.service";
import {Review} from "../../../core/models/review";
import {StudentService} from "../../../core/service/student.service";

@Component({
  selector: 'app-profile',
  templateUrl: './head-dep-profile.component.html',
  styleUrls: ['./head-dep-profile.component.scss'],
})
export class HeadDepProfileComponent implements OnInit {
  public uploader: FileUploader = new FileUploader({url: 'upload_url'});
  public hasBaseDropZoneOver: boolean = false;

  hide = true;
  headDepForm: FormGroup;
  user_id: string;
  selectedImage: File;
  head_dep: User;
  loading = false;
  teacherApprovedCourses: Course[]
  role: any
  teachers_super_dep: any
  superDep: Department[];
  subDep: Department[];
  superDepSubDepartments: Department[];
  manager: string;
  SuperAdmin: string;
  reviews: Review[];
  teacher: Teacher;
  courses: Course[]

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private teacherService: TeacherService,
              private departmentService: DepartmentService,
              private router: Router,
              private reviewService: ReviewService,
              private studentService: StudentService,

              private adminService: AdminService) {
    this.role = this.authService.currentUserValue.role[0];

  }

  ngOnInit(): void {
    this.initForm();
    this.user_id = localStorage.getItem('id');

    this.getHeadDetails(this.user_id);
    this.getHeadDeepDetails();
    this.getStudentCourses(this.user_id);

  }
  getStudentCourses(studentId: string) {
    this.studentService.getStudentCourses(studentId).subscribe(res => {
      this.courses = res;
    })
  }
  viewDetails(course: Course) {
    console.log('****',course)
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

  initForm() {
    this.headDepForm = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      mobile_phone: [''],
      image: [''],
    });
  }

  onImageSelected(event) {
    this.selectedImage = <File>event.target.files[0];
  }
  public getHeadDetails(userId: string): void {

    this.adminService.getUser(userId).subscribe(res=>{
      this.head_dep = res;
      this.headDepForm.patchValue({
        email: this.head_dep.email,
        firstName: this.head_dep.firstName,
        lastName: this.head_dep.lastName,
        mobile_phone: this.head_dep.mobile_phone,

      });
    })
  }
  public getHeadDeepDetails(): void {
    this.adminService.getSuperAdminDetails().subscribe(superAdmin=>{
      this.SuperAdmin = superAdmin[0]?.firstName+' '+superAdmin[0]?.lastName
    })
    if (this.role === 'head_super_department') {
      this.departmentService.getSuperDepByUserId(this.user_id).subscribe(value => {
        if (!!value) {
          this.superDep = value;
          console.log(this.superDep)
          this.teacherService.getSuperDepTeachers(value[0]?.id).subscribe(res=>{this.teachers_super_dep = res.length})
          this.departmentService.getSubDepartmentsBySuperDepId(value[0]?.id).subscribe(value => {
            if (!!value) {
              value.map(dep=> this.teacherService.getSubDepTeachers(dep.id).subscribe(res=>dep.subDepNbTeachers=res.length))
              this.superDepSubDepartments = value;
            }
          });
        }
      })
    }
    else if (this.role === 'head_sub_department') {
      this.departmentService.getSubDepByUserId(this.user_id).subscribe(value => {
        if (!!value) {
          console.log(value)
          this.subDep = value;
          this.manager = value[0].super_department_head_of_super_department_firstName
            + ' '+value[0].super_department_head_of_super_department_lastName
          console.log(this.superDep)
          this.teacherService.getSubDepTeachers(value[0].id).subscribe(res=>this.subDep[0].subDepNbTeachers=res.length)
        }
      })
    }
  }
  public updateProfilePicture(userId : number): void {
    this.loading = true
    const formData = new FormData();
    formData.append('image', this.selectedImage);

    this.adminService.updateProfilePicture(userId,formData).subscribe(res=>{
      console.log(res)
      this.loading = true
      window.location.reload()

    })
  }
  public updateHead(userId: number): void {
    this.loading = true
    const user = {
      "firstName": this.headDepForm.value.firstName,
      "lastName": this.headDepForm.value.lastName,
      "mobile_phone": this.headDepForm.value.mobile_phone
    }

    this.adminService.updateUser(userId,user).subscribe(res => {
      this.loading = true
      window.location.reload()

    })
  }

  onSubmit() {
    const teacherData = {
      degree: this.headDepForm.get('degree').value,
      biography: this.headDepForm.get('biography').value,
      user: {
        id: this.user_id,
        firstName: this.headDepForm.get('firstName').value,
        lastName: this.headDepForm.get('lastName').value,
        mobile_phone: this.headDepForm.get('mobile_phone').value
      }
    };

    // this.teacherService.updateTeacher(this.user_id, teacherData)
    //   .subscribe(response => {
    //     console.log(response);
    //     // Add any additional logic or actions here after the teacher has been updated
    //   });
  }



}
