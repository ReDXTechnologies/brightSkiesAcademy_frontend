import {Component, Inject, Input, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {Course} from "../../../../core/models/course";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-curriculum-video',
  templateUrl: './displayCurriculumVideos.component.html',
  styleUrls: ['./displayCurriculumVideos.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class DisplayCurriculumVideosComponent implements OnInit {
  @Input() course: Course;
  @ViewChild('videoPlayer') videoElement: any;
  volume: number = 1;
  isMuted: boolean = false;
  video_url :any

  constructor(private sanitizer: DomSanitizer,    public dialogRef: MatDialogRef<DisplayCurriculumVideosComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,) { }

  ngOnInit(): void {
    console.log(this.data.module)
    this.video_url = this.data.videoUrl

  }




  getPreviousVideo() {
    if (this.data.currentIndex > 0) {
      this.data.currentIndex--;
      this.video_url = this.data.videos[this.data.currentIndex].video_file;
      const videoPlayer: HTMLVideoElement = document.querySelector('video');
      videoPlayer.load();
      videoPlayer.play();
    }
  }

  getNextVideo() {
    if (this.data.currentIndex < this.data.videos.length - 1) {
      this.data.currentIndex++;
      this.video_url = this.data.videos[this.data.currentIndex].video_file;
      console.log(this.video_url)
      const videoPlayer: HTMLVideoElement = document.querySelector('video');
      videoPlayer.load();
      videoPlayer.play();
    }
  }

  changeVideo(index: number) {
    this.data.currentIndex = index;
    this.video_url = this.data.videos[this.data.currentIndex].video_file;
    const videoPlayer: HTMLVideoElement = document.querySelector('video');
    videoPlayer.load();
    videoPlayer.play();
  }

}
