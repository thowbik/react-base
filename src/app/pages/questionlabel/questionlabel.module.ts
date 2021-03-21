import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../guards';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { LayoutSharedModule } from '../../shared.module';
import { TreeViewModule } from '@syncfusion/ej2-angular-navigations';
import { TreeViewComponent } from '@syncfusion/ej2-angular-navigations';
import { HttpClientModule } from '@angular/common/http';
import { DialogModule} from '@syncfusion/ej2-angular-popups';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { TreeGridModule } from '@syncfusion/ej2-angular-treegrid';
import { CheckBoxModule } from '@syncfusion/ej2-angular-buttons';
import { QuestionsService } from '../questions/questions.service';
import { QuestionlabelComponent } from './questionlabel.component';

const routes: Routes = [
    {
        path     : '**',
        component: QuestionlabelComponent,canActivate: [AuthGuard],
        data: {
            title: 'Question Label'
          }
    }
];

@NgModule({
    declarations: [
        QuestionlabelComponent
    ],
    imports     : [
        RouterModule.forChild(routes), ButtonModule,
        LayoutSharedModule,
        FormsModule,
        TreeGridModule,
        ButtonModule,
        CheckBoxModule,
        TreeViewModule,
        ReactiveFormsModule,
        DropDownListModule,
        HttpClientModule,
        DialogModule
    ],
    providers   : [
        QuestionsService
    ]
})
export class QuestionlabelModule {
}
