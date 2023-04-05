import {Component, Input, OnInit} from '@angular/core';
import {Course} from "../../../../core/models/course";
import {Module, Video} from "../../../../core/models/Module";
import {DisplayCurriculumVideosComponent} from "../displayCurriculumVideos/displayCurriculumVideos.component";
import {MatDialog} from "@angular/material/dialog";

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
  constructor(    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    console.log(this.course.slides)
    this.modules = this.course.modules;
    console.log(this.course.modules[0].labs[0].is_hosted_on_aws)
  }


  displayVideo(video : Video ,index: number, module:any) {
    this.currentVideo = video;
    this.currentVideoIndex = index;
    this.dialog.open(DisplayCurriculumVideosComponent, {
      width: '70%',
      data: { videoUrl: video.video_file ,
        videos: module.videos,
        currentIndex: index,
        module : module
      }
    });
  }

  // nextVideo() {
  //   if (this.currentVideoIndex < this.module.videos.length - 1) {
  //     this.currentVideo = this.module.videos[this.currentVideoIndex + 1];
  //     this.currentVideoIndex++;
  //   }
  // }

}
