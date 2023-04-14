import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MatDialog} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {DataSource, SelectionModel} from '@angular/cdk/collections';
import {MatSnackBar} from '@angular/material/snack-bar';
import {BehaviorSubject, fromEvent, merge, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {FormDialogComponent} from './dialogs/form-dialog/form-dialog.component';
import {DeleteDialogComponent} from './dialogs/delete/delete.component';
import {MatMenuTrigger} from '@angular/material/menu';
import {UnsubscribeOnDestroyAdapter} from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import {Teacher} from "../../../core/models/teacher";
import {TeacherService} from "../../../core/service/teacher.service";
import {AuthService} from "../../../core/service/auth.service";

@Component({
  selector: 'app-all-teachers',
  templateUrl: './all-teachers.component.html',
  styleUrls: ['./all-teachers.component.sass'],
})
export class AllTeachersComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit {
  displayedColumns = [
    'select',
    'image',
    'firstName',
    'lastName',
    'email',
    'department',
    'gender',
    'degree',
    'mobile',
    'actions',
  ];
  exampleDatabase: TeacherService | null;
  dataSource: ExampleDataSource | null;
  selection = new SelectionModel<Teacher>(true, []);
  id: number;
  teachers: Teacher | null;


  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public teachersService: TeacherService,
    private snackBar: MatSnackBar,
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

  editCall(row) {
    this.id = row.user.id;
    let tempDirection;
    const dialogRef = this.dialog.open(FormDialogComponent, {
      data: {
        teachers: row,
        action: 'edit',
      },
      direction: tempDirection,
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.teachersService.updateTeacher(row.user.id, result.updateObject, result.department)
          .subscribe((res) => {
            console.log(res)
            const foundIndex = this.exampleDatabase.dataChange.value.findIndex(
              (x) => x.user.id === this.id
            );
            const updatedTeacher = Object.assign({}, this.teachersService.getDialogData().teacher);
            updatedTeacher.department = result.department;
            this.exampleDatabase.dataChange.value[foundIndex] = updatedTeacher;
            this.loadData();
            this.refreshTable();
            this.showNotification(
              'black',
              'Edit Record Successfully...!!!',
              'bottom',
              'center'
            );
          })
      }
    });
  }

  deleteItem(row) {
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
      if (result === 1) {
        const foundIndex = this.exampleDatabase.dataChange.value.findIndex(
          (x) => x.user.id === this.id
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
      }
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
    this.authService = new AuthService(this.httpClient);
    this.dataSource = new ExampleDataSource(
      this.exampleDatabase,
      this.paginator,
      this.sort,
      this.authService,
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

  // context menu
  onContextMenu(event: MouseEvent, item: Teacher) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
    this.contextMenu.menuData = {item: item};
    this.contextMenu.menu.focusFirstItem('mouse');
    this.contextMenu.openMenu();
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
  userId : number;
  user_id: string;
  role: any
  constructor(
    public exampleDatabase: TeacherService,
    public paginator: MatPaginator,
    public _sort: MatSort,
    private authService: AuthService,

  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
    this.user_id = localStorage.getItem('id');
    this.userId = parseInt(this.user_id)
    this.role = this.authService.currentUserValue.role[0];

  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Teacher[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this.exampleDatabase.dataChange,
      this._sort.sortChange,
      this.filterChange,
      this.paginator.page,
    ];
    if (this.role === 'Super_Admin') {
      this.exampleDatabase.getAllTeacherss();
    }
    else if (this.role === 'head_super_department') {
      this.exampleDatabase.getSuperDepId(this.userId).subscribe(res=>{
        this.exampleDatabase.getSuperDepartmentTeachers(res);

      })

    }else if (this.role === 'head_sub_department') {
      this.exampleDatabase.getSubDepId(this.userId).subscribe(res=>{
        this.exampleDatabase.getSubDepartmentTeachers(res);

      })

    }
    return merge(...displayDataChanges).pipe(
      map(() => {
        // Filter data
        this.filteredData = this.exampleDatabase.data
          .slice()
          .filter((teachers: Teacher) => {
            const searchStr = (
              teachers.user.firstName +
              teachers.user.lastName +
              teachers.sub_department +
              teachers.user.gender +
              teachers.degree +
              teachers.user.email +
              teachers.user.mobile_phone
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

  disconnect() {
  }

  /** Returns a sorted copy of the database data. */
  sortData(data: Teacher[]): Teacher[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }
    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';
      switch (this._sort.active) {
        case 'id':
          [propertyA, propertyB] = [a.user.id, b.user.id];
          break;
        case 'firstName':
          [propertyA, propertyB] = [a.user.firstName, b.user.firstName];
          break;
        case 'lastName':
          [propertyA, propertyB] = [a.user.lastName, b.user.lastName];
          break;
        case 'email':
          [propertyA, propertyB] = [a.user.email, b.user.email];
          break;
        case 'department':
          [propertyA, propertyB] = [a.sub_department.name, b.sub_department.name];
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
