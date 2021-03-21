import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactsConnectedComponent } from './contacts-connected.component';
import { AuthGuard } from '../../guards';
import { TabModule } from '@syncfusion/ej2-angular-navigations';
import { GridModule, PageService } from '@syncfusion/ej2-angular-grids';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { LayoutSharedModule } from '../../shared.module';
import { DialogComponent, DialogModule } from '@syncfusion/ej2-angular-popups';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ContactsConnectedService } from './contacts-connected.service';
import { PermissionsService } from '../../services/permissions.service';
import { MultiSelectAllModule, DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { DropDownButtonModule } from '@syncfusion/ej2-angular-splitbuttons';
import { ContactsService } from '../contacts/contacts.service';
import { ContactGroupListService } from '../contact-grouplist/contact-grouplist.service';
import { ContactsGroupsService } from '../contacts-groups/contacts-groups.service';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [
    {
        path     : '**',
        component: ContactsConnectedComponent, canActivate: [AuthGuard],
        data: {
            title: 'ContactsConnected'
          }
    }
];

@NgModule({
    declarations: [
        ContactsConnectedComponent
    ],
    imports     : [
        RouterModule.forChild(routes),
        TabModule,
        SharedModule,
        GridModule,
        CommonModule,
        DialogModule,
        ButtonModule,
        FontAwesomeModule,
        LayoutSharedModule,
        FlexLayoutModule,
        PermissionsService,
        MultiSelectAllModule,
        DropDownButtonModule,
        DropDownListModule

    ],
    providers   : [
        PageService, ContactsConnectedService,
        ContactsGroupsService,
        ContactGroupListService
    ]
})
export class ContactsConnectedModule {
}

