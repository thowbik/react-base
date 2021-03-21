
import { Component, OnInit, ViewChild, ElementRef, HostListener, Input, Inject } from '@angular/core';
import { ItemModel, MenuEventArgs, DropDownButtonComponent } from '@syncfusion/ej2-angular-splitbuttons';
import { TabComponent, OpenCloseMenuEventArgs } from '@syncfusion/ej2-angular-navigations';
import { DialogComponent, DialogUtility } from '@syncfusion/ej2-angular-popups';
import { GridComponent } from '@syncfusion/ej2-angular-grids';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { NavigationService, AlertService, OrganisationPageSessionService, UserSessionService } from 'src/app/services';
import { FieldConfig } from 'src/app/models/field.interface';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl, FormArray } from '@angular/forms';
import { NewquestionService } from './newquestion.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { LabelPageTypeno, ConditionalActionType, Duplicate } from '../../models/';
import { RadioButtonComponent } from '@syncfusion/ej2-angular-buttons';
import { Location } from '@angular/common';
import { URLType } from '../../models/index';
import { TemplateType } from '../../models/index';
import { questionType } from 'src/app/models/question.model';
import { ConditionAction } from '../../models/index';
import { NgxImageCompressService } from 'ngx-image-compress';
import * as _ from 'lodash';
import { environment } from 'src/environments/environment';
import { List } from 'underscore';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { SendFormToService } from 'src/app/shared/component/sendformto/sendformto.service';
import { TextBoxComponent } from '@syncfusion/ej2-angular-inputs';
import { DropDownList, PopupEventArgs } from '@syncfusion/ej2-dropdowns';
import { DeletePopupService } from 'src/app/shared/component/deletepopup/deletepopup.service';
import { ScrollEvent } from 'ngx-scroll-event';
import { Options } from 'ng5-slider';
import { EmitType } from '@syncfusion/ej2-base';
import {ChangeDetectionStrategy } from '@angular/core';
export class Qpanel {
  type: string;
  toolbox: boolean;
  message: string;
}
@Component({
  selector: 'app-newquestion',
  templateUrl: './newquestion.component.html',
  styleUrls: ['./newquestion.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewquestionComponent implements OnInit {
  // @ViewChild ('dsj')  k : DropDownList
  public gameList: { [key: string]: Object }[] = [
    { Id: 'Game1', Game: 'American Football' },
    { Id: 'Game2', Game: 'Badminton' },
    { Id: 'Game3', Game: 'Basketball' },
    { Id: 'Game4', Game: 'Cricket' },
    { Id: 'Game5', Game: 'Football' },
    { Id: 'Game6', Game: 'Golf' },
    { Id: 'Game7', Game: 'Hockey' },
    { Id: 'Game8', Game: 'Rugby' },
    { Id: 'Game9', Game: 'Snooker' },
    { Id: 'Game10', Game: 'Tennis' },
  ];
  // map the appropriate columns to fields property
  public sampleFields: object = { text: 'Game', value: 'Id' };
  public templateTypeFields: object = { text: 'value', value: 'key' };
  public tagTypeFields: object = { text: 'value', value: 'value' };

  public box: string = 'Box';
  questions: any;
  public data: Object[];
  public isOpenDialogue: boolean = false;
  public questionId: any;
  public actionFrom: any;
  public showQuestionDeletePopup: boolean = false;
  public popTitle: string;
  questionform: FormGroup;
  multipleQuestionform: FormGroup;
  public isBusy: boolean = false;
  public isShow: boolean = false;
  createform: FormGroup;
  public headerText: Object = [{ 'text': 'Form' }, { 'text': 'Responses(73)' }, { 'text': 'Insights' },
  { 'text': 'Responders' }, { 'text': 'Correct Answer' }, { 'text': 'Form Options' }];
  public PopupheaderText: Object = [{ 'text': 'Templates' }, { 'text': 'Favourites' }];
  public animation: object = {
    previous: { effect: 'SlideLeftIn', duration: 100, easing: 'ease' },
    next: { effect: 'SlideRightIn', duration: 100, easing: 'ease' }
  };
  public isOpen: boolean = false;
  public showCloseIcon: Boolean = true;
  public templatetab: boolean = true;
  public optionCount: number;
  public sample: any[];
  public myquestiontab: boolean = false;
  public selectionSettings: Object;
  public questionsType: any[];
  public filteredQuestiontype: any[];
  fieldArray: Array<any> = [];
  newAttribute: any = {};
  isServiceProcessed: boolean;
  public ColumnItem: any[];
  public saveItems: ItemModel[] = [
    {
      text: 'Save as Template',
    }];
  public moreItems: ItemModel[] = [
    {
      text: 'Add to favourites',
    }];
  public showSendFormToPopup: boolean = false;
  public image: any;
  public fileType: any;
  public fileTypeUrl: URLType;
  public conditionalEnumType: ConditionalActionType;
  public disabledValue: boolean = false;
  public saveOrUpdate: string;
  SelectedRadioButton: any;
  environmentUrl: any;
  public SequenceNo: number;
  conditionalOptionsubmitted: boolean = false;
  isSelectedShowGIF: boolean;
  actionTitle: string;
  actionLabel: string;
  actionPlaceholder: string;
  actionButtonTitle: string;
  public youtubeUrl: any;
  public Url: any;
  public baseYoutubeUrl: string;
  public appendedHtml: string;
  public thumbnail: any;
  public isValidUrl: boolean = true;
  public conditionalUrl: any;
  public conditionalUrlValue: any;
  public isOpenLink: boolean = false;
  public nextValue: any;
  public gifImagesList: any[];
  public searchText: string;
  public previousSearchText: string;
  selectedGifImageIndex: any;
  public optionsList: any[];
  public selectedQuestionsList: any[];
  conditionalActionIndex: any;
  questionIndex: any;
  isSelectedImage: boolean;
  isImageFromService: boolean;
  public duplicateOptionsList: any[];
  public duplicateQuestionList: any[];
  public isSelectedRadioButton: boolean;
  public matchColumnLength: any;
  public childQuestion: any;
  public show: boolean = false;
  public testArray: any[];
  // public header1: any;
  // public header2: any;
  // public header3: any;

  public conditionalActionsTypeSubmitted: boolean;
  addVideoGifForOption: boolean;
  optionIndexForVideoGif: any;
  questionIndexForVideoGif: any;
  selectedResponseUrlValue: string;
  public optionDescriptionValid: boolean = false;
  questionIndexDelete: any;
  public matchIndex: number;
  public matrixIndex: number;
  headerTitle1: any;
  headerTitle2: any;
  headerTitle3: any;
  columnNo: any;
  isAllowToAddQuestion: boolean = true;
  public questionMatrixIndex: any;
  public fliteredChildQuestion: any[];
  columnNumber: any;
  isSelectedShowImage: boolean = false;
  selectedConditionalActionTypeId: any;
  showGifImage: boolean = false;
  GifUrl: any;
  searchedGIFValue: string;
  public duplicateId: number;
  isAllowedDuplicateForm: boolean;
  public conditionalFileTypeUrlType: number;
  selectedGifImage: any;
  particularQuestionId: any;
  public isShortText: any;
  templateTypes: any[];
  tagTypes: any[];
  public selectedTags: any;
  public isSelectedGifOption: boolean = false;
  public columnsForMatchSubmitted: boolean = false;
  public rowsForMatchSubmitted: boolean = false;
  selectedToValue: any;
  selectedFromvalue: any;
  public storedCopyData: any[];
  showGoBackPopup: boolean;
  checkDuplicate: boolean;
  public responseFormId: number;
  //public optionsValid: boolean = true;
  LabelPageTypeno() { return LabelPageTypeno; }
  @ViewChild('AddQuestionDialog')
  public AddQuestionDialog: DialogComponent;
  @ViewChild('SelectGIFDialog')
  public SelectGIFDialog: DialogComponent;
  @ViewChild('SaveAsTemplate')
  public SaveAsTemplate: DialogComponent;
  @ViewChild('MoreOptionDialog')
  public MoreOptionDialog: DialogComponent;
  @ViewChild('showCorrectAnswer')
  public showCorrectAnswer: RadioButtonComponent;
  @ViewChild('radioButtonSelected')
  public radioButtonSelected: RadioButtonComponent;
  @ViewChild('grid')
  public grid: GridComponent;
  @ViewChild('dropdownbutton')
  public dropdownbutton: DropDownButtonComponent;
  @ViewChild('copyButton')
  public copyButton: DropDownButtonComponent;
  @ViewChild('fileInput') fileInput: ElementRef;
  //@ViewChild('Dialog', null) public dialogObj: DialogComponent; 
  @ViewChild('name', null) public textBoxObj: TextBoxComponent;
  @ViewChild('DeleteDialog')
  public DeleteDialog: DialogComponent;
  @HostListener('scroll', ['$event'])
  @ViewChild('panel', { read: ElementRef }) public panel: ElementRef<any>;
  @ViewChild('matchHeaderName1', null) public MatchtextBox1: TextBoxComponent;
  @ViewChild('matchHeaderName2', null) public MatchtextBox2: TextBoxComponent;
  @ViewChild('matchHeaderName3', null) public MatchtextBox3: TextBoxComponent;
  public dropdownfields: Object = { text: "value", value: "key" };
  // public dropdownTypefields: Object = { text: "value", value: "key" };
  public selectedvalue: any;
  public routeParams: any;
  public formId = 0;
  public showsavebutton: boolean;
  public questionTypeSelected: boolean;
  subs = new Subscription();
  // saveQuestionResponseCommand: FormArray;
  // multipleQuestions: FormArray;
  public ShowSampleQuestionType: boolean = false;
  Duplicate() {
    return Duplicate;
  }
  public sample2: any[];
  public sliderValues: any[];
  public sliderFromValues: any[];
  public sliderToValues: any[];
  public showActionButton: boolean = false;
  public pageid: number;
  public formPage: boolean = false;
  public multiplequestion: any[];
  public selectedQuestionTypeNo: any;
  samleQuestionListData: any;
  public descriptionsOption = [];
  public conditionalActionsType = [];
  public MultipleQuestiondata = {
    multipleQuestions: [
      {
        id: [0, null],
        formId: [0, null],
        formName: ['', null],
        sequenceNO: [0, null],
        formDescription: ['', Validators.required],
        instructions: ['', null],
        description: ['', null],
        questionType: ['', null],
        isMandatory: [false, null],
        validationText: ['', null],
        isShowValidationText: [false, null],
        isShowConditionalActions: [false, null],
        saveQuestionResponseCommand: [
          {
            id: "",
            questionId: "",
            sequenceNO: ['', null],
            description: "",
            comparisonType: "",
            compareWithValueType: "",
            errorText: "",
            responseURL: "",
            responseURLType: [0, null],
            isCorrectOption: [false, null],
            isShowCorrectAnswer: [false, null],
            isOtherOption: [false, null],
          }
        ]
      }
    ]
  }
  public questionCount: number;
  // multipleQuestions: FormArray;
  public selectedMultipleQuestion: any[];
  public selectedData: any;
  public FormName: any;
  public selectedQueIndex: any;
  public showMoreOption: boolean;
  public QuestionFormstitle: any;
  public moreOptionsitems: ItemModel[] = [
    // {
    //   text: 'Required',
    // },
    // {
    //   text: 'Add Correct Answer',
    // },
    // {
    //   text: 'Add Validation',
    // },
    // {
    //   text: 'Add Conditional Actions',
    // }
  ];
  imgResultBeforeCompress: string;
  imgResultAfterCompress: string;
  public moreOptions: { [key: string]: Object }[] = [{ Id: '1', Option: 'Add Correct Answer' },
  { Id: '2', Option: 'Add Validation' }, { Id: '3', Option: 'Add Conditional Actions' }];
  public optionFields: Object = { text: 'Option', value: 'Id' };
  public submitted: boolean;
  public sampleQuestionData: any;
  public conditionalActionsTypefields: Object = { text: "value", value: "key" };
  public questionsListfields: Object = { text: "questionNO", value: "sequenceNO" };
  public slidersFields: object = { text: "text", value: "id" };
  public optionsFields: Object = { text: "description", value: "sequenceNO" };
  public ColumnItemFields: object = { text: "text", value: "id" };
  labelId: any;
  public pageType: number;
  orgId: any;
  userId: any;
  public copyData: any[];
  public myquestions: any;
  public questionsList: [];
  public conditionalSelectedOptions: any;
  constructor(public navigationService: NavigationService,
    private fb: FormBuilder,
    private sanitizer: DomSanitizer,
    private newquestionService: NewquestionService,
    private alertService: AlertService,
    private userSessionService: UserSessionService,
    private route: ActivatedRoute,
    public sendFormToService: SendFormToService,
    private organisationPageSessionService: OrganisationPageSessionService,
    private location: Location,
    private imageCompress: NgxImageCompressService,
    private deletePopupService: DeletePopupService,
    private router: Router) {
    this.routeParams = route.snapshot.params;
    this.formId = this.routeParams.id;
    this.pageid = parseInt(this.routeParams.pageid);
    this.duplicateId = this.routeParams.duplicateNo;
    this.isAllowedDuplicateForm = this.duplicateId > 0 ? true : false;
    this.formPage = this.pageid == 2 ? true : false;
    this.QuestionFormstitle = this.formPage == true ? 'Form' : 'Question';
    this.saveOrUpdate = this.formId == 0 ? 'Save' : 'Save';
    this.questions = {};
    this.questions.saveQuestionResponseCommand = [];
  }
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
  value: string = "";

  questionType() { return questionType; }
  ngOnInit() {
    this.templateTypes = [];
    this.tagTypes = [];
    this.searchText = "";
    this.optionsList = [];
    this.sliderValues = [];
    this.sliderFromValues = [];
    this.sliderToValues = [];
    this.selectedQuestionsList = [];
    this.duplicateOptionsList = [];
    this.duplicateQuestionList = [];
    this.gifImagesList = [];
    this.ColumnItem = [];
    this.copyData = [];
    this.submitted = false;
    this.questionCount = 1;
    this.showsavebutton = false;
    this.questionTypeSelected = false;
    this.environmentUrl = environment.profileURL;
    this.templatetab = true;
    this.myquestiontab = false;
    this.testArray = [];
    this.selectionSettings = { checkboxOnly: true };
    this.initializeValidators();
    this.conditionalActionData();
    this.optionCount = 1;
    if (this.formId != 0) {
      this.getSelectedRecord(true);
    }
    this.sampleData();
    let control = <FormArray>this.questionform.controls.multipleQuestions;
    control.removeAt(0);
    this.showMoreOption = false;
    this.myQuestion(true);
    this.duplicateForm();
    this.getTagTypes();
    this.storedCopyData = [];
    // this.ColumnItem = [2, 3];
  }

  URLType() {
    return URLType;
  }
  templateType() {
    return TemplateType;
  }
  ConditionalActionsType() {
    return ConditionalActionType;
  }
  sampleData() {
    for (var i = 0; i <= 1; i++) {
      this.sliderFromValues.push({
        id: i,
        text: i
      })
    }
    for (var i = 1; i <= 10; i++) {
      this.sliderToValues.push({
        id: i,
        text: i
      })
    }
    for (var i = 2; i <= 3; i++) {
      this.ColumnItem.push({
        id: i,
        text: i
      })
    }

    this.newquestionService.getSampleQuestions(true).subscribe(sampleQuestion => {
      let question = [];
      question.push({
        questionType: 12
      })
      this.sampleQuestionData = sampleQuestion;
      // this.sampleQuestionData.push({
      //   id: 8,
      //   formName: 'linear',
      //   question: question
      // })
      console.log(this.sampleQuestionData);
    });
    this.testArray = ["Game4", "Game5"];
    // this.testArray.push({
    //   i:"Game1"
    // })

  }
  initializeValidators() {
    this.questionform = this.fb.group({
      formId: [0, null],
      formName: ['', Validators.required],
      formDescription: ['', null],
      instructions: ['', null],
      templateName: ['', null],
      templateType: [1, null],
      tags: ['', null],
      parentFormId: [0, null],
      multipleQuestions: this.fb.array([])
    });
    this.createform = this.fb.group({
      id: [0, null],
      labelId: [1, null],
      formName: ['', Validators.required],
      description: ['', Validators.required],
      instructions: ['', null],
      isResultsVisibleToEveryone: [true, null],
      isAllResponsesVisibleToEveryone: [true, null],
      isShowCorrectAnswer: [true, null],
      timeLimitDuration: [null, null],
      unitsTimeType: [0, null],
      isAllowAnonymousResponse: [true, null],
      formStatusType: [0, null],
      saveQuestionResponseCommand: this.fb.array([])
    });
    this.questionform.controls['templateType'].setValue(TemplateType.Form);
  }
  createItemForMatch(responsepositiontype, questionIndex, columnType) {
    
    var rowLength = (<FormArray>this.questionform.controls['multipleQuestions']).at(questionIndex).get(columnType) as FormArray
    return this.fb.group({
      description: ['', Validators.required],
      sequenceNO: [rowLength.length + 2, null],
      id: [0, null],
      questionId: [0, null],
      comparisonType: ['0', null],
      compareWithValueType: ['0', null],
      errorText: ['', null],
      responseURL: ['', null],
      responseURLType: [0, null],
      conditionalOption: ['', null],
      conditionalQuestionId: [0, null],
      conditionalURL: ['', null],
      conditionalURLType: [0, null],
      conditionalActionsType: [0, null],
      isCorrectOption: [false, null],
      isShowCorrectAnswer: [false, null],
      isOtherOption: [false, null],
      responsePositionType: [responsepositiontype, null]

    });
  }
  createHeaderForMatch() {
    return this.fb.group({
      headerdescription: ['', null],
    });
  }
  selectChangeHandler(event: any, i) {
    
    this.selectedvalue = event.itemData.id;


    var control = (<FormArray>this.questionform.controls['multipleQuestions']).at(i).get('column1') as FormArray;
    // while (control.length != 0) {
    //   control.removeAt(0)
    // }
    var control1 = (<FormArray>this.questionform.controls['multipleQuestions']).at(i).get('column2') as FormArray
    // while (control1.length != 0) {
    //   control1.removeAt(0)
    // }
    var control2 = (<FormArray>this.questionform.controls['multipleQuestions']).at(i).get('column3') as FormArray;

    // if (this.questionform.value.multipleQuestions[i].matchColumnList == 3) {
    if (this.selectedvalue == 3) {
      
      // var control2 = (<FormArray>this.questionform.controls['multipleQuestions']).at(i) as FormArray;
      // 
      // control2.push(this.fb.group({
      //   column3: this.getoptionForMatchHeader(control1.value, '3'),
      // }));
      for (let j = 0; j < control1.length; j++) {
        
        control2.push(this.createItemForMatch(3, i, "column3"));

      }

      // this.questionform.controls['multipleQuestions']['controls'][i].controls.column3.controls[Optionindex].controls.responseURL.setValue(this.imgResultAfterCompress);
    }
    else {
      var control2 = (<FormArray>this.questionform.controls['multipleQuestions']).at(i).get('column3') as FormArray
      while (control2.length != 0) {
        control2.removeAt(0)
      }
    }

  }
  addNewMatchColumn(control, control1, control2, columnLength, QIndex) {
    // var control = (<FormArray>this.questionform.controls['multipleQuestions']).at(this.matchIndex).get('column1') as FormArray
    
    this.matchIndex = QIndex;
    control.push(this.createItemForMatch(1, QIndex, "column1"));
    control1.push(this.createItemForMatch(2, QIndex, "column2"));
    if (columnLength == 3) {
      control2.push(this.createItemForMatch(3, QIndex, "column3"));
    }
  }

  createItemForMatrixRows(parentQestionSNo) {
    debugger
    var rowLength = (<FormArray>this.questionform.controls['multipleQuestions']).at(this.questionMatrixIndex).get('rows') as FormArray
    return this.fb.group({
      description: ['', Validators.required],
      sequenceNO: [rowLength.length + 1, null],
      parentSequenceNO: [parentQestionSNo + 1, null],
      id: [0, null],
      formId: [0, null],
      questionType: [11, null],
      isMandatory: [false, null],
      validationText: ['', null],
      questionURL: ['', null],
      questionURLType: [0, null],
      isShowValidationText: [false, null],
      saveQuestionResponseCommand: []
    });
  }


  addNewMatrixRows(control, QIndex) {
    this.rowsForMatchSubmitted = false;
    debugger
    // var control = (<FormArray>this.questionform.controls['multipleQuestions']).at(this.matchIndex).get('column1') as FormArray
    
    this.questionMatrixIndex = QIndex;
    control.push(this.createItemForMatrixRows(QIndex));
  }


  createItemForMatrixColumns(questiontype) {
    debugger
    var rowLength = (<FormArray>this.questionform.controls['multipleQuestions']).at(this.matrixIndex).get('columns') as FormArray
    return this.fb.group({
      description: ['', Validators.required],
      sequenceNO: [rowLength.length + 1, null],
      id: [0, null],
      questionId: [0, null],
      comparisonType: ['0', null],
      compareWithValueType: ['0', null],
      errorText: ['', null],
      responseURL: ['', null],
      responseURLType: [0, null],
      conditionalOption: ['', null],
      conditionalQuestionId: [0, null],
      conditionalURL: ['', null],
      conditionalURLType: [0, null],
      conditionalActionsType: [0, null],
      isCorrectOption: [false, null],
      isShowCorrectAnswer: [false, null],
      isOtherOption: [false, null],
      responsePositionType: [questiontype, null]

    });
  }


  addNewMatrixColumns(control, QIndex) {
    
    this.columnsForMatchSubmitted = false;
    // var control = (<FormArray>this.questionform.controls['multipleQuestions']).at(this.matchIndex).get('column1') as FormArray
    this.matrixIndex = QIndex;
    control.push(this.createItemForMatrixColumns(1));
  }



  getoptionForMatchHeader(x, columnType) {
    this.isImageFromService = false;
    let arr = new FormArray([])
    x.forEach(y => {
      if (y.responsePositionType == columnType) {
        this.isImageFromService = true;

        arr.push(this.fb.group({

          id: y.id,
          questionId: y.questionId,
          sequenceNO: y.sequenceNO,
          description: y.description,
          comparisonType: y.comparisonType,
          compareWithValueType: y.compareWithValueType,
          errorText: y.errorText,
          responseURL: y.responseURL,
          isImageFromService: this.isImageFromService,
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

  sampleOptionForMatch(x, columnType) {
    this.isImageFromService = false;
    let arr = new FormArray([])
    x.forEach(y => {
      if (y.responsePositionType == columnType) {
        this.isImageFromService = true;

        arr.push(this.fb.group({

          id: 0,
          questionId: 0,
          sequenceNO: y.sequenceNO,
          description: y.description,
          comparisonType: y.comparisonType,
          compareWithValueType: y.compareWithValueType,
          errorText: y.errorText,
          responseURL: y.responseURL,
          isImageFromService: this.isImageFromService,
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



  addQuestion() {
    if (!this.disabledValue) {
      if (this.formPage || (this.questionform.value.multipleQuestions.length < 1)) {
        this.storedCopyData = JSON.parse(localStorage.getItem('copyDataStorage'));
        this.isBusy = false;
        this.isShow = false;
        this.show = false;
        this.ShowSampleQuestionType = false;
        this.filteredQuestiontype = this.questionsType;
        this.AddQuestionDialog.show();
      }
      else {

        //this.alertService.error("Only one question is allowed to create");
      }
    }
    else {
      this.alertService.error("Please enable edit mode");
    }

  }
  addGif(questionIndex, optionIndex, gifUrlValue, urlType) {
    this.gifImagesList = [];
    this.nextValue = '';
    this.addVideoGifForOption = true;
    this.isSelectedShowGIF = true;
    this.getGifImages(true);
    this.isSelectedGifOption = true;
    this.actionTitle = "Select a GIF";
    this.actionLabel = "Search";
    this.actionPlaceholder = "Search GIFs via Tenor";
    this.actionButtonTitle = "Select GIF";
    this.questionIndexForVideoGif = questionIndex;
    this.optionIndexForVideoGif = optionIndex;
    this.fileTypeUrl = this.URLType().GifURL;
    this.isSelectedShowImage = false;
    if (urlType == this.URLType().GifURL) {
      this.GifUrl = gifUrlValue;
    }
    else {
      this.GifUrl = "";
    }

    this.showGifImage = true;
    //this.conditionalUrlValue = '';
    this.SelectGIFDialog.show();

  }
  addVideo(questionIndex, optionIndex) {
    this.thumbnail = '';
    this.questionIndexForVideoGif = questionIndex;
    this.optionIndexForVideoGif = optionIndex;
    this.fileTypeUrl = this.URLType().VideoURL;
    this.isValidUrl = false;
    this.isSelectedShowGIF = false;
    this.actionTitle = "Enter URL";
    this.actionLabel = "Enter URL";
    this.actionPlaceholder = "Enter URL";
    this.actionButtonTitle = "Submit";
    this.SelectGIFDialog.show();
    this.addVideoGifForOption = true;
    this.isSelectedShowImage = false;
    this.showGifImage = false;
    this.actionFrom = 'options';
  }


  onFileChange(event, Questionindex, Optionindex, ContionalActionType) {

    this.isSelectedImage = true;
    this.isImageFromService = false;
    let reader = new FileReader();

    if (event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      var fileExtension = '|' + file.name.slice(file.name.lastIndexOf('.') + 1) + '|';
      var type = '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|';
      var fileExtensionResult = ('|png|jpeg|jpg|'.indexOf(type) !== -1 || '|png|jpeg|jpg|'.indexOf(fileExtension) !== -1);
      if (!fileExtensionResult) {
        this.alertService.error("The file being uploaded needs to be of type png or jpeg or  jpg Format");
      }
      else {
        reader.readAsDataURL(file);
        reader.onload = () => {
          // this.form.get('avatar').setValue({
          //   filename: file.name,
          //   filetype: file.type,
          //value: reader.result.toString().split(',')[1]
          this.image = reader.result;
          this.fileType = event.target.files[0].type;
          if (fileExtensionResult) {
            this.fileTypeUrl = this.URLType().ImageURL;
          }
          else {
            this.fileTypeUrl = this.URLType().VideoURL;
          }
          this.imgResultBeforeCompress = reader.result.toString().toString()

          this.imageCompress.compressFile(this.imgResultBeforeCompress, 1, 50, 25).then(
            result => {
              this.imgResultAfterCompress = result;
              if (ContionalActionType) {
                this.isOpenLink = false;
                this.conditionalUrlValue = this.imgResultAfterCompress;
              }
              else {
                this.questionform.controls['multipleQuestions']['controls'][Questionindex].controls.saveQuestionResponseCommand.controls[Optionindex].controls.responseURL.setValue(this.imgResultAfterCompress);
                this.questionform.controls['multipleQuestions']['controls'][Questionindex].controls.saveQuestionResponseCommand.controls[Optionindex].controls.responseURLType.setValue(this.fileTypeUrl);
                this.questionform.controls['multipleQuestions']['controls'][Questionindex].controls.saveQuestionResponseCommand.controls[Optionindex].controls.isImageFromService.setValue(false);
              }

            }
          );
        };
      }
    }
    else {
      this.alertService.error("Please add only images");
    }
  }
  addOption(control, startValue) {
    this.submitted = false;
    var optionSequenceNo = startValue || startValue >= 0 ? startValue : control.length + 1;
    control.push(
      this.fb.group({
        id: [0, null],
        questionId: [0, null],
        sequenceNO: [optionSequenceNo, null],
        description: ['', null],
        comparisonType: ['0', null],
        compareWithValueType: ['0', null],
        errorText: ['', null],
        responseURL: ['', null],
        thumbnailURL: ['', null],
        responseURLType: [0, null],
        responsePositionType: [0, null],
        conditionalOption: ['', null],
        conditionalSequenceNO: [0, null],
        conditionalURL: ['', null],
        conditionalURLType: [0, null],
        conditionalActionsType: [0, null],
        isCorrectOption: [false, null],
        isShowCorrectAnswer: [false, null],
        isOtherOption: [false, null],
      }))
    this.optionCount++;
    control.controls[0].controls['description'].setValidators(Validators.required);
  }
  removeOption(control, index: any) {
    if (!this.disabledValue) {
      control.removeAt(index)
    }
  }
  setMultipleQuestions() {
    let control = <FormArray>this.questionform.controls.multipleQuestions;
    this.MultipleQuestiondata.multipleQuestions.forEach(x => {
      control.push(this.fb.group({
        id: x.id,
        formId: x.formId,
        formName: x.formName,
        formDescription: x.formDescription,
        instructions: x.instructions,
        sequenceNO: x.sequenceNO,
        description: x.description,
        questionType: x.questionType,
        isMandatory: x.isMandatory,
        validationText: x.validationText,
        isShowValidationText: x.isShowValidationText,
        isShowConditionalActions: x.isShowConditionalActions,
        saveQuestionResponseCommand: this.setOptions(x),
        conditionalActionList: this.setConditionalAction(x, x.sequenceNO)
      }))
    })
  }

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
        saveQuestionResponseCommand: [],
        parentSequenceNO: x.parentSequenceNO,
        questionURL: x.questionURL,
        questionURLType: x.questionURLType,
      }))
    })
    return arr;
  }

  sampleChildQuestionForMatrix(y, parentSequenceNO) {
    debugger
    let arr = new FormArray([])
    if(y)  {
      y.forEach(x => {
        arr.push(this.fb.group({
          id: 0,
          formId: 0,
          sequenceNO: x.sequenceNO,
          description: x.description,
          questionType: x.questionType,
          isMandatory: x.isMandatory,
          validationText: x.validationText,
          isShowValidationText: x.isShowValidationText,
          isShowConditionalActions: x.isShowConditionalActions,
          saveQuestionResponseCommand: [],
          parentSequenceNO: parentSequenceNO,
          questionURL: x.questionURL,
          questionURLType: x.questionURLType,
        }))
      })
    }

    return arr;
  }

  setOptions(x) {
    this.isImageFromService = false;
    let arr = new FormArray([])
    x.forEach(y => {
      
      if (y.responseURL) {
        this.isImageFromService = true;
      }
      arr.push(this.fb.group({
        id: y.id,
        questionId: y.questionId,
        sequenceNO: y.sequenceNO,
        description: y.description,
        comparisonType: y.comparisonType,
        compareWithValueType: y.compareWithValueType,
        errorText: y.errorText,
        responseURL: y.responseURL,
        thumbnailURL:  this.setThumbnailURL(y.responseURL),
        isImageFromService: this.isImageFromService,
        responseURLType: y.responseURLType,
        responsePositionType: y.responsePositionType,
        conditionalSequenceNO: y.conditionalSequenceNO,
        conditionalURL: y.conditionalURL,
        conditionalURLType: y.conditionalURLType,
        conditionalActionsType: y.conditionalActionsType,
        isCorrectOption: y.isCorrectOption,
        isShowCorrectAnswer: y.isShowCorrectAnswer,
        isOtherOption: y.isOtherOption
      }))
    })
    return arr;
  }
  setThumbnailURL(thumbnailURL) {
    if(thumbnailURL)
    {
      // this.getId(thumbnailURL);
      this.appendedHtml = '<div style="width:150px;height:150px"><iframe width="150" height="150" src="//www.youtube.com/embed/' + this.youtubeUrl + '" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></iframe></div>';
      this.thumbnail = this.sanitizer.bypassSecurityTrustHtml(this.appendedHtml);
      return this.thumbnail;
    }
    return "";
  }
  setConditionalAction(x, indexNo) {
    let arr = new FormArray([])

    let index = 0;
    x.forEach(z => {
      let option = [];

      this.optionsList.push({ description: z.description, sequenceNO: z.sequenceNO })
      if (indexNo != z.sequenceNO) {
        this.selectedQuestionsList.push({ questionNO: 'Question' + z.sequenceNO, sequenceNO: z.sequenceNO })
      }
      //this.questionsList = this.questionform.value.multipleQuestions.filter(element => element.sequenceNO != index+1);
      index++;
    })
    x.forEach(y => {
      if (y.conditionalActionsType != 0) {
        arr.push(this.fb.group({
          id: y.id,
          sequenceNO: y.sequenceNO,
          responseURL: y.responseURL,
          responseURLType: y.responseURLType,
          conditionalSequenceNO: y.conditionalSequenceNO,
          conditionalURL: y.conditionalURL,
          isSelectedGotoOption: y.isSelectedGotoOption,
          conditionalURLType: y.conditionalURLType,
          conditionalActionsType: y.conditionalActionsType,
          listSelectOption: new FormControl(this.optionsList),
          questionsList: new FormControl(this.selectedQuestionsList),
          conditionalOptionSelected: y.sequenceNO,
        }))
      }

    })

    return arr;
  }
  getSelectedRecord(refresh) {
    
    this.newquestionService.getSelectedQuestion(this.formId, refresh).subscribe(question => {
      //filter the child question
      this.childQuestion = question.question.filter(i => {
        return i.questionType == questionType.isChild;
      })
      //Remove the child question
      question.question = question.question.filter(i => {
        return i.questionType != questionType.isChild;
      })

      this.selectedData = question;

      this.selectedMultipleQuestion = this.selectedData.question;
      if (this.selectedMultipleQuestion && this.selectedMultipleQuestion.length > 0) {


        if (!this.formPage) {
          this.isAllowToAddQuestion = false;
          this.isShortText = this.selectedMultipleQuestion[0].questionType;
        }
        this.disabledValue = true;
        this.questionTypeSelected = true;
        let control = <FormArray>this.questionform.controls['multipleQuestions'];
        while (control.length !== 0) {
          control.removeAt(0)
        }
        if (this.duplicateId == 2) {
          this.selectedData.parentFormId = this.selectedData.id;
          this.selectedData.templateName = null;
        }
        if (this.isAllowedDuplicateForm) {

          this.selectedData.id = 0;
          this.selectedData.templateType = TemplateType.Form;
          this.selectedData.formName = "";
        }
        for (var i = 0, len = this.selectedMultipleQuestion.length; i < len; i++) {
          /* for Duplicate Form */
          if (this.isAllowedDuplicateForm) {
            this.selectedMultipleQuestion[i].id = 0;
            this.selectedMultipleQuestion[i].formId = 0;
            for (var duplicateOption = 0; duplicateOption < this.selectedMultipleQuestion[i].saveQuestionResponseCommand.length; duplicateOption++) {
              this.selectedMultipleQuestion[i].saveQuestionResponseCommand[duplicateOption].id = 0;
              this.selectedMultipleQuestion[i].saveQuestionResponseCommand[duplicateOption].questionId = 0;

            }
            this.edit();
          }
          /* for Duplicate Form */
          this.isSelectedRadioButton = this.selectedMultipleQuestion[i].questionType == 2 ? true : false;

          if (this.selectedMultipleQuestion[i].questionType == questionType.match) {
            this.matchColumnLength = this.selectedMultipleQuestion[i].saveQuestionResponseCommand.filter(i => i.responsePositionType === 3).length > 0 ? 3 : 2;
            // var headerData = [];
            // headerData = this.selectedMultipleQuestion[i].saveQuestionResponseCommand.filter(i => i.responsePositionType === 0)
            // 
            // this.questionform.controls['multipleQuestions']['controls'][i].controls['headerText1'].setValue(headerData[0].description);
            // this.questionform.controls['multipleQuestions']['controls'][i].controls['headerText2'].setValue(headerData[1].description);
            if (this.matchColumnLength == 3) {
              // this.questionform.controls['multipleQuestions']['controls'][i].controls['headerText2'].setValue(headerData[2].description);
            }

          }


          if ((this.selectedMultipleQuestion[i].questionType == questionType.matrixradiobox) || (this.selectedMultipleQuestion[i].questionType == questionType.matrixcheckbox)) {
            var sequenceNO = this.selectedMultipleQuestion[i].sequenceNO;

            this.fliteredChildQuestion = [];
            this.fliteredChildQuestion = this.childQuestion.filter
              (i => i.questionType === questionType.isChild && i.parentSequenceNO === sequenceNO);
          }
          else {
            this.fliteredChildQuestion = [];
          }

          var MatchHeaderData = [];
          MatchHeaderData = this.selectedMultipleQuestion[i].saveQuestionResponseCommand.filter(i => i.responsePositionType === 0)
          var matchHeaderText1 = this.matchColumnLength >= 2 ? MatchHeaderData[0].description : "";
          var matchHeaderText2 = this.matchColumnLength >= 2 ? MatchHeaderData[1].description : "";
          var matchHeaderText3 = this.matchColumnLength == 3 ? MatchHeaderData[2].description : "";

          control.push(this.fb.group({
            id: this.selectedMultipleQuestion[i].id,
            formId: this.selectedMultipleQuestion[i].formId,
            sequenceNO: this.selectedMultipleQuestion[i].sequenceNO,
            description: this.selectedMultipleQuestion[i].description,
            questionType: this.selectedMultipleQuestion[i].questionType,
            isAllowedConditionalActions: [this.isSelectedRadioButton, null],
            isMandatory: this.selectedMultipleQuestion[i].isMandatory,
            validationText: this.selectedMultipleQuestion[i].validationText,
            isShowValidationText: this.selectedMultipleQuestion[i].isShowValidationText,
            isShowConditionalActions: this.selectedMultipleQuestion[i].isShowConditionalActions,
            sliderFromValue: ['', null],
            sliderToValue: ['', null],
            headerText1: [matchHeaderText1, null],
            headerText2: [matchHeaderText2, null],
            headerText3: [matchHeaderText3, null],
            sliderData: this.fb.array([]),
            saveQuestionResponseCommand: this.setOptions(this.selectedMultipleQuestion[i].saveQuestionResponseCommand),
            conditionalActionList: this.setConditionalAction(this.selectedMultipleQuestion[i].saveQuestionResponseCommand, this.selectedMultipleQuestion[i].sequenceNO),
            column1: this.getoptionForMatchHeader(this.selectedMultipleQuestion[i].saveQuestionResponseCommand, '1'),
            column2: this.getoptionForMatchHeader(this.selectedMultipleQuestion[i].saveQuestionResponseCommand, '2'),
            column3: this.getoptionForMatchHeader(this.selectedMultipleQuestion[i].saveQuestionResponseCommand, '3'),
            ColumnItem: new FormControl(this.ColumnItem),
            matchColumnList: this.matchColumnLength,
            rows: this.setChildQuestion(this.fliteredChildQuestion),
            columns: this.setOptions(this.selectedMultipleQuestion[i].saveQuestionResponseCommand),

          }));
          this.optionsList = [];
          this.selectedQuestionsList = [];
          this.isImageFromService = true;
        }
      }
      this.questionform.patchValue(this.selectedData);
      // this.questionform.controls['templateName'].setValue(this.selectedData.templateName);
      // this.questionform.controls['templateType'].setValue(this.selectedData.templateType);
      this.questionform.controls['tags'].setValue(this.selectedData.tags);
      this.FormName = this.selectedData.formName;
      this.questionform.value.id = this.selectedData.id;
      if (this.selectedData.templateType == TemplateType.Form) {
        this.questionform.controls['tags'].setValue('');
      }
      else {
        // this.selectedData.tags
        // this.selectedTags = {};
         //this.selectedTags['object'] = this.questionform.value.tags;
        // this.createform.value.tags = this.selectedTags;
        // this.selectedTags = {};
        this.selectedData.tags['object'] = this.questionform.value.tags;
        // this.createform.value.tags = this.selectedTags;
      }
      for (let questionIndex = 0; questionIndex < this.questionform.value.multipleQuestions.length; questionIndex++) {
        if (this.questionform.value.multipleQuestions[questionIndex].questionType == questionType.match && this.questionform.value.multipleQuestions[questionIndex].saveQuestionResponseCommand.length > 0) {
          var control = (<FormArray>this.questionform.controls['multipleQuestions']).at(questionIndex).get('saveQuestionResponseCommand') as FormArray
          while (control.length !== 0) {
            control.removeAt(0)
          }
        }
        if (this.questionform.value.multipleQuestions[questionIndex].questionType == questionType.linear && this.questionform.value.multipleQuestions[questionIndex].saveQuestionResponseCommand.length > 0) {
          const newOptionsCreate: Options = {
            showTicksValues: true,
            stepsArray: []
          };
          this.sliderListData = newOptionsCreate;
          var optionsLength = this.questionform.value.multipleQuestions[questionIndex].saveQuestionResponseCommand.length;
          var selectedFromvalue = this.questionform.value.multipleQuestions[questionIndex].saveQuestionResponseCommand[0].sequenceNO;
          var selectedToValue = this.questionform.value.multipleQuestions[questionIndex].saveQuestionResponseCommand[optionsLength - 1].sequenceNO;
          (<FormArray>this.questionform.controls['multipleQuestions']).at(questionIndex).patchValue({ sliderFromValue: selectedFromvalue });
          (<FormArray>this.questionform.controls['multipleQuestions']).at(questionIndex).patchValue({ sliderToValue: selectedToValue });
          for (let optionIndex = 0; optionIndex < this.questionform.value.multipleQuestions[questionIndex].saveQuestionResponseCommand.length; optionIndex++) {
            this.sliderListData.stepsArray.push({
              value: optionIndex
            });
          }
          var getSliderData = (<FormArray>this.questionform.controls['multipleQuestions']).at(questionIndex).get('sliderData') as FormArray;
          // var getSliderData = (<FormArray>this.questionform.controls['multipleQuestions']).at(i).get('sliderData') as FormArray

          getSliderData.push(this.fb.group({
            sliderValues: [this.sliderListData, null]
          }))
        }
        for (let conditionalIndex = 0; conditionalIndex < this.questionform.value.multipleQuestions[questionIndex].conditionalActionList.length; conditionalIndex++) {
          if (this.questionform.value.multipleQuestions[questionIndex].conditionalActionList[conditionalIndex].conditionalSequenceNO) {
            // (<FormArray>this.questionform.controls['multipleQuestions']).at(questionIndex).patchValue({ isSelectedGotoOption: true });
            var control = (<FormArray>this.questionform.controls['multipleQuestions']).at(questionIndex).get('conditionalActionList') as FormArray
            control.controls.forEach((formGroup: FormGroup, index) => {
              if (index == conditionalIndex) {
                formGroup.patchValue({
                  isSelectedGotoOption: true,
                });
              }
            });
          }
          if (this.questionform.value.multipleQuestions[questionIndex].conditionalActionList[conditionalIndex].conditionalActionsType != 0) {
            (<FormArray>this.questionform.controls['multipleQuestions']).at(questionIndex).patchValue({ isShowConditionalActions: true });
          }


        }
      }
      //alert(this.questionform.value.multipleQuestions[0].conditionalActionList.length);
    });
  }

  myquestion() {
    this.myquestiontab = true;
    this.templatetab = false;
  }
  goToResponses() {
    this.navigationService.goToResponses();
  }
  saveAsForm() {
   this.save(false); 
  }
  save(isFromSaveAsTemplate) {
    
   
    this.questionform.controls['tags'].setValidators(null);
    this.questionform.controls['templateName'].setValidators(null);
    this.questionform.controls['tags'].updateValueAndValidity();
    this.questionform.controls['templateName'].updateValueAndValidity();

    if (!isFromSaveAsTemplate) {
      this.questionform.controls['tags'].setValue('');
      this.questionform.controls['templateName'].setValue('');
      this.questionform.controls['templateType'].setValue(TemplateType.Form);
      this.questionform.controls['templateType'].updateValueAndValidity();
    }

    this.columnsForMatchSubmitted = true;
    this.rowsForMatchSubmitted = true;

    this.submitted = true;
    this.questions = this.questionform.value;
    var optionsValid = true;
    if (this.questionform.valid) {
      this.questions.multipleQuestions.forEach(Questiondata => {

        if (Questiondata.questionType == questionType.match) {

          while (Questiondata.saveQuestionResponseCommand.length > 0) {
            Questiondata.saveQuestionResponseCommand = [];
          }
          var TitleRow1 = [];
          var TitleRow2 = [];
          TitleRow1.push(this.setoptionForMatchHeader(Questiondata.headerText1, 0));
          TitleRow2.push(this.setoptionForMatchHeader(Questiondata.headerText2, 0));
          Questiondata.saveQuestionResponseCommand.push(TitleRow1[0].value);
          Questiondata.saveQuestionResponseCommand.push(TitleRow2[0].value);
          if (Questiondata.matchColumnList == 3) {
            var Title1Row3 = [];
            Title1Row3.push(this.setoptionForMatchHeader(Questiondata.headerText3, 0));
            Questiondata.saveQuestionResponseCommand.push(Title1Row3[0].value);
          }

          Questiondata.column1.forEach(element => {
            Questiondata.saveQuestionResponseCommand.push(element)

          });
          Questiondata.column2.forEach(element => {
            Questiondata.saveQuestionResponseCommand.push(element)
          });

          if (Questiondata.matchColumnLength = 3) {
            Questiondata.column3.forEach(element => {
              Questiondata.saveQuestionResponseCommand.push(element)
            });
          }
        }


        if ((Questiondata.questionType == questionType.matrixradiobox) || (Questiondata.questionType == questionType.matrixcheckbox)) {

          Questiondata.columns.forEach(element => {
            Questiondata.saveQuestionResponseCommand.push(element)
          });

          Questiondata.rows.forEach(element => {
            this.questions.multipleQuestions.push(element)
          });

        }

        if ((Questiondata.questionType != 1) && (Questiondata.saveQuestionResponseCommand.length == 0)) {
          optionsValid = false;
        }
      });
    }

    if (this.questionform.valid) {
      debugger
      if (this.questions.multipleQuestions.length > 0) {
        if (optionsValid) {
          if (this.isValidUrl) {
            this.createform.value.formId = this.questionform.value.formId;
            this.createform.value.id = this.formId == 0 ? this.createform.value.id : this.selectedData.id;
            this.createform.value.organisationId = this.organisationPageSessionService.getOrganisationId();
            this.createform.value.userId = this.userSessionService.userId();
            this.createform.value.formName = this.questionform.value.formName;
            this.createform.value.formDescription = this.questionform.value.formDescription;
            this.createform.value.instructions = this.questionform.value.instructions;
            this.createform.value.templateName = this.questionform.value.templateName;
            this.createform.value.templateType = this.questionform.value.templateType;
            this.createform.value.parentFormId = this.questionform.value.parentFormId;
            // this.createform.value.tags = ""; 
            this.createform.value.tags = this.questionform.value.tags;
            if (this.questionform.value.templateType != TemplateType.Form) {
              this.selectedTags = {};
              this.selectedTags['object'] = this.questionform.value.tags;
              this.createform.value.tags = this.selectedTags;

              if (this.createform.value.id > 0) {
                this.createform.value.id = 0
                this.createform.value.userId = this.userSessionService.userId();

                for (var i = 0, len = this.questions.multipleQuestions.length; i < len; i++) {
                  this.questions.multipleQuestions[i].id = 0;
                  this.questions.multipleQuestions.formId = 0;

                  for (var j = 0; j < this.questions.multipleQuestions[i].saveQuestionResponseCommand.length; j++) {
                    this.questions.multipleQuestions[i].saveQuestionResponseCommand[j].id = 0;
                    this.questions.multipleQuestions[i].saveQuestionResponseCommand[j].questionId = 0;
                  }
                }
              }
            }
            else {
              this.createform.value.tags = "";
            }

            this.createform.value.formPageType = this.pageid;

            this.newquestionService.createForm(this.createform.value).subscribe(data => {
              if (data) {
                this.questionform.value.formId = data;
                this.responseFormId= data;
                var optionsValid = true;
                this.questions.multipleQuestions.forEach(function (Questiondata) {
                  Questiondata.formId = data;

                });
                for (let questionIndex = 0; questionIndex < this.questionform.value.multipleQuestions.length; questionIndex++) {
                  if (this.questionform.value.multipleQuestions[questionIndex].conditionalActionList) {
                    for (let optionIndex = 0; optionIndex < this.questionform.value.multipleQuestions[questionIndex].saveQuestionResponseCommand.length; optionIndex++) {
                      this.questionform.value.multipleQuestions[questionIndex].saveQuestionResponseCommand[optionIndex].conditionalActionsType = 0;
                      for (let conditionalIndex = 0; conditionalIndex < this.questionform.value.multipleQuestions[questionIndex].conditionalActionList.length; conditionalIndex++) {

                        if (this.questionform.value.multipleQuestions[questionIndex].saveQuestionResponseCommand[optionIndex].sequenceNO === this.questionform.value.multipleQuestions[questionIndex].conditionalActionList[conditionalIndex].sequenceNO) {
                          this.questionform.value.multipleQuestions[questionIndex].saveQuestionResponseCommand[optionIndex].conditionalActionsType = this.questionform.value.multipleQuestions[questionIndex].conditionalActionList[conditionalIndex].conditionalActionsType;
                          this.questionform.value.multipleQuestions[questionIndex].saveQuestionResponseCommand[optionIndex].conditionalURL = this.questionform.value.multipleQuestions[questionIndex].conditionalActionList[conditionalIndex].conditionalURL;
                          this.questionform.value.multipleQuestions[questionIndex].saveQuestionResponseCommand[optionIndex].conditionalURLType = this.questionform.value.multipleQuestions[questionIndex].conditionalActionList[conditionalIndex].conditionalURLType;
                          this.questionform.value.multipleQuestions[questionIndex].saveQuestionResponseCommand[optionIndex].conditionalSequenceNO = this.questionform.value.multipleQuestions[questionIndex].conditionalActionList[conditionalIndex].conditionalSequenceNO;

                        }

                      }
                    }
                  }

                }

                this.newquestionService.PostedQuestion(this.questions.multipleQuestions).subscribe(data => {
                  
                  if (this.questionform.value.templateType == TemplateType.Form) {
                    if (this.formPage) {
                      if (this.isAllowedDuplicateForm) {
                        this.alertService.success("Form(s) Duplicated successfully");
                        this.formId = this.questionform.value.formId;
                        this.isAllowedDuplicateForm = false;
                        this.navigationService.goToNewQuestion(this.formId, this.LabelPageTypeno().FormPage, Duplicate.None);
                        this.getSelectedRecord(true);
                      }
                      else {
                        if (this.formId == 0) {
                          this.alertService.success("Form(s) created successfully");
                          this.formId = this.questionform.value.formId;
                          this.getSelectedRecord(true);
                        }
                        else {
                          this.alertService.success("Form(s) updated successfully");
                          this.Cancel();
                        }
                      }

                      //this.navigationService.goToForms(this.LabelPageTypeno().None);
                    }
                    else {
                      if (this.isAllowedDuplicateForm) {
                        this.alertService.success("Question Duplicated successfully");
                        this.formId = this.questionform.value.formId;
                        this.isAllowedDuplicateForm = false;
                        this.navigationService.goToNewQuestion(this.formId, this.LabelPageTypeno().QuestionPage, Duplicate.None);
                        this.getSelectedRecord(true);
                      }
                      else {
                        if (this.formId == 0) {
                          this.alertService.success("Question created successfully");
                          this.formId = this.questionform.value.formId;
                          this.getSelectedRecord(true);
                        }
                        else {
                          this.alertService.success("Question updated successfully");
                          this.Cancel();
                        }
                      }

                      //this.navigationService.goToQuestion(this.LabelPageTypeno().None);
                    }
                  }
                  else if(this.questionform.value.templateType != TemplateType.Form){
                    this.alertService.success("Template created successfully");
                     this.formId = this.responseFormId;
                    this.getSelectedRecord(true);
                    
                  }
                  else {
                    this.navigationService.goToForms(0);
                  }
                });
              }
            });
          }
          else {
            this.alertService.error("Invalid youtube url");
          }
        }
        else {
          this.alertService.error("Please add at least one option");
        }
      }
      else {
        this.alertService.error("Please add at least one question");
      }
    }
    else {
      this.alertService.error("Please fill all the required fields");
    }

  }
  setoptionForMatchHeader(title, responsePositionType) {
    return this.fb.group({
      id: [0, null],
      questionId: [0, null],
      sequenceNO: [1, null],
      description: [title, null],
      comparisonType: ['0', null],
      compareWithValueType: ['0', null],
      errorText: ['', null],
      responseURL: ['', null],
      responseURLType: [0, null],
      conditionalOption: ['', null],
      conditionalQuestionId: [0, null],
      conditionalURL: ['', null],
      conditionalURLType: [0, null],
      conditionalActionsType: [0, null],
      isCorrectOption: [false, null],
      isShowCorrectAnswer: [false, null],
      isOtherOption: [false, null],
      responsePositionType: [responsePositionType, null]
    });

  }
  getQuestionType(questiontype) {
    this.submitted = false;
    this.selectedQuestionTypeNo = questiontype;
    this.questionTypeSelected = true;
    let control = <FormArray>this.questionform.controls.multipleQuestions;
    var SequenceNO = control.length + 1;
    var questionNO = 'Question' + SequenceNO;
    this.isSelectedRadioButton = this.selectedQuestionTypeNo == 2 ? true : false;
    control.push(
      this.fb.group({
        id: [0, null],
        formId: [this.formId, null],
        sequenceNO: [SequenceNO, null],
        questionNO: [questionNO, null],
        description: ['', Validators.required],
        questionType: [this.selectedQuestionTypeNo, null],
        isMandatory: [false, null],
        validationText: ['', null],
        formName: ['', null],
        formDescription: ['', null],
        instructions: ['', null],
        isShowValidationText: [false, null],
        isShowConditionalActions: [false, null],
        matchColumnlength: ["", null],
        isAllowedConditionalActions: [this.isSelectedRadioButton, null],
        matchColumnList: ['', null],
        sliderFromValue: ['', null],
        sliderToValue: ['', null],
        headerText1: ['', null],
        headerText2: ['', null],
        headerText3: ['', null],
        sliderData: this.fb.array([]),
        saveQuestionResponseCommand: this.fb.array([]),
        conditionalActionList: this.fb.array([]),
        column1: this.fb.array([]),
        column2: this.fb.array([]),
        column3: this.fb.array([]),
        rows: this.fb.array([]),
        columns: this.fb.array([]),



      })
    )
    this.matchIndex = control.length - 1;
    this.questionTypeSelected = true;
    this.questionCount++;
    this.AddQuestionDialog.hide();
    if (!this.formPage) {
      this.isAllowToAddQuestion = false;
    }
  }
  removeRowInMatch(control, control1, control2, index: any) {
    if (!this.disabledValue) {
      control.removeAt(index)
      control1.removeAt(index)
      control2.removeAt(index)
    }
  }
  removeMatrixRows(control, index: any) {
    debugger
    if (!this.disabledValue) {
      control.removeAt(index)
    }
  }
  removeMatrixInColumns(control, index: any) {
    if (!this.disabledValue) {
      control.removeAt(index)
    }
  }

  drop(event: CdkDragDrop<string[]>, i) {
    moveItemInArray(this.questionform.get('multipleQuestions')['controls'][i].get('saveQuestionResponseCommand')['controls'], event.previousIndex, event.currentIndex);
    moveItemInArray(this.questionform.get('multipleQuestions').value[i].saveQuestionResponseCommand, event.previousIndex, event.currentIndex);
    let index = 1;
    var control = (<FormArray>this.questionform.controls['multipleQuestions']).at(i).get('saveQuestionResponseCommand') as FormArray
    control.controls.forEach((formGroup: FormGroup) => {
      formGroup.patchValue({
        sequenceNO: index
      });
      index++;
    });
  }
  columnDrop(event: CdkDragDrop<string[]>, i, columnType) {
    this.columnNo = columnType;
    this.columnNumber = this.columnNo.replace(/\"/g, "");
    moveItemInArray(this.questionform.get('multipleQuestions')['controls'][i].get(this.columnNo)['controls'], event.previousIndex, event.currentIndex);
    moveItemInArray(this.questionform.get('multipleQuestions').value[i][this.columnNumber], event.previousIndex, event.currentIndex);
    let index = 1;
    var control = (<FormArray>this.questionform.controls['multipleQuestions']).at(i).get(this.columnNo) as FormArray
    control.controls.forEach((formGroup: FormGroup) => {
      formGroup.patchValue({
        sequenceNO: index
      });
      index++;
    });
  }
  dropMultipleQuestions(event: CdkDragDrop<string[]>) {
    debugger
    moveItemInArray(this.questionform.get('multipleQuestions')['controls'], event.previousIndex, event.currentIndex);
    moveItemInArray(this.questionform.get('multipleQuestions').value, event.previousIndex, event.currentIndex);
    let index = 1;
    var control = (<FormArray>this.questionform.controls['multipleQuestions']) as FormArray
    control.controls.forEach((formGroup: FormGroup) => {
      formGroup.patchValue({
        sequenceNO: index
      });
      index++;
    });
  }
  sampledrop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.sample, event.previousIndex, event.currentIndex);
  }
  sample2drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.sample2, event.previousIndex, event.currentIndex);
  }

  ShowSample(text, id) {
    debugger
    this.show = !this.show;
    this.isBusy = false;
    const questionItem = this.sampleQuestionData.filter(i => i.id === id);

    this.selectedMultipleQuestion = questionItem[0].question;


    //filter the child question
    this.childQuestion = this.selectedMultipleQuestion.filter(i => {
      return i.questionType == questionType.isChild;
    })

    //Remove the child question
    this.selectedMultipleQuestion = questionItem[0].question.filter(i => {
      return i.questionType != questionType.isChild;
    })

    let showSampleQuestion = new FormArray([]);

    for (var i = 0, len = this.selectedMultipleQuestion.length; i < len; i++) {

      if (this.selectedMultipleQuestion[i].questionType == questionType.match) {
        this.matchColumnLength = this.selectedMultipleQuestion[i].saveQuestionResponseCommand.filter(i => i.responsePositionType === 3).length > 0 ? 3 : 2;
        var headerData = [];
        headerData = this.selectedMultipleQuestion[i].saveQuestionResponseCommand.filter(i => i.responsePositionType === 0)
        this.headerTitle1 = headerData[0].description;
        this.headerTitle2 = headerData[1].description;
        if (this.matchColumnLength == 3) {
          this.headerTitle3 = headerData[2].description;
        }
      }

      if ((this.selectedMultipleQuestion[i].questionType == questionType.matrixradiobox) || (this.selectedMultipleQuestion[i].questionType == questionType.matrixcheckbox)) {
        var sequenceNO = this.selectedMultipleQuestion[i].sequenceNO;

        this.fliteredChildQuestion = [];
        this.fliteredChildQuestion = this.childQuestion.filter
          (i => i.questionType === questionType.isChild && i.parentSequenceNO === sequenceNO);
      }
      else {
        this.fliteredChildQuestion = [];
      }

      if (this.selectedMultipleQuestion[i].questionType == questionType.linear) {
        const newOptionsCreate: Options = {
          showTicksValues: true,
          stepsArray: []
        };
        this.sliderListData = newOptionsCreate;
        for (let optionIndex = 0; optionIndex < this.selectedMultipleQuestion[i].saveQuestionResponseCommand.length; optionIndex++) {
          this.sliderListData.stepsArray.push({
            value: optionIndex + 1
          });
        }
      }
      showSampleQuestion.push(this.fb.group({
        id: this.selectedMultipleQuestion[i].id,
        formId: this.selectedMultipleQuestion[i].formId,
        sequenceNO: this.selectedMultipleQuestion[i].sequenceNO,
        description: this.selectedMultipleQuestion[i].description,
        questionType: this.selectedMultipleQuestion[i].questionType,
        isAllowedConditionalActions: [this.isSelectedRadioButton, null],
        isMandatory: this.selectedMultipleQuestion[i].isMandatory,
        validationText: this.selectedMultipleQuestion[i].validationText,
        isShowValidationText: this.selectedMultipleQuestion[i].isShowValidationText,
        isShowConditionalActions: this.selectedMultipleQuestion[i].isShowConditionalActions,
        sliderFromValue: ['', null],
        sliderToValue: ['', null],
        sliderData: this.setSliderData(this.sliderListData),
        saveQuestionResponseCommand: this.setOptions(this.selectedMultipleQuestion[i].saveQuestionResponseCommand),
        conditionalActionList: this.setConditionalAction(this.selectedMultipleQuestion[i].saveQuestionResponseCommand, this.selectedMultipleQuestion[i].sequenceNO),
        column1: this.getoptionForMatchHeader(this.selectedMultipleQuestion[i].saveQuestionResponseCommand, '1'),
        column2: this.getoptionForMatchHeader(this.selectedMultipleQuestion[i].saveQuestionResponseCommand, '2'),
        column3: this.getoptionForMatchHeader(this.selectedMultipleQuestion[i].saveQuestionResponseCommand, '3'),
        ColumnItem: new FormControl(this.ColumnItem),
        matchColumnList: this.matchColumnLength,
        rows: this.setChildQuestion(this.fliteredChildQuestion),
        columns: this.setOptions(this.selectedMultipleQuestion[i].saveQuestionResponseCommand),

      }));
    }


    this.samleQuestionListData = showSampleQuestion.value;
    this.ShowSampleQuestionType = true;
  }




  setSliderData(y) {
    
    let arr = new FormArray([])
    arr.push(this.fb.group({
      sliderValues: [y, null],
    }))
    return arr;
  }

  setFormatSliderData(y) {
    
    if(y !="") {
      let arr = new FormArray([])
      arr.push(this.fb.group({
        sliderValues: y[0].sliderValues
      }))
      return arr;
    }
 
  }
  checkEditMode() {
    if (this.disabledValue) {

      this.alertService.error("Please enable edit mode");
    }
  }


  action(event, control) {
    
    if (this.storedCopyData) {
      this.copyData = this.storedCopyData;
    }
    this.copyData.forEach(x => {
      if(x.id == control.id) {
        this.checkDuplicate = true; 
      }
    });
    if(this.checkDuplicate) {
      this.alertService.error("Already Added to favourite");
    }
    else {
      this.copyData.push(control);
      localStorage.setItem('copyDataStorage', JSON.stringify(this.copyData));
      this.storedCopyData = JSON.parse(localStorage.getItem('copyDataStorage'));
      this.alertService.success("Added to favourite successfully");
    }

  }
  deleteFavorite(copyindex, id, selectedData) {
    
    const index: number = this.storedCopyData.indexOf(selectedData);
    if (index !== -1) {
      this.storedCopyData.splice(index, 1);
    }
    localStorage.setItem('copyDataStorage', JSON.stringify(this.storedCopyData));
  }
  more() {
    this.MoreOptionDialog.show();
  }
  move() {
    if (this.disabledValue) {
      this.alertService.error("Please enable edit mode");
    }
  }
  duplicate(i) {
    debugger
    if (!this.disabledValue) {
      let duplicateQuestion = this.questionform.get('multipleQuestions')['controls'][i]
      if (this.formPage || (this.questionform.value.multipleQuestions.length < 1)) {
        let control = <FormArray>this.questionform.controls.multipleQuestions;
        var duplicateSequenceNo = control.length + 1;
        //this.isSelectedRadioButton = this.selectedQuestionTypeNo == 2 ? true : false;
        var isduplicatedRadioButton = duplicateQuestion.value.questionType == 2 ? true : false;

        if ((duplicateQuestion.value.questionType == questionType.matrixcheckbox) || (duplicateQuestion.value.questionType == questionType.matrixradiobox)) {
          duplicateQuestion.value.saveQuestionResponseCommand = [];
        }

        control.push(
          this.fb.group({
            id: [0, null],
            formId: [duplicateQuestion.value.formId, null],
            description: [duplicateQuestion.value.description, Validators.required],
            questionType: [duplicateQuestion.value.questionType, null],
            isMandatory: [duplicateQuestion.value.isMandatory, null],
            sequenceNO: [duplicateSequenceNo, null],
            validationText: [duplicateQuestion.value.validationText, null],
            formName: [duplicateQuestion.value.formName, null],
            formDescription: [duplicateQuestion.value.formDescription, null],
            instructions: [duplicateQuestion.value.instructions, null],
            isShowValidationText: [duplicateQuestion.value.isShowValidationText, null],
            isShowConditionalActions: [duplicateQuestion.value.isShowConditionalActions, null],
            isAllowedConditionalActions: [isduplicatedRadioButton, null],
            sliderFromValue: [duplicateQuestion.value.sliderFromValue, null],
            sliderToValue: [duplicateQuestion.value.sliderToValue, null],
            sliderData: [duplicateQuestion.value.sliderData, null],
            //sliderData: this.setDuplicateOptions(duplicateQuestion.value.sliderData),
            saveQuestionResponseCommand: this.setDuplicateOptions(duplicateQuestion.value.saveQuestionResponseCommand),
            //conditionalActionList: this.setConditionalAction(duplicateQuestion.value.saveQuestionResponseCommand,duplicateSequenceNo)
            conditionalActionList: this.setDuplicateConditionalAction(duplicateQuestion.value.conditionalActionList),
            //conditionalActionList: this.setConditionalAction(this.selectedMultipleQuestion[i].saveQuestionResponseCommand,this.selectedMultipleQuestion[i].sequenceNO)
            headerText1: [duplicateQuestion.value.headerText1, null],
            headerText2: [duplicateQuestion.value.headerText2, null],
            headerText3: [duplicateQuestion.value.headerText3, null],
            column1: this.setDuplicateOptions(duplicateQuestion.value.column1),
            column2: this.setDuplicateOptions(duplicateQuestion.value.column2),
            column3: this.setDuplicateOptions(duplicateQuestion.value.column3),
            matchColumnList: [duplicateQuestion.value.matchColumnList, null],
            ColumnItem: new FormControl(this.ColumnItem),
            rows: this.setDuplicateChildQuestion(duplicateQuestion.value.rows, duplicateSequenceNo),
            columns: this.setDuplicateOptions(duplicateQuestion.value.columns),
          })
        )
      }
    }
    else {
      this.alertService.error("Please enable edit mode");
    }
  }

  setDuplicateChildQuestion(y, parentSequenceNO) {
    debugger
    let arr = new FormArray([])
    y.forEach(x => {
      arr.push(this.fb.group({
        id: 0,
        formId: x.formId,
        sequenceNO: x.sequenceNO,
        description: x.description,
        questionType: x.questionType,
        isMandatory: x.isMandatory,
        validationText: x.validationText,
        isShowValidationText: x.isShowValidationText,
        isShowConditionalActions: x.isShowConditionalActions,
        saveQuestionResponseCommand: [],
        parentSequenceNO: parentSequenceNO,
        questionURL: x.questionURL,
        questionURLType: x.questionURLType,
      }))
    })
    return arr;
  }

  setDuplicateOptions(x) {
    let arr = new FormArray([])
    x.forEach(y => {
      arr.push(this.fb.group({
        id: 0,
        questionId: 0,
        sequenceNO: y.sequenceNO,
        description: y.description,
        comparisonType: y.comparisonType,
        compareWithValueType: y.compareWithValueType,
        errorText: y.errorText,
        responseURL: y.responseURL,
        responseURLType: y.responseURLType,
        isCorrectOption: y.isCorrectOption,
        isShowCorrectAnswer: y.isShowCorrectAnswer,
        isOtherOption: y.isOtherOption,
        responsePositionType: y.responsePositionType,
        parentSequenceNO: y.parentSequenceNO,
      }))
    })
    return arr;
  }

  setDuplicateConditionalAction(x) {
    let arr = new FormArray([])
    x.forEach(y => {
      this.duplicateOptionsList = y.listSelectOption;
      this.duplicateQuestionList = y.questionsList;
      arr.push(this.fb.group({
        id: y.id,
        sequenceNO: y.sequenceNO,
        responseURL: y.responseURL,
        responseURLType: y.responseURLType,
        conditionalSequenceNO: y.conditionalSequenceNO,
        conditionalURL: y.conditionalURL,
        isSelectedGotoOption: y.isSelectedGotoOption,
        conditionalURLType: y.conditionalURLType,
        conditionalActionsType: y.conditionalActionsType,
        listSelectOption: new FormControl(this.duplicateOptionsList),
        questionsList: new FormControl(this.duplicateQuestionList),
        conditionalOptionSelected: y.conditionalOptionSelected,
      }))
    })
    return arr;
  }
  conditionalActionData() {
    this.newquestionService.conditionalActionsType(true).subscribe(data => {
      if (this.formPage) {
        this.conditionalActionsType = data;
        
      }
      else {
        this.conditionalActionsType = data.filter(element => element.key != 1)
      }

    });
  }
  templateTypeData() {
    
    this.newquestionService.templateType(false).subscribe(data => {
      this.templateTypes = data;

    });
  }
  getTagTypes() {
    
    this.newquestionService.tagTypes(true).subscribe(data => {
      this.tagTypes = data;
    });
  }
  // optionSelected(args: MenuEventArgs, i) {
  //   
  //   if (args.item.text === 'Required') {
  //     (<FormArray>this.questionform.controls['multipleQuestions']).at(i).patchValue({ isShowValidationText: true });

  //   }
  //   else if (args.item.text === 'Add Correct Answer') {
  //     
  //     var control = (<FormArray>this.questionform.controls['multipleQuestions']).at(i).get('saveQuestionResponseCommand') as FormArray
  //     if (control.controls.length > 0) {
  //       control.controls.forEach((formGroup: FormGroup) => {
  //         formGroup.patchValue({
  //           isShowCorrectAnswer: true
  //         });
  //       });
  //     }
  //     else {
  //       this.alertService.error("Please add at least one option");
  //     }

  //   }
  //   else if (args.item.text === 'Add Conditional Actions') {
  //     
  //     this.newquestionService.conditionalActionsType(true).subscribe(data => {
  //       this.conditionalActionsType = data;
  //     });
  //     (<FormArray>this.questionform.controls['multipleQuestions']).at(i).patchValue({ isShowConditionalActions: true });
  //     this.questionsList = this.questionform.value.multipleQuestions.filter(element => element.sequenceNO != i);
  //     
  //     // this.questionform.value.multipleQuestions[i].saveQuestionResponseCommand.forEach(element => {
  //     //   this.descriptionsOption.push(element.description);
  //     // })
  //   }
  // }
  back() {
    if(this.questionform.dirty || this.questionform.touched)
    {
      this.showGoBackPopup = true; 
      // alert("form touched");
    }
    else {
      this.location.back();
    }
    
  }
  edit() {
    this.disabledValue = false;
    var control = (<FormArray>this.questionform.controls['multipleQuestions']) as FormArray
    control.controls.forEach((formGroup: FormGroup) => {

      formGroup.patchValue({
        isShowConditionalActions: false,
      });

    });
  }
  Cancel() {
    this.getSelectedRecord(true);
  }
  questionGetList(getData) {
    debugger
    // if (!this.isBusy) {
    this.isBusy = true;
    this.selectedQuestionTypeNo = getData.questionType;
    this.isSelectedRadioButton = this.selectedQuestionTypeNo == 2 ? true : false;
    this.questionTypeSelected = true;

    if (getData.questionType == questionType.match) {
      var headerData = [];
      headerData = getData.saveQuestionResponseCommand.filter(i => i.responsePositionType === 0);
      var headerText1 = headerData[0].description;
      var headerText2 = headerData[1].description;
    }
    var headerData = [];
    headerData = getData.saveQuestionResponseCommand.filter(i => i.responsePositionType === 0);
    var headerText3 = headerData.length == 3 ? headerData[2].description : "";

    if (getData.questionType == questionType.matrixcheckbox || getData.questionType == questionType.matrixradiobox) {
      getData.saveQuestionResponseCommand = [];
    }

    let control = <FormArray>this.questionform.controls.multipleQuestions;
    var optionsLength = getData.saveQuestionResponseCommand.length;
    var selectedFromvalue = getData.saveQuestionResponseCommand.length > 0 ? getData.saveQuestionResponseCommand[0].sequenceNO : 0;
    var selectedToValue = getData.saveQuestionResponseCommand.length > 0 ? getData.saveQuestionResponseCommand[optionsLength - 1].sequenceNO : 0;

    var SequenceNO = control.length + 1;
    control.push(
      this.fb.group({
        id: [0, null],
        formId: [0, null],
        sequenceNO: [SequenceNO, null],
        description: [getData.description, Validators.required],
        questionType: [this.selectedQuestionTypeNo, null],
        isMandatory: [false, null],
        validationText: ['', null],
        formName: ['', null],
        formDescription: ['', null],
        instructions: ['', null],
        isShowValidationText: [false, null],
        isShowConditionalActions: [false, null],
        isAllowedConditionalActions: [this.isSelectedRadioButton, null],
        saveQuestionResponseCommand: this.setSampleOptions(getData.saveQuestionResponseCommand),
        conditionalActionList: this.setConditionalAction(getData.saveQuestionResponseCommand, SequenceNO),
        column1: this.sampleOptionForMatch(getData.saveQuestionResponseCommand, '1'),
        column2: this.sampleOptionForMatch(getData.saveQuestionResponseCommand, '2'),
        column3: this.sampleOptionForMatch(getData.saveQuestionResponseCommand, '3'),
        headerText1: [headerText1, null],
        headerText2: [headerText2, null],
        headerText3: [headerText3, null],
        matchColumnList: [getData.matchColumnList, null],
        ColumnItem: new FormControl(this.ColumnItem),
        rows: this.sampleChildQuestionForMatrix(this.fliteredChildQuestion, SequenceNO),
        columns: this.setSampleOptions(getData.columns),
        sliderData: this.setFormatSliderData(getData.sliderData),
        sliderFromValue: selectedFromvalue,
        sliderToValue: selectedToValue,
      })
    )
    this.questionTypeSelected = true;
    this.questionCount++;
    this.AddQuestionDialog.hide();
    // }
    if (!this.formPage) {
      this.isAllowToAddQuestion = false;
    }
  }
  setSampleOptions(getSampleData) {
    if(getSampleData) {
      this.isImageFromService = false;
    
    let arr = new FormArray([])
    let responseURLDump;
    getSampleData.forEach(y => {
      if (y.responseURL == null) {
        responseURLDump = "";
      } else {
        responseURLDump = y.responseURL;
      }
      this.isImageFromService = true;
      arr.push(this.fb.group({
        id: 0,
        questionId: 0,
        sequenceNO: y.sequenceNO,
        description: y.description,
        comparisonType: y.comparisonType,
        compareWithValueType: y.compareWithValueType,
        errorText: y.errorText,
        responseURL: responseURLDump,
        thumbnailURL: "",
        responseURLType: y.responseURLType,
        isImageFromService: this.isImageFromService,
        responsePositionType: y.responsePositionType,
        conditionalSequenceNO: y.conditionalSequenceNO,
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
}
  myQuestion(refresh) {
    this.labelId = 0;
    this.orgId = this.organisationPageSessionService.getOrganisationId();
    this.userId = this.userSessionService.userId();
    this.pageType = this.LabelPageTypeno().FormPage;
    this.newquestionService.getMyForms(this.orgId, this.labelId, this.pageType, refresh).subscribe(formsData => {
      //this.allformsData = formsData;

      // var filteredmyquestion = this.formsData.filter(element => 
      // element.userId === this.userId );

      // this.formsData = filteredmyquestion; 
    });
  }


  ShowMyQuestion(id, refresh) {
    this.newquestionService.getSelectedQuestion(id, refresh).subscribe(formsData => {
      this.myquestions = formsData.question;
    });

  }
  removeImage(control, index: any) {
    if (!this.disabledValue) {
      control.at(index).patchValue({ responseURL: null });
      control.at(index).patchValue({ responseURLType: 0 });
    }
  }
  createItem(selectedOptions: Array<ConditionAction>, index: any) {
    this.questionsList = this.questionform.value.multipleQuestions.filter(element => element.sequenceNO != index + 1);
    var control = (<FormArray>this.questionform.controls['multipleQuestions']).at(index).get('conditionalActionList') as FormArray
    let SequenceNo = control.length + 1;
    this.conditionalOptionsubmitted = false;
    this.conditionalActionsTypeSubmitted = false;
    this.conditionalSelectedOptions = _.map(this.questionform.value.multipleQuestions[index].saveQuestionResponseCommand, o => _.pick(o, ['description', 'sequenceNO']));
    let conditionalOptions = this.conditionalSelectedOptions;
    if (selectedOptions.length > 0) {
      conditionalOptions = []
      this.conditionalSelectedOptions.forEach(element => {
        var isPresent = false;
        selectedOptions.forEach(y => {
          if (element.sequenceNO == y.SequenceNO) {
            isPresent = true;
          }
        })
        if (!isPresent) {
          conditionalOptions.push(element)
        }
      });
    }
    return this.fb.group({
      id: [0, null],
      sequenceNO: [SequenceNo, null],
      conditionalOptionSelected: ['', Validators.required],
      conditionalURL: ['', null],
      conditionalURLType: ['', null],
      conditionalActionsType: ['', Validators.required],
      conditionalSequenceNO: ['', null],
      isSelectedGotoOption: ['', null],
      // isSelectedGotoOption: ['', null],
      listSelectOption: [conditionalOptions, null],
      questionsList: [this.questionsList, null],
      // listConditionalActionType: new FormControl(this.ListConditionalActionType, null),
    });
  }

  conditionalAction(i) {
    let optionLength = this.questionform.value.multipleQuestions[i].saveQuestionResponseCommand.length;
    if (optionLength > 0) {
      var optionValid = (<FormArray>this.questionform.controls['multipleQuestions']).at(i).get('saveQuestionResponseCommand') as FormArray
      if (optionValid.valid) {
        (<FormArray>this.questionform.controls['multipleQuestions']).at(i).patchValue({ isShowConditionalActions: true });
        let conditionalActionLength = this.questionform.value.multipleQuestions[i].conditionalActionList.length;
        if (conditionalActionLength < 1) {
          this.conditionalSelectedOptions = _.map(this.questionform.value.multipleQuestions[i].saveQuestionResponseCommand, o => _.pick(o, ['description', 'sequenceNO']));
          var control = (<FormArray>this.questionform.controls['multipleQuestions']).at(i).get('conditionalActionList') as FormArray
          control.push(this.createItem([], i));
        }
      }
      else {
        this.optionDescriptionValid = true;
      }

    }
    else {
      this.alertService.error("Please add at least one option");
    }

  }

  addNewConditionalAction(i) {
    this.conditionalOptionsubmitted = true;
    this.conditionalActionsTypeSubmitted = true;
    var control = (<FormArray>this.questionform.controls['multipleQuestions']).at(i).get('conditionalActionList') as FormArray
    if (control.valid) {
      let optionLength = this.questionform.value.multipleQuestions[i].saveQuestionResponseCommand.length;
      let conditionalActionLength = this.questionform.value.multipleQuestions[i].conditionalActionList.length;
      if (conditionalActionLength < optionLength) {

        var conditionActionList = new Array<ConditionAction>();
        control.controls.forEach(x => {
          if (x.value.conditionalOptionSelected || x.value.conditionalOptionSelected === 0) {
            let conditionAction: any;
            conditionAction = {};
            conditionAction.SequenceNO = x.value.conditionalOptionSelected
            conditionActionList.push(conditionAction);
          }
        });
        //rolePageActionMapping[].SequenceNO

        control.push(this.createItem(conditionActionList, i));
      }

    }

  }
  removeConditionalAction(control, index: any, optionSelected, questionIndex) {
    if (!this.disabledValue) {
      control.removeAt(index)
    }
  }
  ConditionalActionDelete(questionindex: any) {
    var control = (<FormArray>this.questionform.controls['multipleQuestions']).at(questionindex).get('conditionalActionList') as FormArray
    while (control.length !== 0) {
      control.removeAt(0)
    }
  }
  saveConditionalAction(i) {
    (<FormArray>this.questionform.controls['multipleQuestions']).at(i).patchValue({ isShowConditionalActions: false });
  }
  onSelectionChange(i) {
    this.SelectedRadioButton = i;
  }
  conditionalOptionChange(optionSelected, questionindex, conditionalActionIndex) {
    if (optionSelected.isInteracted) {
      let selectedOption = optionSelected.itemData.sequenceNO;
      var conditionalActionDataList = this.questionform.value.multipleQuestions[questionindex].conditionalActionList;
      var filteredconditionalActionDataList = conditionalActionDataList.filter(i => i.conditionalOptionSelected === selectedOption);
      if (filteredconditionalActionDataList.length > 0) {
        this.alertService.error("Option is already selected");
        var control = (<FormArray>this.questionform.controls['multipleQuestions']).at(questionindex).get('conditionalActionList') as FormArray
        control.controls.forEach((formGroup: FormGroup, index) => {
          if (index == conditionalActionIndex) {
            setTimeout(() => {
              formGroup.patchValue({
                conditionalOptionSelected: null,
              });
            }, 100);
          }
        });
        // (<FormArray>this.questionform.controls['multipleQuestions']).at(questionindex).patchValue({ conditionalActionList: (<FormArray>this.questionform.controls['conditionalActionList']).at(conditionalActionIndex).patchValue({ conditionalOptionSelected: null }) });

        //control.controls[conditionalActionIndex].patchValue({ conditionalOptionSelected: null });
        // (<FormArray>this.questionform.controls['multipleQuestions']).at(questionindex).patchValue({ conditionalOptionSelected: (<FormArray>this.questionform.controls['conditionalActions']).at(j).patchValue({ conditionlOptio: null }) });
        // this.questionform.controls['multipleQuestions']['controls'][questionindex].controls.conditionalActionList.controls[conditionalActionIndex].controls['conditionalOptionSelected'].setValue(null);
        // this.questionform.controls['multipleQuestions']['controls'][questionindex].controls.conditionalActionList.controls[conditionalActionIndex].controls['conditionalOptionSelected'].updateValueAndValidity();
        //alert(this.questionform.value.multipleQuestions[questionindex].conditionalActionList[conditionalActionIndex].conditionalOptionSelected);
      }
      else {
        var control = (<FormArray>this.questionform.controls['multipleQuestions']).at(questionindex).get('conditionalActionList') as FormArray
        control.controls.forEach((formGroup: FormGroup, index) => {
          if (index != conditionalActionIndex) {
            formGroup.patchValue({
              listSelectOption: formGroup.value.listSelectOption.filter(i => i.sequenceNO != selectedOption),
              // conditionalActionsType: formGroup.value.conditionalActionsType,
              // conditionalOptionSelected: formGroup.value.conditionalOptionSelected,
              // conditionalQuestionId: formGroup.value.conditionalQuestionId,
              // sequenceNO: formGroup.value.sequenceNO,
            });
          }
        });
      }
    }
  }
  selectedGIFimage(Gifimage, index) {
    this.selectedGifImageIndex = index;
    this.selectedGifImage = Gifimage;
    //this.conditionalUrlValue = Gifimage;
  }

  conditionalActionTypeChange(selectedAction, questionindex, conditionalActionIndex, questionId) {
    this.actionFrom = 'conditionalAction';
    this.isSelectedGifOption = false;
    this.addVideoGifForOption = false;
    this.selectedConditionalActionTypeId = selectedAction.itemData.key;
    this.questionIndex = questionindex;
    this.conditionalActionIndex = conditionalActionIndex;

    //this.textBoxObj.value = "";
    if (this.selectedConditionalActionTypeId != ConditionalActionType.Goto) {
      this.SelectGIFDialog.show();
      var control = (<FormArray>this.questionform.controls['multipleQuestions']).at(questionindex).get('conditionalActionList') as FormArray
      if (control.controls.length > 0) {
        control.controls.forEach((formGroup: FormGroup, index) => {
          if (index == conditionalActionIndex) {
            formGroup.patchValue({
              isSelectedGotoOption: false
            });
          }
        });
      }
      if (this.selectedConditionalActionTypeId != ConditionalActionType.ShowImage) {
        this.isSelectedShowGIF = false;
        this.actionTitle = "Enter URL";
        this.actionLabel = "Enter URL";
        this.actionPlaceholder = "Enter URL";
        this.actionButtonTitle = "Submit";
        this.isSelectedShowImage = false;
        this.showGifImage = false;
        if (this.selectedConditionalActionTypeId == ConditionalActionType.OpenLink) {
          this.conditionalFileTypeUrlType = this.URLType().None;
          this.actionTitle = "Enter URL";
          this.actionLabel = "Enter URL";
          this.actionPlaceholder = "Enter URL";
          this.isOpenLink = true;
        }
        else if (this.selectedConditionalActionTypeId == ConditionalActionType.PlayYoutubeVideo) {
          this.thumbnail = "";
          this.isOpenLink = false;
          this.actionTitle = "Enter Link";
          this.actionLabel = "Enter Link";
          this.actionPlaceholder = "Enter Link";
          this.isSelectedShowGIF = false;
          this.conditionalFileTypeUrlType = this.URLType().VideoURL;
        }
        else if (this.selectedConditionalActionTypeId == ConditionalActionType.ShowGIF) {
          this.actionButtonTitle = "Select GIF";
          this.actionTitle = "Select GIF";
          this.actionLabel = "Search GIF";
          this.actionPlaceholder = "Search GIFs via Tenor";
          this.nextValue = '';
          this.getGifImages(true);
          this.isSelectedShowGIF = true;
          this.conditionalFileTypeUrlType = this.URLType().GifURL;
        }
      }
      else {

        // this.nextValue = '';
        // this.getGifImages(true);
        this.isSelectedShowGIF = false;
        this.isSelectedShowImage = true;
        this.showGifImage = false;
        this.actionTitle = "Select a Image";
        this.actionLabel = "";
        this.actionPlaceholder = "";
        this.actionButtonTitle = "Submit";
        this.conditionalFileTypeUrlType = this.URLType().ImageURL;
        this.particularQuestionId = questionId;

      }
    }
    else {

      var control = (<FormArray>this.questionform.controls['multipleQuestions']).at(questionindex).get('conditionalActionList') as FormArray
      if (control.controls.length > 0) {
        control.controls.forEach((formGroup: FormGroup, index) => {
          if (index == conditionalActionIndex) {
            formGroup.patchValue({
              isSelectedGotoOption: true
            });
          }
        });
      }
    }

  }

  conditionalActionSubmit(questionindex, conditionalActionIndex) {
    
    if (this.selectedConditionalActionTypeId == ConditionalActionType.OpenLink) {
      this.conditionalUrlValue = this.textBoxObj.value;
      this.SelectGIFDialog.hide();
    }
    else if (this.selectedConditionalActionTypeId == ConditionalActionType.ShowGIF) {
      this.isValidUrl = true;
      this.conditionalUrlValue = this.selectedGifImage;
      this.SelectGIFDialog.hide();
      if (this.textBoxObj.value != '') {
        this.searchedGIFValue = this.textBoxObj.value;
      }

    }
    else if (this.selectedConditionalActionTypeId == ConditionalActionType.ShowImage) {
      this.isValidUrl = true;
      this.SelectGIFDialog.hide();
    }
    else {
      if (this.isValidUrl) {
        this.conditionalUrlValue = this.textBoxObj.value;
        this.thumbnail = "";
        this.SelectGIFDialog.hide();
      }
      else {
        this.alertService.error("Please enter proper url");
      }
    }
    if (this.conditionalUrlValue) {
      var control = (<FormArray>this.questionform.controls['multipleQuestions']).at(questionindex).get('conditionalActionList') as FormArray
      if (control.controls.length > 0) {
        control.controls.forEach((formGroup: FormGroup, index) => {
          if (index == conditionalActionIndex) {
            formGroup.patchValue({
              conditionalURL: this.conditionalUrlValue
            });
            
            this.questionform.controls['multipleQuestions']['controls'][questionindex].controls.conditionalActionList.controls[conditionalActionIndex].controls.conditionalURLType.setValue(this.conditionalFileTypeUrlType);
            this.conditionalUrlValue = "";
          }
        });
      }
    }

  }
  showSelectedConditionalActionType(condtionalActionType, ConditionalUrlValue, questionIndex, conditionalActionIndex, questionId) {
    
    this.actionFrom = 'conditionalAction';
    this.thumbnail="";
    this.isSelectedGifOption = false;
    this.addVideoGifForOption = false;
    this.selectedConditionalActionTypeId = condtionalActionType;
    this.questionIndex = questionIndex;
    this.conditionalActionIndex = conditionalActionIndex;
    if (this.selectedConditionalActionTypeId == ConditionalActionType.PlayYoutubeVideo) {
      this.conditionalFileTypeUrlType = this.URLType().VideoURL;
      this.getId(ConditionalUrlValue);
      this.appendedHtml = '<div><iframe width="150" height="150" src="//www.youtube.com/embed/' + this.youtubeUrl + '" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></iframe></div>';
      this.thumbnail = this.sanitizer.bypassSecurityTrustHtml(this.appendedHtml);
      this.isSelectedShowImage = false;
      this.showGifImage = false;
      this.conditionalUrlValue = ConditionalUrlValue;
      this.textBoxObj.value = ConditionalUrlValue;
      this.GifUrl = "";
      this.isSelectedShowGIF = false;
      this.actionTitle = "Enter Link";
      this.actionLabel = "Enter Link";
      this.actionPlaceholder = "Enter Link";
      this.actionButtonTitle = "Submit";
    }
    else if (this.selectedConditionalActionTypeId == ConditionalActionType.ShowImage) {
      this.conditionalFileTypeUrlType = this.URLType().ImageURL;
      this.isSelectedShowImage = true;
      this.showGifImage = false;
      this.conditionalUrlValue = ConditionalUrlValue;
      this.GifUrl = "";

      this.isSelectedShowGIF = false;
      this.isSelectedShowImage = true;
      this.showGifImage = false;
      this.actionTitle = "Select a Image";
      this.actionLabel = "";
      this.actionPlaceholder = "";
      this.actionButtonTitle = "Select Image";
      this.particularQuestionId = questionId;
    }
    else if (this.selectedConditionalActionTypeId == ConditionalActionType.ShowGIF) {
      this.conditionalFileTypeUrlType = this.URLType().GifURL;
      this.addVideoGifForOption = false;
      this.isSelectedShowImage = false;
      this.showGifImage = true;
      this.GifUrl = ConditionalUrlValue;
      // this.selectedGifImageIndex = "";
      this.textBoxObj.value = this.searchedGIFValue;
      this.conditionalUrlValue = "";
      this.nextValue = '';
      this.actionTitle = "Select GIF";
      this.actionLabel = "Search GIF";
      this.actionPlaceholder = "Search GIFs via Tenor";
      this.actionButtonTitle = "Select GIF";
      this.getGifImages(true);
      this.isSelectedShowGIF = true;
    }
    else {
      this.conditionalFileTypeUrlType = this.URLType().None;
      this.textBoxObj.value = ConditionalUrlValue;
      this.isSelectedShowImage = false;
      this.showGifImage = false;
      this.GifUrl = "";
      this.isSelectedShowGIF = false;
      this.actionTitle = "Enter URL";
      this.actionLabel = "Enter URL";
      this.actionPlaceholder = "Enter URL";
      this.actionButtonTitle = "Submit";


    }

    this.SelectGIFDialog.show();
  }
  addVideoGIFSubmit() {
    
    if (this.fileTypeUrl == this.URLType().VideoURL) {
      if (this.isValidUrl) {
        this.selectedResponseUrlValue = this.textBoxObj.value;
        this.questionform.controls['multipleQuestions']['controls'][this.questionIndexForVideoGif].controls.saveQuestionResponseCommand.controls[this.optionIndexForVideoGif].controls.responseURL.setValue(this.selectedResponseUrlValue);
        this.questionform.controls['multipleQuestions']['controls'][this.questionIndexForVideoGif].controls.saveQuestionResponseCommand.controls[this.optionIndexForVideoGif].controls.responseURLType.setValue(this.fileTypeUrl);
        //this.questionform.controls['multipleQuestions']['controls'][this.questionIndexForVideoGif].controls.saveQuestionResponseCommand.controls[this.optionIndexForVideoGif].controls.isImageFromService.setValue(false);
        this.thumbnail = "";
        this.SelectGIFDialog.hide();
        // this.appendedHtml = '<div><iframe width="300" height="300" src="//www.youtube.com/embed/' + ConditionalUrlValue + '" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></iframe></div>';
        // this.thumbnail = this.sanitizer.bypassSecurityTrustHtml('<div><iframe width="300" height="300" src="//www.youtube.com/embed/' + this.selectedResponseUrlValue + '" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></iframe></div>');
        this.getId(this.selectedResponseUrlValue);
        this.appendedHtml = '<div style="width:150px;height:150px"><iframe width="150" height="150" src="//www.youtube.com/embed/' + this.youtubeUrl + '" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></iframe></div>';
        this.thumbnail = this.sanitizer.bypassSecurityTrustHtml(this.appendedHtml);
        this.questionform.controls['multipleQuestions']['controls'][this.questionIndexForVideoGif].controls.saveQuestionResponseCommand.controls[this.optionIndexForVideoGif].controls.thumbnailURL.setValue(this.thumbnail);
      }
      else {
        this.alertService.error("Please enter proper url");
      }
    }
    else {
      this.selectedResponseUrlValue = this.selectedGifImage;
      this.questionform.controls['multipleQuestions']['controls'][this.questionIndexForVideoGif].controls.saveQuestionResponseCommand.controls[this.optionIndexForVideoGif].controls.responseURL.setValue(this.selectedResponseUrlValue);
      this.questionform.controls['multipleQuestions']['controls'][this.questionIndexForVideoGif].controls.saveQuestionResponseCommand.controls[this.optionIndexForVideoGif].controls.responseURLType.setValue(this.fileTypeUrl);
      //this.questionform.controls['multipleQuestions']['controls'][this.questionIndexForVideoGif].controls.saveQuestionResponseCommand.controls[this.optionIndexForVideoGif].controls.isImageFromService.setValue(false);
      // this.conditionalUrlValue = "";
      this.SelectGIFDialog.hide();
    }

  }
  getYoutubeUrl(event, actionFrom) {
    debugger
    if (actionFrom == 'conditionalAction') {
      this.thumbnail = "";
      this.nextValue = "";
      this.searchText = event.target.value;
      if (this.isSelectedShowGIF && event.target.value.length > 2) {
        
        this.isServiceProcessed = false;
        if (this.selectedConditionalActionTypeId == ConditionalActionType.ShowGIF || this.isSelectedGifOption) {
          this.getGifImages(true);
        }
      }
      if (this.selectedConditionalActionTypeId == ConditionalActionType.PlayYoutubeVideo) {
        this.getId(event.target.value);
      }
    }
    else {
      this.getId(event.target.value); 
    }

  }
  getGifImages(refresh) {
    this.thumbnail = "";
    this.isServiceProcessed = true;
    this.newquestionService.getGifImages(this.searchText, this.nextValue, refresh).subscribe(gifImages => {
      if (this.nextValue) {
        if (this.previousSearchText != this.searchText)
          this.gifImagesList = [];
        gifImages.imgUrl.forEach((element) => {
          this.gifImagesList.push(element)
        });
        this.panel.nativeElement.scrollTop -= 20;
      }
      else {
        this.gifImagesList = gifImages.imgUrl;
      }
      this.nextValue = gifImages.next;
      this.previousSearchText = this.searchText;
      this.isServiceProcessed = false;
    },
      err => this.isServiceProcessed = false
    );
  }
  getId(url) {
    debugger;
    
    if(url) {
      var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
      var match = url.match(regExp);
      if (match && match[2].length == 11) {
        this.youtubeUrl = match[2];
        this.appendedHtml = '<div><iframe width="200" height="200" src="//www.youtube.com/embed/' + this.youtubeUrl + '" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></iframe></div>';
        this.thumbnail = this.sanitizer.bypassSecurityTrustHtml(this.appendedHtml);
        this.isValidUrl = true;
        //return match[2];
      } else {
        this.isValidUrl = false;
        //return 'error';
  
      }
    }

  }
  clearUrl() {
    
    let questionIndex = this.questionIndex;
    let conditaionalActionIndex = this.conditionalActionIndex;
    this.thumbnail = "";
    if (this.selectedConditionalActionTypeId != ConditionalActionType.ShowImage) {
      if (this.textBoxObj.value != "") {
        this.textBoxObj.value = "";
      }
    }
    this.searchText = "";
  }
  sendFormTo() {
    // this.showSendFormToPopup = true;
    // setTimeout(() => {
    //   let formIDs = [];
    //   formIDs.push({
    //     formId: this.formId,
    //   });
    //   this.sendFormToService.updateHeaderMessage(formIDs);

    // }, 100);
    this.navigationService.goToResponders(this.formId, this.pageid);
  }
  // Cancel(){
  //   debugger
  //   this.isEditMode =false;
  //   this.disabledValue =true;
  //   this.formId = this.routeParams.id;
  //   this.pageid = parseInt(this.routeParams.pageid);

  //   this.navigationService.goToNewQuestion(this.formId, this.pageid);
  //   this.getSelectedRecord(true);
  // }

  closedSendFormToPopup() {

  }
  sendForm(args) {
    this.newquestionService.ShareForms(args).subscribe(data => {
      this.alertService.success("Form sent successfully");
      // this.Dialog.hide();
    });
  }

  // onScroll(event: any) {
  //   // visible height + pixel scrolled >= total height 

  //   if (event.target.offsetHeight + event.target.scrollTop >= event.target.scrollHeight) {
  //     this.getGifImages(true);
  //   }
  // }

  public handleScroll(event: ScrollEvent) {
    if (event.isReachingBottom && !this.isServiceProcessed) {
      this.getGifImages(true);
    }
  }
  addResponse() {
    //this.router.navigate(['/share/' + roleAction + '/' + pageid]);
    this.formId = this.formId != 0 ? this.formId : this.questionform.value.formId;
    window.open('/response/' + this.formId + '/' + 'Response', "_blank");
  }
  addPreview() {
    window.open('/response/' + this.formId + '/' + 'Preview', "_blank");
  }
  delete(index, questionid) {
    if (!this.disabledValue) {
      this.questionIndexDelete = index;
      this.questionId = questionid;
      this.popTitle = 'Question';

      this.showQuestionDeletePopup = true;
      setTimeout(() => {
        this.deletePopupService.updateHeaderMessage(this.popTitle);
      }, 100);
    }
    else {
      this.alertService.error("Please enable edit mode");
    }

  }


  okClick() {
    let questionid = this.questionId;
    if (!this.disabledValue) {
      if (this.formId == 0 || questionid == 0) {
        let control = <FormArray>this.questionform.controls.multipleQuestions;
        control.removeAt(this.questionIndexDelete)
        this.showQuestionDeletePopup = false;
      }
      else {
        let selectItem = {};
        selectItem['id'] = questionid;

        this.newquestionService.DeleteSingleQuestion(selectItem).subscribe(res => {
          if (res == true) {
            this.showQuestionDeletePopup = false;
            let control = <FormArray>this.questionform.controls.multipleQuestions;
            control.removeAt(this.questionIndexDelete)
          }
        });
      }
      this.isAllowToAddQuestion = true;
    }
  }

  closedFromDeletePopup = function (data) {
    this.message = data;
    if (this.message) {
      this.showQuestionDeletePopup = false;
    }
  };

  sliderChange(event, i, sliderAction) {
    
    if (sliderAction == 'From') {
      this.selectedFromvalue = event.itemData.text;
      this.selectedToValue = this.questionform.value.multipleQuestions[i].sliderToValue;
      if (this.selectedFromvalue == 1) {
        this.sliderToValues = this.sliderToValues.filter(element => element.id != 1)
      }
    }
    else {
      this.selectedFromvalue = this.questionform.value.multipleQuestions[i].sliderFromValue;
      this.selectedToValue = event.itemData.text;
    }
    if (this.selectedFromvalue >= 0 && this.selectedToValue > 0) {
      var control = (<FormArray>this.questionform.controls['multipleQuestions']).at(i).get('saveQuestionResponseCommand') as FormArray;
      while (control.length != 0) {
        control.removeAt(0)
      }
      var removeSliderData = (<FormArray>this.questionform.controls['multipleQuestions']).at(i).get('sliderData') as FormArray;
      while (removeSliderData.length != 0) {
        removeSliderData.removeAt(0)
      }

      const sliderLength = this.selectedToValue - this.selectedFromvalue;


      (<FormArray>this.questionform.controls['multipleQuestions']).at(i).patchValue({ sliderToValue: this.selectedToValue });
      (<FormArray>this.questionform.controls['multipleQuestions']).at(i).patchValue({ sliderFromValue: this.selectedFromvalue });
      
      const newOptionsCreate: Options = {
        showTicksValues: true,
        stepsArray: []
      };
      this.sliderListData = newOptionsCreate;
      for (var index = 0; index <= sliderLength; index++) {
        this.sliderListData.stepsArray.push({
          value: index
        });
        this.addOption(control, this.selectedFromvalue);
        this.selectedFromvalue++;
      }

      var getSliderData = (<FormArray>this.questionform.controls['multipleQuestions']).at(i).get('sliderData') as FormArray;

      getSliderData.push(this.fb.group({
        sliderValues: [this.sliderListData, null]
      }))
    }
  }
  duplicateForm() {
    if (this.isAllowedDuplicateForm) {

      this.getSelectedRecord(true);
    }
  }
  selectAction(args: MenuEventArgs) {
    
    if (this.questionform.valid) {
      this.templateTypeData();
      // this.questionform.controls['tags'].setValue('');
      this.questionform.controls['tags'].setValidators(Validators.required);
      // this.questionform.controls['templateName'].setValue('');
      this.questionform.controls['templateName'].setValidators(Validators.required);
      // this.questionform.controls['templateType'].setValue('');
      this.questionform.controls['templateType'].setValidators(Validators.required);
      this.SaveAsTemplate.show();
    }
    else {
      this.alertService.error("Please fill all the required fields");
    }
  }
  submit() {
    
    if (this.questionform.valid) {
      this.SaveAsTemplate.hide();
      this.save(true);
    }
    else {
      
      this.alertService.error("Please fill all the required fields");
    }
  }
  public onCloseMultiselect: EmitType<PopupEventArgs> = (e: PopupEventArgs) => {
    e.cancel = false;
  };
  tabChange() {
    alert("hi");
  }

  getBackAction(data)
 {
if(data == true)
{
 this.location.back();
}
else {
  this.showGoBackPopup = false; 
}
 }
  message(checkTrue) {
    if (checkTrue)
      this.alertService.error("Please save form details");
    else
      this.alertService.error("Please save form details");
  } 
  clearTemplate(event) {
    this.questionform.controls['tags'].setValidators(null);
    this.questionform.controls['templateName'].setValidators(null);
    this.questionform.controls['templateType'].setValidators(null); 
    this.questionform.controls['tags'].setValue("");
    this.questionform.controls['templateName'].setValue("");
    this.questionform.controls['templateType'].setValue(""); 
  }


}
