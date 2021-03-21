import { Component, OnInit, ViewChild, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { PageSettingsModel, SearchSettingsModel } from '@syncfusion/ej2-angular-grids';
import { ToolbarItems, CheckBoxChangeEventArgs, parentsUntil } from '@syncfusion/ej2-grids';
import { SelectEventArgs, TabComponent } from '@syncfusion/ej2-angular-navigations';
import { GridComponent, RowSelectEventArgs } from '@syncfusion/ej2-angular-grids';
import { DialogComponent, DialogUtility } from '@syncfusion/ej2-angular-popups';
import { SearchPageService } from 'src/app/services/searchpage.service';

import { environment } from 'src/environments/environment';
import * as _ from "lodash";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmitType } from '@syncfusion/ej2-base';
import { PopupEventArgs } from '@syncfusion/ej2-dropdowns';
import { MakeGroupService } from './makegroup.service';
import { ContactGroupType, ContactGroupMemberType, profileType, RoleMenu } from '../../../models';
import { AlertService, OrganisationPageSessionService, UserSessionService } from '../../../services';
import { TextBoxComponent } from '@syncfusion/ej2-angular-inputs';
import { ContactsGroupsService } from '../../../pages/contacts-groups/contacts-groups.service';
import { ContactGroupListService } from '../../../pages/contact-grouplist/contact-grouplist.service';
import { DropDownListComponent, MultiSelectComponent } from '@syncfusion/ej2-angular-dropdowns';

@Component({
    selector: 'app-makegroup',
    templateUrl: './makegroup.component.html',
    styleUrls: ['./makegroup.component.scss']
})
export class MakegroupComponent implements OnInit {

    public data: Object[];

    @ViewChild('grid')
    public grid: GridComponent;
    @ViewChild('AddGroupDialog')
    public AddGroupDialog: DialogComponent;
    @ViewChild('GroupName')
    public GroupName: TextBoxComponent;
    @ViewChild('Description')
    public Description: TextBoxComponent;
    @ViewChild('template')
    public mulObj: MultiSelectComponent;
    public isOpen: boolean = false;
    public newGroupForm: FormGroup;
    public newGroupUpdateForm: FormGroup;
    public particulargroupid: any;
    public fields: Object;
    public existing_Group: any;
    public openmembers: any;
    public selected_data: any;
    btnTitle: any;
    public box = 'Box';
    public contacts: any;
    public multifield: any;
    public pageFrom: any;
    selectedId: any;
    selectedUserRecord: any;
    public placeholder = 'Search a name or an email...';
    editGroup: any;
    environmentUrl: any;
    newContactGroup: string;
    profileType() { return profileType; }
    roleMenu() { return RoleMenu; }
    @Output() click = new EventEmitter<any>();
    @Output() emitClosePopupFromGroup: EventEmitter<String> = new EventEmitter<String>();

    constructor(
        private alertService: AlertService,
        private _MakeGroupService: MakeGroupService,
        private organisationPageSessionService: OrganisationPageSessionService,
        private userSessionService: UserSessionService,
        private formBuilder: FormBuilder,
        private _ContactGroupListService: ContactGroupListService,
        private _ContactsGroupsService: ContactsGroupsService,
    ) {

    }

    ngOnInit(): void {
        this.environmentUrl = environment.profileURL;
        this.btnTitle = 'New Group';
        this.multifield = { text: 'fullName', email: 'emailAddress', value: 'connectedUserOrganisationMappingId' };
        this.createForm();
        this.getContacts(true);
        this.GroupPage();
        this.newContact_Group();
        this.getContactGroup(true);
        this.getExistGroup();
        this.updateeditingGroup();
    }
    getExistGroup() {
        this._MakeGroupService.existGroup.subscribe((data) => {
            this.btnTitle = data == 'true' ? 'New Group' : 'Existing Group';
            this.existing_Group = data;
            this.isOpen = true;
        });
    }
    GroupPage() {
        this._MakeGroupService.openmembers.subscribe((data) => {
            this.pageFrom = parseInt(data);
            if (parseInt(data) == this.roleMenu().CGroup) {
                this.openmembers = true;
                this.newGroupForm.controls['name'].setValue(null);
                this.newGroupForm.controls['name'].setValidators(Validators.required);
                this.newGroupForm.controls['userOrganisationMappingId'].setValue(null);
                this.newGroupForm.controls['userOrganisationMappingId'].setValidators(Validators.required);
                this.newGroupForm.controls['description'].setValue(null);
            }
            this.isOpen = true;
        });

    }
    newContact_Group() {
        this._MakeGroupService.newContactGroup.subscribe((response) => {
            this.newContactGroup = response;
            this.isOpen = true;
        });
    }
    updateeditingGroup() {
        this._MakeGroupService.editGroup.subscribe((data1) => {
            this.editGroup = data1;
            if (this.editGroup) {
                this.btnTitle = 'Manage Group';
            }
            //debugger;
            this._MakeGroupService.selectedId.subscribe((data) => {
                this.selectedId = data;
                this.getSingleGroup();
            });
            this.isOpen = true;
        });

    }

    getContacts(refresh) {
        const orgId = this.organisationPageSessionService.getOrganisationId();
        const groupId = '0';
        const profileType = this.profileType().OrganisationLevel;
        debugger;
        this._ContactGroupListService.getcontactsForGroupDropDown(orgId, groupId, profileType, refresh).subscribe(users => {
            this.contacts = users;
        });
    }
    createForm() {
        const userId = this.userSessionService.userId();
        const organisationId = this.organisationPageSessionService.getOrganisationId();
        this.newGroupForm = this.formBuilder.group({
            userOrganisationMappingId: ['', null],
            name: ['', Validators.required],
            userId: [userId, null],
            // IsPublic: ['', Validators.required],
            organisationId: [organisationId, null],
            id: ['0', null],
            description: [''],
        });
        //this.isOpen = true;
    }
    getContactGroup(refresh) {
        const orgId = this.organisationPageSessionService.getOrganisationId();
        const userId = this.userSessionService.userId();
        this._ContactsGroupsService.getContactGroup(userId, orgId, refresh).subscribe(res => {
            this.data = res;
            this.fields = { text: 'name', value: 'id' };
        });

    }
    selectGroup(args) {
        if (args.itemData.isEdit == true) {
            this.selected_data = args.itemData;
            this.newGroupForm.controls['name'].setValue(this.selected_data.name);
        }
        else {
            this.alertService.success('You dont have permission to edit this group');
        }

    }
    getSingleGroup() {
        this._ContactsGroupsService.getSingleGroup(this.selectedId, true).subscribe(group => {
            this.selectedUserRecord = group;
            debugger;
            this.openmembers = false;
            this.newGroupForm.patchValue(this.selectedUserRecord);
            this.newGroupForm.controls['name'].setValue(this.selectedUserRecord.name);
            this.newGroupForm.controls['userOrganisationMappingId'].setValidators(null);
            this.newGroupForm.controls['userOrganisationMappingId'].updateValueAndValidity();
            this.isOpen = true;
        });
    }
    SubmitGroup() {
        if (this.selected_data) {
            this.click.emit(this.selected_data);
        } else if (this.pageFrom) {
            this.click.emit(this.newGroupForm.value);
        } else if (this.selectedId) {
            this.click.emit(this.newGroupForm.value);
        } else {
            let selectedId = {};
            selectedId['name'] = this.newGroupForm.value.name;
            selectedId['description'] = this.newGroupForm.value.name;
            selectedId['id'] = 0;
            this.click.emit(selectedId);
        }
        this.isOpen = false;
    }
    dialogClose() {
        this.emitClosePopupFromGroup.emit("Group Popup Closed"); //emmiting the event.
        this.isOpen = false;
    }
    dialogOpen() {
        this.isOpen = true;
    }
  /* for multiselect */
    public onCloseMultiselect: EmitType<PopupEventArgs> = (e: PopupEventArgs) => {
        e.cancel = false;
      };

      public onClose = (e) => {
        e.cancel = false;
      }
}



