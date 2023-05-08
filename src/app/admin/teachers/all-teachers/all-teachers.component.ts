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
  firstName = '';
  lastName = '';
  departmentName = '';
  role:any
  user_id:any
  userId:any
  currentPage = 1;
  next = 1;
  totalPages = 0;
  returnedItems = 8;
  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public teachersService: TeacherService,
    private snackBar: MatSnackBar,
    private authService: AuthService,


  ) {
    super();
    this.user_id = localStorage.getItem('id');
    this.userId = parseInt(this.user_id)
    this.role = this.authService.currentUserValue.role[0];
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
  getRange(num: number): number[] {
    console.log(Math.ceil(num/this.returnedItems))
    return Array(num).fill(0).map((_, i) => i + 1);
  }

  public loadData() {
    this.exampleDatabase = new TeacherService(this.httpClient);
    this.authService = new AuthService(this.httpClient);
    this.dataSource = new ExampleDataSource(
      this.exampleDatabase,
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

  onPageChanged(page: number) {
    this.currentPage = page;
    if (this.role === 'Super_Admin') {
      this.exampleDatabase.getTeachersperPage(this.currentPage).subscribe(data=>{
        this.exampleDatabase.dataChange.next(data.results);
      });
    }
    else if (this.role === 'head_super_department') {
      this.exampleDatabase.getSuperDepId(this.userId).subscribe(res=>{
        this.exampleDatabase.getSuperDepTeachersperPage(res,this.currentPage).subscribe(data=>{
          this.exampleDatabase.dataChange.next(data.results);
        });
      })
    }else if (this.role === 'head_sub_department') {
      this.exampleDatabase.getSuperDepId(this.userId).subscribe(res=>{
        this.exampleDatabase.getSubDepTeachersperPage(res,this.currentPage).subscribe(data=>{
          this.exampleDatabase.dataChange.next(data.results);
        });
      })
    }
  }
  next_previous(action: string) {
    if (action === 'next') {
      this.currentPage = Math.min(this.currentPage + 1, this.dataSource.count);
      console.log(this.currentPage)
    } else if (action === 'previous') {
      this.currentPage = Math.max(this.currentPage - 1, 1);
      console.log(this.currentPage)
    }
      if (this.role === 'Super_Admin') {
        this.exampleDatabase.getTeachersperPage(this.currentPage).subscribe(data=>{
          this.exampleDatabase.dataChange.next(data.results);
        });
      }
      else if (this.role === 'head_super_department') {
        this.exampleDatabase.getSuperDepId(this.userId).subscribe(res=>{
          this.exampleDatabase.getSuperDepTeachersperPage(res,this.currentPage).subscribe(data=>{
            this.exampleDatabase.dataChange.next(data.results);
          });
        })
      }else if (this.role === 'head_sub_department') {
        this.exampleDatabase.getSuperDepId(this.userId).subscribe(res=>{
          this.exampleDatabase.getSubDepTeachersperPage(res,this.currentPage).subscribe(data=>{
            this.exampleDatabase.dataChange.next(data.results);
          });
        })
      }
  }
  onSearchFirstName(query: string) {
    console.log(query)
    this.firstName = query;
    this.getFilteredTeachers()
  }
  onSearchLastName(query: string) {
    console.log(query)
    this.lastName = query;
    this.getFilteredTeachers()
  }
  onSearchDepartment(query: string) {
    console.log(query)
    this.departmentName = query;
    this.getFilteredTeachers()
  }
  getFilteredTeachers() {
    if (this.role === 'Super_Admin') {
      this.teachersService.getFilteredTeachersGrid(this.firstName, this.lastName, this.departmentName).subscribe(res=>{
        this.exampleDatabase.dataChange.next(res.results);
        this.dataSource.totalItems = res.count
        this.dataSource.count = Math.ceil(res.count/8)
        console.log("************************",this.dataSource.count)
      })
    }
    else if (this.role === 'head_super_department') {
      console.log('here')
      this.exampleDatabase.getSuperDepId(this.userId).subscribe(res=>{
        this.teachersService.getSuperDepFilteredTeachersGrid(res,this.firstName, this.lastName, this.departmentName).subscribe(res=>{
          this.exampleDatabase.dataChange.next(res.results);
          this.dataSource.totalItems = res.count
          this.dataSource.count = Math.ceil(res.count/this.returnedItems)
        })
      })

    }else if (this.role === 'head_sub_department') {
      this.exampleDatabase.getSubDepId(this.userId).subscribe(res=>{
        this.teachersService.getSubDepFilteredTeachersGrid(res,this.firstName, this.lastName, this.departmentName).subscribe(res=>{
          this.exampleDatabase.dataChange.next(res.results);
          this.dataSource.totalItems = res.count
          this.dataSource.count = Math.ceil(res.count/this.returnedItems)
        })
      })

    }



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
  count: number;
  totalItems: number;
  next: string;
  previous: string;
  renderedData: Teacher[] = [];
  userId : number;
  user_id: string;
  role: any
  constructor(
    public exampleDatabase: TeacherService,
    public _sort: MatSort,
    private authService: AuthService,

  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this.user_id = localStorage.getItem('id');
    this.userId = parseInt(this.user_id)
    this.role = this.authService.currentUserValue.role[0];

  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Teacher[]> {
    const displayDataChanges = [
      this.exampleDatabase.dataChange,
      this._sort.sortChange,
      this.filterChange,
    ];
    if (this.role === 'Super_Admin') {
      this.exampleDatabase.getAllTeacherss(1);
    }
    else if (this.role === 'head_super_department') {
      console.log('here')
      this.exampleDatabase.getSuperDepId(this.userId).subscribe(res=>{
        this.exampleDatabase.getSuperDepartmentTeachers(res,1);

      })

    }else if (this.role === 'head_sub_department') {
      this.exampleDatabase.getSubDepId(this.userId).subscribe(res=>{
        this.exampleDatabase.getSubDepartmentTeachers(res);

      })

    }
    return merge(...displayDataChanges).pipe(
      map(() => {
        this.exampleDatabase.countChange.subscribe(count => {
          this.count=count
        });
        this.exampleDatabase.totalItems.subscribe(count => {
          this.totalItems=count
        });
        // Filter data
        this.filteredData = this.exampleDatabase.data

          .slice();


        return this.filteredData;
      })
    );
  }

  disconnect() {
  }

}
