import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../guards';
import { TabModule } from '@syncfusion/ej2-angular-navigations';
import { GridModule, PageService, FilterService } from '@syncfusion/ej2-angular-grids';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LayoutSharedModule } from '../../shared.module';
import { DialogComponent, DialogModule } from '@syncfusion/ej2-angular-popups';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { UsersService } from '../users/users.service';
import { ContactGrouplistComponent } from './contact-grouplist.component';
import { CommonModule } from '@angular/common';
import { MultiSelectAllModule } from '@syncfusion/ej2-angular-dropdowns';
import { NumericTextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { CheckBoxModule, ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContactGroupListService } from './contact-grouplist.service';
import { ContactsGroupsService } from '../contacts-groups/contacts-groups.service';
import { ContactsService } from '../contacts/contacts.service';
import { PermissionsService } from '../../services/permissions.service';
import { SortService } from '@syncfusion/ej2-angular-grids';
// import { BrowserModule } from '@angular/platform-browser';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


const routes: Routes = [
    {
        path     : '**',
        component: ContactGrouplistComponent,
        canActivate: [AuthGuard],
        data: {
            title: 'ContactsGroupList'
          }
    }
];

@NgModule({
    declarations: [
        ContactGrouplistComponent
    ],
    imports     : [
        RouterModule.forChild(routes),
        TabModule,
        GridModule,
        CommonModule,
        HttpModule,
        DialogModule,
        DropDownListModule,
        ButtonModule,
        FontAwesomeModule,
        LayoutSharedModule,
        HttpClientModule,
        FlexLayoutModule,
        MultiSelectAllModule,
        CheckBoxModule,
        // BrowserModule,
        // BrowserAnimationsModule,
        NumericTextBoxModule,
        FormsModule,
        ReactiveFormsModule,
        PermissionsService
    ],
    providers   : [
        PageService,
        UsersService,
        ContactsService,
        ContactsGroupsService,
        ContactGroupListService,
        SortService,
        FilterService,
    ],
    // bootstrap: [ContactGrouplistComponent]
})
export class ContactGroupListModule {}


