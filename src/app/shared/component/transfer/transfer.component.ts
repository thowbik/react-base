import { Component, OnInit, ViewChild, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { PageSettingsModel, SearchSettingsModel } from '@syncfusion/ej2-angular-grids';
import { ToolbarItems, parentsUntil, CheckBoxChangeEventArgs } from '@syncfusion/ej2-grids';
import { SelectEventArgs, TabComponent } from '@syncfusion/ej2-angular-navigations';
import { GridComponent, RowSelectEventArgs } from '@syncfusion/ej2-angular-grids';
import { DialogComponent, DialogUtility } from '@syncfusion/ej2-angular-popups';
import { UserSessionService, OrganisationPageSessionService, AlertService, NavigationService } from '../../../services';

import { TransferService } from './transfer.service';
import { ContactStatus, ContactStatusType, ContactGroupMemberType, ContactGroupType, Contact, ContactType, paginationDataNo, ContactPageNo, profileType, RoleMenu, RolePageActionType, RecordType } from '../../../models/index';
import * as _ from "lodash";
import { ItemModel, MenuEventArgs } from '@syncfusion/ej2-angular-splitbuttons';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
import { environment } from 'src/environments/environment';
@Component({
    selector: 'app-transfer',
    templateUrl: './transfer.component.html',
    styleUrls: ['./transfer.component.scss']
})

export class TransferComponent implements OnInit {
   
    @ViewChild('TransferDialog')
    public TransferDialog: DialogComponent;
    @ViewChild('transferFrom')
    public transferFromDropdown: DropDownListComponent;
   @ViewChild('transferTo')
    public transferToDropdown: DropDownListComponent;
    public isOpen: boolean = false;
    public fields: Object;
    public contactsTransfer: any[];
    public contactsTransferTo: any[];
    public contactsTransferFrom: any[];
    public TransferFromName: any;
    public TransferFromEmail: any;
    public TransferFromImageURL: any;

    public TransferToName: any;
    public TransferToEmail: any;
    public TransferToImageURL: any;
    public SelectedContactCount: any;
    public recordType: any;
    environmentUrl: any;
    
   
    public transferToSelectedContact: boolean = false;
    public transferFromSelectedContact: boolean = true;
    public isAdminCheck: boolean;
    public transferForm: FormGroup;
    // @Output() emitTransferFromValue = new EventEmitter<any>();
    // @Output() emitTransferToValue = new EventEmitter<any>();
    @Output() click = new EventEmitter<any>();
    @Output() emitClosePopupFromTransfer: EventEmitter<String> = new EventEmitter<String>();
    public formValid: boolean;



    constructor(private transferService: TransferService,
         private alertService: AlertService,
        private organisationPageSessionService: OrganisationPageSessionService, private formBuilder: FormBuilder,
        private userSessionService: UserSessionService,
        public navigationService: NavigationService,
        ) {
           
         }

    ngOnInit(): void {
        this.environmentUrl = environment.profileURL;
        this.getHeaderMessage();
        const userRole =this.organisationPageSessionService.UserRoleData();
         this.isAdminCheck = userRole.isAdmin;
        this.getContactsForTransfer(true);
        this.initialvalidators();
        this.formValid = true;
    }
    getHeaderMessage() {
        debugger
        this.transferService.headerMessage.subscribe(data => {
           this.SelectedContactCount = data[0].length> 0 ? data[0].length : 'All';
           this.recordType = data[0].type;
         });
    }
    RecordType() { return RecordType; }
    initialvalidators() {

        this.transferForm = this.formBuilder.group({
            id: ['0', null],
            organisationId: ['', null],
            transferFromUserId: ['', Validators.required],
            transferToUserId: ['', Validators.required],
            recordType: ['', null]
        });
    }

    getContactsForTransfer(refresh) {
        const userId = this.userSessionService.userId();
       // alert(isAdmin);
        const orgId = this.organisationPageSessionService.getOrganisationId();
        this.transferService.getcontactsForTransfer(orgId, refresh).subscribe(res => {
            this.contactsTransfer = res;
            this.contactsTransferFrom =res;
             this.contactsTransferTo = this.contactsTransfer.filter(element => {
                return element.userId !== userId;
            });
            this.fields = { text: 'fullName', emailAddress: 'emailAddress', value: 'userId' };
            this.transferForm.controls['transferFromUserId'].setValue(this.userSessionService.userId());
            const selectedTransferFromLogedUser = this.contactsTransfer.find(element => {
                return element.userId == userId;
            });
            this.TransferFromName = selectedTransferFromLogedUser.fullName;
            this.TransferFromEmail = selectedTransferFromLogedUser.emailAddress;
            this.TransferFromImageURL = selectedTransferFromLogedUser.imageURL;
            this.isOpen = true;
        });


    }
    public onClose = (e) => {
        e.cancel = false;
      }
    transferFromChange(username) {
        this.contactsTransferTo = this.contactsTransfer.filter(element => {
            return element.userId !== username.itemData.userId;
        });
        this.TransferFromName = username.itemData.fullName;
        this.TransferFromEmail = username.itemData.emailAddress;
        this.TransferFromImageURL = username.itemData.imageURL;
        this.transferFromSelectedContact = true;
        this.transferToSelectedContact = false;
    }
    transferToChange(event) {
        this.TransferToName = event.itemData.fullName;
        this.TransferToEmail = event.itemData.emailAddress;
        this.TransferToImageURL= event.itemData.imageURL;
        this.transferToSelectedContact = true;
    }

    Transfer() {
       
        let selectedId = [];
        if(!this.isAdminCheck) {
        this.transferForm.value.transferFromUserId = this.userSessionService.userId();
        }
        if(this.transferForm.value.transferFromUserId && this.transferToDropdown.value)
        {
            if(this.transferForm.value.transferFromUserId !== this.transferToDropdown.value) {

                //this.formValid = false;
                selectedId.push(this.transferForm.value.transferFromUserId);
                selectedId.push(this.transferToDropdown.value);
                this.click.emit(selectedId);
                this.isOpen = false;
            }
            else {
                this.alertService.error("You cannot transfer to same contact");
            }
          
        }
        else {
            this.alertService.error("Please fill all the required fields");
        }
        
    }
    dialogClose(){
        this.emitClosePopupFromTransfer.emit("Transfer Popup Closed"); //emmiting the event.
      this.isOpen = false;
     }
     dialogOpen(){
        this.isOpen = true;
     }

}



