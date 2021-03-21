import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UtilityService } from '../../services';
import { UserComponent } from './user.component';
import { AuthGuard } from '../../guards';
import { UserService } from './user.service';
const routes: Routes = [
    {
        path     : '**',
        component: UserComponent
    }
];

@NgModule({
    declarations: [
        UserComponent
    ],
    imports     : [
        RouterModule.forChild(routes)
    ],
    providers   : [
        UserService,
        UtilityService
    ]
})
export class UserModule
{
}