import { CommonModule } from '@angular/common';  
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactComponent } from './contact.component';
import { AuthGuard } from '../../guards';
import { GridModule,SortService,EditService,ToolbarService,GridAllModule } from '@syncfusion/ej2-angular-grids';
import { DatePickerAllModule } from '@syncfusion/ej2-angular-calendars';
import { ButtonModule, CheckBoxModule } from '@syncfusion/ej2-angular-buttons';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import { RadioButtonModule } from '@syncfusion/ej2-angular-buttons';
import { LayoutSharedModule } from '../../shared.module';
import { ContactService } from './contact.service';
// import { NumberDirective } from './numbers-only.directive';
import { TabModule } from '@syncfusion/ej2-angular-navigations';
import {Ng2TelInputModule} from 'ng2-tel-input';
import { DropDownListModule,AutoCompleteModule } from '@syncfusion/ej2-angular-dropdowns';
import { SharedModule } from 'src/app/shared/shared.module';
import { PermissionsService } from '../../services/permissions.service';


const routes: Routes = [
    {
        path     : '**',
        component: ContactComponent,canActivate: [AuthGuard],
        data: {
            title: 'Reports'
        }
    }
];

@NgModule({
    declarations: [
        ContactComponent
    ],
    imports     : [
        RouterModule.forChild(routes),
        GridModule,GridAllModule,
        DatePickerAllModule,
        Ng2TelInputModule,
        LayoutSharedModule,
        TabModule,
        DropDownListModule,
        CommonModule,
        FlexLayoutModule,
        ButtonModule,
        AutoCompleteModule,
        FormsModule, 
        ReactiveFormsModule,
        CheckBoxModule,
        DatePickerModule,
        RadioButtonModule,
        SharedModule,
        PermissionsService
    ],
    providers   : [
        SortService,EditService,ToolbarService,ContactService
    ]
})
export class ContactModule
{
}



