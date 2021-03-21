import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PageSettingsModel, ToolbarItems, SearchSettingsModel, IEditCell, parentsUntil, CheckBoxChangeEventArgs } from '@syncfusion/ej2-angular-grids';
import { UserroleService } from './userrole.service';
import { EditSettingsModel } from '@syncfusion/ej2-angular-grids';
import { DialogComponent, DialogUtility } from '@syncfusion/ej2-angular-popups';
import { GridComponent } from '@syncfusion/ej2-angular-grids';
import { UserSessionService, OrganisationPageSessionService, AlertService, NavigationService } from '../../services';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
import { SearchPageService } from 'src/app/services/searchpage.service';
import { PermissionsService } from '../../services/permissions.service';
import * as _ from "lodash";
import { ContactStatus, ContactStatusType, paginationDataNo, RolePageActionType, RoleMenu } from '../../models';
import { UsersService } from '../users/users.service';
@Component({
    selector: 'userrole-dashboard',
    templateUrl: './userrole.component.html',
    styleUrls: ['./userrole.component.scss'],
})
export class UserroleComponent implements OnInit {

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
    public newuserForm: FormGroup;
    public editSettings: EditSettingsModel;
    public customAttributes: Object;
    public rowName: any;
    public rolenext: boolean = false;
    public roleprev: boolean = false;
    public usernext: boolean = false;
    public userprev: boolean = false;
    userroleList:any;
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
    public UserRoles: any;
    public selectionSettings: Object;
    searchtext: any;
    innerHeight: number;
    scrollareaHeight: any;
    height: any;
    public paginationData: any[];
    public filter: Object;
    public filterSettings: Object;
    itemType: string;
    pageType: string;
    dataLength: number;
    paginationDataNo() { return paginationDataNo; }
    roleMenu() { return RoleMenu; }

    rolePageActionType() { return RolePageActionType; }

    page = this.paginationDataNo().page;
    limit = this.paginationDataNo().limit;

    constructor(private userroleService: UserroleService,private usersService: UsersService, private alertService: AlertService, private formBuilder: FormBuilder,
        private organisationPageSessionService: OrganisationPageSessionService, private userSessionService: UserSessionService,
        public searchPageService: SearchPageService, public navigationService: NavigationService,
        public permissionsService: PermissionsService) { }

    ngOnInit() {
        // this.permissionsService.loadPermissions();
        this.formatOptions = { type: 'date', format: 'dd/MM/yyyy' };
        this.initialPage = { pageSize: this.limit };
        this.toolbarOptions = ['Search'];
        this.customAttributes = { class: 'customcss' };
        this.getUsers(true);
        this.getRoles(true);
        this.createForm();
        this.filterSettings = { type: "Menu" };
        this.filter = { type: "CheckBox" };
        this.selectionSettings = { checkboxOnly: true };
        this.permissionsService.loadPermissions(this.roleMenu().role);
        this.searchPageService.change.subscribe(searchtext => {
            this.searchtext = searchtext;
            this.RolesearchOptions = { fields: ['name'], operator: 'contains', key: this.searchtext, ignoreCase: true };
        });

    }
    createForm() {
        let userId = this.userSessionService.userId();
        let organisationId = this.organisationPageSessionService.getOrganisationId();
        this.newuserForm = this.formBuilder.group({
            userConnectionId: ['', Validators.required],
            roleId: ['', Validators.required],
            message: ['', Validators.required],
            userId: [userId, null],
            organisationId: [organisationId, null],
            id: ['0', null]
        });

    }

    public addUser = function (event: any): void {
        this.AddUserDialog.show();
        this.getContacts(true);
        this.selected = false;

    }
    public fields: Object = { text: "fullName", value: "id" };
    public rolefields: Object = { text: "name", value: "id" };
    public text: string = "Select a Connected Contact";

    getUsers(refresh) {
        let userId = this.userSessionService.userId();
        let orgId = this.organisationPageSessionService.getOrganisationId();
        this.userroleService.getUsers(orgId, userId, refresh).subscribe(users => {
        });


    }

    getRoles(refresh) {

        let orgId = this.organisationPageSessionService.getOrganisationId();
        const srcText = localStorage.search ? localStorage.search : "";
        this.userroleService.getRoles(orgId, srcText, refresh).subscribe(roles => {
            this.data = roles;
            this.dataLength = this.data.length;
/*  */            this.UserRoles = roles.name;
            this.totalPages = Math.ceil(this.data.length / this.limit);
            this.pageType = this.totalPages > 1 ? 'pages' : 'page';
            this.itemType = this.dataLength > 1 ?  'items' :'item'; 
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
    public select(e) {
        if (e.selectingIndex === 0) {
            //  this.navigationService.goToUser();
        }
        this.searchtext = '';
        this.searchOptions = { fields: ['contact.fullName'], operator: 'contains', key: this.searchtext, ignoreCase: true };
        this.RolesearchOptions = { fields: ['name'], operator: 'contains', key: this.searchtext, ignoreCase: true };
        this.tabname = e.selectedItem.innerText;
        if (this.tabname.toString().trim().toLowerCase() === "users") {
            this.userstab = false;

        } else {
            this.userstab = true;
        }
    }

    onDeleteUsers() {
        this.DeleteDialog.show();
    }
    onDeleteRoles() {
        this.DeleteDialog.show();
    }
    roleSelect(args) {
        if (parentsUntil(args.target, 'e-row') && !(parentsUntil(args.target as Element, 'e-gridchkbox'))) {
            //this.navigationService.goToContact(args.data.id);
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
    public header: string = 'Confirmation';
    public bodycontents: string = 'Are you sure you want to delete the selected user?'
    public showCloseIcon: Boolean = true;
    public width: string = '40%';
    public hide: any;

    public dlgButtons: Object[] = [{
        click: this.okClick.bind(this),
        buttonModel: { content: 'Yes', isPrimary: 'true', cssClass: 'header-actions-button' }
    },
    { click: this.cancelClick.bind(this), buttonModel: { content: 'No', cssClass: 'header-actions-button' } }];

    okClick() {

        let selectItem = [];
        let orgId = this.organisationPageSessionService.getOrganisationId();
        let selectedrecordsrole: any[] = this.grid.getSelectedRecords();

        selectedrecordsrole.forEach(function (datarole) {
            selectItem.push({
                id: datarole.id,
                organisationId: orgId
            })
        })
        this.userroleService.deleteRole(selectItem).subscribe(res => {
            this.alertService.success("Role(s) deleted successfully");
            this.DeleteDialog.hide();
            this.page = this.paginationDataNo().page;
            this.getRoles(true);
            this.selectcount = false;

        });
    }
    cancelClick() {
        this.DeleteDialog.hide();
    }

    addRole(id) {
        if(id !=0 )
        {   
            let roleCheck = this.organisationPageSessionService.UserRole();
            if(id === roleCheck)
            {
                this.alertService.error("You don't have permission to edit");
            }else{
                let orgId = this.organisationPageSessionService.getOrganisationId();
                let permissions = this.permissionsService.pageIds;
                let edit_contactgrid = permissions.find(i => i === this.rolePageActionType().edit);
                if (edit_contactgrid == this.rolePageActionType().edit) 
                    this.navigationService.goToRole(id); 
            }
            
        }else{
            this.navigationService.goToRole(id);
        }
    }
    addDuplicateRole(id) {
        let roleCheck = this.organisationPageSessionService.UserRole();
        if(id === roleCheck)
        {
            this.alertService.error("You don't have permission to duplicate the role");
        }else{
            this.navigationService.goToduplicateRole(id);
        }
    }

    ngAfterViewInit(): void {

    }
    getContacts(refresh) {
        let userId = this.userSessionService.userId();
        let orgId = this.organisationPageSessionService.getOrganisationId();
        this.userroleService.getContacts(userId, orgId, refresh).subscribe(res => {
            this.contacts = res;

        });

    }
    userSelect(username) {
        this.username = username.itemData.fullName;
        this.useremail = username.itemData.emailAddress;
        this.selected = true;
    }
    Submit(refresh) {
        if (this.newuserForm.valid) {
            this.newuserForm.value.organisationId = this.organisationPageSessionService.getOrganisationId();
            this.newuserForm.value.userId = this.userSessionService.userId();
            this.userroleService.saveUser(this.newuserForm.value).subscribe(data => {
                this.dropDownListObject.value = null;
                this.ContactdropDownListObject.value = null;
                this.selected = false;
                this.AddUserDialog.hide();
                this.alertService.success("User added successfully");
                this.getUsers(true);
            });
        }
    }

    goToUser() {
        this.navigationService.goToUser();
    }

}