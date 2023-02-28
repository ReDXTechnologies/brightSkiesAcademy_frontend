import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-instructorpromain',
  templateUrl: './instructorpromain.component.html',
  styleUrls: ['./instructorpromain.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class InstructorpromainComponent implements OnInit {
  followedActive:boolean=false;
  btnVal = "Follow";

  followedClick(){
    if(this.followedActive==false){
      this.followedActive=true;
      this.btnVal = "Followed"
    }
    else {
      this.followedActive=false;
      this.btnVal = "Follow"
    }
  }

  constructor() { }

  ngOnInit(): void {}
      
}
