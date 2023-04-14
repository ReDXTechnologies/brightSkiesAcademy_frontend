import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Component, Inject, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators,} from '@angular/forms';

import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-form-dialog',
  templateUrl: './add-lab.component.html',
  styleUrls: ['./add-lab.component.sass'],
})
export class AddLabComponent implements OnInit {
  action: string;
  dialogTitle: string;
  labForm: UntypedFormGroup;
  selectedLabFiles: File = null;
  selectedLibrariesRequirements: File = null;
  selectedPackagesRequirements: File = null;

  // @ts-ignore


  constructor(
    public dialogRef: MatDialogRef<AddLabComponent>,
    private datePipe: DatePipe,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: UntypedFormBuilder
  ) {
    // Set the defaults
    this.dialogTitle = 'Add lab course for module '+this.data.moduleName;

    this.labForm = this.createLabForm();
  }

  ngOnInit(): void {
  }

  formControl = new UntypedFormControl('', [
    Validators.required,
    // Validators.email,
  ]);

  getErrorMessage() {
    return this.formControl.hasError('required')
      ? 'Required field'
      : this.formControl.hasError('email')
        ? 'Not a valid email'
        : '';
  }

  createLabForm(): UntypedFormGroup {
    return this.fb.group({
      title: [''],
      description: [''],
      session_duration: [''],
      nb_sessions: [''],
      vm_characteristics: [''],
      labFiles: [''],
      packages_requirements: [''],
      libraries_requirements: [''],
      hosting_platform: [''],
    });
  }

  onLabFilesSelected(event) {
    this.selectedLabFiles = event.target.files[0];
  }


  onLibrariesRequirementsSelected(event) {
    this.selectedLibrariesRequirements = <File>event.target.files[0];
  }

  onPackagesRequirementsSelected(event) {
    this.selectedPackagesRequirements = <File>event.target.files[0];
  }
  submit() {
    // emppty stuff
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  // Expose the Subject as an Observable

  public confirmAdd(): void {

    console.log(this.labForm.value.department)
    const user = {
      "firstName": this.labForm.value.firstName,
      "lastName": this.labForm.value.lastName,
      "gender": this.labForm.value.gender,
      "email": this.labForm.value.email,
      "mobile_phone": this.labForm.value.mobile_phone
    }

    const updateObject = {
      user,
      "degree": this.labForm.value.degree,
    };
    const department = this.labForm.value.department

    const data = {
      updateObject,
      department
    };

    // Inside a method in FormComponent that updates teacher data

    this.dialogRef.close(data);

  }
}
