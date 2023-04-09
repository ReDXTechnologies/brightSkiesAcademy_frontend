import { Component, OnInit } from '@angular/core';
import {FileUploader} from "ng2-file-upload";
import {FormBuilder, FormGroup, UntypedFormControl, Validators} from "@angular/forms";
import {TeacherService} from "../../core/service/teacher.service";
import {AdminService} from "../../core/service/admin.service";
import {Teacher} from "../../core/models/teacher";
import {Course} from "../../core/models/course";
import {DepartmentService} from "../../core/service/department.service";
import {AuthService} from "../../core/service/auth.service";
import {StudentService} from "../../core/service/student.service";
@Component({
  selector: 'app-profile',
  templateUrl: './teacher-profile.component.html',
  styleUrls: ['./teacher-profile.component.scss'],
})
export class TeacherProfileComponent implements OnInit {
  public uploader: FileUploader = new FileUploader({url: 'upload_url'});
  public hasBaseDropZoneOver: boolean = false;

  hide = true;
  teacherForm: FormGroup;
  user_id: string;
  selectedImage: File;
  teacher: Teacher;
  loading = false;
  teacherApprovedCourses: Course[]
  firstmanager : string
  secondmanager : string
  role: any
  userId : number;
  courses: Course[]

  constructor(private formBuilder: FormBuilder,
              private teacherService: TeacherService,
              private departmentService: DepartmentService,
              private authService: AuthService,
              private studentService: StudentService,
              private adminService: AdminService) {
    this.role = this.authService.currentUserValue.role[0];

  }

  ngOnInit(): void {
    this.initForm();
    this.user_id = localStorage.getItem('id');
    this.getStudentCourses(this.user_id);
    this.getTeacherDetails(this.user_id);
    this.getAllTeacherApprovedCourses(localStorage.getItem('id'))


  }
  getStudentCourses(studentId: string) {
    this.studentService.getStudentCourses(studentId).subscribe(res => {
      this.courses = res;
      console.log("eeeeeeeeeeee", res)
    })
  }
  initForm() {
    this.teacherForm = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      mobile_phone: [''],
      degree: [''],
      biography: [''],
      image: [''],
    });
  }
  getAllTeacherApprovedCourses(teacherId: string) {
    this.teacherService.getTeacherApprovedCourses(teacherId).subscribe(
      (data) => {
        console.log(data)
        this.teacherApprovedCourses = data;
      },
      (error) => {
        console.log('Error getting approved courses:', error);
      }
    );
  }
  onImageSelected(event) {
    this.selectedImage = <File>event.target.files[0];
  }
  public getTeacherDetails(userId: string): void {
    this.teacherService.getTeacherManagers(userId).subscribe(managers=>{
      console.log(managers)
      this.firstmanager = managers.head_of_sub_dep
      this.secondmanager = managers.head_of_super_dep
    })

    this.teacherService.getTeacherById(userId).subscribe(res=>{
      console.log(res)
      this.teacher = res;
      this.teacherForm.patchValue({
        firstName: this.teacher.user.firstName,
        lastName: this.teacher.user.lastName,
        mobile_phone: this.teacher.user.mobile_phone,
        degree: this.teacher.degree,
        biography: this.teacher.biography
      });
    })
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
  public updateTeacherProfile(userId: number): void {
    this.loading = true
    const user = {
      "firstName": this.teacherForm.value.firstName,
      "lastName": this.teacherForm.value.lastName,
      "mobile_phone": this.teacherForm.value.mobile_phone
    }

    const updateObject = {
      user,
      "degree": this.teacherForm.value.degree,
      "biography": this.teacherForm.value.biography,
    };

    this.teacherService.updateTeacherProfile(userId,updateObject).subscribe(res => {
      this.loading = true
      window.location.reload()

    })
  }

  onSubmit() {
    const teacherData = {
      degree: this.teacherForm.get('degree').value,
      biography: this.teacherForm.get('biography').value,
      user: {
        id: this.user_id,
        firstName: this.teacherForm.get('firstName').value,
        lastName: this.teacherForm.get('lastName').value,
        mobile_phone: this.teacherForm.get('mobile_phone').value
      }
    };

    // this.teacherService.updateTeacher(this.user_id, teacherData)
    //   .subscribe(response => {
    //     console.log(response);
    //     // Add any additional logic or actions here after the teacher has been updated
    //   });
  }



}
