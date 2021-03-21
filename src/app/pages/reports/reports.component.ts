import { Component,Inject,ViewChild, OnInit,ViewEncapsulation } from '@angular/core';

import { EditSettingsModel, ToolbarItems, IEditCell } from '@syncfusion/ej2-angular-grids';
import { SaveEventArgs } from '@syncfusion/ej2-angular-grids';
import { ChangeEventArgs } from '@syncfusion/ej2-inputs';
import { FormBuilder, FormGroup, Validators,FormControl,AbstractControl} from '@angular/forms';
import { CheckBox } from '@syncfusion/ej2-buttons';
import {  GridComponent } from '@syncfusion/ej2-angular-grids';
import { QueryCellInfoEventArgs,RowSelectEventArgs } from '@syncfusion/ej2-angular-grids';
import { DatePickerComponent } from '@syncfusion/ej2-angular-calendars';
import { FormValidator, FormValidatorModel } from '@syncfusion/ej2-inputs';

@Component({
    selector     : 'reports-dashboard',
    templateUrl  : './reports.component.html',
    styleUrls    : ['./reports.component.scss'],
})

export class ReportsComponent implements OnInit
{
    @ViewChild('formElement') element: any;
    @ViewChild('ejDate') ejDate: DatePickerComponent;
    public targetElement: HTMLElement;
    public placeholder: String = 'Date of Birth';
    contactForm: FormGroup;
    build: FormBuilder;
    public formObject: FormValidator;
    public dateValue: Object = new Date();
    
    constructor(@Inject(FormBuilder) private builder: FormBuilder) {
        this.build = builder;
        this.createForm();
      
    
    }
    public report: Object = [
        { text: 'Report #1', id: '01' },
        { text: 'Report #2', id: '02' },
        { text: 'Report #3', id: '03' }];
    public chart: Object = [
            { text: 'Chart #1', id: '01' },
            { text: 'Chart #2', id: '02' },
            { text: 'Chart #3', id: '03' }];

    createForm() {
        this.contactForm = this.build.group({
            mobile_number: new FormControl('', [Validators.required]),
            email_address: new FormControl('', [Validators.email]),
            datepicker: new FormControl('', [Validators.required]),

        });
    }
    ngOnInit(): void {

    }
    onSubmit() {
        alert("Form Submitted!");
    }


}
