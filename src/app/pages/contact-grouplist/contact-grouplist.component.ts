import { Component, OnInit, ViewChild, ChangeDetectorRef, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { PageSettingsModel, SearchSettingsModel } from '@syncfusion/ej2-angular-grids';
import { ToolbarItems, parentsUntil, CheckBoxChangeEventArgs } from '@syncfusion/ej2-grids';
import { SelectEventArgs, TabComponent } from '@syncfusion/ej2-angular-navigations';
import { GridComponent, RowSelectEventArgs, ForeignKeyService, FilterService, IFilterUI } from '@syncfusion/ej2-angular-grids';
import { DialogComponent, DialogUtility } from '@syncfusion/ej2-angular-popups';
import { UserSessionService, OrganisationPageSessionService, AlertService, NavigationService } from '../../services';
import { SearchPageService } from 'src/app/services/searchpage.service';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsersService } from '../users/users.service';
import { ContactGroupListService } from './contact-grouplist.service';
import { ActivatedRoute } from '@angular/router';
import { ContactsGroupsService } from '../contacts-groups/contacts-groups.service';
import { ContactsService } from '../contacts/contacts.service';
import { DropDownListComponent, MultiSelectComponent } from '@syncfusion/ej2-angular-dropdowns';
import { map } from 'underscore';
import {
  ContactStatus, ContactStatusType, ContactGroupMemberType, ContactGroupType,
  Contact, ContactType, paginationDataNo, ContactPageNo, profileType, RoleMenu, RolePageActionType
} from '../../models/index';
import * as _ from "lodash";
import { EmitType } from '@syncfusion/ej2-base';
import { PopupEventArgs } from '@syncfusion/ej2-dropdowns';
import { PermissionsService } from '../../services/permissions.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-contact-grouplist',
  templateUrl: './contact-grouplist.component.html',
  styleUrls: ['./contact-grouplist.component.scss'],

})
export class ContactGrouplistComponent implements OnInit {


  public routeParams: any;
  public multifield: Object;
  public contacts: Object[];
  public newGroupForm: FormGroup;
  public selected: any = false;
  public particulargroupid: any;
  public mode: string;
  public filter: Object;
  public filterSettings: Object;
  public animation: object = { previous: { effect: 'SlideLeftIn', duration: 1000, easing: 'ease' }, next: { effect: 'SlideRightIn', duration: 1000, easing: 'ease' } };
  public data: Object[];
  public connectdata;
  public isOpen: boolean = false;
  public isOpenDialogue: boolean = false;
  public pageSettings: PageSettingsModel;
  public toolbarOptions: ToolbarItems[];
  public searchOptions: SearchSettingsModel;
  public selectcount: boolean = false;
  public selectmemberrecordcount: boolean = false;
  public selectaddmember: boolean = false;
  public nextpage: boolean = false;
  public prevpage: boolean = false;
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
  public username: any;
  public useremail: any;
  public UserRoles: any;
  public wasClicked: boolean;
  public selectionSettings = { checkboxOnly: false };
  public editSettings: Object;
  public RolesearchOptions: SearchSettingsModel;
  public userstab: boolean = true;
  public openOnClick: boolean = false;
  @ViewChild('AddConnectDialog')
  public AddConnectDialog: DialogComponent;
  @ViewChild('AddGroupDialog')
  public AddGroupDialog: DialogComponent;

  @ViewChild('grid')
  public grid: GridComponent;
  @ViewChild('connectgrid')
  public connectgrid: GridComponent;
  @ViewChild('samples')
  public dropDownListObject: DropDownListComponent;
  @ViewChild('Contactsdropdown')
  public ContactdropDownListObject: DropDownListComponent;
  @ViewChild('template')
  public mulObj: MultiSelectComponent;
  @ViewChild('Dialog')
  public Dialog: DialogComponent;
  @ViewChild('AdminDialog')
  public AdminDialog: DialogComponent;

  public header: string = 'Confirmation';
  public bodycontents: string = 'Are you sure you want to delete the selected group member?';
  public showCloseIcon: Boolean = true;
  public width: string = '35%';
  public animationSettings: Object = { effect: 'None' };
  public hide: any;
  contactGroupdata: any;
  public btnTitle: any;
  public addgroupMember: any;
  public remMember: any;
  public memberTitle: any;
  public alertTitle: any;
  makeAdmin: boolean;
  removeAdmin: boolean;
  environmentUrl: any;
  pageType: string;
  dataLength: number;
  itemType: string;
  // public fields: Object = { text: 'Full  Name', value: 'id' };

  constructor(private usersService: UsersService,
     private formBuilder: FormBuilder,
    private alertService: AlertService,
    private _ContactsGroupsService: ContactsGroupsService, private contactsService: ContactsService,
    private organisationPageSessionService: OrganisationPageSessionService, private userSessionService: UserSessionService,
    public searchPageService: SearchPageService,
    public navigationService: NavigationService,
    private route: ActivatedRoute,
    public permissionsService: PermissionsService,
    private changeDetect: ChangeDetectorRef, private _ContactGroupListService: ContactGroupListService) {

    this.routeParams = route.snapshot.params;
    this.particulargroupid = this.routeParams.id;
  }

  public box = 'Box';
  public sampleName: any;
  public contact: any;

  public placeholder = 'Search a name or an email...';
  // public selectAllText: string;
  public dlgButtons: Object[] = [{ click: this.okClick.bind(this), buttonModel: { content: 'Yes', isPrimary: 'true', cssClass: 'header-actions-button' } }, { click: this.cancelClick.bind(this), buttonModel: { content: 'No', cssClass: 'header-actions-button' } }];
  public dlgButtons1: Object[] = [{ click1: this.okMakeAdminClick.bind(this), buttonModel: { content: 'Yes', isPrimary: 'true', cssClass: 'header-actions-button' } }, { click: this.cancelClick.bind(this), buttonModel: { content: 'No', cssClass: 'header-actions-button' } }];

  groupdata: any;
  userOrganisationMappingId: any;
  paginationDataNo() { return paginationDataNo; }

  page = this.paginationDataNo().page;
  limit = this.paginationDataNo().limit;
  ContactPageNo() { return ContactPageNo; }
  profileType() { return profileType; }
  rolePageActionType() { return RolePageActionType; }
  roleMenu() { return RoleMenu; }
  organisationLevel = this.profileType().OrganisationLevel;

  public paginationData: any[];
  ngOnInit() {
    this.environmentUrl = environment.profileURL;
    this.formatOptions = { type: 'date', format: 'dd/MM/yyyy' };
    this.multifield = { text: 'fullName', email: 'emailAddress', value: 'connectedUserOrganisationMappingId' };
    this.changeDetect.detectChanges();
    this.editSettings = { allowDeleting: true };
    this.initialPage = { pageSize: this.limit };

    this.getContacts(true);

    this.getContactGroupMember(true);
    this.getContactGroup(true);
    this.createForm();
    this.searchPageService.change.subscribe(searchtext => {
      this.searchtext = searchtext;
      this.searchOptions = { fields: ['fullName'], operator: 'contains', key: this.searchtext, ignoreCase: true };
    });
    this.filterSettings = { type: "Menu" };
    this.filter = { type: "CheckBox" };
    this.permissionsService.loadPermissions(this.roleMenu().CGroup);
    this.selectcount = false;
    this.selectmemberrecordcount = false;
    this.addgroupMember = 'Add Members';
  }
  ngAfterViewInit() {
    this.changeDetect.detectChanges();
  }
  public onOpenDialog = function (event: any): void {
    // DialogUtility.confirm({
    //   title: ' Confirmation Dialog',
    //   content: 'This is a Confirmation Dialog!',
    //   okButton: { text: 'OK', click: this.okClick.bind(this), click1: this.okMakeAdminClick.bind(this) },
    //   cancelButton: { text: 'Cancel', click: this.cancelClick.bind(this) },
    //   showCloseIcon: true,
    //   closeOnEscape: true
    // });
  };

  public select(e) {

    if (e.selectingIndex === 1) {
    }
    this.searchtext = '';
    this.searchOptions = { fields: ['contact.fullName'], operator: 'contains', key: this.searchtext, ignoreCase: true };
  }

  createForm() {
    const groupId = this.particulargroupid;
    this.newGroupForm = this.formBuilder.group({
      id: [0, null],
      groupId: [groupId, null],
      description: [''],
      userOrganisationMappingId: ['', Validators.required]
    });

  }


  public addMember = function (event: any): void {
    this.newGroupForm.controls['userOrganisationMappingId'].setValue(null);
    this.newGroupForm.controls['userOrganisationMappingId'].setValidators(Validators.required);
    this.newGroupForm.controls['description'].setValue(null);
    this.openOnClick = "true";
    this.AddGroupDialog.show();
    this.selected = false;
  };


  getContacts(refresh) {

    const orgId = this.organisationPageSessionService.getOrganisationId();
    const groupId = this.particulargroupid;
    // tslint:disable-next-line:no-shadowed-variable
    const profileType = this.profileType().OrganisationLevel;
    this._ContactGroupListService.getcontactsForGroupDropDown(orgId, groupId, profileType, refresh).subscribe(users => {
      this.contacts = users;
    });
    this.filterSettings = { type: "Menu" };
    this.filter = { type: "CheckBox" };
  }


  getContactGroup(refresh) {
    const userId = this.userSessionService.userId();
    const orgId = this.organisationPageSessionService.getOrganisationId();
    this._ContactsGroupsService.getContactGroup(userId, orgId, refresh).subscribe(res => {
      this.contactGroupdata = res;

      res.forEach(element => {
        if (element.id == this.particulargroupid) {
          this.sampleName = element.name;
        }
      });
    });
  }


  getContactGroupMember(refresh) {
    this._ContactGroupListService.getContactGroupMember(this.particulargroupid, refresh).subscribe(res => {
     
        this.data = res.groupMemberListViewModelList;
        // this.addgroupMember = res.isAllowToEdit === true ? 'Add Members' : '';
        this.userOrganisationMappingId = res.userOrganisationMappingId;
        if(this.data == null){
          this.paginationData = null;
        }else{
          this.dataLength = this.data.length;
          this.totalPages = Math.ceil(this.data.length / this.limit);
          this.pageType = this.totalPages > 1 ? 'pages' : 'page'; 
          this.itemType = this.dataLength > 1 ?  'items' :'item'; 
          this.paginationData = _(this.data)
            .drop((this.page - 1) * this.limit)
            .take(this.limit)
            .value();
        }    
    });
   
  }

  search() {

    this.searchPageService.change.subscribe(data => {
      this.searchtext = data;
      //alert(this.searchtext + " in");
      //this.searchOptions = { fields: ['fullName'], operator: 'contains', key: this.searchtext, ignoreCase: true };
      this.getContactGroupMember(true);
    });
  }

  getContactSearchMember(refresh) {
    // alert("getcontacts");

    let connectdata = [];
    let self = this;
    let organisationId = this.organisationPageSessionService.getOrganisationId();
    //let userId = this.userSessionService.userId();
    const srcText = localStorage.search ? localStorage.search : "";
    // alert(this.searchtext + " getContacts");


    this._ContactGroupListService.getContactSearchMember(organisationId, srcText, refresh).subscribe(contactgroups => {

      this.data = contactgroups;

      this.totalPages = Math.ceil(this.data.length / this.limit);
      this.paginationData = _(this.data)
        .drop((this.page - 1) * this.limit)
        .take(this.limit)
        .value();
    });
    setTimeout(() => {
    }, 1000);
    // alert(this.data);
    console.log(JSON.stringify(this.data));
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

  onMakeAdmin() {
    this.AdminDialog.show();
  }

  okClick() {
    const selectItem = [];
    const groupId = this.particulargroupid;
    const selectedrecords: any[] = this.connectgrid.getSelectedRecords();

    selectedrecords.forEach(function (data) {

      selectItem.push({
        id: data.id,
        groupId: groupId
      });
    });

    if (selectedrecords[0].isAdmin === true) {
      this.alertService.success('Group Admin(s) cannot be deleted');
    } else {
      this._ContactGroupListService.deleteContactGroupMember(selectItem).subscribe(res => {
        this.alertService.success('Group Member(s) deleted successfully');
     
        this.Dialog.hide();
        this.page = this.paginationDataNo().page;
      
        this.selectcount = false;
        this.selectaddmember = false;
        this.selectmemberrecordcount = false;
        this.getContacts(true);
        this.getContactGroupMember(true);

      });
    }
  }

  okMakeAdminClick() {

    const selectItem = {};
    const groupId = this.particulargroupid;
    const userOrganisationMappingId = [];

    const selectedrecords: any[] = this.connectgrid.getSelectedRecords();
    userOrganisationMappingId.push(selectedrecords[0].userOrganisationMappingId);

    selectItem['groupId'] = groupId;
    selectItem['userOrganisationMappingId'] = userOrganisationMappingId;

    if (selectedrecords[0].isAdmin === true) {
      selectItem['isAdmin'] = false;
    } else {
      selectItem['isAdmin'] = true;
    }
    this._ContactGroupListService.makeAdminGroupMember(selectItem).subscribe(res => {

      this.alertService.success('This user role changed successfully');

      this.AdminDialog.hide();
      this.getContactGroupMember(true);
      this.selectcount = false;
      this.selectaddmember = false;
      this.selectmemberrecordcount = false;
    });
    // }

  }

  cancelClick() {
    this.Dialog.hide();
    this.AdminDialog.hide();
    this.AddConnectDialog.hide();
  }

  connect(id, name) {
    this.AddConnectDialog.show();
  }

  public headerConnect: string = 'Confirmation';
  public bodycontentsConnect: string = 'Are you sure you want to Connect the selected Group Member?'
  public showCloseIconConnect: Boolean = true;
  public animationSettingsConnect: Object = { effect: 'None' };

  public dlgButtonsConnect: Object[] = [{ click: this.connectClick.bind(this), buttonModel: { content: 'Yes', isPrimary: 'true', cssClass: 'yesbutton' } }, { click: this.cancelClick.bind(this), buttonModel: { content: 'No', cssClass: 'nobutton' } }];

  connectClick() {
    this.AddConnectDialog.hide();
  }

  selecte(args) {
    let userId = this.userSessionService.userId();
      if (args.data.userId === userId) {
        this.btnTitle = args.data.isAdmin === true ? '' : '';
        this.remMember = args.data.isAdmin === true ? '' : 'Remove Group Member';
      } else {
        this.btnTitle = args.data.isAdmin === true ? 'Make Group Member' : 'Make Group Admin';
        this.remMember = args.data.isAdmin === true ? 'Remove Group Member' : 'Remove Group Member';
      }
    if (parentsUntil(args.target, 'e-row') && !(parentsUntil(args.target as Element, 'e-gridchkbox'))) {
      
      args.cancel = true;
      let permissions = this.permissionsService.pageIds;

      let view_contactgrid = permissions.find(i => i === this.rolePageActionType().view);
      if ((view_contactgrid == this.rolePageActionType().view) && (args.data.isView = true)) {
        
        this.navigationService.goToContact(args.data.userConnectionId, this.ContactPageNo().group);

        let edit_contactgrid = permissions.find(i => i === this.rolePageActionType().edit);
        if ((edit_contactgrid == this.rolePageActionType().edit) && (args.data.isEdit = true)) {
          this.navigationService.goToContact(args.data.userConnectionId, this.ContactPageNo().group);
        }
      }
      else {
        this.alertService.error("You don't have permission to view");
      }
    }
  }

  change(args: CheckBoxChangeEventArgs) {
    const selectedrecords: any[] = this.connectgrid.getSelectedRecords();
    if (args.checked && parentsUntil(args.target as Element, 'e-gridchkbox')) {

      this.selectcount = selectedrecords.length > 0 ? true : false;
      this.selectmemberrecordcount = selectedrecords.length > 1 ? false : true;
      // this.selectaddmember = selectedrecords.length > 1 ? false : true;
    } else {
      this.selectcount = args.selectedRowIndexes.length > 0 ? true : false;
      this.selectmemberrecordcount = args.selectedRowIndexes.length !== 1 ? false : true;
      // this.selectaddmember = args.selectedRowIndexes.length !== 1 ? false : true;
    }
    let userId = this.userSessionService.userId();
    const CheckAdminInSelectedRecords = selectedrecords.find(i => i.userId === userId);
    if (CheckAdminInSelectedRecords) {
      this.makeAdmin = false;
      this.removeAdmin = false;
    }
    else {
      this.makeAdmin = true;
      this.removeAdmin = true;
      // this.btnTitle = args.data.isAdmin === true ? 'Make Group Member' : 'Make Group Admin';
      //   this.remMember = args.data.isAdmin === true ? 'Remove Group Member' : 'Remove Group Member';
    }

  }

  userSelect(username) {
    this.username = username.data.fullName;
    this.useremail = username.data.emailAddress;
    this.selected = true;
  }
  Submit(id) {
    if (this.newGroupForm.valid) {
      this.newGroupForm.value.groupId = this.particulargroupid;
      this.newGroupForm.value.userOrganisationMappingId = this.newGroupForm.value.userOrganisationMappingId;
      this.newGroupForm.value.description = this.newGroupForm.value.description;
      this.newGroupForm.value.groupMemberStatusTypes = ContactGroupMemberType.ApprovedMember;
      this.AddGroupDialog.hide();
      this._ContactGroupListService.saveContactGroupMember(this.newGroupForm.value).subscribe((response) => {
        this.selected = false;
        // this.AddUserDialog.hide()
        this.Dialog.hide();
        this.alertService.success('Group Member(s) added successfully');
        this.selectcount = false;
        this.selectaddmember = false;
        this.selectmemberrecordcount = false;
        this.getContactGroupMember(true);
        this.getContacts(true);
      });
    }

  }
  // public onClose: EmitType<PopupEventArgs> = (e: PopupEventArgs) => {
  //   e.cancel = true;
  // }
  public onClose: EmitType<PopupEventArgs> = (e: PopupEventArgs) => {
    e.cancel = false;
  };
  
}
