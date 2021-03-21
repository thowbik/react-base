import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsComponent } from './forms.component';
import { AuthGuard } from '../../guards';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { LayoutSharedModule } from '../../shared.module';
import { TreeViewModule } from '@syncfusion/ej2-angular-navigations';
//import { TreeViewComponent } from '@syncfusion/ej2-angular-navigations';
import { TabModule } from '@syncfusion/ej2-angular-navigations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DropDownButtonModule } from '@syncfusion/ej2-angular-splitbuttons';
import { GridModule } from '@syncfusion/ej2-angular-grids';
import { FormsService } from './forms.service';
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { CheckBoxModule } from '@syncfusion/ej2-angular-buttons';
import { LabelService } from '../label/label.service';
import { SharedModule } from '../../shared/shared.module';
import { PermissionsService } from 'src/app/services/permissions.service';
import { TextBoxAllModule } from '@syncfusion/ej2-angular-inputs';

const routes: Routes = [
    {
        path: '**',
        component: FormsComponent, canActivate: [AuthGuard],
        data: {
            title: 'Forms'
        }
    }
];

@NgModule({
    declarations: [
        FormsComponent
    ],
    imports: [
        RouterModule.forChild(routes), ButtonModule,
        LayoutSharedModule, TabModule, GridModule,
        ReactiveFormsModule,
        DropDownListModule,
        DialogModule,
        FormsModule,
        CheckBoxModule,
        PermissionsService,
        SharedModule,
        FontAwesomeModule,
        DropDownButtonModule,
        TextBoxAllModule
    ],
    providers: [
        FormsService,LabelService
    ]
})
export class FormsPageModule {
}

