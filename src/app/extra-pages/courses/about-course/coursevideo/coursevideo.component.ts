import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {Course} from "../../../../core/models/course";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";

@Component({
  selector: 'app-coursevideo',
  templateUrl: './coursevideo.component.html',
  styleUrls: ['./coursevideo.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CoursevideoComponent implements OnInit {
  @Input() course: Course;
  videoUrl : any

  @Input() videos: any[];
  @Input() selectedIndex: number;

  currentVideoIndex: number;
  currentVideoUrl: SafeResourceUrl;
  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    const url  = this.course.modules[0].videos[0].video_file.toString()
    const realUrl = url.split('?')[0];
    this.videoUrl = decodeURIComponent(realUrl.replace(/\+/g, " "));
    // this.currentVideoIndex = this.selectedIndex;
    // this.currentVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.videos[this.currentVideoIndex].url);

  }
  updateVideoIndex(index: number) {
    const newIndex = this.currentVideoIndex + index;
    if (newIndex >= 0 && newIndex < this.videos.length) {
      this.currentVideoIndex = newIndex;
      this.currentVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.videos[this.currentVideoIndex].url);
    }
  }
}
