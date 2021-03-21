  
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SignupComponent } from './signup.component';
import { SignupService } from './signup.service';
//import { ReportsService } from './reports.service';
import { AuthGuard } from '../../guards';
import { GridModule,SortService,EditService,ToolbarService,GridAllModule } from '@syncfusion/ej2-angular-grids';
import { DatePickerAllModule } from '@syncfusion/ej2-angular-calendars';
import { ButtonModule, CheckBoxModule } from '@syncfusion/ej2-angular-buttons';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import { RadioButtonModule } from '@syncfusion/ej2-angular-buttons';
import { LayoutSharedModule } from '../../shared.module';
import { ListViewModule } from '@syncfusion/ej2-angular-lists';
import { TabComponent, TabModule } from '@syncfusion/ej2-angular-navigations';
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { DropDownListModule, AutoCompleteModule } from '@syncfusion/ej2-angular-dropdowns';
import { QRCodeModule } from 'angularx-qrcode';
import { ArchwizardModule, WizardStepComponent } from 'angular-archwizard';
//  import { NumberDirective } from '../contact/numbers-only.directive';
import { SharedModule } from 'src/app/shared/shared.module';
import { OnlyNumber } from 'src/app/shared/directives/onlynumber.directive';
import { DropDownButtonModule } from '@syncfusion/ej2-angular-splitbuttons';
//  import { EJ_DROPDOWNLIST_COMPONENTS } from 'ej-angular2/src/ej/dropdownlist.component';

/*const routes: Routes = [
    {
        path     : '**',
        component: SignupComponent,canActivate: [AuthGuard],
        data: {
            title: 'Signup'
        }
    }
]; */

const routes = [
    {
        path     : '**',
        component: SignupComponent
    }
];

@NgModule({
    declarations: [
        SignupComponent
    ],
    imports     : [
        RouterModule.forChild(routes),
        GridModule,GridAllModule,
        DatePickerAllModule,
        LayoutSharedModule,
        FlexLayoutModule,
        ButtonModule,FormsModule, ReactiveFormsModule,
        CheckBoxModule,DatePickerModule,RadioButtonModule,
        ListViewModule,TabModule,DialogModule,
        DropDownListModule,
        AutoCompleteModule,
        QRCodeModule,
        ArchwizardModule,
        SharedModule,
        DropDownButtonModule,
        // EJ_DROPDOWNLIST_COMPONENTS
        
    ],
    providers   : [
        SignupService,SortService,EditService,ToolbarService,
    ],
})
export class SignupModule
{
}