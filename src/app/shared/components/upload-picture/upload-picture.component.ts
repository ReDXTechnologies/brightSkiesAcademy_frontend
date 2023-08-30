import { Component, ElementRef, HostListener, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
@Component({
  selector: 'app-upload-picture',
  templateUrl: './upload-picture.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: UploadPictureComponent,
      multi: true,
    },
  ],
  styleUrls: ['./upload-picture.component.scss'],
})
export class UploadPictureComponent implements ControlValueAccessor {
  @Input() progress;
  @Input() fileType;
  @Input() loading;
  @Input() onClickFunction: (userId: number) => void;
  onChange: Function;
  userId: number = 0;

  public file: File | null = null;

  @HostListener('change', ['$event.target.files']) emitFiles(event: FileList) {
    const file = event && event.item(0);
    //console.log('tttttttttttt',file)

    this.onChange(file);
    this.file = file;
    //console.log('tttttttttttt',this.file.name)
  }

  constructor(private host: ElementRef<HTMLInputElement>) {}

  writeValue(value: null) {
    // clear file input
    this.host.nativeElement.value = '';
    this.file = null;
  }

  registerOnChange(fn: Function) {
    this.onChange = fn;
  }

  registerOnTouched(fn: Function) {}
}
