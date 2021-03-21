import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../guards';
import { PermissionsService } from '../../services/permissions.service';
import { GridModule, EditService, GridAllModule } from '@syncfusion/ej2-angular-grids';
import { TabModule} from '@syncfusion/ej2-angular-navigations';
import { ButtonModule, CheckBoxAllModule, CheckBoxModule, RadioButtonModule } from '@syncfusion/ej2-angular-buttons';
import { LayoutSharedModule } from '../../shared.module';
import { DialogComponent, DialogModule} from '@syncfusion/ej2-angular-popups';
import { PageService, SortService, FilterService, GroupService, SearchService, ToolbarService }
    from '@syncfusion/ej2-angular-grids';
import { DropDownListModule, MultiSelectAllModule } from '@syncfusion/ej2-angular-dropdowns';
import { RoleService } from '../role/role.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ContactComponent } from '../contact/contact.component';
import { ContactsModule } from '../contacts/contacts.module';
import { UserRoleSessionService } from '../../services/userRolesession.service';
import { ShareComponent } from './share.component';
import { ShareService } from './share.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsersService } from '../users/users.service';
const routes = [
    {
        path     : '**',
        component: ShareComponent,canActivate: [AuthGuard],
    }
];

@NgModule({
    declarations: [
        ShareComponent
    ],
    imports: [
        RouterModule.forChild(routes),
        GridModule,
        GridAllModule,
        TabModule,  
        ButtonModule,FontAwesomeModule,
        LayoutSharedModule,
        DialogModule,DropDownListModule,
        PermissionsService,
        RadioButtonModule,
        FlexLayoutModule,
        FormsModule, ReactiveFormsModule,
        CheckBoxModule,
        MultiSelectAllModule,
        LayoutSharedModule
       
    ],
    providers: [
        RoleService,
        EditService,
        PageService,
        SortService,
        FilterService,
        SearchService,
        ToolbarService,
        UserRoleSessionService,
        UsersService,
        GroupService,
        ShareService
    ],
   
})
export class ShareModule {
}