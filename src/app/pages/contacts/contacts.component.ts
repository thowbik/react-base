import { Component, OnInit, ViewChild, AfterViewInit, EventEmitter, HostListener, Output, Input } from '@angular/core';
import { NvD3Component } from 'ng2-nvd3';
import { PageSettingsModel, SearchSettingsModel } from '@syncfusion/ej2-angular-grids';
import { ToolbarItems, FilterSettingsModel, IFilter, Column, prepareColumns } from '@syncfusion/ej2-grids';
import { SelectEventArgs, TabComponent, ClickEventArgs } from '@syncfusion/ej2-angular-navigations';
import { GridComponent, RowSelectEventArgs, CheckBoxChangeEventArgs } from '@syncfusion/ej2-angular-grids';
import { ContactsService } from './contacts.service';
import { DialogComponent, DialogUtility } from '@syncfusion/ej2-angular-popups';
import { UserSessionService, OrganisationPageSessionService, AlertService, NavigationService } from '../../services';
import { SearchPageService } from 'src/app/services/searchpage.service';

import { UploadOutput, UploadInput, UploadFile, humanizeBytes, UploaderOptions } from 'ngx-uploader';
import 'd3';
import 'nvd3';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { parentsUntil } from '@syncfusion/ej2-grids'
import { __await } from 'tslib';
import { ContactStatus, ContactStatusType, paginationDataNo, profileType, RecordType, RoleMenu, RolePageActionType, ContactPageNo, ContactGroupType, ContactGroupMemberType } from '../../models/index';
import { environment } from 'src/environments/environment';
import * as _ from "lodash";
import { PermissionsService } from '../../services/permissions.service';
import { ItemModel, MenuEventArgs, DropDownButtonComponent } from '@syncfusion/ej2-angular-splitbuttons';
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
import { ContactsGroupsService } from '../contacts-groups/contacts-groups.service';
import { ContactGroupListService } from '../contact-grouplist/contact-grouplist.service';
import { UserRoleSessionService } from '../../services/userRolesession.service';
import { TransferService } from '../../shared/component/transfer/transfer.service';
import { MakeGroupService } from '../../shared/component/makegroup/makegroup.service';
import { AngularCsv } from 'angular7-csv/dist/Angular-csv'
import { DataManager, Query } from '@syncfusion/ej2-data';
import { Page } from '@syncfusion/ej2-treegrid';

@Component({
    selector: 'contacts-dashboard',
    templateUrl: './contacts.component.html',
    styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {

    public animation: object = {
        previous: { effect: 'SlideLeftIn', duration: 1000, easing: 'ease' },
        next: { effect: 'SlideRightIn', duration: 1000, easing: 'ease' }
    };
    public data: any[];
    public contactsTransfer: any[];
    public paginationData: any[];
    public connectdata;
    public isOpen: boolean = false;
    public isOpenDialogue: boolean = false;
    public pageSettings: PageSettingsModel;
    public toolbarOptions: ToolbarItems[];
    public searchOptions: SearchSettingsModel;
    public selectcount: boolean = false;
    public nextpage: boolean = false;
    public prevpage: boolean = false;
    public selectionSettings = { checkboxOnly: false };
    public headerText: Object = [{ 'text': 'All' }, { 'text': 'Connected' },
    { 'text': 'Employees' }, { 'text': 'Groups' }];
    public rowName: any;
    public pager: any = {};
    public newGroupForm: FormGroup;
    public pagedItems: any[];
    public transferForm: FormGroup;
    public initialPage: PageSettingsModel;
    public currentPage: any = 1;
    public totalPages: any;
    public formatOptions: any;
    public searchtext: string;
    public tabname: string;
    public allnext: boolean = false;
    public allprev: boolean = false;
    public connectednext: boolean = false;
    public connectedprev: boolean = false;
    public connectedcurrentPage: any = 1;
    public connectedtotalPages: any;
    public alldata: any;
    public transferFields: Object = { text: 'fullName', value: 'id' };
    myDate: any;
    options: UploaderOptions;
    formData: FormData;
    files: UploadFile[];
    uploadInput: EventEmitter<UploadInput>;
    humanizeBytes: Function;
    dragOver: boolean;
    public contactStatus: ContactStatus;
    public connect_id: number;
    @ViewChild('grid')
    public grid: GridComponent;
    public gridColumns: Object[];
    public editSettings: Object;
    innerWidth: any;
    gridsize: any;
    colimage: any;
    environmentUrl: any;
    innerHeight: number;
    @ViewChild('Dialog')
    public Dialog: DialogComponent;
    @ViewChild('AddGroupDialog')
    public AddGroupDialog: DialogComponent;
    @ViewChild('AddConnectDialog')
    public AddConnectDialog: DialogComponent;
    @ViewChild('TransferDialog')
    public TransferDialog: DialogComponent;
    @ViewChild('connectgrid')
    @ViewChild('transferFrom')
    public singleselect: DropDownListComponent;
    @ViewChild('moreButton')
    public moreOptionButton: DropDownButtonComponent;
    @Input() emitIsMoreSelected = new EventEmitter<any>();
    public connectgrid: GridComponent;
    public selectedrecords: any[];
    public feild_set = {
        field: 'FNames', customAttributes: { class: 'checkbox-celldata' }
    }
    public toolbar: string[];
    height: number;
    scrollareaHeight: number;
    public dReady: boolean = false;
    public dtTime: boolean = false;
    public isDataBound: boolean = false;
    public isDataChanged: boolean = true;
    public intervalFun: any;
    public clrIntervalFun: any;
    public clrIntervalFun1: any;
    public clrIntervalFun2: any;
    public dropSlectedIndex: number = null;
    public stTime: any;
    public filterOptions: FilterSettingsModel;
    public filter: IFilter;
    // maps the appropriate column to fields property
    public fields: Object;
    public particulargroupid: any;
    selected: boolean;
    showTransferPopup: boolean = false;
    public TransferFromDropdownValue: string = '';
    public TransferToDropdownValue: string = '';
    showGroupPopup: boolean = false;
    public existing_Group: boolean = false;
    public widthChange: any;
    newContact_Group: boolean;

    csvOptions = {
        fieldSeparator: ',',
        quoteStrings: '"',
        decimalseparator: '.',
        showLabels: true,
        showTitle: false,
        title: false,
        useBom: true,
        noDownload: false,
        headers: ["First Name", "Last Name", "GenderType", "Contact Type", "Personal Mobile Number", "Email Address", "Date Of Birth",
            "Address1", "Address2", "City", "State", "Country", "Postal Code", "Designation", "Status"]
    };
    public filterSettings: Object;
    pageType: string;
    itemType: string;
    constructor(private transferService: TransferService,
        private contactsService: ContactsService,
        private _ContactsGroupsService: ContactsGroupsService,
        public permissionsService: PermissionsService,
        private _ContactGroupListService: ContactGroupListService,
         private alertService: AlertService,
        private organisationPageSessionService: OrganisationPageSessionService,
        private userSessionService: UserSessionService,
        public searchPageService: SearchPageService,
        public navigationService: NavigationService,
        private _MakeGroupService: MakeGroupService,
        private formBuilder: FormBuilder,
        private userRoleSessionService: UserRoleSessionService) {
        this.files = []; // local uploading files array
        this.uploadInput = new EventEmitter<UploadInput>(); // input events, we use this to emit data to ngx-uploader
        this.humanizeBytes = humanizeBytes;

    }
    contactStatusResult() { return ContactStatus; }

    contactStatusType() { return ContactStatusType; }

    paginationDataNo() { return paginationDataNo; }

    profileType() { return profileType; }

    roleMenu() { return RoleMenu; }

    RecordType() { return RecordType; }

    rolePageActionType() { return RolePageActionType; }

    ContactPageNo() { return ContactPageNo; }

    page = this.paginationDataNo().page;

    limit = this.paginationDataNo().limit;
    dataLength: any;
    @ViewChild('DeleteContactsDialog')
    public DeleteContactsDialog: DialogComponent;
    public items: ItemModel[] = [
        {
            text: 'Share'
        },
        {
            text: 'Transfer'
        },
        {
            text: 'Add a New Group'
        },
        {
            text: 'Add an  Existing Group'
        }
    ];
    ngOnInit(): void {
        //public fields: Object = { text: 'Name', value: 'Eimg' };
        this.createForm();
        this.toolbar = ['CsvExport'];
        this.environmentUrl = environment.profileURL;
        this.search();
        this.getContacts(true);
        this.initialPage = { pageSize: this.limit };
        this.formatOptions = { type: 'date', format: 'dd/MM/yyyy' };
        this.editSettings = { allowDeleting: true };
         this.filterSettings = { type: "Menu" };
         this.filter = { type: "CheckBox" };
        this.filterOptions = {
            type: 'Menu'
        };
        // this.filter = {
        //     type: 'Menu'
        // };
        this.permissionsService.loadPermissions(this.roleMenu().CContactAll);
        this.initialvalidators();
        this.widthChange = 60;

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
        this.navigationService.goToContact(id, this.ContactPageNo().all);
    }
    public onOpenDialog = function (event: any): void {
        DialogUtility.confirm({
            title: ' Confirmation Dialog',
            content: "This is a Confirmation Dialog!",
            okButton: { text: 'OK', click: this.okClick.bind(this) },
            cancelButton: { text: 'Cancel', click: this.cancelClick.bind(this) },
            showCloseIcon: true,
            closeOnEscape: true
        });
    }

    createForm() {
        const userId = this.userSessionService.userId();
        const organisationId = this.organisationPageSessionService.getOrganisationId();
        this.newGroupForm = this.formBuilder.group({
            // userOrganisationMappingId: ['', Validators.required],
            name: ['', Validators.required],
            userId: [userId, null],
            // IsPublic: ['', Validators.required],
            organisationId: [organisationId, null],
            id: ['0', null],
            description: [''],
        });
    }

    search() {
        this.searchPageService.change.subscribe(data => {
            this.searchtext = data;
            //alert(this.searchtext + " in");
            //this.searchOptions = { fields: ['fullName'], operator: 'contains', key: this.searchtext, ignoreCase: true };
            this.getContacts(true);
        });
    }

    getContacts(refresh) {
        debugger;
        let connectdata = [];
        let self = this;
        let orgId = this.organisationPageSessionService.getOrganisationId();
        const srcText = localStorage.search ? localStorage.search : "";
        this.contactsService.getContacts(orgId, srcText, refresh).subscribe(users => {
            this.data = users;
            this.dataLength = this.data.length;
            this.totalPages = Math.ceil(this.data.length / this.limit);
            this.pageType = this.totalPages > 1 ? 'pages' : 'page'; 
            this.itemType = this.dataLength > 1 ?  'items' :'item';
            this.paginationData = _(this.data)
                .drop((this.page - 1) * this.limit)
                .take(this.limit)
                .value();
            localStorage.removeItem('search');
        })
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
        this.DeleteContactsDialog.show();
    }
    public header: string = 'Confirmation';
    public bodycontents: string = 'Are you sure you want to delete the selected contact?'
    public showCloseIcon: Boolean = true;
    public width: string = '35%';
    public animationSettings: Object = { effect: 'None' };
    public hide: any;

    public dlgButtons: Object[] = [{ click: this.okClick.bind(this), buttonModel: { content: 'Yes', isPrimary: 'true', cssClass: 'header-actions-button' } }, { click: this.cancelClick.bind(this), buttonModel: { content: 'No', cssClass: 'header-actions-button' } }];

    okClick() {
        debugger;
        let selectItem = [];
        let orgId = this.organisationPageSessionService.getOrganisationId();
        let selectedrecords: any[] = this.grid.getSelectedRecords();

        selectedrecords.forEach(function (data) {

            selectItem.push({
                id: data.id,
                organisationId: orgId
            })

        })

        this.contactsService.deleteContact(selectItem).subscribe(res => {
            debugger;
            this.alertService.success("Contact(s) deleted successfully");
            this.DeleteContactsDialog.hide();
            this.page = this.paginationDataNo().page;
            this.selectcount = false;
            this.getContacts(true);
        });
      
        debugger
        this.DeleteContactsDialog.hide();
    }


    cancelClick() {
        this.DeleteContactsDialog.hide();
        this.AddConnectDialog.hide();
    }

    editContact(id) {
        this.navigationService.goToContact(id, this.ContactPageNo().all);
    }
    select(args) {
        debugger;
        if (parentsUntil(args.target, 'e-row') && !(parentsUntil(args.target as Element, 'e-gridchkbox'))) {
            args.cancel = true;
            let permissions = this.permissionsService.pageIds;
            let view_contactgrid = permissions.find(i => i === this.rolePageActionType().view);

            if ((view_contactgrid == this.rolePageActionType().view) && (args.data.isView = true))
                this.navigationService.goToContact(args.data.id, this.ContactPageNo().all);
            else
                this.alertService.error("You don't have permission to view");

        }
    }
    change(args: CheckBoxChangeEventArgs) {
        debugger
        if (args.checked && parentsUntil(args.target, 'e-gridchkbox')) {
            this.selectedrecords = this.grid.getSelectedRecords();
            this.selectcount = this.selectedrecords.length > 0 ? true : false;
        }
        else {
            this.selectcount = args.selectedRowIndexes.length > 0 ? true : false;
        }
    }
    connectPeople(data) {

        let selectItem_connection = {};
        let orgId = this.organisationPageSessionService.getOrganisationId();
        let userId = this.userSessionService.userId();
        selectItem_connection['id'] = data.id;
        selectItem_connection['connectedUserOrganisationMappingId'] = data.connectedUserOrganisationMappingId;
        selectItem_connection['userId'] = data.userId;
        selectItem_connection['profileType'] = this.profileType().OrganisationLevel;
        selectItem_connection['connectionStatusType'] = this.contactStatusType().RequestSent;
        this.contactsService.userconnecction(selectItem_connection).subscribe(res => {
            this.alertService.success("Connect Contact Request send successfully");
            this.getContacts(true);
        });
    }
    invitePeople(data) {
        let selectItem_connection = {};
        let orgId = this.organisationPageSessionService.getOrganisationId();
        let userId = this.userSessionService.userId();
        selectItem_connection['id'] = data.id;
        selectItem_connection['connectedUserOrganisationMappingId'] = data.connectedUserOrganisationMappingId;
        selectItem_connection['userId'] = data.userId;
        selectItem_connection['profileType'] = this.profileType().OrganisationLevel;
        selectItem_connection['connectionStatusType'] = this.contactStatusType().InviteSent;
        this.contactsService.inviteconnecction(selectItem_connection).subscribe(res => {
            this.alertService.success("Invite Request send successfully");
            this.getContacts(true);
        });
    }

    moreOption(args: MenuEventArgs) {
        this.showTransferPopup = false;
        this.showTransferPopup = false;
        this.emitIsMoreSelected.emit(args.item.text)
        if (args.item.text === 'Share') {
            let permissions = this.permissionsService.pageIds;
            let addviewers = permissions.find(i => i === this.rolePageActionType().addviewers);
            if (addviewers == this.rolePageActionType().addviewers)
                this.navigationService.goToShare(this.rolePageActionType().addviewers, this.RecordType().Contact);
            else
                this.alertService.error("You don't have permission to share the contact");

        }
        else if (args.item.text === 'Transfer') {
            debugger
            let permissions = this.permissionsService.pageIds;
            let changeownership = permissions.find(i => i === this.rolePageActionType().changeownership);
            if (changeownership == this.rolePageActionType().changeownership) {
                let userRoleData = this.organisationPageSessionService.UserRoleData();

                if (userRoleData.isAdmin == true) {
                    let selectedRecordsCheck: any[] = this.grid.getSelectedRecords();
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
                    debugger;
                    let selectedRecordsCheck: any[] = this.grid.getSelectedRecords();
                    const selectedRecordCount = selectedRecordsCheck.filter(element => {
                        return element.isOwner == false;
                    });

                    if (selectedRecordsCheck.length === 0) {
                        this.alertService.success('Please select any one Contact(s)');
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
                                    type: 'Contacts'
                                });

                                this.transferService.updateHeaderMessage(transferInputs);
                            }, 100);
                        } else {
                            this.alertService.error("You can only transfer your own contact");
                        }
                    }

                }

            } else {
                this.alertService.error("You don't have permission to transfer the contact");
            }
        } else if (args.item.text === 'Add a New Group') {
            let role_Permissiondata = this.userRoleSessionService.getRoleDatas();
            let datapermission = role_Permissiondata.rolePageActionMappingList;
            let action_permission = datapermission.filter(i => i.pageId === this.roleMenu().CGroup);
            let Create_action = action_permission.filter(i => i.actionType === this.rolePageActionType().create);
            if (Create_action.length > 0) {
                let selectedrecords: any[] = this.grid.getSelectedRecords();
                if (selectedrecords.length > 0) {
                    this.newContact_Group = true;
                    setTimeout(() => {
                        this._MakeGroupService.newContact_Group(this.newContact_Group);
                    }, 100);
                    this.showGroupPopup = true;
                } else {
                    this.alertService.success('Please select any one Contact(s)');
                }
            } else {
                this.alertService.error("You don't have permission to make a group");
            }
        } else if (args.item.text === 'Add an  Existing Group') {
            let role_Permissiondata = this.userRoleSessionService.getRoleDatas();
            let datapermission = role_Permissiondata.rolePageActionMappingList;
            let action_permission = datapermission.filter(i => i.pageId === this.roleMenu().CGroup);
            let Create_action = action_permission.filter(i => i.actionType === this.rolePageActionType().edit);
            if (Create_action.length > 0) {
                let selectedrecords: any[] = this.grid.getSelectedRecords();
                if (selectedrecords.length > 0) {
                    this.existing_Group = true;
                    setTimeout(() => {
                        this._MakeGroupService.updateexistGroup(this.existing_Group);
                    }, 100);
                    this.showGroupPopup = true;
                } else {
                    this.alertService.success('Please select any one Contact(s)');
                }

            } else {
                this.alertService.error("You don't have permission to edit the group");
            }
        }

    }
    valueChange(args: any): void {
        clearTimeout(this.clrIntervalFun2);
        this.clrIntervalFun2 = setTimeout(() => {
            this.isDataChanged = true;
            this.stTime = null;
            let contentElement: Element = this.grid.contentModule.getPanel().firstChild as Element;
            contentElement.scrollLeft = 0;
            contentElement.scrollTop = 0;
            this.stTime = performance.now();
            this.grid.dataSource = this.paginationData;
        }, 100);
    }

    public onClose = (e) => {
        e.cancel = true;
    }
    Transfer(args) {
        debugger;
        this.TransferFromDropdownValue = args[0];
        this.TransferToDropdownValue = args[1];
        this.transferForm.controls['transferFromUserId'].setValue(this.TransferFromDropdownValue);
        this.transferForm.controls['transferToUserId'].setValue(this.TransferToDropdownValue);
        if (this.transferForm.valid) {
            this.transferForm.value.organisationId = this.organisationPageSessionService.getOrganisationId();
            this.transferForm.value.userId = this.userSessionService.userId();
            let userRoleData = this.organisationPageSessionService.UserRoleData();

            // if (userRoleData.isAdmin == false) {
            //     let selectedContactsId = [];
            //     let selectedContacts: any[] = this.grid.getSelectedRecords();

            //     selectedContacts.forEach(function (data) {

            //         selectedContactsId.push(data.id);

            //     });

            //     this.transferForm.value.recordIds = selectedContactsId;
            // } else {
            //     this.transferForm.value.recordIds = [];
            // }

            let selectedContactsId = [];
            let selectedContacts: any[] = this.grid.getSelectedRecords();

            selectedContacts.forEach(function (data) {
                selectedContactsId.push(data.id);
            });

            this.transferForm.value.recordIds = selectedContactsId;

            this.transferForm.value.recordType = RecordType.Contact;

            if (this.transferForm.value.transferFromUserId != this.transferForm.value.transferToUserId) {
                debugger;
                this.contactsService.transferOwnership(this.transferForm.value).subscribe(data => {
                    this.alertService.success("Contact successfully transfered");

                    this.getContacts(true);
                    this.TransferDialog.hide();
                });
            } else {
                this.alertService.error("Contact cannot be transfer for the same user");
            }
        }
    }

    SubmitGroup(args) {
        let selectItem = [];
        let orgId = this.organisationPageSessionService.getOrganisationId();
        let selectedrecords: any[] = this.grid.getSelectedRecords();
        selectedrecords.forEach(function (data) {
            selectItem.push(data.connectedUserOrganisationMappingId);
        });
        if (args.id == 0) {
            this.newGroupForm.value.organisationId = this.organisationPageSessionService.getOrganisationId();
            this.newGroupForm.value.userId = this.userSessionService.userId();
            this.newGroupForm.value.name = args.name;
            this.newGroupForm.value.userOrganisationMappingId = selectItem;
            this.newGroupForm.value.groupType = ContactGroupType.Web;
            this._ContactsGroupsService.saveContactGroup(this.newGroupForm.value).subscribe((response) => {

                this.particulargroupid = response;
                this.newGroupForm.value.groupId = this.particulargroupid;
                this.newGroupForm.value.userOrganisationMappingId = selectItem;
                this.newGroupForm.value.description = args.description;
                this.newGroupForm.value.groupMemberStatusTypes = ContactGroupMemberType.ApprovedMember;
                this._ContactGroupListService.saveContactGroupMember(this.newGroupForm.value).subscribe((response) => {
                    this.alertService.success('Group(s) created successfully');
                    this.getContacts(true);
                    this.showGroupPopup = false;
                });
            });
        }
        else {
            this.particulargroupid = args.id;
            this.newGroupForm.value.groupId = args.id;
            this.newGroupForm.value.userOrganisationMappingId = selectItem;
            this.newGroupForm.value.description = args.description;
            this.newGroupForm.value.groupMemberStatusTypes = ContactGroupMemberType.ApprovedMember;
            this._ContactGroupListService.saveContactGroupMember(this.newGroupForm.value).subscribe((response) => {
                this.alertService.success('Group(s) Update successfully');
                this.getContacts(true);
                this.showGroupPopup = false;
            });
        }
    }

    closedFromTransfer = function (data) {
        this.message = data;
        if (this.message) {
            this.showTransferPopup = false;
        }
    };

    closedFromGroup = function (data) {
        this.message = data;
        if (this.message) {
            this.showGroupPopup = false;
        }
    };
    exportCSV() {
        const exportData = [];
        if (this.grid.filterSettings.columns.length > 0) {
            let query: Query = this.grid.renderModule.data.generateQuery(false);
            query.queries.splice(1, 1);
            this.grid.getDataModule().getData((this.grid as any).dataSource, query).then(function (e: { result: object[] }) {
                const filterexportData = [];
                const filtercsvOptions = {
                    fieldSeparator: ',',
                    quoteStrings: '"',
                    decimalseparator: '.',
                    showLabels: true,
                    showTitle: false,
                    title: false,
                    useBom: true,
                    noDownload: false,
                    headers: ["First Name", "Last Name", "GenderType", "Contact Type", "Personal Mobile Number", "Email Address", "Date Of Birth",
                        "Address1", "Address2", "City", "State", "Country", "Postal Code", "Designation", "Status"]
                };
                e.result.forEach(function (data) {
                    let contactTypeName;
                    if (data['contactType'] == 1) {
                        contactTypeName = "Employee";
                    } else {
                        contactTypeName = "Other";
                    }
                    filterexportData.push({
                        firstName: data['firstName'],
                        lastName: data['lastName'],
                        genderType: data['genderTypeName'],
                        contactType: contactTypeName,
                        mobileNumber: data['mobileNumber'],
                        emailAddress: data['emailAddress'],
                        dateOfBirth: data['dateOfBirthValue']? data['dateOfBirthValue']:'',
                        address1: data['address1'],
                        address2: data['address2'],
                        city: data['city'],
                        state: data['state'],
                        country: data['countryName'],
                        postalCode: data['postalCode'],
                        designation: data['designation'],
                        status: data['connectionStatusTypeName']
                    })
                });
                if (filterexportData.length > 0) {
                    new AngularCsv(filterexportData, "Contact Export", filtercsvOptions);
                }

            })
        }
        else if (this.grid.getSelectedRecords().length > 0) {
            const selectedRecords = this.grid.getSelectedRecords();
            if (selectedRecords.length > 0) {

                selectedRecords.forEach(function (data) {
                    let contactTypeName;
                    if (data['contactType'] == 1) {
                        contactTypeName = "Employee";
                    } else {
                        contactTypeName = "Other";
                    }
                    exportData.push({
                        firstName: data['firstName'],
                        lastName: data['lastName'],
                        genderType: data['genderTypeName'],
                        contactType: contactTypeName,
                        mobileNumber: data['mobileNumber'],
                        emailAddress: data['emailAddress'],
                        dateOfBirth: data['dateOfBirthValue']? data['dateOfBirthValue']:'',
                        address1: data['address1'],
                        address2: data['address2'],
                        city: data['city'],
                        state: data['state'],
                        country: data['countryName'],
                        postalCode: data['postalCode'],
                        designation: data['designation'],
                        status: data['connectionStatusTypeName']
                    })
                });
            }
        }
        else {
            this.data.forEach(function (element) {
                let contactTypeName;
                if (element['contactType'] == 1) {
                    contactTypeName = "Employee";
                } else {
                    contactTypeName = "Other";
                }
                exportData.push({
                    firstName: element['firstName'],
                    lastName: element['lastName'],
                    genderType: element['genderTypeName'],
                    contactType: contactTypeName,
                    mobileNumber: element['mobileNumber'],
                    emailAddress: element['emailAddress'],
                    dateOfBirth: element['dateOfBirthValue']? element['dateOfBirthValue']:'',
                    address1: element['address1'],
                    address2: element['address2'],
                    city: element['city'],
                    state: element['state'],
                    country: element['countryName'],
                    postalCode: element['postalCode'],
                    designation: element['designation'],
                    status: element['connectionStatusTypeName']
                })

            });
        }
        if (exportData.length > 0) {
            new AngularCsv(exportData, "Contact Export", this.csvOptions);
        }
    }

    beforeExcelExport(e) {
        prepareColumns(e.gridObject.columns);

    }

}
