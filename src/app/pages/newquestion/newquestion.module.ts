  
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

//import { ReportsService } from './reports.service';
import { AuthGuard } from '../../guards';
import { GridModule,SortService,EditService,ToolbarService,GridAllModule } from '@syncfusion/ej2-angular-grids';
import { DatePickerAllModule } from '@syncfusion/ej2-angular-calendars';
import { ButtonModule, CheckBoxModule } from '@syncfusion/ej2-angular-buttons';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import { RadioButtonModule } from '@syncfusion/ej2-angular-buttons';
import { LayoutSharedModule } from '../../shared.module';
import { ListViewModule } from '@syncfusion/ej2-angular-lists';
import { TabComponent, TabModule } from '@syncfusion/ej2-angular-navigations';
import { DialogModule, TooltipAllModule } from '@syncfusion/ej2-angular-popups';
import { DropDownListModule, MultiSelectAllModule } from '@syncfusion/ej2-angular-dropdowns';
import { QRCodeModule } from 'angularx-qrcode';
import { ArchwizardModule } from 'angular-archwizard';
import { NewquestionComponent } from './newquestion.component';
import { NewquestionService } from './newquestion.service';
//import { DragulaModule, DragulaService }   from 'ng2-dragula';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { DropDownButtonModule } from '@syncfusion/ej2-angular-splitbuttons';
import {NgxImageCompressService} from 'ngx-image-compress';
import { NgxUploaderModule } from 'ngx-uploader';
import { BarRatingModule } from 'ngx-bar-rating';
import { SharedModule } from '../../shared/shared.module';
import { TextBoxAllModule } from '@syncfusion/ej2-angular-inputs';
import { ScrollEventModule } from 'ngx-scroll-event';
import { Ng5SliderModule } from 'ng5-slider';
import {AutosizeModule} from 'ngx-autosize';

//import { NewenterpriseaccountService } from './newenterpriseaccount.service';

/*const routes: Routes = [
    {
        path     : '**',
        component: SignupComponent,canActivate: [AuthGuard],
        data: {
            title: 'Signup'
        }
    }
]; */

const routes = [
    {
        path     : '**',
        component: NewquestionComponent
    }
];

@NgModule({
    declarations: [
        NewquestionComponent,
    ],
    imports     : [
        RouterModule.forChild(routes),
        GridModule,GridAllModule,
        AutosizeModule,
        DatePickerAllModule,
        LayoutSharedModule,
        FlexLayoutModule,
        ButtonModule,FormsModule, ReactiveFormsModule,
        CheckBoxModule,DatePickerModule,RadioButtonModule,
        ListViewModule,TabModule,DialogModule,
        DropDownListModule,
        QRCodeModule,
        ArchwizardModule,
        //DragulaModule.forRoot(),
        DragDropModule,
        TooltipAllModule,
        BarRatingModule,
        DropDownButtonModule,
        NgxUploaderModule,
        SharedModule,
        TextBoxAllModule,
        ScrollEventModule,
        Ng5SliderModule,
        MultiSelectAllModule

    ],
    providers   : [
    SortService,EditService,ToolbarService,NewquestionService,NgxImageCompressService
    ],
})
export class NewquestionModule
{
}