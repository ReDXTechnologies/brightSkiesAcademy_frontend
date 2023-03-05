import {Component, Inject, OnInit} from '@angular/core';

import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Department} from "../../../../core/models/department";
import {DepartmentService} from "../../../../core/service/department.service";


@Component({
  selector: 'app-select-auteur',
  templateUrl: './select-department.component.html',
  styleUrls: ['./select-department.component.css']
})
export class SelectDepartmentComponent implements OnInit {

  departments: Department[];
  member: string;
  department: string;
  teacher = '';


  constructor(private departmentService: DepartmentService,
              private matDialog: MatDialog,
              public dialogRef: MatDialogRef<SelectDepartmentComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.teacher = this.data.payload;


  }

  ngOnInit(): void {
    this.getDepatments();

  }

  private getDepatments() {
    this.departmentService.getDepartments().subscribe(value => {
      if (!!value) {
        this.departments = value;
      }
    });
  }


  onSubmit(): void {

    this.dialogRef.close({data: this.department});

  }

}
