import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PageSettingsModel, ToolbarItems, SearchSettingsModel, IEditCell, parentsUntil, CheckBoxChangeEventArgs } from '@syncfusion/ej2-angular-grids';
import { UsersService } from './users.service';
import { TabComponent, SelectEventArgs } from '@syncfusion/ej2-angular-navigations';
import { EditSettingsModel } from '@syncfusion/ej2-angular-grids';
import { DialogComponent, DialogUtility } from '@syncfusion/ej2-angular-popups';
import { GridComponent } from '@syncfusion/ej2-angular-grids';
import { Internationalization, EmitType } from '@syncfusion/ej2-base';
import { createElement } from '@syncfusion/ej2-base';
import { ForeignKeyService, FilterService, IFilterUI, RowSelectEventArgs } from '@syncfusion/ej2-angular-grids';
import { DataManager } from '@syncfusion/ej2-data';
import { Query } from '@syncfusion/ej2-data';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { FilteringEventArgs } from '@syncfusion/ej2-dropdowns';
import { UserSessionService, OrganisationPageSessionService, AlertService, NavigationService } from '../../services';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
import { SearchPageService } from 'src/app/services/searchpage.service';
import { PermissionsService } from '../../services/permissions.service';
import { UserRoleSessionService } from '../../services/userRolesession.service';
import { ActivatedRoute } from '@angular/router';
import * as _ from "lodash";
import { ContactStatus, ContactStatusType, UserStatusTypeName, paginationDataNo, RoleMenu, profileType, RolePageActionType } from '../../models/index';
import { TextBoxComponent } from '@syncfusion/ej2-angular-inputs';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'users-dashboard',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
    public headerText: Object = [{ 'text': 'Users' }, { 'text': 'Roles' }];
    public pageSettings: PageSettingsModel;
    public toolbarOptions: ToolbarItems[];
    public searchOptions: SearchSettingsModel;
    public RolesearchOptions: SearchSettingsModel;
    public data: any;
    public contacts: any;
    public isOpen: boolean = false;
    public selected: boolean = false;
    public roles: any;
    public userroleList: any;
    public tabname: string;
    public userstab: boolean = true;
    public roletab: boolean;
    public initialPage: PageSettingsModel;
    public RoleinitialPage: PageSettingsModel;
    public currentPage: any = 1;
    public RolecurrentPage: any = 1;
    public totalPages: any;
    public totalRolePages: any;
    public formatOptions: any;
    public selectcount: boolean = false;
    public selectcountrole: boolean = false;
    public newuserForm: FormGroup;
    public updateUserForm: FormGroup;
    public editSettings: EditSettingsModel;
    public customAttributes: Object;
    public rowName: any;
    public rolenext: boolean = false;
    public roleprev: boolean = false;
    public usernext = false;
    public userprev: boolean = false;
    public isClicked: boolean;
    public messageValue: any;
    // public editSettings: Object;
    // public fields: Object = { text: 'text', value: 'value' };
    private item: number[] = [1, 2, 3, 4, 5];
    nowhitespacepattern = '^[-_a-zA-Z0-9]+[^\s]*$';
    searchValue: string;
    environmentUrl: any;

    public animation: object = {
        previous: { effect: 'SlideLeftIn', duration: 1000, easing: 'ease' },
        next: { effect: 'SlideRightIn', duration: 1000, easing: 'ease' }
    };
    @ViewChild('AddUserDialog')
    public AddUserDialog: DialogComponent;
    @ViewChild('DeleteDialog')
    public DeleteDialog: DialogComponent;
    @ViewChild('grid')
    public grid: GridComponent;
    @ViewChild('rolegrid')
    public rolegrid: GridComponent;
    @ViewChild('samples')
    public dropDownListObject: DropDownListComponent;
    @ViewChild('Contactsdropdown')
    public ContactdropDownListObject: DropDownListComponent;
    public dateFormat = { type: 'date', format: 'dd/MM/yyyy' };
    public username: any;
    public useremail: any;
    public userImageURL: any;    
    public UserRoles: any;
    public wasClicked: boolean;
    // public selectionSettings: Object;
    public selectionSettings = { checkboxOnly: false };
    searchtext: any;
    public routeParams: any;
    public filter: Object;
    public filterSettings: Object;
    public id = 0;
    public cardTitle: any;
    public buttonTitle: any;
    public searchTitle: any;
    public btnTitle: any;
    public userIdGet: number;
    public updateBtnshow: boolean;
    UserId: any;
    selectedId: any;
    selectedUserRecord: any;
    innerHeight: number;
    height: number;
    scrollareaHeight: number;
    public paginationData: any[];
    public roleData: Object[];
    userAdminId: any;
    pageType: string;
    itemType: string;
    dataLength: number;
    // public checkarg: any = {};
    paginationDataNo() { return paginationDataNo; }
    profileType() { return profileType; }
    roleMenu() { return RoleMenu; }
    rolePageActionType() { return RolePageActionType; }
    page = this.paginationDataNo().page;
    limit = this.paginationDataNo().limit;
    organisationLevel = this.profileType().OrganisationLevel;

    constructor(private usersService: UsersService, private alertService: AlertService, private formBuilder: FormBuilder,
        private organisationPageSessionService: OrganisationPageSessionService, private userSessionService: UserSessionService,
        public searchPageService: SearchPageService, public navigationService: NavigationService, private route: ActivatedRoute,
        public userRoleSessionService: UserRoleSessionService,
        public permissionsService: PermissionsService) {
        this.routeParams = route.snapshot.params;
        this.createForm();

    }
    userStatusTypeName() {
        return UserStatusTypeName;
    }

    ngOnInit() {
        this.search();
        this.environmentUrl = environment.profileURL;
        this.createForm();
        this.updateForm();
        this.UserId = this.userSessionService.userId();
        this.initialPage = { pageSize: this.limit };
        this.editSettings = { allowDeleting: true };
        this.btnTitle = this.userIdGet == 0 ? 'Send Invite' : 'Update User';
        // this.selectionSettings = { checkboxOnly: true };
        this.formatOptions = { type: 'date', format: 'dd/MM/yyyy' };
        this.toolbarOptions = ['Search'];
        this.customAttributes = { class: 'customcss' };
        this.getUsers(true);
        this.getRoles(true);
        this.searchPageService.change.subscribe(searchtext => {
            this.searchtext = searchtext;
            this.searchOptions = { fields: ['fullName'], operator: 'contains', key: this.searchtext, ignoreCase: true };
        });
        this.wasClicked = false;
        this.filterSettings = { type: 'Menu' };
        this.filter = { type: 'CheckBox' };
        const organisationId = this.organisationPageSessionService.getOrganisationId();
        this.permissionsService.loadPermissions(this.roleMenu().user);
    }
    createForm() {
        const userId = this.userSessionService.userId();
        const organisationId = this.organisationPageSessionService.getOrganisationId();
        this.newuserForm = this.formBuilder.group({
            userConnectionId: ['', Validators.required],
            roleId: ['', Validators.required],
            message: ['', null],
            userId: [, null],
            organisationId: [organisationId, null],
            id: [0, null]
        });

    }
    updateForm() {
        this.updateUserForm = this.formBuilder.group({
            userId: [, null],
            roleId: ['', null]
        });
    }

    public addUser = function (event: any): void {
        this.selectedId = 0;
        this.cardTitle = this.selectedId === 0 ? 'Add New User' : 'Manage User';
        this.buttonTitle = this.selectedId === 0 ? 'Send Invite' : 'Update';
        this.searchTitle = this.selectedId === 0 ? 'Search a Connected Contact' : 'Connected Contact';
        // this.dropDownListObject.value = null;
        // this.ContactdropDownListObject.value = null;
        this.newuserForm.controls['userConnectionId'].setValue(null);
        this.newuserForm.controls['roleId'].setValue(null);
        this.newuserForm.controls['message'].setValue(null);
        // this.newuserForm.controls['userConnectionId'].setValidators(Validators.required);
        this.selectedUserRecord = '';
        this.username = '';
        this.useremail = '';

        this.AddUserDialog.show();

        this.getContacts(true);
        this.selected = false;
        this.getRoles(true);
    };


    public fields: Object = { text: 'fullName', value: 'id' };
    public rolefields: Object = { text: 'name', value: 'id' };
    public text = 'Select a Connected Contact';


    search() {

        this.searchPageService.change.subscribe(data => {
            this.searchtext = data;
            // alert(this.searchtext + " in");
            // this.searchOptions = { fields: ['fullName'], operator: 'contains', key: this.searchtext, ignoreCase: true };
            this.getUsers(true);
        });
    }
    getUserSelect(args) {

        if (parentsUntil(args.target, 'e-row') && !(parentsUntil(args.target as Element, 'e-gridchkbox'))) {
            args.cancel = true;
            let permissions = this.permissionsService.pageIds;
            let edit_contactgrid = permissions.find(i => i === this.rolePageActionType().edit);
            const userId = this.userSessionService.userId();
            if (edit_contactgrid == this.rolePageActionType().edit) {
                if (userId === args.data.userId) {
                    this.alertService.error('Admin User(s) can\'t edit');
                } else {
                    this.selectedId = args.data.userRoleMappingId;
                    this.AddUserDialog.show();
                    this.getUser(true);
                }
            }
        }

    }
    getUser(refresh) {
        // const orgId = this.organisationPageSessionService.getOrganisationId();
        this.usersService.getUser(this.selectedId, refresh).subscribe(users => {
            this.selectedUserRecord = users;
            this.userIdGet = this.selectedUserRecord.id;
            this.selected = false;
            this.useremail = '';
            // this.userConnectionId = this.selectedUserRecord.userConnectionId;
            // this.newuserForm.userConnectionId.patchValue(this.selectedUserRecord);
            this.cardTitle = this.selectedId === 0 ? 'Add New User' : 'Manage User';
            this.buttonTitle = this.selectedId === 0 ? 'Send Invite' : 'Update';
            this.searchTitle = this.selectedId === 0 ? 'Search a Connected Contact' : 'Connected Contact';
            this.newuserForm.patchValue(this.selectedUserRecord);

            this.getRoles(true);
            this.newuserForm.controls['userConnectionId'].setValue(this.selectedUserRecord.userId);
            this.newuserForm.controls['message'].setValue(null);
        });
    }

    selectedUser(username) {
        this.username = username.itemData.fullName;
        this.useremail = username.itemData.emailAddress;
        this.userImageURL = username.itemData.imageURL;
        this.selected = true;
    }


    change(args: CheckBoxChangeEventArgs) {
        if (args.checked && parentsUntil(args.target, 'e-gridchkbox')) {
            const selectedrecords: any[] = this.grid.getSelectedRecords();
            this.selectcount = selectedrecords.length > 0 ? true : false;
        } else {
            this.selectcount = args.selectedRowIndexes.length > 0 ? true : false;
        }
    }

    getUsers(refresh) {
        const userId = this.userSessionService.userId();
        const orgId = this.organisationPageSessionService.getOrganisationId();

        const srcText = localStorage.search ? localStorage.search : '';
        this.usersService.getUsers(orgId, userId, srcText, refresh).subscribe(users => {
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

        });
    }
    getRoles(refresh) {
        const orgId = this.organisationPageSessionService.getOrganisationId();
        this.usersService.getUserRoleList(orgId, refresh).subscribe(userroleList => {
            this.userroleList = userroleList;
            this.usersService.getRoles(orgId, refresh).subscribe(roles => {

                let rolesDatasAdmin = [];
                let rolesDatasother = [];

                if (this.userroleList.isAdmin === true) {
                    rolesDatasAdmin = roles;

                } else {
                    rolesDatasother = roles.filter((role: any) => {
                        if ((role.name !== 'Admin')) {
                            return role;
                        }
                    });
                }

                if (rolesDatasAdmin.length > 0) {
                    this.roleData = rolesDatasAdmin;
                } else {
                    this.roleData = rolesDatasother;
                }
            });
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
    public select(e) {

        if (e.selectingIndex === 1) {
        }
        this.searchtext = '';
        this.searchOptions = { fields: ['contact.fullName'], operator: 'contains', key: this.searchtext, ignoreCase: true };
        this.RolesearchOptions = { fields: ['name'], operator: 'contains', key: this.searchtext, ignoreCase: true };
        this.tabname = e.selectedItem.innerText;
        if (this.tabname.toString().trim().toLowerCase() === 'users') {
            this.userstab = false;
        } else {
            this.userstab = true;
        }
    }

    onDeleteUsers() {
        const userId = this.userSessionService.userId();
        const selectedrecords: any[] = this.grid.getSelectedRecords();
        this.userAdminId = selectedrecords.find(i => i.userId === userId);
        if (this.userAdminId == undefined) {
            this.DeleteDialog.show();
        }
        else if (this.userAdminId.userId === userId && this.userAdminId != undefined) {
            this.alertService.error('Admin user can\'t be deleted');
        } 
       
    }
    onDeleteRoles() {
        this.DeleteDialog.show();
    }
    public header = 'Confirmation';
    public bodycontents = 'Are you sure you want to delete the selected user?';
    public showCloseIcon: Boolean = true;
    public width = '40%';
    public hide: any;
    public dlgButtons: Object[] = [{
        click: this.okClick.bind(this),
        buttonModel: { content: 'Yes', isPrimary: 'true', cssClass: 'header-actions-button' }
    },
    { click: this.cancelClick.bind(this), buttonModel: { content: 'No', cssClass: 'header-actions-button' } }];
    okClick() {
        if (this.userstab) {
            const selectItem = [];
            const orgId = this.organisationPageSessionService.getOrganisationId();
            const userId = this.userSessionService.userId();
            const selectedrecords: any[] = this.grid.getSelectedRecords();
            const userAdminId = selectedrecords.find(i => i.id === userId);
                selectedrecords.forEach(function (data) {

                    selectItem.push({
                        Id: data.id,
                        organisationId: orgId
                    });
                });

                this.usersService.deleteUsers(selectItem).subscribe(res => {
                    this.alertService.success('User(s) deleted successfully');
                    this.DeleteDialog.hide();
                    this.page = this.paginationDataNo().page;
                    this.getUsers(true);
                    this.selectcount = false;
                });
        } else {
            const selectItem = [];
            const orgId = this.organisationPageSessionService.getOrganisationId();
            const selectedrecordsrole: any[] = this.rolegrid.getSelectedRecords();

            selectedrecordsrole.forEach(function (datarole) {
                selectItem.push({
                    id: datarole.id,
                    organisationId: orgId
                });
            });
            this.usersService.deleteRole(selectItem).subscribe(res => {
                this.alertService.success('Role(s) deleted successfully');
                this.DeleteDialog.hide();
                //  this.getRoles(true);
            });

        }

    }
    cancelClick() {
        this.DeleteDialog.hide();
    }


    rowSelectedToggle() {
        if (this.userstab) {

            const selectedrecords: any[] = this.grid.getSelectedRecords();
            this.selectcount = selectedrecords.length > 0 ? true : false;
        } else {
            const selectedrecords: any[] = this.rolegrid.getSelectedRecords();
            this.selectcountrole = selectedrecords.length > 0 ? true : false;
        }

    }
    addRole(id) {
        this.navigationService.goToRole(id);
    }

    ngAfterViewInit(): void {

    }
    getContacts(refresh) {
        const userId = this.userSessionService.userId();
        const orgId = this.organisationPageSessionService.getOrganisationId();
        // tslint:disable-next-line:no-shadowed-variable
        const profileType = this.profileType().OrganisationLevel;
        this.usersService.getcontactsForUserDropDown(orgId, profileType, refresh).subscribe(res => {
            this.contacts = res;
        });


    }

    Submit(refresh) {
        if (this.selectedId === 0) {
            if (this.newuserForm.valid) {
                // this.newuserForm.value.userConnectionId = this.userConnectionId;
                this.newuserForm.value.organisationId = this.organisationPageSessionService.getOrganisationId();
                this.newuserForm.value.userId = this.userSessionService.userId();
                this.usersService.saveUser(this.newuserForm.value).subscribe(data => {
                    this.dropDownListObject.value = null;
                    this.ContactdropDownListObject.value = null;
                    this.newuserForm.value.message = null;
                    this.selected = false;
                    this.AddUserDialog.hide();
                    this.alertService.success('User request sent successfully');
                    this.getUsers(true);
                });
            }
        } else {
            this.updateUserForm.value.userId = this.selectedUserRecord.userId;
            this.updateUserForm.value.roleId = this.newuserForm.value.roleId;
            this.updateUserForm.value.id = this.userIdGet;
            this.usersService.saveRoleMappingUser(this.updateUserForm.value).subscribe(data => {
                this.newuserForm.value.message = null;
                this.selected = false;
                this.AddUserDialog.hide();

                this.alertService.success('User updated successfully');

                this.getUsers(true);
            });
        }
    }
    public onClose = (e) => {
        e.cancel = false;
    }


}
