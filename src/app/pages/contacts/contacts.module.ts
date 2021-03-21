import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactsService } from './contacts.service';
import { ContactsComponent } from './contacts.component';
import { AuthGuard } from '../../guards';
import { TabModule } from '@syncfusion/ej2-angular-navigations';
import { GridModule,PageService,FilterService} from '@syncfusion/ej2-angular-grids';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ButtonModule, CheckBoxModule } from '@syncfusion/ej2-angular-buttons';
import { LayoutSharedModule } from '../../shared.module';
import { DialogComponent, DialogModule } from '@syncfusion/ej2-angular-popups';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxUploaderModule } from 'ngx-uploader';
import { PermissionsService } from '../../services/permissions.service';
import { DropDownButtonModule } from '@syncfusion/ej2-angular-splitbuttons';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { ContactGroupListService } from '../contact-grouplist/contact-grouplist.service';
import { ContactsGroupsService } from '../contacts-groups/contacts-groups.service';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [
    {
        path     : '**',
        component: ContactsComponent,canActivate: [AuthGuard],
        data: {
            title: 'Contacts'
          }
    }
];

@NgModule({
    declarations: [
        ContactsComponent
    ],
    imports     : [
        RouterModule.forChild(routes),
        TabModule,
        SharedModule,
        GridModule,
        CommonModule,
        DialogModule,
        ButtonModule,
        CheckBoxModule,
        FontAwesomeModule,
        LayoutSharedModule,
        FlexLayoutModule,
        NgxUploaderModule,
        PermissionsService,
        DropDownButtonModule,
        DropDownListModule
    ],
    providers   : [
        ContactsService,PageService,FilterService,
        ContactsGroupsService,
        ContactGroupListService
    ],
})
export class ContactsModule
{
}

