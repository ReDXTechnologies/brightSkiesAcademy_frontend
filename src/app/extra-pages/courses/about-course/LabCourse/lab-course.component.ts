import {Component, OnInit} from '@angular/core';
import {StudentService} from "../../../../core/service/student.service";
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-about-course',
  templateUrl: './lab-course.component.html',
  styleUrls: ['./lab-course.component.scss'],
})
export class LabCourseComponent implements OnInit {
  writeReviewActive:boolean=false;
  writeReview(){
    if(this.writeReviewActive==false){
      this.writeReviewActive=true;
    }
    else {
      this.writeReviewActive=false;
    }
  }
  user_id: string;
  isLoading = false;

  constructor(private studentService: StudentService ,private spinner: NgxSpinnerService) {}

  ngOnInit(): void {
    this.user_id = localStorage.getItem('id');

  }

  startSession() {
    this.isLoading = true;
    this.spinner.show();

    this.studentService.launchSession(this.user_id,2).subscribe(response => {
      this.isLoading = false;
      this.spinner.hide();
      window.open(response.instance_url, '_blank');
    });
  }

}
