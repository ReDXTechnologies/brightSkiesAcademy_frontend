import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MatDialog} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {DataSource, SelectionModel} from '@angular/cdk/collections';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatMenuTrigger} from '@angular/material/menu';

import {MatTableDataSource} from "@angular/material/table";
import {BehaviorSubject, fromEvent, merge, Observable, Subject} from "rxjs";

import {map} from "rxjs/operators";
import {UnsubscribeOnDestroyAdapter} from "../../../../shared/UnsubscribeOnDestroyAdapter";
import {TeacherService} from "../../../../core/service/teacher.service";
import {Teacher} from "../../../../core/models/teacher";
import {DeleteDialogComponent} from "../delete/delete.component";
import {SelectDepartmentComponent} from "../affect-Department/select-department.component";
import {Course} from "../../../../core/models/course";
import {Router} from "@angular/router";
import {AuthService} from "../../../../core/service/auth.service";


@Component({
  selector: 'app-pending-accounts',
  templateUrl: './pending-hybrid-profiles.component.html',
  styleUrls: ['./pending-hybrid-profiles.component.sass'],
})
export class PendingHybridProfilesComponent extends UnsubscribeOnDestroyAdapter

  implements OnInit {
  filterToggle = false;
  displayedColumns = [
    'select',
    'image',
    'firstName',
    'lastName',
    'email',
    'mobile_phone',
    'gender',
    'requested_sub_department',
    'requested_at',
    'actions',
  ];
  exampleDatabase: TeacherService | null;
  dataSource: ExampleDataSource  | null;
  selection = new SelectionModel<Teacher>(true, []);
  id: number;
  Teachers: Teacher | null;

  isTblLoading = true;
  public refresher: Subject<any> = new Subject();
  isLoadingApprove=false
  isLoadingReject=false
  loadingIndexReject: number = null;
  loadingIndexApprove: number = null;
  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public teacherService: TeacherService,
    private snackBar: MatSnackBar,
    private router: Router,
    private authService: AuthService,


  ) {
    super();
  }

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild('filter', {static: true}) filter: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;
  contextMenuPosition = {x: '0px', y: '0px'};

  ngOnInit() {
    this.loadData();
  }

  refresh() {
    this.loadData();
  }
  public loadData() {
    this.exampleDatabase = new TeacherService(this.httpClient);
    this.authService = new AuthService(this.httpClient);
    this.dataSource = new ExampleDataSource(
      this.exampleDatabase,
      this.paginator,
      this.authService,
    );
  }
  private refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }

  toggleStar(row) {
    console.log(row);
  }

  reject(teacher: Teacher, departmentId: any, i: any) {
    this.isLoadingReject = true;
    this.loadingIndexReject = i;
    this.teacherService.rejectStudentTeacherAccount(teacher.user.id, departmentId).subscribe(
      (res) => {
        if (res) {
          this.isLoadingReject = false;
          this.loadData();
          console.log('Teacher account approved successfully');
          this.showNotification(
            'snackbar-danger',
            'Hybrid profile rejected successfully...!!!',
            'bottom',
            'center'
          );
        }
      },
      (error) => {
        console.error('Error rejecting course:', error);
// show error message
      }
    );
  }
  approve(teacher: Teacher, departmentId : any,i): void {
    this.isLoadingApprove=true
    this.loadingIndexApprove=i
        this.teacherService.approveStudentTeacherAccount(teacher.user.id, departmentId).subscribe(res => {
          if(res) {
            this.isLoadingApprove = false

            this.showNotification(
              'snackbar-success',
              'hybrid profile approved Successfully...!!!',
              'bottom',
              'center'
            );
            this.router.navigate(['/admin/teachers/all-teachers']);
          }},
          error => {
            console.error('Error rejecting course:', error);
            // show error message
          }
        )

  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.renderedData.length;
    return numSelected === numRows;
  }
  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.renderedData.forEach((row) =>
        this.selection.select(row)
      );
  }
  removeSelectedRows() {
    const totalSelect = this.selection.selected.length;
    this.selection.selected.forEach((item) => {
      this.teacherService.rejectTeacherAccount(item.user.id).subscribe(res=>{
        console.log(res)})
      const index: number = this.dataSource.renderedData.findIndex(
        (d) => d === item
      );
      // console.log(this.dataSource.renderedData.findIndex((d) => d === item));
      this.exampleDatabase.dataChange.value.splice(index, 1);
      this.refreshTable();
      this.selection = new SelectionModel<Teacher>(true, []);
    });
    this.showNotification(
      'snackbar-danger',
      totalSelect + ' account rejected Successfully...!!!',
      'bottom',
      'center'
    );
  }
  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, '', {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }
}
export class ExampleDataSource extends DataSource<Teacher> {

  renderedData: Teacher[] = [];
  filterChange = new BehaviorSubject('');
  userId : number;
  user_id: string;
  role: any
  get filter(): string {
    return this.filterChange.value;
  }

  set filter(filter: string) {
    this.filterChange.next(filter);
  }

  filteredData: Course[] = [];
  constructor(
    public exampleDatabase: TeacherService,
    public paginator: MatPaginator,
    private authService: AuthService,

  ) {
    super();
    this.user_id = localStorage.getItem('id');
    this.userId = parseInt(this.user_id)
    this.role = this.authService.currentUserValue.role[0];

  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */

  disconnect() {
  }

  connect(): Observable<Teacher[]> {
    const displayDataChanges = [
      this.exampleDatabase.dataChange,
      this.paginator.page,
    ];
    if (this.role === 'Super_Admin') {
      this.exampleDatabase.getHybridProfilesRequests();
    }
    else if (this.role === 'head_super_department') {
      this.exampleDatabase.getSuperDepId(this.userId).subscribe(res=>{
        this.exampleDatabase.getSuperDepartmentHybridProfilesRequests(res);

      })

    }else if (this.role === 'head_sub_department') {
      this.exampleDatabase.getSubDepId(this.userId).subscribe(res=>{
        this.exampleDatabase.getSubDepartmentHybridProfilesRequests(res);

      })

    }

    return merge(...displayDataChanges).pipe(
      map(() => {
        // Grab the page's slice of the filtered data.
        const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
        this.renderedData = this.exampleDatabase.data.slice(
          startIndex,
          startIndex + this.paginator.pageSize
        );
        return this.renderedData;
      })
    );
  }



}
