
import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NewquestionService } from '../newquestion/newquestion.service';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl, AbstractControl } from '@angular/forms';
import { Options } from 'ng5-slider';
import { ItemModel, MenuEventArgs } from '@syncfusion/ej2-splitbuttons';
import { UserSessionService, NavigationService, AlertService } from 'src/app/services';
import { questionType } from 'src/app/models/question.model';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { FormValidator } from '@syncfusion/ej2-inputs';
import { AddresponseService } from './addresponse.service';
import { NgProgress } from 'ngx-progressbar';

@Component({
  selector: 'app-addresponse',
  templateUrl: './addresponse.component.html',
  styleUrls: ['./addresponse.component.scss']
})
export class AddresponseComponent implements OnInit {
  //@HostListener('window:resize', ['$event'])
  public routeParams: any;
  public formId: number;
  public selectedMultipleQuestion: any[];
  public selectedData: any;
  public FormName: any;
  public QuestionCount: any;
  public selectedQueIndex: any;
  public showMoreOption: boolean;
  public QuestionFormstitle: any;
  public questionTypeSelected: boolean;
  public disabledValue: boolean = false;
  userId: any;
  organisationId: any;
  public questionForm: FormGroup;
  public responsedForm: FormGroup;
  public postResponseData: any[];
  public matchColumnLength: any;
  //public sliderListData : any[];
  public responseData: any;
  value: string = "";
  legend: string = "";
  startedClass = false;
  completedClass = false;
  preventAbuse = false;
  sliderListData: Options = {
    showTicksValues: true,
    stepsArray: [
      // { value: 1, legend: 'Very poor' },
      // { value: 2 },
      // { value: 3, legend: 'Fair' },
      // { value: 4 },
      // { value: 5, legend: 'Average' },
      // { value: 6 },
      // { value: 7, legend: 'Good' },
      // { value: 8 },
      // { value: 9, legend: 'Excellent' }
    ]
  };
  counter = 0;
  prevBtn: boolean;
  nextBtn: boolean;
  isSubmitted = false;
  public id = 0;
  public optionsList: any[];
  public allowSave: boolean;
  columnNo: any;
  columnNumber: any;
  headerTitle1: any;
  headerTitle2: any;
  headerTitle3: any;
  sliderResponsedId: any;
  pageType: any;
  isResponse: boolean;
  childQuestion: any;
  fliteredChildQuestion: any;
  screenHeight: number;
  screenWidth: number;
  constructor(private route: ActivatedRoute,
    private fb: FormBuilder,
    private userSessionService: UserSessionService,
    public navigationService: NavigationService,
    private newquestionService: NewquestionService,
    private responseService: AddresponseService,
    private alertService: AlertService,
    public ngProgress: NgProgress
  ) {
    this.routeParams = route.snapshot.params;
    debugger;
    this.formId = parseInt(this.routeParams.id);
    this.pageType = this.routeParams.pageType;
    this.isResponse = this.pageType == "Response" ? true : false;
    //this.onResize();
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
    this.postResponseData = [];
    //this.sliderListData = [];
    this.responseData = {};
    this.createForm();
    this.getQuestionsForResponse(true);

  }
  logout(args: MenuEventArgs) {

    localStorage.removeItem('isLoggedin');
    localStorage.removeItem('search');
    localStorage.removeItem('orgid');
    this.userSessionService.destroy();
    this.navigationService.goToSignin();
  }
  createForm() {
    let userId = this.userSessionService.userId();
    this.questionForm = this.fb.group({
      // userId: [this.userId],
      userId: [userId, null],
      id: [this.id, null],
      // formName:[''],
      // description:[''],
      questionResponseId: ['', null],
      questionId: ['', null],
      ratingResponses: this.fb.array([]),
      radioResponses: [''],
      textResponses: [''],
      checkboxResponses: this.fb.array([]),
      multipleQuestions: this.fb.array([])

    })
    this.responsedForm = this.fb.group({
      // userId: [this.userId],
      id: [userId, null],
      questionId: [],
      questionResponseId: ['', null],
      userId: ['', null],
      answerText: ['']
    })
  }
//   onResize(event?) {
//     this.screenHeight = window.innerHeight;
//     this.screenWidth = window.innerWidth;
//     alert(this.screenHeight);
//  }
  setChildQuestion(y) {
    debugger
    let arr = new FormArray([])
    y.forEach(x => {
      arr.push(this.fb.group({
        id: x.id,
        formId: x.formId,
        sequenceNO: x.sequenceNO,
        description: x.description,
        questionType: x.questionType,
        isMandatory: x.isMandatory,
        validationText: x.validationText,
        isShowValidationText: x.isShowValidationText,
        isShowConditionalActions: x.isShowConditionalActions,
        parentSequenceNO: x.parentSequenceNO,
        questionURL: x.questionURL,
        questionURLType: x.questionURLType,
        saveQuestionResponseCommand: this.setOptions(x.saveQuestionResponseCommand)
      }))
    })
    return arr;
  }

  setOptions(x) {
    let arr = new FormArray([])
    x.forEach(y => {
      arr.push(this.fb.group({
        id: y.id,
        questionId: y.questionId,
        sequenceNO: y.sequenceNO,
        description: y.description,
        comparisonType: y.comparisonType,
        questionResponseId: ["", null],
        answerText: ["", null],
        compareWithValueType: y.compareWithValueType,
        errorText: y.errorText,
        responseURL: y.responseURL,
        responseURLType: y.responseURLType,
        conditionalQuestionId: y.conditionalQuestionId,
        conditionalURL: y.conditionalURL,
        conditionalURLType: y.conditionalURLType,
        conditionalActionsType: y.conditionalActionsType,
        isCorrectOption: y.isCorrectOption,
        isShowCorrectAnswer: y.isShowCorrectAnswer,
        isOtherOption: y.isOtherOption,
      }))
    })
    return arr;
  }

  getQuestionsForResponse(refresh) {
    debugger
    this.newquestionService.getSelectedQuestion(this.formId, refresh).subscribe(question => {

      this.childQuestion = question.question.filter(i => {
        return i.questionType == questionType.isChild;
      })

      question.question = question.question.filter(i => {
        return i.questionType != questionType.isChild;
      })






      this.selectedData = question;
      this.FormName = this.selectedData.formName;
      this.QuestionCount = question.question.length;
      this.selectedMultipleQuestion = this.selectedData.question;
      {
        this.disabledValue = true;
        this.questionTypeSelected = true;
        let control = <FormArray>this.questionForm.controls['multipleQuestions'];

        for (var i = 0, len = this.selectedMultipleQuestion.length; i < len; i++) {
          if (this.selectedMultipleQuestion[i].questionType == questionType.match) {
            this.matchColumnLength = this.selectedMultipleQuestion[i].saveQuestionResponseCommand.filter(i => i.responsePositionType === 3).length > 0 ? 3 : 2;
            var headerData = [];
            headerData = this.selectedMultipleQuestion[i].saveQuestionResponseCommand.filter(i => i.responsePositionType === 0)
            this.headerTitle1 = headerData[0].description;
            this.headerTitle2 = headerData[1].description;
            // this.MatchtextBox1.value = headerTitle1; 
            // this.MatchtextBox2.value = headerTitle2; 
            if (this.matchColumnLength == 3) {
              this.headerTitle3 = headerData[2].description;
              //this.MatchtextBox3.value = headerTitle3; 
            }

          }
          if (this.selectedMultipleQuestion[i].questionType == questionType.linear) {
            debugger;

            const newOptionsCreate: Options = {
              showTicksValues: true,
              stepsArray: []
            };
            this.sliderListData = newOptionsCreate;
            for (var j = 0; j < this.selectedMultipleQuestion[i].saveQuestionResponseCommand.length; j++) {

              this.sliderListData.stepsArray.push({
                legend: this.selectedMultipleQuestion[i].saveQuestionResponseCommand[j].id,
                value: this.selectedMultipleQuestion[i].saveQuestionResponseCommand[j].description

              })
              //const newOptions: Options = Object.assign({}, this.sliderListData);
              //newOptions = this.sliderListData;
              //this.sliderListData = newOptions;
              //this.sliderListData : Options = [];

            }
            console.log('Before:' + JSON.stringify(this.sliderListData) + 'questionIndex:' + i);
          }

          if ((this.selectedMultipleQuestion[i].questionType == questionType.matrixradiobox) || (this.selectedMultipleQuestion[i].questionType == questionType.matrixcheckbox)) {
            var sequenceNO = this.selectedMultipleQuestion[i].sequenceNO;

            this.fliteredChildQuestion = this.childQuestion.filter
              (i => i.questionType === questionType.isChild && i.parentSequenceNO === sequenceNO);
          }
          else {
            this.fliteredChildQuestion = [];
          }

          if (this.fliteredChildQuestion.length > 0) {
            for (var l = 0; l < this.fliteredChildQuestion.length; l++)
              this.fliteredChildQuestion[l].saveQuestionResponseCommand = this.selectedMultipleQuestion[i].saveQuestionResponseCommand;

          }


          control.push(this.fb.group({
            id: this.selectedMultipleQuestion[i].id,
            formId: this.selectedMultipleQuestion[i].formId,
            sequenceNO: this.selectedMultipleQuestion[i].sequenceNO,
            description: this.selectedMultipleQuestion[i].description,
            questionType: this.selectedMultipleQuestion[i].questionType,
            isMandatory: this.selectedMultipleQuestion[i].isMandatory,
            validationText: this.selectedMultipleQuestion[i].validationText,
            isValidAnswer: [true, null],
            isShowValidationText: this.selectedMultipleQuestion[i].isShowValidationText,
            isShowConditionalActions: this.selectedMultipleQuestion[i].isShowConditionalActions,
            saveQuestionResponseCommand: this.setOptions(this.selectedMultipleQuestion[i].saveQuestionResponseCommand),
            sliderResponse: ["", null],
            sliderData: new FormControl(this.sliderListData),
            column1: this.getoptionForMatchHeader(this.selectedMultipleQuestion[i].saveQuestionResponseCommand, '1'),
            column2: this.getoptionForMatchHeader(this.selectedMultipleQuestion[i].saveQuestionResponseCommand, '2'),
            column3: this.getoptionForMatchHeader(this.selectedMultipleQuestion[i].saveQuestionResponseCommand, '3'),
            matchColumnList: this.matchColumnLength,
            rows: this.setChildQuestion(this.fliteredChildQuestion),
            columns: this.setOptions(this.selectedMultipleQuestion[i].saveQuestionResponseCommand),
            // conditionalActionList: this.setConditionalAction(this.selectedMultipleQuestion[i].saveQuestionResponseCommand)
          }));

          //this.sliderListData.stepsArray = [];
          //this.sliderListData.stepsArray= [];
          console.log('After:' + JSON.stringify(this.sliderListData) + 'questionIndex:' + i);
          //this.sliderListData = {};
          const newOptions: Options = {};
          this.sliderListData = newOptions;
          if (this.selectedMultipleQuestion[i].questionType == questionType.text) {
            var saveQuestionResponseCommand = (<FormArray>control).at(i).get('saveQuestionResponseCommand') as FormArray

            saveQuestionResponseCommand.push(this.fb.group({
              answerText: ["", null],
              questionResponseId: ['1', null]
            }))
          }
          this.optionsList = [];
        }
      }
      this.questionForm.patchValue(this.selectedData);
    });
  }
  setAnswer() {
    return this.fb.group({
      answerText: ['', null]
    });
  }
  getoptionForMatchHeader(x, columnType) {
    let arr = new FormArray([])
    x.forEach(y => {
      if (y.responsePositionType == columnType) {
        arr.push(this.fb.group({
          id: y.id,
          questionId: y.questionId,
          sequenceNO: y.sequenceNO,
          description: y.description,
          comparisonType: y.comparisonType,
          compareWithValueType: y.compareWithValueType,
          errorText: y.errorText,
          responseURL: y.responseURL,
          responseURLType: y.responseURLType,
          conditionalQuestionId: y.conditionalQuestionId,
          conditionalURL: y.conditionalURL,
          conditionalURLType: y.conditionalURLType,
          conditionalActionsType: y.conditionalActionsType,
          isCorrectOption: y.isCorrectOption,
          isShowCorrectAnswer: y.isShowCorrectAnswer,
          isOtherOption: y.isOtherOption,
          responsePositionType: y.responsePositionType,
        }))
      }
    })
    return arr;
  }

  drop(event: CdkDragDrop<string[]>, i) {

    moveItemInArray(this.questionForm.get('multipleQuestions')['controls'][i].get('saveQuestionResponseCommand')['controls'], event.previousIndex, event.currentIndex);
    moveItemInArray(this.questionForm.get('multipleQuestions').value[i].saveQuestionResponseCommand, event.previousIndex, event.currentIndex);
  }
  columnDrop(event: CdkDragDrop<string[]>, i, columnType) {

    this.columnNo = columnType;
    this.columnNumber = this.columnNo.replace(/\"/g, "");
    moveItemInArray(this.questionForm.get('multipleQuestions')['controls'][i].get(this.columnNo)['controls'], event.previousIndex, event.currentIndex);
    moveItemInArray(this.questionForm.get('multipleQuestions').value[i][this.columnNumber], event.previousIndex, event.currentIndex);
    let index = 1;
    var control = (<FormArray>this.questionForm.controls['multipleQuestions']).at(i).get(this.columnNo) as FormArray
    control.controls.forEach((formGroup: FormGroup) => {
      formGroup.patchValue({
        sequenceNO: index
      });
      index++;
    });
  }
  showNextQuestion() {
    if (this.questionForm.value.multipleQuestions[this.counter].questionType == questionType.match || questionType.linear) {
      if (this.counter < this.selectedMultipleQuestion.length - 1) {
        //this.nextBtn = true;
        this.counter += 1;

      }
    }
    var isValid = this.questionForm.value.multipleQuestions[this.counter].saveQuestionResponseCommand.filter(i => i.questionResponseId != "");
    if (isValid.length > 0) {
      if (this.counter < this.selectedMultipleQuestion.length - 1) {
        this.counter += 1;

      }
      var control = (<FormArray>this.questionForm.controls['multipleQuestions']) as FormArray
      control.at(this.counter).patchValue({ isValidAnswer: true });
    }
    else {
      var control = (<FormArray>this.questionForm.controls['multipleQuestions']) as FormArray
      control.at(this.counter).patchValue({ isValidAnswer: false });
    }

  }
  onChange(itemanswer, isChecked: boolean) {
    let checkboxAnswerFormArray = <FormArray>this.questionForm.controls.checkboxResponses;
    if (isChecked) {
      checkboxAnswerFormArray.push(new FormControl({
        questionId: itemanswer.questionId,
        userId: this.userId,
        answerText: itemanswer.description,
        questionResponseId: itemanswer.id,
      }));
    } else {
      let index = checkboxAnswerFormArray.controls.findIndex(x => x.value == itemanswer)
      checkboxAnswerFormArray.removeAt(index);
    }
  }

  showPreviousQuestion() {

    if (this.counter >= 1) {
      //  this.prevBtn = true;
      this.counter = this.counter - 1;
    } else {
      //  this.prevBtn = false;
    }
  }
  selectedOption(event, index) {
    var isValid = this.questionForm.value.multipleQuestions[index].saveQuestionResponseCommand.filter(i => i.questionResponseId != "");
    if (isValid.length > 0) {
      var control = (<FormArray>this.questionForm.controls['multipleQuestions']) as FormArray
      control.at(index).patchValue({ isValidAnswer: true });
    }
  }

  save() {
    debugger
    alert(this.questionForm.value.multipleQuestions[0].sliderResponse);
    debugger;
    this.isSubmitted = true;
    this.postResponseData = [];
    for (let questionIndex = 0; questionIndex < this.questionForm.value.multipleQuestions.length; questionIndex++) {
      this.responseData['id'] = 0;
      this.responseData['questionId'] = this.questionForm.value.multipleQuestions[questionIndex].id;
      this.responseData['userId'] = this.userId;
      for (let optionIndex = 0; optionIndex < this.questionForm.value.multipleQuestions[questionIndex].saveQuestionResponseCommand.length; optionIndex++) {

        this.responseData['id'] = 0;
        this.responseData['questionId'] = this.questionForm.value.multipleQuestions[questionIndex].id;
        this.responseData['userId'] = this.userId;

        if (this.questionForm.value.multipleQuestions[questionIndex].saveQuestionResponseCommand[optionIndex].questionResponseId) {
          if (this.questionForm.value.multipleQuestions[questionIndex].questionType == questionType.rating) {
            this.responseData['questionResponseId'] = this.questionForm.value.multipleQuestions[questionIndex].saveQuestionResponseCommand[optionIndex].id;
            this.responseData['answerText'] = this.questionForm.value.multipleQuestions[questionIndex].saveQuestionResponseCommand[optionIndex].questionResponseId;
          }
          else if (this.questionForm.value.multipleQuestions[questionIndex].questionType == questionType.text) {
            this.responseData['questionResponseId'] = 0;
            this.responseData['answerText'] = this.questionForm.value.multipleQuestions[questionIndex].saveQuestionResponseCommand[optionIndex].answerText;
          }
          else {
            this.responseData['questionResponseId'] = this.questionForm.value.multipleQuestions[questionIndex].saveQuestionResponseCommand[optionIndex].id;
            this.responseData['answerText'] = this.questionForm.value.multipleQuestions[questionIndex].saveQuestionResponseCommand[optionIndex].description;
          }
          this.responseData.saveAnswerResponseMappingCommand = null;
          // this.responseData.saveAnswerResponseMappingCommand['id'] = 0;
          // this.responseData.saveAnswerResponseMappingCommand['questionAnswerId'] = 0;
          // this.responseData.saveAnswerResponseMappingCommand['questionResponse1stId'] = 0;
          // this.responseData.saveAnswerResponseMappingCommand['questionResponse2ndId'] = 0;
          this.postResponseData.push(this.responseData);
          this.responseData = {};
        }
        else {
          var control = (<FormArray>this.questionForm.controls['multipleQuestions']) as FormArray
          control.at(this.questionForm.value.multipleQuestions.length - 1).patchValue({ isValidAnswer: false });
        }
        if (this.questionForm.value.multipleQuestions[questionIndex].questionType == questionType.reorder) {
          this.responseData['questionResponseId'] = this.questionForm.value.multipleQuestions[questionIndex].saveQuestionResponseCommand[optionIndex].id;
          this.responseData['answerText'] = this.questionForm.value.multipleQuestions[questionIndex].saveQuestionResponseCommand[optionIndex].description;
          this.postResponseData.push(this.responseData);
          this.responseData = {};
        }

      }
      if (this.questionForm.value.multipleQuestions[questionIndex].questionType == questionType.match) {
        for (let column1Index = 0; column1Index < this.questionForm.value.multipleQuestions[questionIndex].column1.length; column1Index++) {
          this.responseData['questionResponseId'] = this.questionForm.value.multipleQuestions[questionIndex].column1[column1Index].id;
          this.responseData['answerText'] = this.questionForm.value.multipleQuestions[questionIndex].column1[column1Index].description;
          for (let columnIndex = 0; columnIndex < this.questionForm.value.multipleQuestions[questionIndex].column2.length; columnIndex++) {
            this.responseData.saveAnswerResponseMappingCommand = {};
            this.responseData.saveAnswerResponseMappingCommand.id = 0;
            this.responseData.saveAnswerResponseMappingCommand.questionAnswerId = 0;

            this.responseData.saveAnswerResponseMappingCommand.questionResponse1stId = this.questionForm.value.multipleQuestions[questionIndex].column2[columnIndex].id;
            if (this.questionForm.value.multipleQuestions[questionIndex].column3.length > 0) {
              this.responseData.saveAnswerResponseMappingCommand.questionResponse2ndId = this.questionForm.value.multipleQuestions[questionIndex].column3[columnIndex].id;
            }

          }
          this.postResponseData.push(this.responseData);
          this.responseData = {};
        }

      }
      if (this.questionForm.value.multipleQuestions[questionIndex].questionType == questionType.matrixcheckbox || this.questionForm.value.multipleQuestions[questionIndex].questionType == questionType.matrixradiobox) {

        for (let rowsQuestionIndex = 0; rowsQuestionIndex < this.questionForm.value.multipleQuestions[questionIndex].rows.length; rowsQuestionIndex++) {



          for (let childOptionIndex = 0; childOptionIndex < this.questionForm.value.multipleQuestions[questionIndex].rows[rowsQuestionIndex].saveQuestionResponseCommand.length; childOptionIndex++) {

            if (this.questionForm.value.multipleQuestions[questionIndex].rows[rowsQuestionIndex].saveQuestionResponseCommand[childOptionIndex].questionResponseId) {

              this.responseData['id'] = 0;
              this.responseData['questionId'] = this.questionForm.value.multipleQuestions[questionIndex].rows[rowsQuestionIndex].id;
              this.responseData['userId'] = this.userId;
              this.responseData['questionResponseId'] = this.questionForm.value.multipleQuestions[questionIndex].rows[rowsQuestionIndex].saveQuestionResponseCommand[childOptionIndex].id;
              this.responseData['answerText'] = this.questionForm.value.multipleQuestions[questionIndex].saveQuestionResponseCommand[childOptionIndex].questionResponseId;

              this.responseData.saveAnswerResponseMappingCommand = null;
              this.postResponseData.push(this.responseData);
              this.responseData = {};
            }
          }
        }
      }

      if (this.questionForm.value.multipleQuestions[questionIndex].questionType == questionType.linear) {
        var filteredSliderArray = {};
        debugger;
        filteredSliderArray = this.questionForm.value.multipleQuestions[questionIndex].saveQuestionResponseCommand.find(i => i.description === this.questionForm.value.multipleQuestions[questionIndex].sliderResponse)

        this.sliderResponsedId = filteredSliderArray['id'];
        this.responseData['questionResponseId'] = this.sliderResponsedId;
        this.responseData['answerText'] = this.questionForm.value.multipleQuestions[questionIndex].sliderResponse;
      }
    }
    this.responseService.saveResponse(this.postResponseData).subscribe(data => {
      if (data == true) {
        this.alertService.success("Forms Responded Successfully");
      }

    });
  }
  abc() {
    alert("hi");
  }
  clear(questionindex) {
    var control = (<FormArray>this.questionForm.controls['multipleQuestions']).at(questionindex).get('saveQuestionResponseCommand') as FormArray
    if (control.controls.length > 0) {
      control.controls.forEach((formGroup: FormGroup) => {
        formGroup.patchValue({
          questionResponseId: ""
        });
      });
    }
    //this.questionForm.controls['questionResponseId'].setValue(null);
  }
  onStarted() {
    this.startedClass = true;
    setTimeout(() => {
      this.startedClass = false;
    }, 800);
  }

  onCompleted() {
    this.completedClass = true;
    setTimeout(() => {
      this.completedClass = false;
    }, 800);
  }


}

