import {Component, Input, OnInit} from '@angular/core';
import {Course} from "../../../../core/models/course";
import {Module, Video} from "../../../../core/models/Module";

@Component({
  selector: 'app-coursecurriculam',
  templateUrl: './coursecurriculam.component.html',
  styleUrls: ['./coursecurriculam.component.scss']
})
export class CoursecurriculamComponent implements OnInit {
  @Input() course: Course;
  modules: Module[]
  currentVideo: Video;
  currentVideoIndex: number;
  constructor() { }

  ngOnInit(): void {
    console.log(this.course.slides)
    this.modules = this.course.modules;
    console.log(this.course.modules[0].labs[0].is_hosted_on_aws)
  }


  displayVideo(video : Video ,index: number) {
    this.currentVideo = video;
    this.currentVideoIndex = index;
  }

  // nextVideo() {
  //   if (this.currentVideoIndex < this.module.videos.length - 1) {
  //     this.currentVideo = this.module.videos[this.currentVideoIndex + 1];
  //     this.currentVideoIndex++;
  //   }
  // }

}
