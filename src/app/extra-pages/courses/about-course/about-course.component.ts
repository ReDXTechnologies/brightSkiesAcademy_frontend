import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about-course',
  templateUrl: './about-course.component.html',
  styleUrls: ['./about-course.component.sass'],
})
export class AboutCourseComponent implements OnInit {
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
