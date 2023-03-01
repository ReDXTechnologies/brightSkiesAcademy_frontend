import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, fromEvent, merge, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatMenuTrigger } from '@angular/material/menu';
import { SelectionModel } from '@angular/cdk/collections';
import { CourseDetailsComponent } from './form/course-details.component';
import { DeleteComponent } from './delete/delete.component';
import {TeacherService} from "../../../core/service/teacher.service";
import {Course} from "../../../core/models/course";
import {UnsubscribeOnDestroyAdapter} from "../../../shared/UnsubscribeOnDestroyAdapter";
import {Teacher} from "../../../core/models/teacher";
import {CourseService} from "../../../core/service/course.service";

@Component({
  selector: 'app-pending-courses',
  templateUrl: './pending-courses.component.html',
  styleUrls: ['./pending-courses.component.sass'],
})
export class PendingCoursesComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit
{
  filterToggle = false;
  displayedColumns = [
    'select',
    'image',
    'title',
    'speciality',
    'workload',
    'nbr_of_lessons',
    'level',
    'vm_characteristics',
    'creation_date',
    'actions',
  ];
  exampleDatabase: CourseService | null;
  dataSource: ExampleDataSource | null;
  selection = new SelectionModel<Course>(true, []);
  id: number;
  courses: Course | null;

  breadscrums = [
    {
      title: 'Courses',
      items: [],
      active: 'pending courses',
    },
  ];
  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public courseService: CourseService,
    private snackBar: MatSnackBar
  ) {
    super();
  }
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('filter', { static: true }) filter: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: '0px', y: '0px' };

  ngOnInit() {
    this.loadData();
  }
  refresh() {
    this.loadData();
  }

  detailsCall(row) {
    let tempDirection;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }
    this.dialog.open(CourseDetailsComponent, {
      data: {
        courses: row,
        action: 'details',
      },
      direction: tempDirection,
      height: '70%',
      width: '35%',
    });
  }
  toggleStar(row) {
    console.log(row);
  }

  // reject(row) {
  //   this.id = row.id;
  //   let tempDirection;
  //   if (localStorage.getItem('isRtl') === 'true') {
  //     tempDirection = 'rtl';
  //   } else {
  //     tempDirection = 'ltr';
  //   }
  //   const dialogRef = this.dialog.open(DeleteComponent, {
  //     data: row,
  //     direction: tempDirection,
  //   });
  //   this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
  //     console.log(result)
  //       const foundIndex = this.exampleDatabase.dataChange.value.findIndex(
  //         (x) => x.id === this.id
  //       );
  //       // for delete we use splice in order to remove single object from DataService
  //       this.exampleDatabase.dataChange.value.splice(foundIndex, 1);
  //       this.refreshTable();
  //       this.showNotification(
  //         'snackbar-danger',
  //         'Delete Record Successfully...!!!',
  //         'bottom',
  //         'center'
  //       );
  //
  //   });
  // }
  reject(row) {
    this.id = row.id;
    let tempDirection;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }
    const dialogRef = this.dialog.open(DeleteComponent, {
      data: row,
      direction: tempDirection,
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        this.courseService.rejectCourse(this.id).subscribe(
          data => {
            console.log('Course rejected successfully');
            const foundIndex = this.exampleDatabase.dataChange.value.findIndex(
              (x) => x.id === this.id
            );
            this.exampleDatabase.dataChange.value.splice(foundIndex, 1);
            this.refreshTable();
            this.showNotification(
              'snackbar-danger',
              'Delete Record Successfully...!!!',
              'bottom',
              'center'
            );
          },
          error => {
            console.error('Error rejecting course:', error);
            // show error message
          }
        );
      } else {
        console.log('User clicked "Cancel"');
      }
    });
  }

  approve(row) {
    this.id = row.id;
    let tempDirection;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }

    this.subs.sink = this.courseService.approveCourse(this.id).subscribe((result) => {

        const foundIndex = this.exampleDatabase.dataChange.value.findIndex(
          (x) => x.id === this.id
        );
        // for delete we use splice in order to remove single object from DataService
        this.exampleDatabase.dataChange.value.splice(foundIndex, 1);
        this.refreshTable();
        this.showNotification(
          'snackbar-success',
          'course approved Successfully...!!!',
          'center',
          'center'
        );

    });
  }
  private refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }
  /** Whether the number of selected elements matches the total number of rows. */
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
      const index: number = this.dataSource.renderedData.findIndex(
        (d) => d === item
      );
      // console.log(this.dataSource.renderedData.findIndex((d) => d === item));
      this.exampleDatabase.dataChange.value.splice(index, 1);
      this.refreshTable();
      this.selection = new SelectionModel<Course>(true, []);
    });
    this.showNotification(
      'snackbar-danger',
      totalSelect + ' Record Delete Successfully...!!!',
      'bottom',
      'center'
    );
  }
  public loadData() {
    this.exampleDatabase = new CourseService(this.httpClient);
    this.dataSource = new ExampleDataSource(
      this.exampleDatabase,
      this.paginator,
      this.sort
    );
    this.subs.sink = fromEvent(this.filter.nativeElement, 'keyup').subscribe(
      () => {
        if (!this.dataSource) {
          return;
        }
        this.dataSource.filter = this.filter.nativeElement.value;
      }
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
export class ExampleDataSource extends DataSource<Course> {
  filterChange = new BehaviorSubject('');
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: Course[] = [];
  renderedData: Course[] = [];
  constructor(
    public exampleDatabase: CourseService,
    public paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }
  /** Connect function called by the table to retrieve one stream containing the data to render. */

  disconnect() {}

  connect(): Observable<Course[]> {
    const displayDataChanges = [
      this.exampleDatabase.dataChange,
      this._sort.sortChange,
      this.filterChange,
      this.paginator.page,
    ];
    this.exampleDatabase.getPendingCourses();
    return merge(...displayDataChanges).pipe(
      map(() => {
        // Filter data
        this.filteredData = this.exampleDatabase.data
          .slice()
          .filter((teachers: Course) => {
            const searchStr = (
              teachers.title
            ).toLowerCase();
            return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
          });
        // Sort filtered data
        const sortedData = this.sortData(this.filteredData.slice());
        // Grab the page's slice of the filtered sorted data.
        const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
        this.renderedData = sortedData.splice(
          startIndex,
          this.paginator.pageSize
        );
        return this.renderedData;
      })
    );
  }
  /** Returns a sorted copy of the database data. */
  sortData(data: Course[]): Course[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }
    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';
      switch (this._sort.active) {
        case 'title':
          [propertyA, propertyB] = [a.title, b.title];
          break;
        case 'level':
          [propertyA, propertyB] = [a.level, b.level];
          break;
        case 'speciality':
          [propertyA, propertyB] = [a.speciality, b.speciality];
          break;

      }
      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;
      return (
        (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1)
      );
    });
  }
}
