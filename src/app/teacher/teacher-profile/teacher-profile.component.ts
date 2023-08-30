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
import {ReviewService} from "../../core/service/review.service";
import {Router} from "@angular/router";
import {Review} from "../../core/models/review";
import {CourseService} from "../../core/service/course.service";
import {PDFDocument, rgb, StandardFonts} from "pdf-lib";
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
  loading = false;
  teacherApprovedCourses: Course[]
  firstmanager : string
  secondmanager : string
  role: any
  userId : number;
  courses: Course[];
  academyCourseCompleted = [];
  academyCourseProgress = [];
  reviews: Review[];
  teacher: Teacher;
  currentPage = 1;
  MyCoursesCurrentPage = 1;
  next = 1;
  totalPages = 0;
  MyCoursesTotalPages = 0;
  constructor(private formBuilder: FormBuilder,
              private teacherService: TeacherService,
              private departmentService: DepartmentService,
              private authService: AuthService,
              private reviewService: ReviewService,
              private router: Router,
              private courseService: CourseService,
              private studentService: StudentService,
              private adminService: AdminService) {
    this.role = this.authService.currentUserValue.role[0];

  }

  ngOnInit(): void {
    this.initForm();
    this.user_id = localStorage.getItem('id');
    this.getStudentCourses(this.user_id,1);
    this.getTeacherDetails(this.user_id);
    this.getAllTeacherApprovedCourses(localStorage.getItem('id'),1)
  }

  onPageChanged(page: number) {
    this.currentPage = page;
    this.getStudentCourses(localStorage.getItem('id'),page);
  }
  next_previous(action: string) {
    if (action === 'next') {
      this.currentPage = Math.min(this.currentPage + 1, this.courses.length);
      //console.log(this.currentPage)
    } else if (action === 'previous') {
      this.currentPage = Math.max(this.currentPage - 1, 1);
      //console.log(this.currentPage)
    }
    this.getStudentCourses(localStorage.getItem('id'),this.currentPage);
  }

  onMyCoursesPageChanged(page: number) {
    this.MyCoursesCurrentPage = page;
    this.getAllTeacherApprovedCourses(localStorage.getItem('id'),page);
  }
  next_previousMyCourses(action: string) {
    if (action === 'next') {
      this.MyCoursesCurrentPage = Math.min(this.MyCoursesCurrentPage + 1, this.teacherApprovedCourses.length);
    } else if (action === 'previous') {
      this.MyCoursesCurrentPage = Math.max(this.MyCoursesCurrentPage - 1, 1);
    }
    this.getAllTeacherApprovedCourses(localStorage.getItem('id'),this.MyCoursesCurrentPage);
  }


  getStudentCourses(studentId: string, page:number) {
    this.studentService.getStudentCourses(studentId, page).subscribe(res => {
      this.courses = res.results;
      res.results.map((course) => this.courseService.getCurrentStep(course.id, Number(studentId)).subscribe(current1 => {
        const progress = Math.floor(current1.progress);
        this.academyCourseProgress.push({...course, progress});
        if (progress === 100){
          this.academyCourseCompleted.push({...course, progress});
        }
      }));
      this.totalPages = Math.ceil(res.count/4);
    });
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
  getAllTeacherApprovedCourses(teacherId: string,page:number) {
    this.teacherService.getTeacherApprovedCourses(teacherId, page).subscribe(
      (data) => {
        //console.log(data)
        this.teacherApprovedCourses = data.results;
        this.MyCoursesTotalPages= Math.ceil(data.count/6)

      },
      (error) => {
        //console.log('Error getting approved courses:', error);
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
  async flattenForm(studentName: string, courseName: string, studentId : number,courseId : number) {
    const formUrl = '../../../assets/images/certif.pdf';
    console.log(formUrl)
    const formPdfBytes = await fetch(formUrl).then(res => res.arrayBuffer());

    const pdfDoc = await PDFDocument.load(formPdfBytes);
    const pages = pdfDoc.getPages();
    const firstPage = pages[0]; // Assuming the student certification is on the first page
    this.courseService.getCourseCertification(courseId, studentId).subscribe(async certif => {

      const pageWidth = firstPage.getSize().width;
      const fontSize = 50;
      const text = studentName;
      const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

      const textWidth = font.widthOfTextAtSize(text, fontSize);
      const centerX = (pageWidth - textWidth) / 2;
      // Add student-specific data
      firstPage.drawText(studentName, {
        x: centerX,
        y: 270,
        size: 50,
        font: await pdfDoc.embedFont(StandardFonts.HelveticaBold),
        color: rgb(48 / 255, 74 / 255, 142 / 255), // black color
      });
      firstPage.drawText(courseName, {
        x: 240,
        y: 170,
        size: 24,
        font: await pdfDoc.embedFont(StandardFonts.HelveticaBold),
        color: rgb(48 / 255, 74 / 255, 142 / 255), // black color
      });
      firstPage.drawText('DATE OF COMPLETION:' + certif.time, {
        x: 500,
        y: 90,
        size: 17,
        font: await pdfDoc.embedFont(StandardFonts.Helvetica),
        color: rgb(0, 0, 0), // black color
      });

      const pdfBytes = await pdfDoc.save();
      const pdfBlob = new Blob([pdfBytes], {type: 'application/pdf'});

      const downloadLink = document.createElement('a');
      downloadLink.href = URL.createObjectURL(pdfBlob);
      downloadLink.download = 'certificate.pdf';
      downloadLink.click();
    });
  }
}
