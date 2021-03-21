import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TopnavComponent } from './components/topnav/topnav.component';
import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { SidebarModule } from '@syncfusion/ej2-angular-navigations';
import { ToolbarModule } from '@syncfusion/ej2-angular-navigations';
import { ListViewModule } from '@syncfusion/ej2-angular-lists';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LayoutSharedModule } from '../../shared.module';
import { DropDownButtonModule } from '@syncfusion/ej2-angular-splitbuttons';
import { ButtonModule, RadioButtonModule, CheckBoxModule } from '@syncfusion/ej2-angular-buttons';
import { DropDownListModule, MultiSelectComponent } from '@syncfusion/ej2-angular-dropdowns';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { OrganisationService } from '../organisation/organisation.service';
import { GridModule } from '@syncfusion/ej2-angular-grids';
import {
    PageService, SortService, FilterService,
    GroupService, SearchService, ToolbarService
} from '@syncfusion/ej2-angular-grids';
import { InputComponent } from './components/input/input.component';
import { ButtonComponent } from './components/button/button.component';
import { SelectComponent } from './components/select/select.component';
import { RadiobuttonComponent } from './components/radiobutton/radiobutton.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { DateComponent } from './components/date/date.component';
import { DynamicFieldDirective } from './components/dynamic-field/dynamic-field.directive';
import { DynamicFormComponent } from './components/dynamic-form/dynamic-form.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserModule } from '@angular/platform-browser';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars/src/datepicker/datepicker.module';
import { FileComponent } from './components/fileupload/fileupload.component';
import { UploaderModule } from '@syncfusion/ej2-angular-inputs/src/uploader/uploader.module';
import { DialogModule, TooltipAllModule } from '@syncfusion/ej2-angular-popups';
import { MultiSelectModule } from '@syncfusion/ej2-angular-dropdowns';
import { UserRoleSessionService } from '../../services/userRolesession.service';
import { UsersService } from '../users/users.service';

@NgModule({
    imports: [
        CommonModule,
        SidebarModule,
        ToolbarModule,
        ListViewModule,
        FontAwesomeModule,
        LayoutRoutingModule,
        LayoutSharedModule,
        DropDownButtonModule,
        ButtonModule,
        DropDownListModule,
        GridModule,
        RadioButtonModule,
        ReactiveFormsModule,
        FormsModule,
        FlexLayoutModule,
        CheckBoxModule,
        DatePickerModule,
        UploaderModule,
        DialogModule,
        MultiSelectModule,
        TooltipAllModule


    ],

    declarations: [LayoutComponent, TopnavComponent, NavbarComponent,
        InputComponent,
        SelectComponent,
        DateComponent,
        RadiobuttonComponent,
        CheckboxComponent,
        ButtonComponent,
        FileComponent
        //DynamicFieldDirective,
        // DynamicFormComponent
    ],

    providers: [
        OrganisationService,
        PageService,
        SortService,
        FilterService,
        SearchService,
        ToolbarService,
        UserRoleSessionService,
        GroupService, UsersService
    ],
    entryComponents: [
        InputComponent,
        SelectComponent,
        DateComponent,
        RadiobuttonComponent,
        CheckboxComponent,
        ButtonComponent,
        FileComponent
        //DynamicFieldDirective
        // DynamicFormComponent
    ],
})
export class LayoutModule { }
