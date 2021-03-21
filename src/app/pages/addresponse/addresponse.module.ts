import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddresponseComponent } from './addresponse.component';
import { AddresponseService } from './addresponse.service';
import { AuthGuard } from '../../guards';
import { TabModule } from '@syncfusion/ej2-angular-navigations';
import { GridModule,PageService } from '@syncfusion/ej2-angular-grids';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ButtonModule, RadioButtonModule } from '@syncfusion/ej2-angular-buttons';
import { LayoutSharedModule } from '../../shared.module';
import { DialogModule, TooltipAllModule} from '@syncfusion/ej2-angular-popups';
import { DropDownListModule, AutoCompleteModule } from '@syncfusion/ej2-angular-dropdowns';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckBoxModule } from '@syncfusion/ej2-angular-buttons';
import { LabelService } from '../label/label.service';
import { TreeGridModule } from '@syncfusion/ej2-angular-treegrid';
import { SharedModule } from '../../shared/shared.module';
import { DropDownButtonModule } from '@syncfusion/ej2-angular-splitbuttons';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { Ng5SliderModule } from 'ng5-slider';
import { BarRatingModule } from 'ngx-bar-rating';
import { NewquestionService } from '../newquestion/newquestion.service';
import { NgProgressModule } from 'ngx-progressbar';
import { TextBoxAllModule } from '@syncfusion/ej2-angular-inputs';

const routes: Routes = [
    {
        path     : '**',
        component: AddresponseComponent,canActivate: [AuthGuard],
        data: {
            title: 'Forms'
          }
    }
];

@NgModule({
    declarations: [
        AddresponseComponent,
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
        CheckBoxModule,
        NgProgressModule,
        TextBoxAllModule
    ],
    providers   : [
        AddresponseService,NewquestionService,PageService,LabelService,
        
    ]
})
export class AddresponseModule
{
}

