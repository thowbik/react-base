import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UtilityService } from '../../services';
import { RoleComponent } from './role.component';
import { AuthGuard } from '../../guards';
import { RoleService } from './role.service';
import { GridModule,SortService,EditService,ToolbarService,GridAllModule } from '@syncfusion/ej2-angular-grids';
import { DatePickerAllModule } from '@syncfusion/ej2-angular-calendars';
import { ButtonModule, CheckBoxModule } from '@syncfusion/ej2-angular-buttons';
import { LayoutSharedModule } from 'src/app/shared.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsersService } from '../users/users.service';
import { TextBoxAllModule } from '@syncfusion/ej2-angular-inputs';
const routes: Routes = [
    {
        path     : '**',
        component: RoleComponent,canActivate: [AuthGuard]
    }
];

@NgModule({
    declarations: [
        RoleComponent
    ],
    imports     : [
        RouterModule.forChild(routes), GridModule,GridAllModule,
        DatePickerAllModule, 
        ButtonModule,
        FlexLayoutModule,
        FormsModule, ReactiveFormsModule,
        CheckBoxModule,
        LayoutSharedModule,
        TextBoxAllModule
    ],
    providers   : [
        RoleService,
        UtilityService,
        UsersService
    ],
    exports:[RoleComponent]
   
})
export class RoleModule
{
}




