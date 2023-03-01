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
import {TeacherService} from "../../../core/service/teacher.service";
import {UnsubscribeOnDestroyAdapter} from "../../../shared/UnsubscribeOnDestroyAdapter";
import {Teacher} from "../../../core/models/teacher";
import {DeleteDialogComponent} from "../delete/delete.component";

@Component({
  selector: 'app-pending-accounts',
  templateUrl: './pending-accounts.component.html',
  styleUrls: ['./pending-accounts.component.sass'],
})
export class PendingAccountsComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit
{
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
  dataSource: ExampleDataSource | null;
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
  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public teacherService: TeacherService,
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


  toggleStar(row) {
    console.log(row);
  }

  reject(row) {
    this.id = row.id;
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
    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      console.log(result)
      const foundIndex = this.exampleDatabase.dataChange.value.findIndex(
        (x) => x.id === this.id
      );
      // for delete we use splice in order to remove single object from DataService
      this.exampleDatabase.dataChange.value.splice(foundIndex, 1);
      this.refreshTable();
      this.showNotification(
        'snackbar-danger',
        'Delete Record Successfully...!!!',
        'bottom',
        'center'
      );

    });
  }
  // approve(row) {
  //   this.id = row.id;
  //   let tempDirection;
  //   if (localStorage.getItem('isRtl') === 'true') {
  //     tempDirection = 'rtl';
  //   } else {
  //     tempDirection = 'ltr';
  //   }
  //
  //   this.subs.sink = this.teacherService.approveTeacher(this.id).subscribe((result) => {
  //
  //     const foundIndex = this.exampleDatabase.dataChange.value.findIndex(
  //       (x) => x.id === this.id
  //     );
  //     // for delete we use splice in order to remove single object from DataService
  //     this.exampleDatabase.dataChange.value.splice(foundIndex, 1);
  //     this.refreshTable();
  //     this.showNotification(
  //       'snackbar-success',
  //       'Teacher approved Successfully...!!!',
  //       'center',
  //       'center'
  //     );
  //
  //   });
  // }
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
      this.selection = new SelectionModel<Teacher>(true, []);
    });
    this.showNotification(
      'snackbar-danger',
      totalSelect + ' Record Delete Successfully...!!!',
      'bottom',
      'center'
    );
  }
  public loadData() {
    this.exampleDatabase = new TeacherService(this.httpClient);
    this.dataSource = new ExampleDataSource(
      this.exampleDatabase,
      this.paginator,
      this.sort
    );
    // this.subs.sink = fromEvent(this.filter.nativeElement, 'keyup').subscribe(
    //   () => {
    //     if (!this.dataSource) {
    //       return;
    //     }
    //     this.dataSource.filter = this.filter.nativeElement.value;
    //   }
    // );
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
  filterChange = new BehaviorSubject('');
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: Teacher[] = [];
  renderedData: Teacher[] = [];
  constructor(
    public exampleDatabase: TeacherService,
    public paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }
  /** Connect function called by the table to retrieve one stream containing the data to render. */

  disconnect() {}

  connect(): Observable<Teacher[]> {
    const displayDataChanges = [
      this.exampleDatabase.dataChange,
      this._sort.sortChange,
      this.filterChange,
      this.paginator.page,
    ];
    this.exampleDatabase.getAllInactiveTeacherss();
    return merge(...displayDataChanges).pipe(
      map(() => {
        // Filter data
        this.filteredData = this.exampleDatabase.data
          .slice()
          .filter((teachers: Teacher) => {
            const searchStr = (
              teachers.firstName
            ).toLowerCase();
            return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
          });
        // Sort filtered data
        // const sortedData = this.sortData(this.filteredData.slice());
        // Grab the page's slice of the filtered sorted data.
        const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
        // this.renderedData = sortedData.splice(
        //   startIndex,
        //   this.paginator.pageSize
        // );
        return this.renderedData;
      })
    );
  }
  /** Returns a sorted copy of the database data. */
}
