import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../guards';
import { FormviewComponent } from './formview.component';
import { NewquestionService } from '../newquestion/newquestion.service';
import { ButtonModule, CheckBoxModule, RadioButtonModule } from '@syncfusion/ej2-angular-buttons';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BarRatingModule } from "ngx-bar-rating";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng5SliderModule } from 'ng5-slider';
import { DropDownListModule,AutoCompleteModule } from '@syncfusion/ej2-angular-dropdowns';
import { DropDownButtonModule } from '@syncfusion/ej2-angular-splitbuttons';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ToolbarService } from '@syncfusion/ej2-angular-grids';
import { TooltipAllModule } from '@syncfusion/ej2-angular-popups';
import { LayoutSharedModule } from 'src/app/shared.module';

const routes: Routes = [
    {
        path     : '**',
        component: FormviewComponent,
        data: {
            title: 'Forms'
          }
    }
];

@NgModule({
    declarations: [
        FormviewComponent
    ],
    imports     : [
        RouterModule.forChild(routes),
        FlexLayoutModule,
        ReactiveFormsModule,
        AutoCompleteModule,
        RadioButtonModule,
        DragDropModule,
        DropDownButtonModule,
        DropDownListModule,
        FormsModule,
        Ng5SliderModule,
        TooltipAllModule,
        ButtonModule,
        LayoutSharedModule,
        BarRatingModule,
        CheckBoxModule
    ],
    providers   : [
        NewquestionService,ToolbarService
    ]
})
export class FormViewModule
{
}

