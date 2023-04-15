import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Component, Inject, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators,} from '@angular/forms';

import {DatePipe} from "@angular/common";
import {CourseService} from "../../../../../../core/service/course.service";

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
  loadingAdd = false;
  loadingEdit = false;
  // @ts-ignore


  constructor(
    public dialogRef: MatDialogRef<AddLabComponent>,
    private datePipe: DatePipe,
    private courseService: CourseService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: UntypedFormBuilder
  ) {
    // Set the defaults
    if(this.data.editLab){
      this.dialogTitle = 'Edit lab course for module '+this.data.moduleName;

    }else{
      this.dialogTitle = 'Add lab course for module '+this.data.moduleName;
    }

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
    if(this.data.editLab){
      return this.fb.group({
        title: [this.data.lab.title],
        description: [this.data.lab.description],
        session_duration: [this.data.lab.session_duration],
        nb_sessions: [this.data.lab.nb_sessions],
        vm_characteristics: [this.data.lab.vm_characteristics],
        labFiles: [this.data.lab.labFiles],
        packages_requirements: [this.data.lab.packages_requirements],
        libraries_requirements: [this.data.lab.libraries_requirements],
        hosting_platform: [this.data.lab.hosting_platform],
      });
    }else{
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
    this.loadingAdd = true;

    const formData = new FormData();

    if (this.labForm.value.hosting_platform == 'aws') {
      // Add the lab's session duration, number of sessions, VM characteristics, and file uploads to the FormData object
      formData.append(`is_hosted_on_aws`, 'True');
      formData.append(`title`, this.labForm.value.title);
      formData.append(`description`, this.labForm.value.description);
      formData.append(`session_duration`, this.labForm.value.session_duration);
      formData.append(`nb_sessions`, this.labForm.value.nb_sessions);
      formData.append(`vm_characteristics`, this.labForm.value.vm_characteristics);
      formData.append(`labFiles`, this.labForm.value.labFiles);
      formData.append(`libraries_requirements`, this.labForm.value.libraries_requirements);
      formData.append(`packages_requirements`, this.labForm.value.packages_requirements);
      formData.append(`module`, this.data.moduleId);
    } else {
      formData.append(`is_hosted_on_aws`, 'False');
      formData.append(`title`, this.labForm.value.title);
      formData.append(`description`, this.labForm.value.description);
      formData.append(`labFiles`, this.labForm.value.labFiles);
      formData.append(`libraries_requirements`, this.labForm.value.libraries_requirements);
      formData.append(`packages_requirements`, this.labForm.value.packages_requirements);
      formData.append(`module`, this.data.moduleId);
    }
    const data = {
      formData
    };
    this.courseService.addLabInModule(this.data.courseId, formData , this.data.moduleId).subscribe(res => {
        if(res){
          console.log(res)
          this.loadingAdd = false;

          this.dialogRef.close(res);
        }
      },
      error => {
        console.error(error);
        // show error message
      })

    // Inside a method in FormComponent that updates teacher data

    this.dialogRef.close(data);

  }
  public confirmEdit(): void {
    this.loadingEdit = true;

    const formData = new FormData();

    if (this.labForm.value.hosting_platform == 'aws') {
      // Add the lab's session duration, number of sessions, VM characteristics, and file uploads to the FormData object
      formData.append(`is_hosted_on_aws`, 'True');
      formData.append(`title`, this.labForm.value.title);
      formData.append(`description`, this.labForm.value.description);
      formData.append(`session_duration`, this.labForm.value.session_duration);
      formData.append(`nb_sessions`, this.labForm.value.nb_sessions);
      formData.append(`vm_characteristics`, this.labForm.value.vm_characteristics);
      formData.append(`module`, this.data.moduleId);
    } else {
      formData.append(`is_hosted_on_aws`, 'False');
      formData.append(`title`, this.labForm.value.title);
      formData.append(`description`, this.labForm.value.description);
      formData.append(`module`, this.data.moduleId);
    }
    if (this.selectedLabFiles) {
      formData.append('labFiles',  this.selectedLabFiles);
    }
    if (this.selectedLibrariesRequirements) {
      formData.append('libraries_requirements',  this.selectedLibrariesRequirements);
    }
    if (this.selectedPackagesRequirements) {
      formData.append('packages_requirements',  this.selectedPackagesRequirements);
    }
    const data = {
      formData
    };
    this.courseService.editLabInModule(this.data.courseId, formData , this.data.moduleId , this.data.labId).subscribe(res => {
        if(res){
          console.log(res)
          this.loadingEdit = false;

          this.dialogRef.close(res);
        }
      },
      error => {
        console.error(error);
        // show error message
      })

    // Inside a method in FormComponent that updates teacher data

    this.dialogRef.close(data);

  }
}
