import { Component, OnInit } from '@angular/core';

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
  constructor() {}

  ngOnInit(): void {}
}
