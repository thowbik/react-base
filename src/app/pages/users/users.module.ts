import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users.component';
import { AuthGuard } from '../../guards';
import { UsersService } from './users.service';
import { PermissionsService } from '../../services/permissions.service';
import { GridModule, EditService, GridAllModule } from '@syncfusion/ej2-angular-grids';
import { TabModule} from '@syncfusion/ej2-angular-navigations';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { LayoutSharedModule } from '../../shared.module';
import { DialogComponent, DialogModule} from '@syncfusion/ej2-angular-popups';
import { PageService, SortService, FilterService, GroupService, SearchService, ToolbarService }
    from '@syncfusion/ej2-angular-grids';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { RoleService } from '../role/role.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ContactComponent } from '../contact/contact.component';
import { ContactsModule } from '../contacts/contacts.module';
import { UserRoleSessionService } from '../../services/userRolesession.service';
const routes: Routes = [
    {
        path: '**',
        component: UsersComponent,canActivate: [AuthGuard],
       
        data: {
            title: 'Users'
        }
    }
];

@NgModule({
    declarations: [
        UsersComponent
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
       
    ],
    providers: [
        UsersService,
        RoleService,
        EditService,
        PageService,
        SortService,
        FilterService,
        SearchService,
        ToolbarService,
        UserRoleSessionService,
        GroupService
    ],
   
})
export class UsersModule {
}