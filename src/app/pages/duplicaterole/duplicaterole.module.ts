import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UtilityService } from '../../services';
import { AuthGuard } from '../../guards';
import { GridModule,SortService,EditService,ToolbarService,GridAllModule } from '@syncfusion/ej2-angular-grids';
import { DatePickerAllModule } from '@syncfusion/ej2-angular-calendars';
import { ButtonModule, CheckBoxModule } from '@syncfusion/ej2-angular-buttons';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DuplicateroleComponent } from './duplicaterole.component';
import { LayoutSharedModule } from '../../shared.module';
import { RoleService } from '../role/role.service';

const routes: Routes = [
    {
        path     : '**',
        component: DuplicateroleComponent,canActivate: [AuthGuard]
    }
];

@NgModule({
    declarations: [
        DuplicateroleComponent
    ],
    imports     : [
        RouterModule.forChild(routes), GridModule,GridAllModule,
        DatePickerAllModule, 
        ButtonModule,
        FlexLayoutModule,
        FormsModule, ReactiveFormsModule,
        CheckBoxModule,
        LayoutSharedModule
    ],
    providers   : [
        RoleService,
        UtilityService
    ],
    exports:[DuplicateroleComponent]
   
})
export class DuplicateroleModule
{
}




