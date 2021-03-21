import { NgModule } from '@angular/core';
import { SpinnerComponent } from "./spinnercomponent/spinner.component";
import { ContactsGroupsService } from 'src/app/pages/contacts-groups/contacts-groups.service';
import { FilterService, PageService } from '@syncfusion/ej2-angular-grids';
import { ContactsService } from 'src/app/pages/contacts/contacts.service';
import { ContactsConnectedService } from 'src/app/pages/contacts-connected/contacts-connected.service';
import { TransferComponent } from './transfer/transfer.component';
import { MakegroupComponent } from './makegroup/makegroup.component';
//import { ConfirmationModalComponent } from "./modalcomponent/confirmationmodal.component";
//import { GenericMessageModalComponent } from "./modalcomponent/genericmessagemodal.component";
import { TabModule } from '@syncfusion/ej2-angular-navigations';
import { GridModule } from '@syncfusion/ej2-angular-grids';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ButtonModule, CheckBoxModule } from '@syncfusion/ej2-angular-buttons';
import { LayoutSharedModule } from '../../shared.module';
import { DialogComponent, DialogModule } from '@syncfusion/ej2-angular-popups';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PermissionsService } from '../../services/permissions.service';
import { MultiSelectAllModule, DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { DropDownButtonModule } from '@syncfusion/ej2-angular-splitbuttons';
import { TransferService } from './transfer/transfer.service';
import { MakeGroupService } from './makegroup/makegroup.service';
import { DeletepopupComponent } from './deletepopup/deletepopup.component';
import { DeletePopupService } from './deletepopup/deletepopup.service';
import { SharedlabelComponent } from './sharedlabel/sharedlabel.component';
import { SharedlabelService } from './sharedlabel/sharedlabel.service';
import { SendformtoComponent } from './sendformto/sendformto.component';
import { RadioButtonModule } from '@syncfusion/ej2-angular-buttons';
import { SendFormToService } from './sendformto/sendformto.service';
import { TextBoxAllModule } from '@syncfusion/ej2-angular-inputs';
import { UnsavedformComponent } from './unsavedform/unsavedform.component';
export const components = [
  SpinnerComponent,
  TransferComponent,
  MakegroupComponent,
  DeletepopupComponent,
  SharedlabelComponent,
  SendformtoComponent,
  UnsavedformComponent
];

@NgModule({
  declarations: [components],
  providers: [
    ContactsGroupsService,
    ContactsService, PageService, FilterService,
    ContactsGroupsService,
    ContactsConnectedService,
    MakeGroupService,
    SharedlabelService,
    DeletePopupService,
    TransferService,
    SendFormToService
  ],
  // entryComponents: [TransferComponent],
  imports: [
    TabModule,
    GridModule,
    CommonModule,
    DialogModule,
    ButtonModule,
    FontAwesomeModule,
    LayoutSharedModule,
    FlexLayoutModule,
    CheckBoxModule,
    PermissionsService,
    MultiSelectAllModule,
    DropDownButtonModule,
    DropDownListModule,
    RadioButtonModule,
    TextBoxAllModule

  ],
  exports: [components],

})
export class ComponentsModule { }
