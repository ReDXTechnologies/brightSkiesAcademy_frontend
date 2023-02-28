import { Component, OnInit } from '@angular/core';
import {TeacherService} from "../../core/service/teacher.service";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.sass'],
})
export class SettingsComponent implements OnInit {
  breadscrums = [
    {
      title: 'Settings',
      items: ['Teacher'],
      active: 'Settings',
    },
  ];
  constructor(private teacherService: TeacherService) {}

  ngOnInit(): void {}

}
