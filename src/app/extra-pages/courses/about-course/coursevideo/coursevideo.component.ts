import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {Course} from "../../../../core/models/course";

@Component({
  selector: 'app-coursevideo',
  templateUrl: './coursevideo.component.html',
  styleUrls: ['./coursevideo.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CoursevideoComponent implements OnInit {
  @Input() course: Course;
  videoUrl : any
  constructor() { }

  ngOnInit(): void {
    const url  = this.course.modules[0].videos[0].video_file.toString()
    const realUrl = url.split('?')[0];
    this.videoUrl = decodeURIComponent(realUrl.replace(/\+/g, " "));
  }

}
