import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ChangeDetectorRef, Component, Inject, OnInit, ViewChild} from '@angular/core';
import {
  FormArray, FormBuilder,
  FormControl, FormGroup,
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';

import {DatePipe} from "@angular/common";
import {CourseService} from "../../../../../core/service/course.service";
import {interval} from "rxjs";

@Component({
  selector: 'app-add-quizz',
  templateUrl: './start-quizz.component.html',
  styleUrls: ['./start-quizz.component.sass'],
})
export class StartQuizzComponent implements OnInit {
  action: string;
  dialogTitle: string;
  loadingAdd = false;
  loadingEdit = false;
  quizForm: FormGroup;
  @ViewChild('cdRef') cdRef: ChangeDetectorRef;
  public name: string = "";
  public questionList: any = [];
  public currentQuestion: number = 0;
  public points: number = 0;
  counter = 60;
  correctAnswer: number = 0;
  inCorrectAnswer: number = 0;
  interval$: any;
  progress: string = "0";
  isQuizCompleted : boolean = false;
  showResult : boolean = false;
  score : any ;
  private elementRef: any;
  private renderer: any;
  private pointsIncremented: boolean;
  constructor(
    public dialogRef: MatDialogRef<StartQuizzComponent>,
    private changeDetectorRef: ChangeDetectorRef,
    private courseService: CourseService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: UntypedFormBuilder,
  ) {
    // Set the defaults

      this.dialogTitle = 'start quizz : '+this.data.quizzName;


  }

  ngOnInit() {
    this.quizForm = this.fb.group({
      name: ['',Validators.required],
      questions: this.fb.array([],Validators.required)
    });
    this.getAllQuestions();
  }

  getAllQuestions() {
    this.questionList= this.data.quizz.questions;
  }
  nextQuestion() {
    if(this.currentQuestion < this.questionList.length -1){
      this.currentQuestion++;
      this.selectedOptions=[]
    }
  }
  previousQuestion() {
    this.currentQuestion--;
  }

  selectedOptions: any[] = [];

  // answer(currentQno: number, option: any) {
  //   // add or remove the selected option from the selectedOptions array
  //   if (option.selected) {
  //     console.log("unselect")
  //     this.selectedOptions = this.selectedOptions.filter(o => o.id !== option.id);
  //     console.log(this.selectedOptions)
  //   } else {
  //     console.log("select")
  //
  //     this.selectedOptions.push(option);
  //   }
  //   option.selected = !option.selected;
  //   console.log(this.selectedOptions)
  // }
  answer(currentQno: number, option: any) {
    // add or remove the selected option from the selectedOptions array
    if (option.selected) {
      console.log("unselect");
      this.selectedOptions = this.selectedOptions.filter(o => o.id !== option.id);
      option.selected = false; // set selected to false
    } else {
      console.log("select");
      this.selectedOptions.push(option);
      option.selected = true; // set selected to true
    }
    console.log(this.selectedOptions);
  }

  verify(question: any) {
    const correctOptions = question.options.filter(option => option.is_correct);
    let allCorrect = true;

    for (const option of question.options) {
      if (option.selected) {
        if (!option.is_correct) {
          allCorrect = false;
        }
      } else {
        if (option.is_correct) {
          allCorrect = false;
        }
      }
    }

    for (const option of question.options) {
      option.selectedClass = '';
      if (option.selected) {
        option.selectedClass = 'selected';
      }
      if (option.is_correct) {
        option.selectedClass += ' correct';
      } else if (option.selected) {
        option.selectedClass += ' wrong';
      }
    }

    this.selectedOptions = question.options.filter(option => option.selected);

    if (allCorrect && !question.verified) {
      question.verified = true;
      this.points++;
    }
    console.log("verify",this.selectedOptions)

    this.changeDetectorRef.detectChanges();
  }




  resetQuiz() {
    this.selectedOptions=[]
    this.isQuizCompleted = false;
    this.showResult = false;
    this.getAllQuestions();
    this.points = 0;
    this.counter = 60;
    this.currentQuestion = 0;
    this.progress = "0";

  }
  getProgressPercent() {
    this.progress = ((this.currentQuestion / this.questionList.length) * 100).toString();
    return this.progress;

  }
  ShowResult() {
    this.showResult = true
    this.score = (this.points/this.questionList.length)*100

  }
  onSubmit() {
    this.loadingAdd = true;

    this.courseService.addQuizzInModule(this.quizForm.value,this.data.moduleId).subscribe(res=>{
      console.log(res);
      if(res){
        this.loadingAdd = false;
        this.dialogRef.close(res);
      }
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
