import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';
import { LayoutSharedModule } from 'src/app/shared.module';
import { ButtonModule, CheckBoxModule } from '@syncfusion/ej2-angular-buttons';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { SignupService } from '../signup/signup.service';


const routes = [
    {
        path     : '**',
        component: LoginComponent
    }
];

@NgModule({
    declarations: [
        LoginComponent
    ],
    imports     : [
        RouterModule.forChild(routes),
        LayoutSharedModule,
        ButtonModule,
        CheckBoxModule,
        DropDownListModule
    ],
    providers:[SignupService]
})
export class LoginModule
{
}
