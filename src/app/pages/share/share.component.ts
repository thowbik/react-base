import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { GridComponent, CheckBoxChangeEventArgs, parentsUntil, PageSettingsModel, FilterSettingsModel, IFilter } from '@syncfusion/ej2-angular-grids';
import { DialogComponent, DialogUtility } from '@syncfusion/ej2-angular-popups';
import { ShareService } from './share.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import * as _ from 'lodash';
import { MultiSelectComponent } from '@syncfusion/ej2-angular-dropdowns';
import { EmitType } from '@syncfusion/ej2-base';
import { PopupEventArgs } from '@syncfusion/ej2-dropdowns';
import { UsersService } from '../users/users.service';
import { AlertService, OrganisationPageSessionService, UserSessionService, NavigationService } from '../../services';
import { ActivatedRoute } from '@angular/router';
import { ContactStatus, ContactStatusType, paginationDataNo, profileType, RoleMenu, RecordType, RolePageActionType, ContactPageNo } from '../../models/index';
import { PermissionsService } from '../../services/permissions.service';
import { Location } from '@angular/common';
import { environment } from '../../../environments/environment';
@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.scss']
})

export class ShareComponent implements OnInit {

  public data: any;
  sampledata: any;
  public newshareForm: FormGroup;
  public contacts: { [key: string]: Object }[];
  public multifield: Object;
  public box: string = 'Box';
  public placeholder = 'Search a name or an email...';
  public selectcount: boolean = false;
  public isOpen: boolean = false;
  public isOpenDeletePopup: boolean = false;
  public showSharePopup: boolean = true;
  public filterOptions: FilterSettingsModel;
  public filter: IFilter;
  public selectionSettings = { checkboxOnly: false };
  public initialPage: PageSettingsModel;
  public editSettings: Object;
  public selectedrecords: any[];
  public isEdit: boolean;
  public isView: boolean;
  public organisationId: any;
  public totalPages: any;
  public paginationData: any[];
  public shareData: any;
  public updateshareForm: FormGroup;
  public id = 0;
  public cardTitle: any;
  public buttonTitle: any;
  public searchTitle: any;
  public btnTitle: any;
  public userId: any;
  public headerTitle: string;
  selectedId: any;
  selectedSharedRecord: any;
  public pagefrom: number;
  public headingTilte: any;
  public routeParams: any;
  public fields: Object;
  public shareFromSelectedContact: boolean = true;
  public enableCheckBox: boolean = false;
  submitTitle: any;
  isAdminCheck: any;
  headerButtonTitle: any;
  pageType: string;
  itemType: string;
  dataLength: number;
  contactStatusResult() { return ContactStatus; }

  contactStatusType() { return ContactStatusType; }

  paginationDataNo() { return paginationDataNo; }

  profileType() { return profileType; }

  roleMenu() { return RoleMenu; }

  rolePageActionType() { return RolePageActionType; }

  ContactPageNo() { return ContactPageNo; }
  RecordType() { return RecordType; }
  page = this.paginationDataNo().page;

  limit = this.paginationDataNo().limit;

  @ViewChild('grid')
  public grid: GridComponent;
  @ViewChild('AddShareDialog')
  public AddShareDialog: DialogComponent;
  @ViewChild('DeleteDialog')
  public DeleteDialog: DialogComponent;
  @ViewChild('AddTransferDialog')
  public AddTransferDialog: DialogComponent;
  @ViewChild('template')
  public mulObj: MultiSelectComponent;
  public contactsShareFrom: any[];
  public contactsShareTo: any[];
  public shareFromName: any;
  public SelectedUserId: any;
  public shareFromEmail: any;
  public shareFromImageURL: any;
  environmentUrl: any;

  constructor(public shareService: ShareService,
    private usersService: UsersService,
    private alertService: AlertService,
    private formBuilder: FormBuilder,
    private location: Location,
    public permissionsService: PermissionsService,
    private changeDetect: ChangeDetectorRef,
    private organisationPageSessionService: OrganisationPageSessionService,
    private userSessionService: UserSessionService,
    public navigationService: NavigationService,
    private route: ActivatedRoute, ) {
    this.routeParams = route.snapshot.params;
    this.id = this.routeParams.id;
    this.pagefrom = this.routeParams.page;


  }

  ngOnInit() {
    this.environmentUrl = environment.profileURL;
    this.userId = this.userSessionService.userId();
    this.organisationId = this.organisationPageSessionService.getOrganisationId();
    const userRole = this.organisationPageSessionService.UserRoleData();
    this.isAdminCheck = userRole.isAdmin;
    this.selectedId = 0;
    this.submitTitle = this.selectedId === 0 ? 'Share' : 'Update';
    if (this.selectedId == 0) {
      if (this.pagefrom == this.RecordType().Group) {
        this.headingTilte = 'All Group';
        this.headerTitle = 'Share Group';
        this.headerButtonTitle = 'Share Group';
      }
      else if (this.pagefrom == this.RecordType().Question) {
        this.headingTilte = 'All Question';
        this.headerTitle = 'Share Question';
        this.headerButtonTitle = 'Share Question';
      }
      else if (this.pagefrom == this.RecordType().Form) {
        this.headingTilte = 'All Form';
        this.headerTitle = 'Share Form';
        this.headerButtonTitle = 'Share Form';
      }
      else {
        this.headingTilte = 'All contacts';
        this.headerTitle = 'Share Contact';
        this.headerButtonTitle = 'Share Contact';
      }
    }
    this.getShareContact(true);
    this.getContacts(this.userId,true);
    this.createForm();
    this.multifield = { text: 'fullName', email: 'emailAddress', value: 'userId' };
    this.filterOptions = {
      type: 'Menu'
    };
    this.filter = {
      type: 'CheckBox'
    };
    this.initialPage = { pageSize: this.limit };
    this.editSettings = { allowDeleting: true };
    this.getContactsForTransfer(true);
  } 
  getContactsForTransfer(refresh) {
    const userId = this.userSessionService.userId();
    // alert(isAdmin);
    const orgId = this.organisationPageSessionService.getOrganisationId();

    this.shareService.getcontactsForShare(orgId, refresh).subscribe(res => {
      this.contactsShareFrom = res;

      this.fields = { text: 'fullName', emailAddress: 'emailAddress', value: 'userId' };
      this.newshareForm.controls['userFromId'].setValue(this.userSessionService.userId());
      const selectedTransferFromLogedUser = this.contactsShareFrom.find(element => {
        return element.userId == userId;
      });
       this.shareFromName = selectedTransferFromLogedUser.fullName;
       this.shareFromEmail = selectedTransferFromLogedUser.emailAddress;
       this.SelectedUserId = selectedTransferFromLogedUser.userId;
       this.shareFromImageURL = selectedTransferFromLogedUser.imageURL;
       this.isOpen = true;
    });


  }
  shareFromChange(username) {
    this.SelectedUserId = username.itemData.userId;
    this.shareFromName = username.itemData.fullName;
    this.shareFromEmail = username.itemData.emailAddress;
    this.shareFromImageURL = username.itemData.imageURL;
    this.shareFromSelectedContact = true;
    this.getContacts(this.SelectedUserId, true);
  }
  ngAfterViewInit() {
    this.changeDetect.detectChanges();
  }
  createForm() {

    this.isEdit = false;
    this.isView = false;
    this.newshareForm = this.formBuilder.group({
      isEdit: [this.isEdit],
      isView: [this.isView],
      organisationId: [this.organisationId],
      userFromId: ['', Validators.required],
      userToId: ['', Validators.required],
      recordType: [this.pagefrom],
      id: [0, null]
    });
  }
  getContacts(userId, refresh) {

    this.shareService.getUserList(this.organisationId, this.pagefrom, userId, refresh).subscribe(users => {
      this.contacts = users;
    });
  }


  getShareContact(refresh) {
    this.shareService.getShareContact(this.organisationId, this.pagefrom, this.userId, true).subscribe(shareData => {
      this.shareData = shareData;
      this.dataLength = this.shareData.length;
      this.totalPages = Math.ceil(this.shareData.length / this.limit);
      this.pageType = this.totalPages > 1 ? 'pages' : 'page';
      this.itemType = this.dataLength > 1 ?  'items' :'item'; 
      debugger;
      this.paginationData = _(this.shareData)
        .drop((this.page - 1) * this.limit)
        .take(this.limit)
        .value();
    });

  }
  Next() {
    this.page = this.page + 1;
    this.paginationData = _(this.shareData)
      .drop((this.page - 1) * this.limit)
      .take(this.limit)
      .value();
  }
  Previous() {
    this.page = this.page - 1;
    this.paginationData = _(this.shareData)
      .drop((this.page - 1) * this.limit)
      .take(this.limit)
      .value();
  }
  delete() {
    this.DeleteDialog.show();
  }
  okClick() {
    let selectItem = [];
    let orgId = this.organisationPageSessionService.getOrganisationId();
    let selectedrecords: any[] = this.grid.getSelectedRecords();
    selectedrecords.forEach(function (data) {

      selectItem.push({
        userToId: data.userToId,
        userFromId: data.userFromId,
        organisationId: orgId,
        recordType: data.recordType
      })
    })
    this.shareService.deleteShareUsers(selectItem).subscribe(res => {
      this.alertService.success("Share(s) deleted successfully");
      this.DeleteDialog.hide();
      this.page = this.paginationDataNo().page;
      this.getShareContact(true);
      this.selectcount = false;
    });

  }
  cancelClick() {
    this.DeleteDialog.hide();
  }
  addShareContacts() {
  
   
    this.selectedId = 0;
    if (this.selectedId == 0) {
      if (this.pagefrom == this.RecordType().Group) {
        this.headerTitle = 'Share Group';
      } 
      else if (this.pagefrom == this.RecordType().Question) {
        this.headerTitle = 'Share Question';
      }
      else if (this.pagefrom == this.RecordType().Form) {
        this.headerTitle = 'Share Form';
      }
      else {
        this.headerTitle = 'Share Contact';
      }
      this.shareFromSelectedContact = true;
    }
    this.getContactsForTransfer(true);
    this.submitTitle = this.selectedId === 0 ? 'Share' : 'Update';
    this.newshareForm.controls['userToId'].setValue(null);
    this.newshareForm.controls['isEdit'].setValue(null);
    this.newshareForm.controls['isView'].setValue(null);
    // this.newuserForm.controls['userConnectionId'].setValidators(Validators.required);
    this.selectedSharedRecord = '';
    this.createForm();
    this.getShareContact(true);
    this.AddShareDialog.show();
  }
  select(args) {
    if (parentsUntil(args.target, 'e-row') && !(parentsUntil(args.target as Element, 'e-gridchkbox'))) {
      args.cancel = true;
      this.selectedSharedRecord = args.data;
      this.selectedId = args.data.id;
      this.newshareForm.patchValue(this.selectedSharedRecord);
      this.shareFromSelectedContact = false;
      if (this.selectedId != 0) {
        if (this.pagefrom == this.RecordType().Group) {
          this.headerTitle = 'Manage Shared Group';
        }
        else if (this.pagefrom == this.RecordType().Question) {
          this.headerTitle = 'Manage Shared Question';
        }
        else if (this.pagefrom == this.RecordType().Form) {
          this.headerTitle = 'Manage Shared Form';
        }
        else {
          this.headerTitle = 'Manage Shared Contact';
        }
      }
      this.submitTitle = this.selectedId === 0 ? 'Share' : 'Update';
      this.enableCheckBox = true;
      this.AddShareDialog.show();
      /*  let permissions = this.permissionsService.pageIds;
       let edit_contactgrid = permissions.find(i => i === this.rolePageActionType().edit);
       if (edit_contactgrid == this.rolePageActionType().edit)
         this.navigationService.goToContact(args.data.id, this.ContactPageNo().all);
 
       let view_contactgrid = permissions.find(i => i === this.rolePageActionType().view);
       if (view_contactgrid == this.rolePageActionType().view)
         this.navigationService.goToContact(args.data.id, this.ContactPageNo().all); */
    }
  }
  change(args: CheckBoxChangeEventArgs) {
    if (args.checked && parentsUntil(args.target, 'e-gridchkbox')) {
      this.selectedrecords = this.grid.getSelectedRecords();
      this.selectcount = this.selectedrecords.length > 0 ? true : false;
    }
    else {
      this.selectcount = args.selectedRowIndexes.length > 0 ? true : false;
    }
  }
  Submit() {

    if (this.selectedId === 0) {
      if (this.newshareForm.valid) {
        this.newshareForm.value.isView;
        debugger;
        if (this.newshareForm.value.isEdit == true || this.newshareForm.value.isView == true) {
          this.shareService.saveShareContact(this.newshareForm.value).subscribe(data => {
            this.AddShareDialog.hide();
            if (this.pagefrom == this.RecordType().Group) {
              this.alertService.success("Group shared successfully");
            }
            else if (this.pagefrom == this.RecordType().Question) {
              this.alertService.success("Question shared successfully");
            }
            else if (this.pagefrom == this.RecordType().Form) {
              this.alertService.success("Form shared successfully");
            }
            else {
              this.alertService.success("Contact shared successfully");
            }

            this.getShareContact(true);
          //  this.location.back();
          });
        } else {
          this.alertService.error("Atleast select anyone of Permission");
        }

      }

    }
    else {
      if (this.newshareForm.valid) {
        if (this.newshareForm.value.isEdit == true || this.newshareForm.value.isView == true) {
          this.shareService.updateShareContact(this.newshareForm.value).subscribe(data => {
            this.AddShareDialog.hide();
            this.getShareContact(true);
            this.alertService.success("Share updated successfully");
          });
        } else {
          this.alertService.error("Atleast select anyone of Permission");
        }

      }
    }
  }

  public onClose = (e) => {
    e.cancel = false;
  }
  Cancel() {
    this.location.back();
  }
  shareToChange(event) {

    if (event.itemData) {
      this.enableCheckBox = true;
    }
  }

}
