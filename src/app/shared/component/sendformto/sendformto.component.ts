import { Component, OnInit, ViewChild, EventEmitter, Output, Query } from '@angular/core';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { OrganisationPageSessionService, UserSessionService } from 'src/app/services';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SendFormToService } from './sendformto.service';
import { RecordType } from 'src/app/models';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-sendformto',
  templateUrl: './sendformto.component.html',
  styleUrls: ['./sendformto.component.scss']
})
export class SendformtoComponent implements OnInit {

  public isOpen: boolean = false;
  pagefrom: any;
  @ViewChild('SendFormToDialog')
  public SendFormToDialog: DialogComponent;
  public labelFormSend: any;
  // public placeholder = 'Search a name or an email...';
  public placeholder: any;




  @Output() click = new EventEmitter<any>();
  @Output() emitClosePopupSendFormTo: EventEmitter<String> = new EventEmitter<String>();
  btnTitle: any;
  newSendForm: FormGroup;
  public contacts: any;
  public groups: any;
  contactDropdown: boolean = false;
  groupDropdown: boolean = false;
  multifield: any;
  multifield1: any;
  public box = 'Box';
  formId: any;
  environmentUrl: any;
  RecordType() { return RecordType };
  constructor(private organisationPageSessionService: OrganisationPageSessionService,
    private userSessionService: UserSessionService,
    private _SendFormToService: SendFormToService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.environmentUrl = environment.profileURL;
    this.isOpen = true;
    this.labelFormSend = 'Selected Contacts:';
    this.contactDropdown = true;
    this.getFormId();
    this.placeholder = 'Search a name or an email...';
    this.multifield = { text: 'name', value: 'id' };
    this.multifield1 = { text: 'fullName', email: 'emailAddress', value: 'connectedUserOrganisationMappingId' }
    this.createForm();
    this.getContactsforSendFormTo(true);
    this.getGroupforSendFormTo(true);
  }
  getFormId() {
    this.formId = [];
    let selectItem = [];
    this._SendFormToService.headerMessage.subscribe((data) => {


      data.forEach(function (element) {

        selectItem.push(
          element.formId

        )

      })
      this.formId = selectItem;

      this.isOpen = true;
    });
  }
  createForm() {
    const userId = this.userSessionService.userId();
    const organisationId = this.organisationPageSessionService.getOrganisationId();
    this.newSendForm = this.formBuilder.group({
      id: ['0', null],
      formId: [''],
      recordId: ['', Validators.required],
      recordType: [this.RecordType().Contact],
      // message: [],
    });
    //this.isOpen = true;
  }
  getContactsforSendFormTo(refresh) {
    debugger;
    const orgId = this.organisationPageSessionService.getOrganisationId();
    const userId = this.userSessionService.userId();


    this._SendFormToService.getcontactsForSendFormTo(userId, orgId, refresh).subscribe(users1 => {
      this.contacts = users1;

    });
  }

  getGroupforSendFormTo(refresh) {
    const orgId = this.organisationPageSessionService.getOrganisationId();
    const userId = this.userSessionService.userId();

    this._SendFormToService.getGroupsforSendFormTo(userId, orgId, refresh).subscribe(users => {
      this.groups = users;
      //this.fields = { text: 'name', value: 'id' };
    });
  }

  createlabelname(event) {
    debugger;
    if (event.value == 1) {
      this.labelFormSend = 'Selected Contacts:';
      this.placeholder = 'Search a name or an email...';
      this.contactDropdown = true;
      this.groupDropdown = false;
      this.newSendForm.controls['recordId'].setValue("");
      this.newSendForm.controls['recordType'].setValue(this.RecordType().Contact);
      this.newSendForm.controls['recordType'].updateValueAndValidity();
      // this.newSendForm.value.recordType = this.RecordType().Contact;
      this.getContactsforSendFormTo(true);
    }
    else {
      this.labelFormSend = 'Selected Groups:';
      this.placeholder = 'Search a Group name...';
      this.groupDropdown = true;
      this.contactDropdown = false;
      this.newSendForm.controls['recordId'].setValue("");
      this.newSendForm.controls['recordType'].setValue(this.RecordType().Group);
      this.newSendForm.controls['recordType'].updateValueAndValidity();

      // this.newSendForm.value.recordType = this.RecordType().Group;
      this.getGroupforSendFormTo(true);
    }
  }
  dialogClose() {
    this.emitClosePopupSendFormTo.emit("Send Form To Popup Closed"); //emmiting the event.
  }
  dialogOpen() {
    this.isOpen = true;
  }

  SubmitForm() {
    this.newSendForm.value.formId = this.formId;
    console.log(this.newSendForm.value);
    debugger;
    this.click.emit(this.newSendForm.value);
    this.isOpen = false;
  }
//   public onFiltering: EmitType =  (e: FilteringEventArgs) => {
//     let query = new Query();
//     //frame the query based on search string with filter type.
//     query = (e.text != "") ? query.where("fullName", "startswith", e.text, true) : query;
//     //pass the filter data source, filter query to updateData method.
//     e.updateData(this.contacts, query);
// };

  ngOnInits(): void {
    this.btnTitle = 'Send Form to ...';
    // this.newSendForm.value.recordType = this.RecordType().Contact;
  }
  public onClose = (e) => {
    e.cancel = false;
}

}
