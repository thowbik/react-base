import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../guards';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { LayoutSharedModule } from '../../shared.module';
import { TreeViewModule } from '@syncfusion/ej2-angular-navigations';
import { TabModule } from '@syncfusion/ej2-angular-navigations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DropDownButtonModule } from '@syncfusion/ej2-angular-splitbuttons';
import { GridModule } from '@syncfusion/ej2-angular-grids';
import { FormoptionsComponent } from './formoptions.component';
import { DialogComponent, DialogModule} from '@syncfusion/ej2-angular-popups';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DropDownListModule, MultiSelectAllModule } from '@syncfusion/ej2-angular-dropdowns';
import { DateTimePickerAllModule, DateTimePicker, DateTimePickerModule } from '@syncfusion/ej2-angular-calendars';
import { FormOptionsService } from './formoptions.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
const routes: Routes = [
    {
        path     : '**',
        component: FormoptionsComponent,canActivate: [AuthGuard],
        data: {
            title: 'Form'
          }
    }
];

@NgModule({
    declarations: [
        FormoptionsComponent
    ],
    imports     : [
        RouterModule.forChild(routes),
        ButtonModule,
        LayoutSharedModule,
        TabModule,
        GridModule,
        TreeViewModule,
        FontAwesomeModule,
        DropDownButtonModule,
        DropDownListModule,
        DialogModule,
        FlexLayoutModule,
        DateTimePickerAllModule,
        DateTimePickerModule,
        FormsModule,ReactiveFormsModule,
        MultiSelectAllModule
    ],
    providers: [
        FormOptionsService
    ]
})
export class FormoptionsModule
{
}

