import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RegisterComponent } from './register.component';
import { LayoutSharedModule } from '../../shared.module';
import { DatePickerAllModule } from '@syncfusion/ej2-angular-calendars';
import { ButtonModule, CheckBoxModule } from '@syncfusion/ej2-angular-buttons';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import { RadioButtonModule } from '@syncfusion/ej2-angular-buttons';
import { UtilityService } from '../../services';
import { UserService } from '../user/user.service';
const routes = [
    {
        path     : '**',
        component: RegisterComponent
    }
];

@NgModule({
    declarations: [
        RegisterComponent
    ],
    imports     : [
        RouterModule.forChild(routes),
        LayoutSharedModule,
        DatePickerAllModule,
        LayoutSharedModule,
        FlexLayoutModule,
        ButtonModule,FormsModule, ReactiveFormsModule,
        CheckBoxModule,DatePickerModule,RadioButtonModule
    ],
    providers   : [
        UserService,
        UtilityService
    ]
})
export class RegisterModule
{
}
