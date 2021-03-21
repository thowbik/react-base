import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactsEmployeesComponent } from './contacts-employees.component';
import { AuthGuard } from '../../guards';
import { TabModule } from '@syncfusion/ej2-angular-navigations';
import { GridModule,PageService } from '@syncfusion/ej2-angular-grids';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { LayoutSharedModule } from '../../shared.module';
import { DialogComponent, DialogModule } from '@syncfusion/ej2-angular-popups';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ContactsEmployeesService } from './contacts-employees.service';
import { PermissionsService } from '../../services/permissions.service';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { DropDownButtonModule } from '@syncfusion/ej2-angular-splitbuttons';
import { ContactGroupListService } from '../contact-grouplist/contact-grouplist.service';
import { ContactsGroupsService } from '../contacts-groups/contacts-groups.service';
import { SharedModule } from 'src/app/shared/shared.module';
const routes: Routes = [
    {
        path     : '**',
        component: ContactsEmployeesComponent,canActivate: [AuthGuard],
        data: {
            title: 'ContactsEmployees'
          }
    }
];

@NgModule({
    declarations: [
        ContactsEmployeesComponent
    ],
    imports     : [
        RouterModule.forChild(routes),
        TabModule,
        GridModule,
        CommonModule,
        DialogModule,
        ButtonModule,
        FontAwesomeModule,
        LayoutSharedModule,
        FlexLayoutModule,
        SharedModule,
        PermissionsService,
        DropDownListModule,
        DropDownButtonModule
    ],
    providers   : [
        PageService,ContactsEmployeesService,
        ContactsGroupsService,
        ContactGroupListService
    ]
})
export class ContactsEmployeesModule
{
}

