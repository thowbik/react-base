import { Component, OnInit } from '@angular/core';
import { FormOptionsService } from './formoptions.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { TimeLimitToRespondType, ShowCorrectAnswerType } from 'src/app/models';
import { forkJoin } from 'rxjs';
import { AlertService } from 'src/app/services';
import { PopupEventArgs } from '@syncfusion/ej2-calendars/src';
import { EmitType } from '@syncfusion/ej2-base';
import { Location } from '@angular/common';

@Component({
  selector: 'app-formoptions',
  templateUrl: './formoptions.component.html',
  styleUrls: ['./formoptions.component.scss'],

})
export class FormoptionsComponent implements OnInit {
  public box: string = 'Box';
  public date: Object = new Date();
  public showCorrectAnswerTypeList: any[];
  public timeLimitToRespondTypeList: any[];
  public tagTypesList: any[];
  public routeParams: any;
  public formId = 0;
  public showCorrectAnswerTypeFields: object = { text: 'value', value: 'key' };
  public timeLimitToRespondTypeFields: object = { text: 'value', value: 'key' };
  public tagTypeFields: object = { text: 'value', value: 'value' };
  public FormName: any;
  public formOptions: FormGroup;
  defaultValue: any;
  formdetails: any;
  public selectedTags: any;
  public pageid: any;
  formPage: boolean;
  QuestionFormstitle: string;
  public selectedDate: any;
  public days = 0;
  public hours = 0;
  public minutes = 0;
  minDate: Date;
  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private alertService: AlertService,
    private location: Location,
    private router: Router, private formOptionsService: FormOptionsService, ) {
    debugger
    this.routeParams = route.snapshot.params;
    debugger
    this.formId = this.routeParams.id;
    this.pageid = parseInt(this.routeParams.pageid);
    this.formPage = this.pageid == 2 ? true : false;
    this.QuestionFormstitle = this.formPage == true ? 'Form' : 'Question';
    this.minDate = new Date();
  }
  ShowCorrectAnswerType() { return ShowCorrectAnswerType; }

  TimeLimitToRespondType() { return TimeLimitToRespondType; }


  ngOnInit() {
    this.initialvalidators();
    this.timeLimitToRespondTypeList = [];
    this.showCorrectAnswerTypeList = [];
    forkJoin([this.formOptionsService.timeLimitToRespondType(false), this.formOptionsService.showCorrectAnswerType(false)])
      .subscribe(results => {
        if (results[0] && results[0].length > 0) {

          this.timeLimitToRespondTypeList = results[0];

        }

        if (results[1] && results[1].length > 0) {
          this.showCorrectAnswerTypeList = results[1];

        }
        this.formDetails(true);
      });
    this.getTagTypes();
    // this.getShowCorrectAnswerTypes();
    // this.getTimeLimitToRespondTypes();

  }

  initialvalidators() {
    this.formOptions = this.fb.group({
      id: [this.formId, null],
      // formId: ['', null],
      timeLimitToRespondType: ['', null],
      showCorrectAnswerType: ['', null],
      tags: ['', null],
      formDescription: ['', null],
      formName: ['', null],
      formStatusType: [0, null],
      instructions: ['', null],
      isAllResponsesVisibleToEveryone: [true, null],
      isAllowAnonymousResponse: [true, null],
      isAllowToRespond: [true, null],
      isResultsVisibleToEveryone: [true, null],
      organisationId: ['', null],
      postedOn: [null, null],
      templateName: ['', null],
      templateType: ['', null],
      timeLimitDuration: [null, null],
      userId: ['', null],
      formPageType: [0, null],
      profileType: [0, null],
      parentFormId: ['', null],
    });

  }

  // getShowCorrectAnswerTypes() {
  //   debugger;
  //   let a = this.formId;
  //   this.formOptionsService.showCorrectAnswerType(false).subscribe(data => {
  //     this.showCorrectAnswerTypeList = data;
  //     this.defaultValue = this.showCorrectAnswerTypeList[2].value;


  //     setTimeout(() => {
  //       this.formOptions.controls['showCorrectAnswerType'].setValue(this.defaultValue);
  //     }, 0);
  //   });
  // }

  // getTimeLimitToRespondTypes() {
  //   debugger;
  //   this.formOptionsService.timeLimitToRespondType(false).subscribe(data => {
  //     this.timeLimitToRespondTypeList = data;
  //     this.defaultValue = this.timeLimitToRespondTypeList[0].value;
  //     setTimeout(() => {
  //       this.formOptions.controls['timeLimitToRespondType'].setValue(this.defaultValue);
  //     }, 0);

  //   });
  // }
  back() {
    this.location.back();
  }
  getTagTypes() {
    debugger;
    this.formOptionsService.tagTypes(false).subscribe(data => {
      this.tagTypesList = data;
    });
  }

  formDetails(refresh) {
    debugger
    let id = this.formId;
    this.formOptionsService.getformDetails(id, refresh).subscribe(data => {
      this.FormName = data.formName;
      this.formdetails = data;

      if (this.formdetails.showCorrectAnswerType == 0 || this.formdetails.showCorrectAnswerType == 0) {
        this.formdetails.showCorrectAnswerType = this.showCorrectAnswerTypeList[0].key;
        this.formdetails.timeLimitToRespondType = this.timeLimitToRespondTypeList[0].key;
      }
      // if (this.formdetails.tags == {} || this.formdetails.tags == null ) {
      //   this.formdetails.tags = '';
      // }
      this.formdetails.tags = '';
      this.formOptions.patchValue(this.formdetails);
      // this.selectedDate = this.formOptions.value.timeLimitDuration;
      // this.getDays(true);

    });
  }


  save() {
    debugger;

    this.selectedTags = {};
    this.selectedTags['object'] = this.formOptions.value.tags;
    this.formOptions.value.tags = this.selectedTags;
    this.formdetails.timeLimitDuration = this.formOptions.value.timeLimitDuration;
    this.formdetails.timeLimitToRespondType = this.formOptions.value.timeLimitToRespondType;
    this.formdetails.showCorrectAnswerType = this.formOptions.value.showCorrectAnswerType;
    // this.formOptions.value.tags = null;
    this.formOptionsService.createForm(this.formOptions.value).subscribe(data => {
      this.alertService.success("Form Option Added successfully");

    });
  }
  public onCloseMultiselect: EmitType<PopupEventArgs> = (e: PopupEventArgs) => {
    e.cancel = false;
  };


  getDays(refresh) {
    debugger
    const date = this.selectedDate;

    this.formOptionsService.getDaysDetails(date, refresh).subscribe(data => {

      this.days = data.days;
      this.hours = data.hours;
      this.minutes = data.minutes;

    });
  }

}