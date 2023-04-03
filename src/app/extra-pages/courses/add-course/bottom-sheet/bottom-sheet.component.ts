import {Component, Input} from '@angular/core';
import {
  MatBottomSheet,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Instance_guidanceComponent} from "../instances_guide/instance_guidance.component";
@Component({
  selector: 'app-bottom-sheet',
  templateUrl: './bottom-sheet.component.html',
  styleUrls: ['./bottom-sheet.component.scss'],
})
export class BottomSheetComponent {
  @Input() file: boolean;

  instance_guidance?: MatDialogRef<Instance_guidanceComponent>;

  constructor(private _bottomSheet: MatBottomSheet,    private dialogModel: MatDialog,
  ) {

  }
  openBottomSheet(): void {
    this._bottomSheet.open(BottomSheetOverviewExampleSheetComponent);
  }
  dialog() {
    this.instance_guidance = this.dialogModel.open(Instance_guidanceComponent);
  }
  openDialog(): void {
    this.dialogModel.open(Instance_guidanceComponent, {
      width: '640px',
      disableClose: true,
    });
  }
}
@Component({
  selector: 'app-bottom-sheet-overview-example-sheet',
  templateUrl: 'bottom-sheet-overview-example-sheet.html',
})
export class BottomSheetOverviewExampleSheetComponent {
  constructor(
    private _bottomSheetRef: MatBottomSheetRef<BottomSheetOverviewExampleSheetComponent>
  ) {}
  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }


}
