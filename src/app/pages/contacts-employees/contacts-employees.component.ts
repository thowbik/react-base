import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { PageSettingsModel, SearchSettingsModel } from '@syncfusion/ej2-angular-grids';
import { ToolbarItems, CheckBoxChangeEventArgs, parentsUntil, Column, prepareColumns } from '@syncfusion/ej2-grids';
import { SelectEventArgs, TabComponent } from '@syncfusion/ej2-angular-navigations';
import { GridComponent, RowSelectEventArgs } from '@syncfusion/ej2-angular-grids';
import { DialogComponent, DialogUtility } from '@syncfusion/ej2-angular-popups';
import { UserSessionService, OrganisationPageSessionService, AlertService, NavigationService } from '../../services';
import { SearchPageService } from 'src/app/services/searchpage.service';

import { ContactsEmployeesService } from './contacts-employees.service';
import { ContactStatus, ContactStatusType, Contact, ContactType, paginationDataNo, ContactPageNo, profileType, RoleMenu, RolePageActionType, RecordType, ContactGroupType, ContactGroupMemberType } from '../../models/index';
import { environment } from 'src/environments/environment';
import * as _ from "lodash";
import { PermissionsService } from '../../services/permissions.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ItemModel, MenuEventArgs } from '@syncfusion/ej2-splitbuttons';
import { ContactsGroupsService } from '../contacts-groups/contacts-groups.service';
import { ContactGroupListService } from '../contact-grouplist/contact-grouplist.service';
import { UserRoleSessionService } from '../../services/userRolesession.service';
import { TransferService } from 'src/app/shared/component/transfer/transfer.service';
import { MakeGroupService } from '../../shared/component/makegroup/makegroup.service';
import { AngularCsv } from 'angular7-csv/dist/Angular-csv'
import { DataManager, Query } from '@syncfusion/ej2-data';
@Component({
    selector: 'app-contacts-employees',
    templateUrl: './contacts-employees.component.html',
    styleUrls: ['./contacts-employees.component.scss']
})

export class ContactsEmployeesComponent implements OnInit {
    public animation: object = { previous: { effect: 'SlideLeftIn', duration: 1000, easing: 'ease' }, next: { effect: 'SlideRightIn', duration: 1000, easing: 'ease' } };
    public data: Object[];
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
    public selectionSettings = { checkboxOnly: false };
    public filter: Object;
    public filterSettings: Object;
    @ViewChild('grid')
    public grid: GridComponent;
    public gridColumns: Object[];
    @ViewChild('AddGroupDialog')
    public AddGroupDialog: DialogComponent;
    public newGroupForm: FormGroup;
    public particulargroupid: any;
    @ViewChild('connectgrid')
    public connectgrid: GridComponent;
    employeedata: { fullName: string; emailAddress: string; rating: number; isActive: string; lastActivity: any; }[];
    innerHeight: number;
    height: number;
    scrollareaHeight: number;
    environmentUrl: any;
    public employee_contact: any;
    newContact_Group: boolean;
    pageType: string;
    itemType: string;
    ContactType() { return ContactType; }
    paginationDataNo() { return paginationDataNo; }
    ContactPageNo() { return ContactPageNo; }
    rolePageActionType() { return RolePageActionType; }
    roleMenu() { return RoleMenu; }
    page = this.paginationDataNo().page;
    limit = this.paginationDataNo().limit;
    public paginationData: any[];
    dataLength: any;
    @ViewChild('TransferDialog')
    public TransferDialog: DialogComponent;
    public fields: Object;
    public contactsTransfer: any[];
    public TransferFromName: any;
    public TransferFromEmail: any;
    public TransferToName: any;
    public TransferToEmail: any;
    public transferToSelectedContact: boolean = false;
    public transferFromSelectedContact: boolean = false;
    public transferForm: FormGroup;
    public existing_Group: boolean = false;
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
    showTransferPopup: boolean = false;
    showGroupPopup: boolean = false;
    csvOptions = {
        fieldSeparator: ',',
        quoteStrings: '"',
        decimalseparator: '.',
        showLabels: true,
        showTitle: false,
        title: false,
        useBom: true,
        noDownload: false,
        headers: ["First Name","Last Name","GenderType","Contact Type", "Personal Mobile Number", "Email Address", "Date Of Birth",
        "Address1", "Address2", "City", "State","Country", "Postal Code", "Designation", "Status"]
    };
    constructor(private transferService: TransferService,  private alertService: AlertService, private _ContactsGroupsService: ContactsGroupsService,
        private organisationPageSessionService: OrganisationPageSessionService, private userSessionService: UserSessionService,
        public searchPageService: SearchPageService, public navigationService: NavigationService, private _ContactGroupListService: ContactGroupListService,
        public permissionsService: PermissionsService,
        private employeesService: ContactsEmployeesService,
        private userRoleSessionService: UserRoleSessionService,
        private formBuilder: FormBuilder,
        private _MakeGroupService: MakeGroupService
    ) { }

    @ViewChild('Dialog')
    public Dialog: DialogComponent;

    ngOnInit(): void {
        this.environmentUrl = environment.profileURL;
        this.getEmployees(true);
        this.createForm();
        this.currentPage = 1;
        this.formatOptions = { type: 'date', format: 'dd/MM/yyyy' };
        this.initialPage = { pageSize: this.limit };
        this.searchPageService.change.subscribe(searchtext => {
            this.searchtext = searchtext;
            this.searchOptions = { fields: ['fullName'], operator: 'contains', key: this.searchtext, ignoreCase: true };
        });
        this.filterSettings = { type: "Menu" };
        this.filter = { type: "CheckBox" };
        this.permissionsService.loadPermissions(this.roleMenu().CEmployee);
        this.employee_contact = this.permissionsService.pageIds.length;
        this.initialvalidators();
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
    newcontact(id) {
        this.navigationService.goToContact(id, this.ContactPageNo().employee);
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
    };


    contactStatusType() {
        return ContactStatusType;
    }

    public tabSelected(args: SelectEventArgs): void {

        this.grouptab = false;
        this.employeetab = false;
        this.alltab = false;
        this.connectedtab = false;

        if (args.selectedIndex === 1) {
            this.connectedtab = true;
        } else if (args.selectedIndex === 2) {
            this.grouptab = true;
        }
        else if (args.selectedIndex === 3) {
            this.employeetab = true;
        } else {
            this.alltab = true;
        }
    }
    getEmployees(refresh) {

        let orgId = this.organisationPageSessionService.getOrganisationId();

        const srcText = localStorage.search ? localStorage.search : "";
        let Employee = this.ContactType().employee;
        this.employeesService.getEmployees(orgId, Employee, srcText, refresh).subscribe(employees => {
            this.data = employees;
            this.dataLength = this.data.length;
            this.totalPages = Math.ceil(this.data.length / this.limit);
            this.pageType = this.totalPages > 1 ? 'pages' : 'page'; 
            this.itemType = this.dataLength > 1 ?  'items' :'item'
            this.paginationData = _(this.data)
                .drop((this.page - 1) * this.limit)
                .take(this.limit)
                .value();
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
    }
    public header: string = 'Confirmation';
    public bodycontents: string = 'Are you sure you want to delete the selected contact?'
    public showCloseIcon: Boolean = true;
    public width: string = '35%';
    public animationSettings: Object = { effect: 'None' };
    public hide: any;

    public dlgButtons: Object[] = [{ click: this.okClick.bind(this), buttonModel: { content: 'Yes', isPrimary: 'true', cssClass: 'header-actions-button' } }, { click: this.cancelClick.bind(this), buttonModel: { content: 'No', cssClass: 'header-actions-button' } }];

    okClick() {
        let selectItem = [];
        let orgId = this.organisationPageSessionService.getOrganisationId();
        let selectedrecords: any[] = this.grid.getSelectedRecords();

        selectedrecords.forEach(function (data) {

            selectItem.push({
                id: data.id,
                organisationId: orgId
            })
        })
        this.employeesService.deleteContact(selectItem).subscribe(res => {
            this.alertService.success("Contact(s) deleted successfully");
            this.Dialog.hide();
            this.page = this.paginationDataNo().page;
            this.getEmployees(true);
            this.selectcount = false;
        });

    }

    cancelClick() {
        this.Dialog.hide();
    }
    select(args) {
        if (parentsUntil(args.target, 'e-row') && !(parentsUntil(args.target as Element, 'e-gridchkbox'))) {
            args.cancel = true;
            let permissions = this.permissionsService.pageIds;
            let view_contactgrid = permissions.find(i => i === this.rolePageActionType().view);
            if ((view_contactgrid == this.rolePageActionType().view) && (args.data.isView = true))

                this.navigationService.goToContact(args.data.id, this.ContactPageNo().employee);
            else
                this.alertService.error("You don't have permission to view");
        }
    }
    change(args: CheckBoxChangeEventArgs) {
        if (args.checked && parentsUntil(args.target, 'e-gridchkbox')) {
            let selectedrecords: any[] = this.grid.getSelectedRecords();
            this.selectcount = selectedrecords.length > 0 ? true : false;
        }
        else {
            this.selectcount = args.selectedRowIndexes.length > 0 ? true : false;
        }
    }
    moreOption(args: MenuEventArgs) {
        this.showTransferPopup = false;
        this.showGroupPopup = false;
        if (args.item.text === 'Share') {
            let permissions = this.permissionsService.pageIds;
            let addviewers = permissions.find(i => i === this.rolePageActionType().addviewers);
            if (addviewers == this.rolePageActionType().addviewers)
                this.navigationService.goToShare(this.rolePageActionType().addviewers, this.RecordType().Contact);
        }
        else if (args.item.text === 'Transfer') {
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
                    let selectedRecordsCheck: any[] = this.grid.getSelectedRecords();
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
                        let selectedRecordsCheck: any[] = this.grid.getSelectedRecords();

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
                }
            } else {
                this.alertService.error("You don't have permission to Transfer the contact");
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
    getContactsForTransfer(refresh) {
        const userId = this.userSessionService.userId();
        const orgId = this.organisationPageSessionService.getOrganisationId();
        this.employeesService.getcontactsForTransfer(orgId, refresh).subscribe(res => {
            this.contactsTransfer = res;
            this.fields = { text: 'fullName', emailAddress: 'emailAddress', value: 'userId' };
            this.transferForm.controls['transferFromUserId'].setValue(this.userSessionService.userId());
            this.transferForm.controls['transferToUserId'].setValue(null);
        });


    }

    transferFrom(username) {
        this.TransferFromName = username.itemData.fullName;
        this.TransferFromEmail = username.itemData.emailAddress;
        this.transferFromSelectedContact = true;
    }
    transferTo(event) {
        this.TransferToName = event.itemData.fullName;
        this.TransferToEmail = event.itemData.emailAddress;
        this.transferToSelectedContact = true;
    }
    Transfer() {
        if (this.transferForm.valid) {
            this.transferForm.value.organisationId = this.organisationPageSessionService.getOrganisationId();
            this.transferForm.value.userId = this.userSessionService.userId();
            let userRoleData = this.organisationPageSessionService.UserRoleData();

            if (userRoleData.isAdmin == false) {
                let selectedContactsId = [];
                let selectedContacts: any[] = this.grid.getSelectedRecords();

                selectedContacts.forEach(function (data) {

                    selectedContactsId.push(data.id);

                });

                this.transferForm.value.recordIds = selectedContactsId;
            }

            this.transferForm.value.recordType = RecordType.Contact;

            if (this.transferForm.value.transferFromUserId != this.transferForm.value.transferToUserId) {
                this.employeesService.transferOwnership(this.transferForm.value).subscribe(data => {
                    this.alertService.success("Contact successfully transfered");
                    // this.Dialog.hide();
                    this.getEmployees(true);
                    this.TransferDialog.hide();

                });
            } else {
                this.alertService.error("Employee cannot be transfer for the same user");
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
                    this.getEmployees(true);
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
                this.getEmployees(true);
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
                    headers: ["First Name","Last Name","GenderType","Contact Type", "Personal Mobile Number", "Email Address", "Date Of Birth",
        "Address1", "Address2", "City", "State","Country", "Postal Code", "Designation", "Status"]
                };
                e.result.forEach(function (data) {
                    let contactTypeName;
                    if( data['contactType'] ==1){
                        contactTypeName = "Employee";
                    }else{
                        contactTypeName = "Other";
                    }
                    filterexportData.push({
                        firstName:data['firstName'],
                        lastName:data['lastName'],
                        genderType: data['genderTypeName'],
                        contactType: contactTypeName,
                        mobileNumber: data['mobileNumber'],
                        emailAddress: data['emailAddress'],
                        dateOfBirth: data['dateOfBirthValue']? data['dateOfBirthValue']:'',
                        address1: data['address1'],
                        address2: data['address2'],
                        city: data['city'],
                        state:data['state'],
                        country: data['countryName'],
                        postalCode: data['postalCode'],
                        designation: data['designation'],
                        status: data['connectionStatusTypeName']
                    })
                });
                if(filterexportData.length > 0){
                    new AngularCsv(filterexportData, "Contact Export",filtercsvOptions);
                }
               
            })
        }
        else if (this.grid.getSelectedRecords().length > 0) {
            const selectedRecords = this.grid.getSelectedRecords();
            if (selectedRecords.length > 0) {

                selectedRecords.forEach(function (data) {
                    let contactTypeName;
                    if( data['contactType'] ==1){
                        contactTypeName = "Employee";
                    }else{
                        contactTypeName = "Other";
                    }
                    exportData.push({
                        firstName:data['firstName'],
                        lastName:data['lastName'],
                        genderType: data['genderTypeName'],
                        contactType: contactTypeName,
                        mobileNumber: data['mobileNumber'],
                        emailAddress: data['emailAddress'],
                        dateOfBirth:  data['dateOfBirthValue']? data['dateOfBirthValue']:'',
                        address1: data['address1'],
                        address2: data['address2'],
                        city: data['city'],
                        state:data['state'],
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
                if( element['contactType'] ==1){
                    contactTypeName = "Employee";
                }else{
                    contactTypeName = "Other";
                }
                exportData.push({
                    firstName:element['firstName'],
                    lastName:element['lastName'],
                    genderType: element['genderTypeName'],
                    contactType: contactTypeName,
                    mobileNumber: element['mobileNumber'],
                    emailAddress: element['emailAddress'],
                    dateOfBirth:  element['dateOfBirthValue']? element['dateOfBirthValue']:'',
                    address1: element['address1'],
                    address2: element['address2'],
                    city: element['city'],
                    state:element['state'],
                    country: element['countryName'],
                    postalCode: element['postalCode'],
                    designation: element['designation'],
                    status: element['connectionStatusTypeName']
                })

            });
        }
        if(exportData.length > 0){
            new AngularCsv(exportData, "Contact Export", this.csvOptions);
        }
    }
    beforeExcelExport(e) {
        prepareColumns(e.gridObject.columns);
    }

}



