import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RespondersComponent } from './responders.component';
import { RespondersService } from './responders.service';
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
import { FlexLayoutModule } from '@angular/flex-layout';
const routes: Routes = [
    {
        path     : '**',
        component: RespondersComponent,canActivate: [AuthGuard],
        data: {
            title: 'Forms'
          }
    }
];

@NgModule({
    declarations: [
        RespondersComponent,
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
        ButtonModule,
        DropDownButtonModule,
        FontAwesomeModule,
        LayoutSharedModule,
        FlexLayoutModule
    ],
    providers   : [
        RespondersService,PageService,LabelService
    ]
})
export class RespondersModule
{
}

