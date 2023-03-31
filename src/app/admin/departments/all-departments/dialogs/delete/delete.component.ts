import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {Component, Inject, OnInit} from '@angular/core';
import {DepartmentService} from "../../../../../core/service/department.service";
@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.sass']
})
export class DeleteDialogComponent implements OnInit{
  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public departmentService: DepartmentService
  ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
  confirmDelete(): void {
    if(this.data.deleteSuperDep){
      this.departmentService.deleteSuperDepartment(this.data.row.id);
    }
    else{
      this.departmentService.deleteSubDepartment(this.data.row.id);

    }
  }

  ngOnInit(): void {
    console.log(this.data.row)
    console.log(this.data.deleteSuperDep)
  }
}
