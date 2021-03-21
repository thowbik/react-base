import { Component, OnInit, ViewChild, AfterViewInit, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';
import { PageSettingsModel, SearchSettingsModel } from '@syncfusion/ej2-angular-grids';
import { ToolbarItems, parentsUntil, CheckBoxChangeEventArgs } from '@syncfusion/ej2-grids';
import { SelectEventArgs, TabComponent } from '@syncfusion/ej2-angular-navigations';
import { GridComponent, RowSelectEventArgs } from '@syncfusion/ej2-angular-grids';
import { DialogComponent, DialogUtility } from '@syncfusion/ej2-angular-popups';
import { UserSessionService, OrganisationPageSessionService, AlertService, NavigationService } from '../../services';
import { SearchPageService } from 'src/app/services/searchpage.service';

import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
import { UsersService } from '../users/users.service';
import { CheckBoxComponent } from '@syncfusion/ej2-angular-buttons';
import { ContactsGroupsService } from './contacts-groups.service';
import { ContactsService } from '../contacts/contacts.service';
import { ActivatedRoute } from '@angular/router';
import { ContactGroupListService } from '../contact-grouplist/contact-grouplist.service';
import * as _ from 'lodash';
import { MultiSelectComponent } from '@syncfusion/ej2-angular-dropdowns';
import { EmitType } from '@syncfusion/ej2-base';
import { PopupEventArgs } from '@syncfusion/ej2-dropdowns';
import { ContactStatus, ContactStatusType, ContactGroupMemberType, ContactGroupType, Contact, ContactType, paginationDataNo, ContactPageNo, profileType, RoleMenu, RolePageActionType, RecordType } from '../../models/index';
import { environment } from 'src/environments/environment';
import { PermissionsService } from '../../services/permissions.service';
import { MenuEventArgs, ItemModel } from '@syncfusion/ej2-splitbuttons';
import { UserRoleSessionService } from '../../services/userRolesession.service';
import { TransferService } from 'src/app/shared/component/transfer/transfer.service';
import { MakeGroupService } from '../../shared/component/makegroup/makegroup.service';
import { debug } from 'util';
@Component({
    selector: 'app-contacts-groups',
    templateUrl: './contacts-groups.component.html',
    styleUrls: ['./contacts-groups.component.scss'],
})

export class ContactsGroupsComponent implements OnInit {
    innerHeight: number;
    height: number;
    scrollareaHeight: number;
    selectedValue: any;
    public data: Object[];
    public mode: string;
    public connectdata;
    public isOpen: boolean = false;
    public isOpenDialogue: boolean = false;
    public pageSettings: PageSettingsModel;
    public toolbarOptions: ToolbarItems[];
    public searchOptions: SearchSettingsModel;
    public selectcount: boolean = false;
    public nextpage: boolean = false;
    public prevpage: boolean = false;
    public headerText: Object = [{ 'text': 'All' }, { 'text': 'Connected' }, { 'text': 'Employees' }, { 'text': 'Groups' }];
    public rowName: any;
    public pager: any = {};
    public pagedItems: any[];
    public initialPage: PageSettingsModel;
    public currentPage: any = 1;
    public totalPages: any;
    public formatOptions: any;
    searchtext: any;
    public tabname: string;
    public alltab: boolean = true;
    public connectedtab: boolean;
    public grouptab: boolean;
    public employeetab: boolean;
    public allnext: boolean = false;
    public allprev: boolean = false;
    public connectednext: boolean = false;
    public connectedprev: boolean = false;
    public connectedcurrentPage: any = 1;
    public connectedtotalPages: any;
    public alldata: any;
    public newGroupForm: FormGroup;
    // public updateGroupForm: FormGroup;
    public username: any;
    public useremail: any;
    public UserRoles: any;
    public wasClicked: boolean;
    public selected: boolean = false;
    public selectionSettings: Object;
    public editSettings: Object;
    public multifield: Object;
    selectedId: any;
    public cardTitle: any;
    public buttonTitle: any;
    public userIdGet: number;
    selectedUserRecord: any;
    public openmembers: boolean = false;
    public contacts: { [key: string]: Object }[];
    public box: string = 'Box';
    public filter: Object;
    public filterSettings: Object;
    showGroupPopup: boolean = false;

    @ViewChild('samples')
    public dropDownListObject: DropDownListComponent;
    @ViewChild('Contactsdropdown')
    public ContactdropDownListObject: DropDownListComponent;
    public group_contact: any;
    @ViewChild('AddConnectDialog')
    public AddConnectDialog: DialogComponent;
    @ViewChild('AddGroupDialog')
    public AddGroupDialog: DialogComponent;

    @ViewChild('connectgrid')
    public connectgrid: GridComponent;

    // groupdata: { fullName: string; members: string; totalmembers: number; }[];
    @ViewChild('template')
    public mulObj: MultiSelectComponent;
    @ViewChild('Dialog')
    public Dialog: DialogComponent;
    public header: string = 'Confirmation';
    public bodycontents: string = 'Are you sure you want to delete the selected group?';
    public showCloseIcon: Boolean = true;
    public width: string = '35%';
    public animationSettings: Object = { effect: 'None' };
    public hide: any;
    public openOnClick: boolean = false;
    @ViewChild('TransferDialog')
    public TransferDialog: DialogComponent;
    public fields: Object;
    public contactsTransfer: any[];
    public TransferToName: any;
    public TransferToEmail: any;
    public transferToSelectedContact: boolean = false;
    public transferFromSelectedContact: boolean = false;
    public transferForm: FormGroup;
    public items: ItemModel[] = [
        {
            text: 'Share'
        },
        {
            text: 'Transfer'
        },
    ];
    showTransferPopup: boolean = false;
    groupdata: any;
    description: any;
    public placeholder = 'Search a name or an email...';
    public particulargroupid: any;
    environmentUrl: any;
    pageType: string;
    dataLength: number;
    itemType: string;
    paginationDataNo() { return paginationDataNo; }
    profileType() { return profileType; }
    organisationLevel = this.profileType().OrganisationLevel;
    page = this.paginationDataNo().page;
    limit = this.paginationDataNo().limit;
    ContactPageNo() { return ContactPageNo; }
    rolePageActionType() { return RolePageActionType; }
    roleMenu() { return RoleMenu; }
    public paginationData: any[];
    RecordType() { return RecordType; }
    public id: any;
    constructor(private transferService: TransferService, private usersService: UsersService,
        
        private formBuilder: FormBuilder,
        private alertService: AlertService,
        private changeDetect: ChangeDetectorRef,
        private organisationPageSessionService: OrganisationPageSessionService, private userSessionService: UserSessionService,
        public searchPageService: SearchPageService, public navigationService: NavigationService,
        private _ContactsGroupsService: ContactsGroupsService,
        public permissionsService: PermissionsService, private userRoleSessionService: UserRoleSessionService,
        private contactsService: ContactsService,
        private _MakeGroupService: MakeGroupService,
        private _ContactGroupListService: ContactGroupListService) {

    }

    public animation: object = {
        previous: {
            effect: 'SlideLeftIn',
            duration: 1000, easing: 'ease'
        },
        next: { effect: 'SlideRightIn', duration: 1000, easing: 'ease' }
    };

    public dlgButtons: Object[] = [{
        click: this.okClick.bind(this),
        buttonModel: {
            content: 'Yes', isPrimary: 'true',
            cssClass: 'header-actions-button'
        }
    },
    {
        click: this.cancelClick.bind(this),
        buttonModel: { content: 'No', cssClass: 'header-actions-button' }
    }];

    ngOnInit(): void {
        // this.updateForm();
        this.environmentUrl = environment.profileURL;
        this.createForm();
        this.mode = 'CheckBox';
        this.formatOptions = { type: 'date', format: 'dd/MM/yyyy' };
        this.initialPage = { pageSize: this.limit };
        this.editSettings = { allowDeleting: true };
        this.multifield = { text: 'fullName', email: 'emailAddress', value: 'connectedUserOrganisationMappingId' };
        this.searchPageService.change.subscribe(searchtext => {

            this.searchtext = searchtext;
            this.searchOptions = { fields: ['fullName'], operator: 'contains', key: this.searchtext, ignoreCase: true };
        });
        this.getContactGroup(true);
        // this.getContactGroupMember(true);
        this.getContacts(true);
        this.filterSettings = { type: "Menu" };
        this.filter = { type: "CheckBox" };
        this.permissionsService.loadPermissions(this.roleMenu().CGroup);
        this.group_contact = this.permissionsService.pageIds.length;
        this.initialvalidators();
    }
    ngAfterViewInit() {
        this.changeDetect.detectChanges();
    }
    initialvalidators() {

        this.transferForm = this.formBuilder.group({
            id: ['0', null],
            organisationId: ['', null],
            transferFromUserId: ['', Validators.required],
            transferToUserId: ['', Validators.required],
            recordType: ['', null]
        });
    }

    newcontact(id) {
        this.navigationService.goToContactGroupList(id);
    }

    editContact(id) {
        this.navigationService.goToContactGroupList(id);
    }
    public onOpenDialog = function (event: any): void {
        DialogUtility.confirm({
            title: ' Confirmation Dialog',
            content: 'This is a Confirmation Dialog!',
            okButton: { text: 'OK', click: this.okClick.bind(this) },
            cancelButton: { text: 'Cancel', click: this.cancelClick.bind(this) },
            showCloseIcon: true,
            closeOnEscape: true
        });
    };


    public select(e) {

        if (e.selectingIndex === 1) {
        }
        this.searchtext = '';
        this.searchOptions = { fields: ['contact.fullName'], operator: 'contains', key: this.searchtext, ignoreCase: true };
    }

    createForm() {
        const userId = this.userSessionService.userId();
        const organisationId = this.organisationPageSessionService.getOrganisationId();
        this.newGroupForm = this.formBuilder.group({
            userOrganisationMappingId: ['', Validators.required],
            name: ['', Validators.required],
            userId: [userId, null],
            // IsPublic: ['', Validators.required],
            organisationId: [organisationId, null],
            id: ['0', null],
            description: [''],
        });
    }

    public addGroup = function (event: any): void {
        this.openmembers = this.roleMenu().CGroup;
        setTimeout(() => {
            this._MakeGroupService.updateGrouppage(this.openmembers);
        }, 0);
        this.showGroupPopup = true;
    };

    getContacts(refresh) {
        const orgId = this.organisationPageSessionService.getOrganisationId();
        const groupId = '0';
        // tslint:disable-next-line:no-shadowed-variable
        const profileType = this.profileType().OrganisationLevel;
        this._ContactGroupListService.getcontactsForGroupDropDown(orgId, groupId, profileType, refresh).subscribe(users => {
            this.contacts = users;
        });
    }

    getContactGroup(refresh) {
        const orgId = this.organisationPageSessionService.getOrganisationId();
        const userId = this.userSessionService.userId();
        this._ContactsGroupsService.getContactGroup(userId, orgId, refresh).subscribe(res => {
            this.data = res;
            this.dataLength = this.data.length;
            this.totalPages = Math.ceil(this.data.length / this.limit);
            this.pageType = this.totalPages > 1 ? 'pages' : 'page';
            this.itemType = this.dataLength > 1 ?  'items' :'item';  
            this.paginationData = _(this.data)
                .drop((this.page - 1) * this.limit)
                .take(this.limit)
                .value();
        });

    }
    search() {

        this.searchPageService.change.subscribe(data => {
            this.searchtext = data;
            //alert(this.searchtext + " in");
            //this.searchOptions = { fields: ['fullName'], operator: 'contains', key: this.searchtext, ignoreCase: true };
            this.getContactGroup(true);
        });
    }
    Next() {
        this.page = this.page + 1;
        this.paginationData = _(this.data)
            .drop((this.page - 1) * this.limit)
            .take(this.limit)
            .value();
    }
    Previous() {
        this.page = this.page - 1;
        this.paginationData = _(this.data)
            .drop((this.page - 1) * this.limit)
            .take(this.limit)
            .value();
    }
    onDeleteContact() {
        this.Dialog.show();
        this.getSingleGroup(true);
    }


    okClick() {
        const selectItem = [];
        const orgId = this.organisationPageSessionService.getOrganisationId();
        const selectedrecords: any[] = this.connectgrid.getSelectedRecords();

        selectedrecords.forEach(function (data) {

            selectItem.push({
                id: data.id,
                organisationId: orgId
            });

        });

        this._ContactsGroupsService.deleteContactGroup(selectItem).subscribe(res => {

            this.alertService.success('Group(s) deleted successfully');
            this.Dialog.hide();
            this.page = this.paginationDataNo().page;
            this.getContactGroup(true);
            this.selectcount = false;
        });

    }

    editGroupName(groupId) {
        this.selectedId = groupId;
        this.getSingleGroup(true);
        let editing_Group = true;
        // let btnTitle = 'Manage Group';
        /*  setTimeout(() => {
             this._MakeGroupService.updateeditingGroup(editing_Group,this.selectedId);
             this.showGroupPopup = true;
         }, 100);  */

        this.AddGroupDialog.show();
    }

    getSingleGroup(refresh) {
        // const orgId = this.organisationPageSessionService.getOrganisationId();
        this._ContactsGroupsService.getSingleGroup(this.selectedId, refresh).subscribe(group => {
            this.selectedUserRecord = group;
            this.newGroupForm.patchValue(this.selectedUserRecord);
            this.newGroupForm.controls['userOrganisationMappingId'].setValidators(null);
            this.newGroupForm.controls['userOrganisationMappingId'].updateValueAndValidity();
            this.cardTitle = this.selectedId == 0 ? 'New Group' : 'Manage Group';
            this.buttonTitle = this.selectedId == 0 ? 'Save' : 'Update';
            this.openmembers = false;
        });
    }
    cancelClick() {
        this.Dialog.hide();
        this.AddConnectDialog.hide();
    }

    connect(id, name) {
        this.AddConnectDialog.show();
    }
    public headerConnect: string = 'Confirmation';
    public bodycontentsConnect: string = 'Are you sure you want to Connect the selected Group?'
    public showCloseIconConnect: Boolean = true;
    public animationSettingsConnect: Object = { effect: 'None' };

    public dlgButtonsConnect: Object[] = [{ click: this.connectClick.bind(this), buttonModel: { content: 'Yes', isPrimary: 'true', cssClass: 'yesbutton' } }, { click: this.cancelClick.bind(this), buttonModel: { content: 'No', cssClass: 'nobutton' } }];

    connectClick() {
        this.AddConnectDialog.hide();
    }

    selecte(args) {
        if (parentsUntil(args.target, 'e-row') && !(parentsUntil(args.target as Element, 'e-gridchkbox'))) {
            args.cancel = true;
            let permissions = this.permissionsService.pageIds;
            /*             let edit_contactgrid = permissions.find(i => i === this.rolePageActionType().edit);
                        if ((edit_contactgrid == this.rolePageActionType().edit) && (args.data.isEdit = true)) {
                            this.navigationService.goToContactGroupList(args.data.id);
                        } */

            let view_contactgrid = permissions.find(i => i === this.rolePageActionType().view);
            if ((view_contactgrid == this.rolePageActionType().view) && (args.data.isView = true))

                this.navigationService.goToContactGroupList(args.data.id);
            else
                this.alertService.error("You don't have permission to view");
        }
    }

    change(args: CheckBoxChangeEventArgs) {
        if (args.checked && parentsUntil(args.target, 'e-gridchkbox')) {

            const selectedrecords: any[] = this.connectgrid.getSelectedRecords();
            this.selectcount = selectedrecords.length > 0 ? true : false;

        } else {
            this.selectcount = args.selectedRowIndexes.length > 0 ? true : false;
        }
    }

    userSelect(multifields) {
        this.selected = true;
    }

    SubmitGroup(args) {
        if (!args) {
            this.newGroupForm.value.organisationId = this.organisationPageSessionService.getOrganisationId();
            this.newGroupForm.value.userId = this.userSessionService.userId();
            this.newGroupForm.value.name = this.newGroupForm.value.name;
            this.newGroupForm.value.groupType = ContactGroupType.Web;
            //   debugger;
            this._ContactsGroupsService.saveContactGroup(this.newGroupForm.value).subscribe((response) => {
                this.particulargroupid = response;
                this.selected = false;
                this.newGroupForm.value.groupId = this.particulargroupid;
                this.newGroupForm.value.userOrganisationMappingId = this.newGroupForm.value.userOrganisationMappingId;
                this.newGroupForm.value.description = this.newGroupForm.value.description;
                this.newGroupForm.value.groupMemberStatusTypes = ContactGroupMemberType.ApprovedMember;
                this.showGroupPopup = false;
                this.AddGroupDialog.hide();
                this._ContactGroupListService.saveContactGroupMember(this.newGroupForm.value).subscribe((response) => {
                    this.getContactGroup(true);
                    this.alertService.success('Group(s) updated successfully');
                    this.selected = false;
                    this.Dialog.hide();
                });
            });
        } else {
            this.newGroupForm.value.organisationId = this.organisationPageSessionService.getOrganisationId();
            this.newGroupForm.value.userId = this.userSessionService.userId();
            this.newGroupForm.value.name = args.name;
            this.newGroupForm.value.groupType = ContactGroupType.Web;
            this._ContactsGroupsService.saveContactGroup(this.newGroupForm.value).subscribe((response) => {
                this.particulargroupid = response;
                this.selected = false;
                this.newGroupForm.value.groupId = this.particulargroupid;
                this.newGroupForm.value.userOrganisationMappingId = args.userOrganisationMappingId;
                this.newGroupForm.value.description = args.description;
                this.newGroupForm.value.groupMemberStatusTypes = ContactGroupMemberType.ApprovedMember;
                this.showGroupPopup = false;
                this._ContactGroupListService.saveContactGroupMember(this.newGroupForm.value).subscribe((response) => {
                    this.getContactGroup(true);
                    this.alertService.success('Group(s) created successfully');
                    this.selected = false;
                    //  this.AddGroupDialog.hide();  
                });
            });
        }
    }

    moreOption(args: MenuEventArgs) {
        this.showTransferPopup = false;
        if (args.item.text === 'Share') {
            let role_Permissiondata = this.userRoleSessionService.getRoleDatas();
            let datapermission = role_Permissiondata.rolePageActionMappingList;
            let action_permission = datapermission.filter(i => i.pageId === this.roleMenu().CGroup);
            let Create_action = action_permission.filter(i => i.actionType === this.rolePageActionType().addviewers);
            if (Create_action.length > 0) {
                this.navigationService.goToShare(this.rolePageActionType().addviewers, this.RecordType().Group);
            } else {
                this.alertService.error("You don't have permission to share the group");
            }
        }
        else if (args.item.text === 'Transfer') {
            let role_Permissiondata = this.userRoleSessionService.getRoleDatas();
            let datapermission = role_Permissiondata.rolePageActionMappingList;
            let action_permission = datapermission.filter(i => i.pageId === this.roleMenu().CGroup);
            let Create_action = action_permission.filter(i => i.actionType === this.rolePageActionType().changeownership);
            if (Create_action.length > 0) {
                let userRoleData = this.organisationPageSessionService.UserRoleData();

                if (userRoleData.isAdmin == true) {
                    let selectedRecordsCheck: any[] = this.connectgrid.getSelectedRecords();
                    const selectedRecordCount = selectedRecordsCheck.filter(element => {
                        return element.isOwner == false;
                    });
                    if (selectedRecordCount.length == 0) {
                        this.showTransferPopup = true;

                        setTimeout(() => {
                            let transferInputs = [];
                            transferInputs.push({
                                length: 'All',
                                type: 'Contacts'
                            });

                            this.transferService.updateHeaderMessage(transferInputs);
                        }, 100);
                    }
                }
                else {
                    let selectedRecordsCheck: any[] = this.connectgrid.getSelectedRecords();
                    const selectedRecordCount = selectedRecordsCheck.filter(element => {
                        return element.isOwner == false;
                    });
                    if (selectedRecordCount.length == 0) {
                        this.showTransferPopup = true;

                        setTimeout(() => {
                            let transferInputs = [];
                            transferInputs.push({
                                length: selectedRecordsCheck.length,
                                type: 'Contacts'
                            });

                            this.transferService.updateHeaderMessage(transferInputs);
                        }, 100);
                    } else {
                        let selectedRecordsCheck: any[] = this.connectgrid.getSelectedRecords();

                        if (selectedRecordsCheck.length === 0) {
                            this.alertService.success('Please select any one group(s)');
                        } else {
                            const selectedRecordCount = selectedRecordsCheck.filter(element => {
                                return element.isOwner == false;
                            });
                            if (selectedRecordCount.length == 0) {
                                this.showTransferPopup = true;

                                setTimeout(() => {
                                    let transferInputs = [];
                                    transferInputs.push({
                                        length: selectedRecordsCheck.length,
                                        type: 'Groups'
                                    });

                                    this.transferService.updateHeaderMessage(transferInputs);
                                }, 100);
                            } else {
                                this.alertService.error("You can only transfer your own group");
                            }
                        }
                    }
                }
            } else {
                this.alertService.error("You don't have permission to transfer the group");
            }
        }
    }
    getContactsForTransfer(refresh) {
        const userId = this.userSessionService.userId();
        const orgId = this.organisationPageSessionService.getOrganisationId();
        this._ContactsGroupsService.getcontactsForTransfer(orgId, refresh).subscribe(res => {
            this.contactsTransfer = res;
            this.fields = { text: 'fullName', emailAddress: 'emailAddress', value: 'userId' };
            this.transferForm.controls['transferFromUserId'].setValue(this.userSessionService.userId());
            this.transferForm.controls['transferToUserId'].setValue(null);
        });


    }

    transferFrom(username) {
        this.username = username.itemData.fullName;
        this.useremail = username.itemData.emailAddress;
        this.transferFromSelectedContact = true;
    }
    transferTo(event) {
        this.TransferToName = event.itemData.fullName;
        this.TransferToEmail = event.itemData.emailAddress;
        this.transferToSelectedContact = true;
    }
    Transfer(args) {
        this.transferForm.value.transferFromUserId = args[0];
        this.transferForm.value.transferToUserId = args[1];
        this.transferForm.value.organisationId = this.organisationPageSessionService.getOrganisationId();
        this.transferForm.value.userId = this.userSessionService.userId();
        let userRoleData = this.organisationPageSessionService.UserRoleData();

        if (userRoleData.isAdmin == false) {
            let selectedContactsId = [];
            let selectedContacts: any[] = this.connectgrid.getSelectedRecords();

            selectedContacts.forEach(function (data) {

                selectedContactsId.push(data.id);

            });

            this.transferForm.value.recordIds = selectedContactsId;
        }

        this.transferForm.value.recordType = RecordType.Group;
       
        if (this.transferForm.value.transferFromUserId != this.transferForm.value.transferToUserId) {
            debugger;
            this._ContactsGroupsService.transferOwnership(this.transferForm.value).subscribe(data => {
                this.alertService.success("Group successfully transfered");
                // this.Dialog.hide();
                this.getContactGroup(true);
                this.TransferDialog.hide();
            });
        } else {
            this.alertService.error("Group cannot be transfer for the same user");
        }
    }
    closedFromTransfer = function (data) {
        this.message = data;
        if (this.message) {
            this.showTransferPopup = false;
        }
    }
    closedFromGroup = function (data) {
        this.message = data;
        if (this.message) {
            this.showGroupPopup = false;
        }
    }
}





