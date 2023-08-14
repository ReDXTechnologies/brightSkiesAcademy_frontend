import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
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
import {ChangeBgDirective} from "../../../add-course/change-bg.directives";

@Component({
  selector: 'app-start-quizz',
  templateUrl: './start-quizz.component.html',
  styleUrls: ['./start-quizz.component.sass'],
})
export class StartQuizzComponent implements OnInit {
  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private el: ElementRef,
    private courseService: CourseService,
    private fb: UntypedFormBuilder,
  ) {}
  @Input() quizz: any;
  @Input() courseId: number;
  @Input() moduleId: any;
  @Input() user: number;
  @Output() quizzScored = new EventEmitter<number>();
  action: string;
  dialogTitle: string;
  loadingAdd = false;
  loadingEdit = false;
  quizForm: FormGroup;
  @ViewChild('cdRef') cdRef: ChangeDetectorRef;
  public name = "";
  public questionList: any = [];
  public currentQuestion = 0;
  public points = 0;
  counter = 60;
  correctAnswer = 0;
  inCorrectAnswer = 0;
  interval$: any;
  progress = "0";
  isQuizCompleted = false;
  showResult = false;
  score: any ;
  private elementRef: any;
  private renderer: any;
  private pointsIncremented: boolean;

  selectedOptions: any[] = [];

  ngOnInit() {
    console.log("data" + this.user + "course id : " + this.courseId + " quizz : " + this.quizz);
    this.quizForm = this.fb.group({
      name: ['', Validators.required],
      questions: this.fb.array([], Validators.required)
    });
    this.getAllQuestions();
  }

  getAllQuestions() {
    this.questionList = this.quizz.questions;
  }
  nextQuestion() {
    if (this.currentQuestion < this.questionList.length - 1){
      this.currentQuestion++;
      this.selectedOptions = [];
    }
  }
  previousQuestion() {
    this.currentQuestion--;
  }

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
          allCorrect = true;
        }
      }
    }

    for (const option of question.options) {
      option.selectedClass = '';
      if (option.selected) {
        option.selectedClass = 'selected';
      }
      if (option.is_correct) {
        console.log("correct", option);

        option.selectedClass += ' correct';
      } else if (option.selected) {
        console.log("wrong", option);

        option.selectedClass += ' wrong';
      }
    }

    this.selectedOptions = question.options.filter(option => option.selected);

    if (!question.verified) {
      console.log(this.points)
      question.verified = true;
      this.points++;
      this.correctAnswer++;
    }else{
      this.inCorrectAnswer++;
    }
    console.log("verify", this.selectedOptions);

    this.changeDetectorRef.detectChanges();
  }


  // resetOptions() {
  //   for(let question of this.questionList){
  //     for (let option of question.options) {
  //       console.log(option)
  //       console.log(option.selected)
  //       option.selected = false; // set selected to false
  //       this.changeDetectorRef.detectChanges();
  //
  //
  //     }
  //   }
  //
  //
  // }


  resetQuiz() {
    this.selectedOptions = [];
    this.currentQuestion = 0;
    this.points = 0;
    this.inCorrectAnswer = 0;
    this.correctAnswer = 0;
    console.log(this.inCorrectAnswer)
    for (const question of this.questionList) {
      for (const option of question.options) {
        option.selected = false;
        option.verified = false;
        option.selectedClass = '';
      }
    }

    this.changeDetectorRef.detectChanges();
    this.isQuizCompleted = false;
    this.showResult = false;
    this.getAllQuestions();
    this.counter = 60;
    this.progress = "0";

  }
  getProgressPercent() {
    this.progress = ((this.currentQuestion / this.questionList.length) * 100).toString();
    return this.progress;

  }
  ShowResult() {
    this.showResult = true;
    this.score = ((this.points / this.questionList.length) * 100).toFixed(2);
    const body = { score: this.score };
    this.quizzScored.emit(this.score);
    this.courseService.addScoreInModule(this.courseId, this.quizz.id, this.moduleId, this.user, body).subscribe(res => {
      console.log(res);
    });
    this.selectedOptions = [];
    this.currentQuestion = 0;
    this.points = 0;
    this.inCorrectAnswer = 0;
    this.correctAnswer = 0;

  }
  onSubmit() {
    this.loadingAdd = true;

    this.courseService.addQuizzInModule(this.quizForm.value, this.moduleId).subscribe(res => {
      console.log(res);
      console.log("Mdodule id"+ this.moduleId);
      if (res){
        this.loadingAdd = false;
      }
    });
  }
}
