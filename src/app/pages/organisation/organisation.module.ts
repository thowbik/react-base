import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {OrganisationService} from '../organisation/organisation.service';
import { OrganisationComponent } from './organisation.component';
import { LayoutSharedModule } from 'src/app/shared.module';
import { AuthGuard } from '../../guards';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
const routes = [
    {
        path     : '**',
        component: OrganisationComponent,canActivate: [AuthGuard]
    }
];

@NgModule({
    declarations: [
        OrganisationComponent 
    ],
    imports     : [
        RouterModule.forChild(routes),
        LayoutSharedModule,
        DropDownListModule
    ],
   
    providers   : [
        OrganisationService
    ]
})
export class OrganisationModule
{
}
