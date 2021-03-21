import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LayoutSharedModule } from 'src/app/shared.module';
import { ButtonModule, CheckBoxModule } from '@syncfusion/ej2-angular-buttons';
import { SigninComponent } from './signin.component';
import { QRCodeModule } from 'angularx-qrcode/dist/angularx-qrcode.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SignalRService } from 'src/app/services/signalR.service';
import { SigninService } from './signin.service';

const routes = [
    {
        path     : '**',
        component: SigninComponent
    }
];

@NgModule({
    declarations: [
        SigninComponent
    ],
    imports     : [
        RouterModule.forChild(routes),
        LayoutSharedModule,
        ButtonModule,
        CheckBoxModule,
        QRCodeModule,
        FlexLayoutModule
    ], providers   : [
        SignalRService,SigninService
    ]
})
export class SigninModule
{
}
