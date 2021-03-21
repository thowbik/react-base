import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NewquestionService } from '../newquestion/newquestion.service';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl, AbstractControl } from '@angular/forms';
import { Options } from 'ng5-slider';
import { ItemModel, MenuEventArgs } from '@syncfusion/ej2-splitbuttons';
import { UserSessionService, NavigationService } from 'src/app/services';
import { questionType } from 'src/app/models/question.model';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { FormValidator } from '@syncfusion/ej2-inputs';

@Component({
  selector: 'app-formview',
  templateUrl: './formview.component.html',
  styleUrls: ['./formview.component.scss']
})
export class FormviewComponent implements OnInit {

  public routeParams: any;
  public formId: number;
  public selectedMultipleQuestion: any[];
  public selectedData: any;
  public FormName: any;
  public selectedQueIndex: any;
  public showMoreOption: boolean;
  public QuestionFormstitle: any;
  public questionTypeSelected: boolean;
  public disabledValue: boolean = false;
  userId: any;
  organisationId: any;
  addResponsesForm: FormGroup;
  value: number = 5;
  options: Options = {
    showTicksValues: true,
    stepsArray: [
      { value: 1, legend: 'Very poor' },
      { value: 2 },
      { value: 3, legend: 'Fair' },
      { value: 4 },
      { value: 5, legend: 'Average' },
      { value: 6 },
      { value: 7, legend: 'Good' },
      { value: 8 },
      { value: 9, legend: 'Excellent' }
    ]
  };
  counter = 0;
  prevBtn: boolean;
  nextBtn: boolean;
  constructor(private route: ActivatedRoute,
    private fb: FormBuilder,
    private userSessionService: UserSessionService,
    public navigationService: NavigationService,
    private newquestionService: NewquestionService,
  ) {
    this.routeParams = route.snapshot.params;
    this.formId = parseInt(this.routeParams.formId);
  }
  public items: ItemModel[] = [
    {
      text: 'Logout',
      iconCss: 'e-icons e-BT_Delete'
    }];
  questionType() { return questionType; }
  ngOnInit() {
    this.questionTypeSelected = false;
    this.userId = this.userSessionService.userId();
    this.createForm();
    this.getSelectedRecord(true);
  }
  logout(args: MenuEventArgs) {

    localStorage.removeItem('isLoggedin');
    localStorage.removeItem('search');
    localStorage.removeItem('orgid');
    this.userSessionService.destroy();
    this.navigationService.goToSignin();
  }
  createForm() {
    this.addResponsesForm = this.fb.group({
      userId:[this.userId],
      ratingResponses:this.fb.array([]),
      radioResponses: [''],
      textResponses: [''],
      checkboxResponses: this.fb.array([]),
    })
  }
  getSelectedRecord(refresh) {
    this.newquestionService.getSelectedQuestion(this.formId, refresh).subscribe(question => {
      this.selectedData = question;
      this.selectedMultipleQuestion = this.selectedData.question;
    });
  }
  sampledrop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.selectedMultipleQuestion, event.previousIndex, event.currentIndex);
  }
  showNextQuestion() {
    if (this.counter < this.selectedMultipleQuestion.length - 1) {
      //this.nextBtn = true;
      this.counter += 1;
    }
  }
  onChange(itemanswer, isChecked: boolean) {
    let checkboxAnswerFormArray = <FormArray>this.addResponsesForm.controls.checkboxResponses;
    if (isChecked) {
      checkboxAnswerFormArray.push(new FormControl({
        questionId:itemanswer.questionId,
        userId:this.userId,
        answerText:itemanswer.description,
        questionResponseId:itemanswer.id,
      }));
    } else {
      let index = checkboxAnswerFormArray.controls.findIndex(x => x.value == itemanswer)
      checkboxAnswerFormArray.removeAt(index);
    }
  }
  onrating(itemanswer, event) {
    debugger;
    let ratingAnswerFormArray = <FormArray>this.addResponsesForm.controls.ratingResponses;
    ratingAnswerFormArray.push(new FormControl({
      questionId:itemanswer.questionId,
      userId:this.userId,
      answerText:itemanswer.description,
      questionResponseId:(itemanswer.id,event)
    }));

  }
  showPreviousQuestion() {
    if (this.counter >= 1) {
      //  this.prevBtn = true;
      this.counter = this.counter - 1;
    } else {
      //  this.prevBtn = false;
    }
  }
  submitAnswer() {
    debugger;
    console.log(this.addResponsesForm.value);
    debugger;
  }

}
