import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Component, Inject, OnInit} from '@angular/core';
import {
  FormArray, FormBuilder,
  FormControl, FormGroup,
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';

import {DatePipe} from "@angular/common";
import {CourseService} from "../../../../../../core/service/course.service";

@Component({
  selector: 'app-add-quizz',
  templateUrl: './add-quizz.component.html',
  styleUrls: ['./add-quizz.component.sass'],
})
export class AddQuizzComponent implements OnInit {
  action: string;
  dialogTitle: string;
  loadingAdd = false;
  loadingEdit = false;
  quizForm: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<AddQuizzComponent>,
    private datePipe: DatePipe,
    private courseService: CourseService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: UntypedFormBuilder,
  ) {
    // Set the defaults
    if(this.data.editQuizz){
      this.dialogTitle = 'Edit quiz for module '+this.data.moduleName;

    }else{
      this.dialogTitle = 'Add a quiz for module '+this.data.moduleName;
    }

  }

  ngOnInit() {
    console.log(this.data.quizz);
    if (this.data.editQuizz) {
      this.quizForm = this.fb.group({
        name: [this.data.quizz.name, Validators.required],
        questions: this.fb.array([])
      });
      this.fillQuestions(this.data.quizz.questions);
    } else {
      this.quizForm = this.fb.group({
        name: ['', Validators.required],
        questions: this.fb.array([])
      });
    }
  }

  fillQuestions(questions: any[]) {
    const quizQuestions = this.quizForm.get('questions') as FormArray;
    questions.forEach(question => {
      const questionForm = this.fb.group({
        id: [question.id],
        text: [question.text, Validators.required],
        options: this.fb.array([])
      });
      this.fillOptions(question.options, questionForm);
      quizQuestions.push(questionForm);
    });
  }

  fillOptions(options: any[], questionForm: FormGroup) {
    const questionOptions = questionForm.get('options') as FormArray;
    options.forEach(option => {
      const optionForm = this.fb.group({
        text: [option.text, Validators.required],
        is_correct: [option.is_correct],
        id: [option.id],
      });
      questionOptions.push(optionForm);
    });
  }
  get questions() {
    return this.quizForm.get('questions') as FormArray;
  }

  get questionControls() {
    return (this.quizForm.get('questions') as FormArray).controls;
  }
  optionsControls(questionIndex: number): FormArray {
    const question = this.questions.controls[questionIndex] as FormGroup;
    return question.controls.options as FormArray;
  }



  onAddQuestion() {
    const question = this.fb.group({
      text: ['',Validators.required],
      options: this.fb.array([],Validators.required)
    });
    (this.quizForm.get('questions') as FormArray).push(question);
  }

  onAddOption(questionIndex: number) {
    const option = this.fb.group({
      text: ['',Validators.required],
      is_correct: [false]
    });
    (((this.quizForm.get('questions')as FormArray).controls[questionIndex].get('options')) as FormArray ).push(option);


  }
  onRemoveQuestion(questionIndex: number) {
    (this.quizForm.get('questions') as FormArray).removeAt(questionIndex);
  }

  onRemoveOption(questionIndex: number, optionIndex: number) {

    const options = (this.quizForm.get('questions') as FormArray).at(questionIndex).get('options') as FormArray;
    options.removeAt(optionIndex);
  }


  onSubmit() {
    if(this.data.editQuizz){
      this.loadingEdit = true;

      this.courseService.editQuizzInModule(this.quizForm.value,this.data.moduleId,this.data.quizzId).subscribe(res=>{
        console.log(res);
        if(res){
          this.loadingEdit = false;
          this.dialogRef.close(res);
        }
      })
    }else{
      this.loadingAdd = true;

      this.courseService.addQuizzInModule(this.quizForm.value,this.data.moduleId).subscribe(res=>{
        console.log(res);
        if(res){
          this.loadingAdd = false;
          this.dialogRef.close(res);
        }
      })
    }

  }

  deleteQuestion(questionId:number,i:number){
    this.courseService.deleteQuestionInQuizzInModule(this.data.moduleId,this.data.quizzId,questionId).subscribe(res=>{
        this.onRemoveQuestion(i)
      }
    )
  }
  deleteOption(questionId:number,optionId:any,i:number,j:number){
    this.courseService.deleteOptionInQuestionInQuizzInModule(this.data.quizzId,questionId,optionId).subscribe(res=>{
        this.onRemoveOption(i,j)
      }
    )
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

}
