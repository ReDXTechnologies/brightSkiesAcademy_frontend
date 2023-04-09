import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MatDialog} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {DataSource, SelectionModel} from '@angular/cdk/collections';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatMenuTrigger} from '@angular/material/menu';
import {TeacherService} from "../../../../core/service/teacher.service";
import {Teacher} from "../../../../core/models/teacher";
import {DeleteDialogComponent} from "../delete/delete.component";
import {MatTableDataSource} from "@angular/material/table";
import {BehaviorSubject, fromEvent, merge, Observable, Subject} from "rxjs";
import {Course} from "../../../../core/models/course";
import {CourseService} from "../../../../core/service/course.service";
import {map} from "rxjs/operators";
import {UnsubscribeOnDestroyAdapter} from "../../../../shared/UnsubscribeOnDestroyAdapter";
import {SelectDepartmentComponent} from "../affect-Department/select-department.component";

@Component({
  selector: 'app-pending-accounts',
  templateUrl: './pending-accounts.component.html',
  styleUrls: ['./pending-accounts.component.sass'],
})
export class PendingAccountsComponent   extends UnsubscribeOnDestroyAdapter

  implements OnInit {
  filterToggle = false;
  displayedColumns = [
    'select',
    'firstName',
    'lastName',
    'email',
    'mobile_phone',
    'gender',
    'actions',
  ];
  exampleDatabase: TeacherService | null;
  dataSource: ExampleDataSource  | null;
  selection = new SelectionModel<Teacher>(true, []);
  id: number;
  Teachers: Teacher | null;

  breadscrums = [
    {
      title: 'Teachers',
      items: [],
      active: 'pending Teachers',
    },
  ];
  isTblLoading = true;
  public refresher: Subject<any> = new Subject();


  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public teacherService: TeacherService,
    private snackBar: MatSnackBar
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
    this.dataSource = new ExampleDataSource(
      this.exampleDatabase,
      this.paginator,
    );
  }
  private refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }

  toggleStar(row) {
    console.log(row);
  }

  reject(row) {
    this.id = row.user.id;
    let tempDirection;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: row,
      direction: tempDirection,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        const foundIndex = this.exampleDatabase.dataChange.value.findIndex(
          (x) => x.user.id === this.id
        );
        this.exampleDatabase.dataChange.value.splice(foundIndex, 1);
        this.refreshTable();
        console.log('teacher rejected successfully');
        this.showNotification(
          'snackbar-danger',
          'Reject account Successfully...!!!',
          'bottom',
          'center'
        );
      }
      error => {
        console.error('Error rejecting course:', error);
        // show error message
      }

    });
  }
  affect(teacher: Teacher): void {
    const dialogRef = this.dialog.open(SelectDepartmentComponent, {
      width: '350px',
      data: {payload: teacher.user.firstName+' '+teacher.user.lastName},
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.teacherService.approveTeacherAccount(teacher.user.id, result.data.id).subscribe(res => {
          const foundIndex = this.exampleDatabase.dataChange.value.findIndex(
            (x) => x.user.id === this.id
          );
          this.exampleDatabase.dataChange.value.splice(foundIndex, 1);
          this.refreshTable();
          console.log('teacher account approved successfully');
          this.showNotification(
            'snackbar-success',
            'Approve account Successfully...!!!',
            'bottom',
            'center'
          );
        },
        error => {
          console.error('Error rejecting course:', error);
          // show error message
        })
      }
    });

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
  ) {
    super();

  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */

  disconnect() {
  }

  connect(): Observable<Teacher[]> {
    const displayDataChanges = [
      this.exampleDatabase.dataChange,
      this.paginator.page,
    ];

    this.exampleDatabase.getAllInactiveTeachers();

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
