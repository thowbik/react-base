  
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

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
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { QRCodeModule } from 'angularx-qrcode';
import { ArchwizardModule } from 'angular-archwizard';
import { NewenterpriseaccountComponent } from './newenterpriseaccount.component';
import { NewenterpriseaccountService } from './newenterpriseaccount.service';
import { SignalRService } from '../../services/signalR.service';
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
        component: NewenterpriseaccountComponent
    }
];

@NgModule({
    declarations: [
        NewenterpriseaccountComponent
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
        QRCodeModule,
        ArchwizardModule
       

    ],
    providers   : [
        SortService,EditService,ToolbarService,NewenterpriseaccountService,SignalRService
    ]
})
export class NewenterpriseaccountModule
{
}