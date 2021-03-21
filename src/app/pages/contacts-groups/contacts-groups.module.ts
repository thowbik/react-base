import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactsGroupsComponent } from './contacts-groups.component';
import { AuthGuard } from '../../guards';
import { TabModule } from '@syncfusion/ej2-angular-navigations';
import { GridModule, PageService } from '@syncfusion/ej2-angular-grids';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { LayoutSharedModule } from '../../shared.module';
import { DialogComponent, DialogModule } from '@syncfusion/ej2-angular-popups';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { UsersService } from '../users/users.service';
import { MultiSelectAllModule } from '@syncfusion/ej2-angular-dropdowns';
import { ContactsGroupsService } from './contacts-groups.service';
import { ContactsService } from '../contacts/contacts.service';
import { ContactGroupListService } from '../contact-grouplist/contact-grouplist.service';
import { RadioButtonModule } from '@syncfusion/ej2-angular-buttons';
import { PermissionsService } from '../../services/permissions.service';
import { DropDownButtonModule } from '@syncfusion/ej2-angular-splitbuttons';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [
    {
        path     : '**',
        component: ContactsGroupsComponent,canActivate: [AuthGuard],
        data: {
            title: 'ContactsEmployees'
          }
    }
];

@NgModule({
    declarations: [
        ContactsGroupsComponent
    ],
    imports     : [
        RouterModule.forChild(routes),
        TabModule,
        GridModule,
        CommonModule,
        DialogModule,
        DropDownListModule,
        ButtonModule,
        HttpModule,
        FontAwesomeModule,
        LayoutSharedModule,
        MultiSelectAllModule,
        HttpClientModule,
        FlexLayoutModule,
        PermissionsService,
        RadioButtonModule,
        DropDownButtonModule,
        SharedModule
    ],
    providers   : [
        PageService,
        UsersService,
        ContactsGroupsService,
        ContactGroupListService,
        ContactsService
    ]
})
export class ContactsGroupsModule {
}

