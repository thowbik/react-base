import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../guards';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { LayoutSharedModule } from '../../shared.module';
import { TreeViewModule } from '@syncfusion/ej2-angular-navigations';
import { TreeViewComponent } from '@syncfusion/ej2-angular-navigations';
import { HttpClientModule } from '@angular/common/http';
import { LabelComponent } from './label.component';
import { DialogModule} from '@syncfusion/ej2-angular-popups';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { TreeGridAllModule, PageService,EditService } from '@syncfusion/ej2-angular-treegrid';
import { CheckBoxModule } from '@syncfusion/ej2-angular-buttons';
import { LabelService } from './label.service';
import { SharedModule } from '../../shared/shared.module';

const routes: Routes = [
    {
        path     : '**',
        component: LabelComponent,canActivate: [AuthGuard],
        data: {
            title: 'Forms'
          }
    }
];

@NgModule({
    declarations: [
        LabelComponent
    ],
    imports     : [
        RouterModule.forChild(routes), ButtonModule,
        LayoutSharedModule,
        FormsModule,
        TreeGridAllModule,
        ButtonModule,
        CheckBoxModule,
        TreeViewModule,
        ReactiveFormsModule,
        DropDownListModule,
        HttpClientModule,
        DialogModule,SharedModule
    ],
    providers   : [
        LabelService,PageService,EditService
    ]
})
export class LabelModule
{
}

