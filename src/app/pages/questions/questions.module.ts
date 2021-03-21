import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuestionsComponent } from './questions.component';
import { QuestionsService } from './questions.service';
import { AuthGuard } from '../../guards';
import { TabModule } from '@syncfusion/ej2-angular-navigations';
import { GridModule,PageService } from '@syncfusion/ej2-angular-grids';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { LayoutSharedModule } from '../../shared.module';
import { DialogModule} from '@syncfusion/ej2-angular-popups';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckBoxModule } from '@syncfusion/ej2-angular-buttons';
import { LabelService } from '../label/label.service';
import { TreeGridModule } from '@syncfusion/ej2-angular-treegrid';
import { SharedModule } from '../../shared/shared.module';
import { DropDownButtonModule } from '@syncfusion/ej2-angular-splitbuttons';
const routes: Routes = [
    {
        path     : '**',
        component: QuestionsComponent,canActivate: [AuthGuard],
        data: {
            title: 'Forms'
          }
    }
];

@NgModule({
    declarations: [
        QuestionsComponent,
    ],
    imports     : [
        RouterModule.forChild(routes),
        TabModule,
        GridModule,
        DialogModule,
        ReactiveFormsModule,
        SharedModule,
        CheckBoxModule,
        CommonModule,
        FormsModule,
        DropDownListModule,
        TreeGridModule,
        ButtonModule,
        DropDownButtonModule,
        FontAwesomeModule,
        LayoutSharedModule
    ],
    providers   : [
        QuestionsService,PageService,LabelService
    ]
})
export class QuestionsModule
{
}

