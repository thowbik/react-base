  
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
//import { ReportsService } from './reports.service';
import { AuthGuard } from '../../guards';
import { GridModule,SortService,EditService,ToolbarService,GridAllModule } from '@syncfusion/ej2-angular-grids';
import { DatePickerAllModule } from '@syncfusion/ej2-angular-calendars';

import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import { LayoutSharedModule } from '../../shared.module';
import { ListViewModule } from '@syncfusion/ej2-angular-lists';
import { TabComponent, TabModule } from '@syncfusion/ej2-angular-navigations';
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { QRCodeModule } from 'angularx-qrcode';
import { ArchwizardModule, WizardStepComponent } from 'angular-archwizard';
import { ResponsesComponent } from './responses.component';
import { DynamicFieldDirective } from '../layout/components/dynamic-field/dynamic-field.directive';
import { DynamicFormComponent } from '../layout/components/dynamic-form/dynamic-form.component';
import { InputComponent } from '../layout/components/input/input.component';
import { SelectComponent } from '../layout/components/select/select.component';
import { DateComponent } from '../layout/components/date/date.component';
import { RadiobuttonComponent } from '../layout/components/radiobutton/radiobutton.component';
import { CheckboxComponent } from '../layout/components/checkbox/checkbox.component';
import { ButtonComponent } from '../layout/components/button/button.component';
import { CheckBoxModule, RadioButtonModule } from '@syncfusion/ej2-angular-buttons';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';

const routes = [
    {
        path     : '**',
        component: ResponsesComponent
    }
];

@NgModule({
    declarations: [
        ResponsesComponent,
        DynamicFieldDirective,
        DynamicFormComponent,
        //ButtonComponent
    ],
    imports     : [
        ReactiveFormsModule,
        FormsModule,
        RouterModule.forChild(routes),
        CommonModule,
        FormsModule,
        RadioButtonModule,
        FlexLayoutModule,
        DropDownListModule
       

    ],
   
    providers   : [
        SortService,EditService,ToolbarService,
    ],
    entryComponents: [
        DynamicFormComponent
      ],
      exports: [
        DynamicFormComponent,
        DynamicFieldDirective
      ],
})
export class ResponsesModule
{
}