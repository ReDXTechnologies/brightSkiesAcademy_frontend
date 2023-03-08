import {Component, OnInit} from '@angular/core';
import {FileUploader} from "ng2-file-upload";
import {
  FormControl,
  FormGroup,
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators
} from "@angular/forms";
import {StudentService} from "../../core/service/student.service";
import {Student} from "../../core/models/student";
import {AdminService} from "../../core/service/admin.service";
import {Course} from "../../core/models/course";

@Component({
  selector: 'app-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.scss'],
})
export class StudentProfileComponent implements OnInit {
  public uploader: FileUploader = new FileUploader({url: 'upload_url'});
  public hasBaseDropZoneOver: boolean = false;
  email = new UntypedFormControl('', [Validators.required, Validators.email]);
  loading = false;
  studentForm: FormGroup;
  selectedImage: File;
  courses: Course[]
  hide = true;
  student: Student;

  constructor(private formBuilder: UntypedFormBuilder, private studentService: StudentService, private adminService: AdminService) {

  }

  ngOnInit() {
    this.initForm();
    this.getStudentDetails(localStorage.getItem('id'))
    this.getStudentCourses(localStorage.getItem('id'))
  }

  onImageSelected(event) {
    this.selectedImage = <File>event.target.files[0];
  }

  formControl = new UntypedFormControl('', [
    Validators.required
    // Validators.email,
  ]);
  initForm() {
    this.studentForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile_phone: ['', Validators.required],
      skills: [''],
      speciality: [''],
      image: [''],
    });
  }
  getErrorMessage() {
    return this.formControl.hasError('required')
      ? 'Required field'
      : this.formControl.hasError('email')
        ? 'Not a valid email'
        : '';
  }


  getStudentDetails(studentId: string) {
    this.studentService.getStudent(studentId).subscribe(student => {
      this.student = student;
      console.log(student.user.email)
      this.studentForm.patchValue({
        firstName: this.student.user.firstName,
        lastName: this.student.user.lastName,
        email: this.student.user.email,
        mobile_phone: this.student.user.mobile_phone,
        skills: this.student.skills,
        speciality: this.student.speciality
      });
    })
  }

  getStudentCourses(studentId: string) {
    this.studentService.getStudentCourses(studentId).subscribe(res => {
      this.courses = res;
      console.log("eeeeeeeeeeee", res)
    })
  }

  public updateProfilePicture(userId: number): void {
    this.loading = true
    const formData = new FormData();
    formData.append('image', this.selectedImage);

    this.adminService.updateProfilePicture(userId, formData).subscribe(res => {
      console.log(res)
      this.loading = true
      window.location.reload()

    })
  }

  public updateStudentProfile(userId: number): void {
    this.loading = true
    const user = {
      "firstName": this.studentForm.value.firstName,
      "lastName": this.studentForm.value.lastName,
      "email": this.studentForm.value.email,
      "mobile_phone": this.studentForm.value.mobile_phone
    }

    const updateObject = {
      user,
      "speciality": this.studentForm.value.speciality,
      "skills": this.studentForm.value.skills,
    };

    this.studentService.updateStudent(userId,updateObject ).subscribe(res => {
      console.log(res)
      this.loading = true
      window.location.reload()

    })
  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

}
