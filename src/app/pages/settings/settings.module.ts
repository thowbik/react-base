import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingsComponent } from './settings.component';
import { AuthGuard } from '../../guards';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LayoutSharedModule } from '../../shared.module';
import { SettingsService } from './settings.service';
import { TabModule } from '@syncfusion/ej2-angular-navigations';
const routes: Routes = [
    {
        path     : '**',
        component: SettingsComponent,canActivate: [AuthGuard]
    }
];

@NgModule({
    declarations: [
        SettingsComponent
    ],
    imports     : [
        RouterModule.forChild(routes),
        LayoutSharedModule,TabModule,
        FlexLayoutModule,
    ],
    providers   : [
        SettingsService
    ]
})
export class SettingsModule
{
}

