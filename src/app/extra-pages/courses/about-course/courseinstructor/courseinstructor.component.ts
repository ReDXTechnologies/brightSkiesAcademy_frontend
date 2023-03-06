import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {Teacher} from "../../../../core/models/teacher";

@Component({
  selector: 'app-courseinstructor',
  templateUrl: './courseinstructor.component.html',
  styleUrls: ['./courseinstructor.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CourseinstructorComponent implements OnInit {
  @Input() teacher: Teacher;

  constructor() { }

  ngOnInit(): void {
  }

}
