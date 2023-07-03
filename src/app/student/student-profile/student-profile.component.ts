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
import {Teacher} from "../../core/models/teacher";
import {ReviewService} from "../../core/service/review.service";
import {TeacherService} from "../../core/service/teacher.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Review} from "../../core/models/review";
import {CourseService} from "../../core/service/course.service";
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { PDFDocument,PDFForm , StandardFonts, rgb} from 'pdf-lib';

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
  reviews: Review[];
  academyCourseProgress = [];
  academyCourseCompleted = [];

  teacher: Teacher;
  currentPage = 1;
  next = 1;
  totalPages = 0;
  returnedItems = 9;

  constructor(private formBuilder: UntypedFormBuilder,
              private studentService: StudentService,
              private reviewService: ReviewService,
              private teacherService: TeacherService,
              private router: Router,
              private route: ActivatedRoute,
              private courseService: CourseService,
              private adminService: AdminService) {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;

  }

  ngOnInit() {
    this.initForm();
    this.getStudentDetails(localStorage.getItem('id'))
    this.getStudentCourses(localStorage.getItem('id'),1)

  }
  onPageChanged(page: number) {
    this.currentPage = page;
    this.getStudentCourses(localStorage.getItem('id'),page);
  }
  next_previous(action: string) {
    if (action === 'next') {
      this.currentPage = Math.min(this.currentPage + 1, this.courses.length);
      console.log(this.currentPage)
    } else if (action === 'previous') {
      this.currentPage = Math.max(this.currentPage - 1, 1);
      console.log(this.currentPage)
    }
    this.getStudentCourses(localStorage.getItem('id'),this.currentPage);
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

  getStudentCourses(studentId: string,page:number) {
    this.studentService.getStudentCourses(studentId,page).subscribe(res => {
      this.courses = res.results;
      res.results.map((course) => this.courseService.getCurrentStep(course.id, Number(studentId)).subscribe(current1 => {
        const progress = Math.floor(current1.progress);
        this.academyCourseProgress.push({...course, progress});
        if (progress === 100){
          this.academyCourseCompleted.push({...course, progress});
        }
      }));
      console.log(this.academyCourseProgress);
      this.totalPages= Math.ceil(res.count/4)
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
  generateCertificate(studentName: string, courseName: string): void {
    const documentDefinition = {
      content: [
        { text: 'Certificate of Completion', style: 'header' },
        { text: `This is to certify that ${studentName}`, style: 'studentName' },
        { text: `has successfully completed the course ${courseName}`, style: 'courseName' },
      ],
      styles: {
        header: { fontSize: 18, bold: true, margin: [0, 0, 0, 20] },
        studentName: {fontSize: 56, bold: true, margin: [0, 0, 0, 10] },
        courseName: { fontSize: 12, margin: [0, 0, 0, 10] },
      },
    };

    const pdfDocGenerator = pdfMake.createPdf(documentDefinition);
    pdfDocGenerator.download('certificate.pdf');
  }
    async flattenForm(studentName: string, courseName: string, studentId : number,courseId : number) {
      const formUrl = '../../../assets/images/certif.pdf';
      const formPdfBytes = await fetch(formUrl).then(res => res.arrayBuffer());

      const pdfDoc = await PDFDocument.load(formPdfBytes);
      const pages = pdfDoc.getPages();
      const firstPage = pages[0]; // Assuming the student certification is on the first page
      this.courseService.getCourseCertification(courseId, studentId).subscribe(async certif => {


        // Add student-specific data
        firstPage.drawText(studentName, {
          x: 270,
          y: 270,
          size: 56,
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
