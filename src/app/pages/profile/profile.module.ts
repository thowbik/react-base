import { CommonModule } from '@angular/common';  
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../guards';
import { GridModule,GridAllModule } from '@syncfusion/ej2-angular-grids';
import { DatePickerAllModule } from '@syncfusion/ej2-angular-calendars';
import { ButtonModule, CheckBoxModule } from '@syncfusion/ej2-angular-buttons';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import { RadioButtonModule } from '@syncfusion/ej2-angular-buttons';
import { LayoutSharedModule } from '../../shared.module';
import { ProfileComponent } from './profile.component';
import { UserService } from '../user/user.service'
const routes: Routes = [
    {
        path     : '**',
        component: ProfileComponent,canActivate: [AuthGuard],
        data: {
            title: 'Reports'
        }
    }
];

@NgModule({
    declarations: [
        ProfileComponent
    ],
    imports     : [
        RouterModule.forChild(routes),
        GridModule,GridAllModule,
        DatePickerAllModule,
        LayoutSharedModule,
        CommonModule,FlexLayoutModule,
        ButtonModule,FormsModule, ReactiveFormsModule,
        CheckBoxModule,DatePickerModule,RadioButtonModule
    ],
    providers   : [
        UserService
    ]
})
export class ProfileModule
{
}



