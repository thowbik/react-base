import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserroleComponent } from './userrole.component';
import { AuthGuard } from '../../guards';
import { UserroleService } from './userrole.service';
import { PermissionsService } from '../../services/permissions.service';
import { GridModule, EditService, GridAllModule } from '@syncfusion/ej2-angular-grids';
import { TabModule} from '@syncfusion/ej2-angular-navigations';
import { ButtonModule, CheckBoxModule } from '@syncfusion/ej2-angular-buttons';
import { LayoutSharedModule } from '../../shared.module';
import { DialogComponent, DialogModule} from '@syncfusion/ej2-angular-popups';
import { PageService, SortService, FilterService, GroupService, SearchService, ToolbarService }
    from '@syncfusion/ej2-angular-grids';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { RoleService } from '../role/role.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ContactComponent } from '../contact/contact.component';
import { ContactsModule } from '../contacts/contacts.module';
import { UsersService } from '../users/users.service';
const routes: Routes = [
    {
        path: '**',
        component: UserroleComponent,canActivate: [AuthGuard],
       
        data: {
            title: 'Users'
        }
    }
];

@NgModule({
    declarations: [
        UserroleComponent
    ],
    imports: [
        RouterModule.forChild(routes),
        GridModule,
        GridAllModule,
        CheckBoxModule,
        TabModule,  
        ButtonModule,FontAwesomeModule,
        LayoutSharedModule,
        DialogModule,DropDownListModule,
        PermissionsService,
       
    ],
    providers: [
        UserroleService,
        RoleService,
        EditService,
        PageService,
        SortService,
        FilterService,
        SearchService,
        ToolbarService,
        GroupService,
        UsersService
    ],
   
})
export class UserroleModule {
}