import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {Teacher} from "../../../../core/models/teacher";
import {Review} from "../../../../core/models/review";

@Component({
  selector: 'app-coursereview',
  templateUrl: './coursereview.component.html',
  styleUrls: ['./coursereview.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CoursereviewComponent implements OnInit {
  @Input() reviews: Review[];

  constructor() { }

  ngOnInit(): void {
  }

}
