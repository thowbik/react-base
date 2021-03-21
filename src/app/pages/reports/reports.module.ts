import { CommonModule } from '@angular/common';  
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportsComponent } from './reports.component';
import { ReportsService } from './reports.service';
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

const routes: Routes = [
    {
        path     : '**',
        component: ReportsComponent,canActivate: [AuthGuard],
        data: {
            title: 'Reports'
        }
    }
];

@NgModule({
    declarations: [
        ReportsComponent
    ],
    imports     : [
        RouterModule.forChild(routes),
        GridModule,GridAllModule,
        DatePickerAllModule,
        LayoutSharedModule,
        CommonModule,FlexLayoutModule,
        ButtonModule,FormsModule, ReactiveFormsModule,
        CheckBoxModule,DatePickerModule,RadioButtonModule,
        ListViewModule
    ],
    providers   : [
        ReportsService,SortService,EditService,ToolbarService
    ]
})
export class ReportsModule
{
}



