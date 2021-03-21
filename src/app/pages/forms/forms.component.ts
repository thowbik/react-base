import { Component, OnInit, ViewChild, Input, EventEmitter } from '@angular/core';
import { TreeViewComponent, TabComponent } from '@syncfusion/ej2-angular-navigations';
import { ItemModel, MenuEventArgs, DropDownButtonComponent } from '@syncfusion/ej2-angular-splitbuttons';
import { GridComponent, RowSelectEventArgs, FilterSettingsModel, IFilter } from '@syncfusion/ej2-angular-grids';
import { SearchPageService } from 'src/app/services/searchpage.service';
import { NavigationService, OrganisationPageSessionService, UserSessionService, AlertService } from '../../services';
import { OrganisationService } from '../organisation/organisation.service';
import { FormsService } from './forms.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LabelTypeno, LabelPageTypeno, RolePageActionType, RecordType, RoleMenu, Duplicate } from '../../models';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { LabelService } from '../label/label.service';
import { PageSettingsModel, ToolbarItems, SearchSettingsModel, IEditCell, parentsUntil, CheckBoxChangeEventArgs } from '@syncfusion/ej2-angular-grids';
import { TreeView } from '@syncfusion/ej2-navigations';
import { truncate } from 'fs';
import { paginationDataNo } from '../../models/index';
import * as _ from "lodash";
import { DeletePopupService } from 'src/app/shared/component/deletepopup/deletepopup.service';
import { SharedlabelService } from '../../shared/component/sharedlabel/sharedlabel.service';
import { PermissionsService } from 'src/app/services/permissions.service';
import { TransferService } from 'src/app/shared/component/transfer/transfer.service';
import { ActivatedRoute } from '@angular/router';
import { TextBoxComponent } from '@syncfusion/ej2-angular-inputs';

@Component({
    selector: 'forms-dashboard',
    templateUrl: './forms.component.html',
    styleUrls: ['./forms.component.scss']
})
export class FormsComponent implements OnInit {
    public searchOptions: SearchSettingsModel;
    public initialPage: PageSettingsModel;
    public data: any;
    public commands: any;
    searchtext: any;
    public selectcount: boolean = false;
    public selectcountrole: boolean = false;
    showTransferPopup: boolean = false;
    orginizationTypes: any;
    public template: any;
    searchValue: AnalyserNode;
    public newlabelForm: FormGroup;
    public labelValue: Object[];
    public selectedlabelValues: Object[];
    public formValue: Object[];
    temppntLabel: boolean = true;
    public labelTypeno: LabelTypeno;
    public datas;
    public localDatalist: Object[];
    public isOpen: boolean = false;
    public cardTitle: any;
    public userIdGet: number;
    public treeObj: TreeView;
    public localData: { [key: string]: Object }[];
    selectedId: any;
    public labelData: Object[];
    showDeletePopup: boolean = false;
    @ViewChild('searchValue', null) public templateSearch: TextBoxComponent;
    @ViewChild('grid')
    public grid: GridComponent;
    @ViewChild('rolegrid')
    public rolegrid: GridComponent;
    @ViewChild('DeleteFormsDialog')
    @ViewChild('AddFormDialog')
    public AddFormDialog: DialogComponent;
    public DeleteFormsDialog: DialogComponent;
    public sampleData: any[];
    totalPages: number;
    public selectedrecords: any[];
    public pageType: number;
    existing_Label: boolean = false;
    selectformsData: Object[];
    TransferFromDropdownValue: any;
    TransferToDropdownValue: any;
    public TransferDialog: DialogComponent;
    pageNoType: string;
    itemType: string;
    dataLength: number;
    isAllowedDuplicate: boolean = false;
    public formId: any;
    public searchtemplate: any;
    public templateFormsData: any[];
    totalTemplate: number;
    public showDeletePopupForTemplate: boolean = false;
    public selectedTemplateFormId: any[];
    public skipval = 0;
    public isMore: boolean = false;
    LabelPageTypeno() { return LabelPageTypeno; }
    Duplicate() {
        return Duplicate;
    }

    paginationDataNo() { return paginationDataNo; }
    showLabelPopup: boolean = false;

    public editSettings: Object;
    userId: any;
    orgId: any;
    labelId: any;
    formsData: any;
    public paginationData: any[];
    public popTitle: any;
    public filterOptions: FilterSettingsModel;
    public filter: IFilter;
    public transferForm: FormGroup;
    public createForm: FormGroup;
    // public templateForms: FormGroup;
    public moreOptionButton: DropDownButtonComponent;
    @Input() emitIsMoreSelected = new EventEmitter<any>();
    public routeParams: any;
    public pagefrom: number;
    constructor(public searchPageService: SearchPageService,
        public formsService: FormsService,
        private alertService: AlertService,
        private formBuilder: FormBuilder,
        private labelService: LabelService,
        private route: ActivatedRoute,
        private navigationService: NavigationService,
        private sharedlabelService: SharedlabelService,
        private organisationService: OrganisationService,
        private deletePopupService: DeletePopupService,
        private organisationPageSessionService: OrganisationPageSessionService,
        public permissionsService: PermissionsService,
        private transferService: TransferService,
        private userSessionService: UserSessionService) {
        this.routeParams = route.snapshot.params;
        this.labelId = parseInt(this.routeParams.labelId);
    }

    RecordType() { return RecordType; }
    rolePageActionType() { return RolePageActionType; }

    public datafields: Object = { text: "name", value: 'id' };
    public fields: Object = { text: "labelName", value: 'id' };
    public field: Object = { value: 'id', parentID: 'parentId', text: 'labelName' };
    page = this.paginationDataNo().page;

    limit = this.paginationDataNo().limit;
    roleMenu() { return RoleMenu; }

    public items: ItemModel[] = [
        {
            text: 'Share'
        },
        {
            text: 'Transfer'
        },
        {
            text: 'Create Label'
        }
        // {
        //     text: 'Duplicate Form'
        // }
    ];
    ngOnInit(): void {
        this.userId = this.userSessionService.userId();
        this.orgId = this.organisationPageSessionService.getOrganisationId();
        this.organisationService.getOrganisation(this.userId, true).subscribe(organisation => {
            this.orginizationTypes = organisation;
        });
        this.searchPageService.change.subscribe(searchtext => {

            this.searchtext = searchtext;
            this.searchOptions = { fields: ['fullName'], operator: 'contains', key: this.searchtext, ignoreCase: true };
        });
        this.permissionsService.loadPermissions(this.roleMenu().FForms);

        this.initialPage = { pageSize: this.limit };
        this.editSettings = { allowDeleting: true };
        this.getForms(true);
        // this.getTemplateForm(true);
        this.TemplateFormList(true, false);
        this.filterOptions = {
            type: 'Menu'
        };
        this.filter = {
            type: 'CheckBox'
        };
        this.initialvalidators();

        // this.sampleFormData();

    }
    // sampleFormData() {
    //     this.sampleData = [
    //         //     {
    //         //     id: 1,
    //         //     templateName: "Blank Form",

    //         // }, 
    //         {
    //             id: 2,
    //             templateName: "User Testing Signoff",
    //             count: 22
    //         }, {
    //             id: 3,
    //             templateName: "Plan a college trip",
    //             count: 22
    //         }, {
    //             id: 4,
    //             templateName: "Lecture Feedback",
    //             count: 22
    //         }, {
    //             id: 5,
    //             templateName: "Leave Application",
    //             count: 22
    //         }, {
    //             id: 6,
    //             templateName: "Science Quiz",
    //             count: 22
    //         }, {
    //             id: 7,
    //             templateName: "What do you want in a Smartphone?",
    //             count: 22
    //         }, {
    //             id: 8,
    //             templateName: "XII Maths - Mock Test",
    //             count: 22
    //         }, {
    //             id: 9,
    //             templateName: "XI Maths - Mock Test",
    //             count: 22
    //         }, {
    //             id: 10,
    //             templateName: "X Maths - Mock Test",
    //             count: 22
    //         }, {
    //             id: 11,
    //             templateName: "IX Maths - Mock Test",
    //             count: 22
    //         }]
    // }
    initialvalidators() {
        this.transferForm = this.formBuilder.group({
            id: ['0', null],
            organisationId: ['', null],
            transferFromUserId: ['', Validators.required],
            transferToUserId: ['', Validators.required],
            recordType: ['', null]
        });
        this.createForm = this.formBuilder.group({
            template: ['', null],
        });
        // this.templateForms = this.formBuilder.group({
        //     organisationId: [this.orgId, null],
        //     search: ['', null],
        //     skipCount: [0, null],
        //     takeCount: [5, null],
        //     dateFrom: [null, null]
        // });
    }
    getForms(refresh) {
        this.pageType = this.LabelPageTypeno().FormPage;
        this.formsService.getForms(this.orgId, this.labelId, this.pageType, refresh).subscribe(formsData => {
            this.formsData = formsData;
            debugger;
            this.dataLength = this.formsData.length;
            this.totalPages = Math.ceil(this.formsData.length / this.limit);
            this.pageNoType = this.totalPages > 1 ? 'pages' : 'page';
            this.itemType = this.dataLength > 1 ? 'items' : 'item';
            this.paginationData = _(this.formsData)
                .drop((this.page - 1) * this.limit)
                .take(this.limit)
                .value();
            localStorage.removeItem('search');
        });
    }












    change(args: CheckBoxChangeEventArgs) {
        if (args.checked && parentsUntil(args.target, 'e-gridchkbox')) {
            this.selectedrecords = this.grid.getSelectedRecords();
            this.selectcount = this.selectedrecords.length > 0 ? true : false;
            this.isAllowedDuplicate = this.selectedrecords.length == 1 ? true : false;
        }
        else {
            this.selectcount = args.selectedRowIndexes.length > 0 ? true : false;
            this.isAllowedDuplicate = args.selectedRowIndexes.length == 1 ? true : false;
        }
    }
    select(args) {
        debugger
        if (parentsUntil(args.target, 'e-row') && !(parentsUntil(args.target as Element, 'e-gridchkbox'))) {
            // this.navigationService.goToNewQuestion(args.data.id, this.LabelPageTypeno().FormPage);
            args.cancel = true;
            let permissions = this.permissionsService.pageIds;
            debugger;
            let view_contactgrid = permissions.find(i => i === this.rolePageActionType().view);

            if ((view_contactgrid == this.rolePageActionType().view) && (args.data.isView = true))
                this.navigationService.goToNewQuestion(args.data.id, this.LabelPageTypeno().FormPage, Duplicate.None);
            else
                this.alertService.error("You don't have permission to view");

            // if ((view_contactgrid == this.rolePageActionType().edit) && (args.data.isEdit = true))
            // {
            //     this.navigationService.goToNewQuestion(args.data.id, this.LabelPageTypeno().QuestionPage);
            // }

            // else
            // {
            //     this.alertService.error("You don't have permission to edit");
            //     this.noEdit =true;
            //     //this.contactForm.controls['firstName'].disable();
            // }

        }
    }


    Next() {
        this.page = this.page + 1;
        this.paginationData = _(this.formsData)
            .drop((this.page - 1) * this.limit)
            .take(this.limit)
            .value();
    }
    Previous() {
        this.page = this.page - 1;
        this.paginationData = _(this.formsData)
            .drop((this.page - 1) * this.limit)
            .take(this.limit)
            .value();
    }
    public addLabel = function (event: any, pagefrom): void {
        this.navigationService.goTolabel(this.LabelPageTypeno().FormPage);
    }

    onDeleteForm() {
        debugger
        let selectedrecords: any[] = this.grid.getSelectedRecords();
        if (selectedrecords.length == 1) {
            this.popTitle = 'form';
        } else {
            this.popTitle = 'forms';
        }
        this.showDeletePopup = true;
        setTimeout(() => {
            this.deletePopupService.updateHeaderMessage(this.popTitle);
        }, 100);
    }

    onDeleteTemplateForm(id) {
        debugger
        this.selectedTemplateFormId = [id];
        if (this.selectedTemplateFormId.length == 1) {
            this.popTitle = 'Template Form';
        }
        this.showDeletePopupForTemplate = true;
        setTimeout(() => {
            this.deletePopupService.updateHeaderMessage(this.popTitle);
        }, 100);
    }

    okClickTemplate(args) {
        debugger
        if (args) {
            let selectItem = [];

            this.selectedTemplateFormId.forEach(function (data) {

                selectItem.push({
                    id: data
                })

            })

            this.formsService.deleteForms(selectItem).subscribe(res => {
                this.alertService.success("Template form deleted successfully");

                this.showDeletePopupForTemplate = false;
                // this.getTemplateForm(true);
                this.TemplateFormList(true, false);
                this.selectcount = false;
            });
        }
        this.showDeletePopupForTemplate = false;
    }

    okClick(agrs) {
        debugger
        if (agrs) {
            let selectItem = [];
            let selectedrecords: any[] = this.grid.getSelectedRecords();
            selectedrecords.forEach(function (data) {

                selectItem.push({
                    id: data.id
                })

            })
            this.formsService.deleteForms(selectItem).subscribe(res => {
                this.alertService.success("Form(s) deleted successfully");
                //   this.DeleteFormsDialog.hide();
                this.showDeletePopup = false;
                this.getForms(true);
                this.selectcount = false;
            });
        }
    }
    closedFromDeletePopup = function (data) {
        this.message = data;
        if (this.message) {
            this.showDeletePopup = false;
        }
    };
    public addForm = function (event: any, pagefrom): void {
        this.navigationService.goToNewQuestion('0', this.LabelPageTypeno().FormPage, Duplicate.None);
    }

    addFormPopup() {
        this.searchtemplate = "";
        this.isOpen = true;
        this.AddFormDialog.show();
        // this.getTemplateForm(true);
        this.TemplateFormList(true, false);
    }
    SearchTeamplate(a) {
        debugger
        this.createForm.controls['template'].setValue(a);
        this.searchtemplate = a;
    }
    moreOption(args: MenuEventArgs) {
        debugger;
        this.showLabelPopup = false;
        this.showTransferPopup = false;
        let pageId = this.LabelPageTypeno().FormPage;
        this.emitIsMoreSelected.emit(args.item.text)
        if (args.item.text === 'Create Label') {
            let selectedrecords: any[] = this.grid.getSelectedRecords();
            if (selectedrecords.length > 0) {
                this.existing_Label = false;
                setTimeout(() => {
                    this.sharedlabelService.pageGetId(pageId);
                    this.sharedlabelService.updateexistLabel(this.existing_Label);
                }, 100);
                this.showLabelPopup = true;
            } else {
                this.alertService.success('Please select any one form(s)');
            }
        } else if (args.item.text === 'Add an Existing Label') {
            let selectedrecords: any[] = this.grid.getSelectedRecords();
            if (selectedrecords.length > 0) {
                this.existing_Label = true;
                setTimeout(() => {
                    this.sharedlabelService.pageGetId(pageId);
                    this.sharedlabelService.updateexistLabel(this.existing_Label);
                }, 100);
                this.showLabelPopup = true;
            } else {
                this.alertService.success('Please select any one form(s)');
            }

        }
        else if (args.item.text === 'Share') {
            /*   let permissions = this.permissionsService.pageIds;
              let addviewers = permissions.find(i => i === this.rolePageActionType().addviewers);
              if (addviewers == this.rolePageActionType().addviewers) */
            this.navigationService.goToShare(this.rolePageActionType().addviewers, this.RecordType().Form);
            /*  else
                 this.alertService.error("You don't have permission to share the contact");
  */
        }
        else if (args.item.text === 'Transfer') {
            let permissions = this.permissionsService.pageIds;
            let changeownership = permissions.find(i => i === this.rolePageActionType().changeownership);
            let userRoleData = this.organisationPageSessionService.UserRoleData();

            if (changeownership == this.rolePageActionType().changeownership) {

                let selectedRecordsCheck: any[] = this.grid.getSelectedRecords();

                if (selectedRecordsCheck.length == 0 && userRoleData.isAdmin == false) {
                    this.alertService.success('Please select any one form(s)');
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
                                type: 'Forms'
                            });

                            this.transferService.updateHeaderMessage(transferInputs);
                        }, 100);
                    } else {
                        this.alertService.error("You can only transfer your own form");
                    }
                }

            } else {
                this.alertService.error("You don't have permission to transfer the form");
            }
        }
    }
    closedFromLabel = function (data) {
        this.message = data;
        if (this.message) {
            this.showLabelPopup = false;
        }
    };
    SubmitLabel(args) {
        debugger
        this.selectformsData = this.grid.getSelectedRecords();
        let formId = [];
        this.selectformsData.forEach(function (element) {
            formId.push(element['id']);
        });
        if (args.id == 0) {
            this.labelService.saveLabel(args).subscribe(response => {
                let formsMAppingData = {};

                formsMAppingData['labelId'] = response;

                formsMAppingData['formId'] = formId;
                debugger;
                this.formsService.formMapping(formsMAppingData).subscribe(data => {
                    this.getForms(true);
                    this.showLabelPopup = false;
                    //  this.newlabelForm.reset();
                    this.alertService.success("Label added successfully");
                    this.selectcount = false;
                });
            });
        } else {
            let formsMAppingData = {};
            formsMAppingData['labelId'] = args;
            formsMAppingData['formId'] = formId;
            debugger;
            this.formsService.formMapping(formsMAppingData).subscribe(data => {
                this.showLabelPopup = false;
                //  this.newlabelForm.reset();
                this.alertService.success("Label applied successfully");
                this.getForms(true);
                this.selectcount = false;
            });

        }
    }
    Transfer(args) {
        this.TransferFromDropdownValue = args[0];
        this.TransferToDropdownValue = args[1];
        this.transferForm.controls['transferFromUserId'].setValue(this.TransferFromDropdownValue);
        this.transferForm.controls['transferToUserId'].setValue(this.TransferToDropdownValue);

        if (this.transferForm.valid) {
            this.transferForm.value.organisationId = this.organisationPageSessionService.getOrganisationId();
            this.transferForm.value.userId = this.userSessionService.userId();
            let selectedContactsId = [];
            let selectedContacts: any[] = this.grid.getSelectedRecords();

            selectedContacts.forEach(function (data) {

                selectedContactsId.push(data.id);

            });
            //var Selectedarray=  Object.keys(selectedContactsId).map(function(k){return selectedContactsId[k]}).join(",");

            this.transferForm.value.recordIds = selectedContactsId;
            this.transferForm.value.recordType = RecordType.Form;

            if (this.transferForm.value.transferFromUserId != this.transferForm.value.transferToUserId) {
                this.formsService.transferOwnership(this.transferForm.value).subscribe(data => {
                    this.alertService.success("Form successfully transfered");
                    // this.Dialog.hide();
                    this.getForms(true);
                    this.TransferDialog.hide();
                });
            } else {
                this.alertService.error("Form cannot be transfer for the same user");
            }
        }
    }
    sendForm() {
        debugger;
        let selectItem = [];
        let selectedrecords: any[] = this.grid.getSelectedRecords();
        selectedrecords.forEach(function (data) {

            selectItem.push(data.id)

        })
        this.navigationService.goToResponders(selectItem, 2);
    }
    closedFromTransfer = function (data) {
        this.message = data;
        if (this.message) {
            this.showTransferPopup = false;
        }
    };
    applyLabel() {
        debugger
        this.showLabelPopup = false;
        this.showTransferPopup = false;
        let pageId = this.LabelPageTypeno().FormPage;
        // this.emitIsMoreSelected.emit(args.item.text)
        let selectedrecords: any[] = this.grid.getSelectedRecords();
        if (selectedrecords.length > 0) {
            this.existing_Label = true;
            setTimeout(() => {
                this.sharedlabelService.pageGetId(pageId);
                this.sharedlabelService.updateexistLabel(this.existing_Label);
            }, 100);
            this.showLabelPopup = true;
        } else {
            this.alertService.success('Please select any one form(s)');
        }
    }
    duplicateForm() {
        let selectedrecords: any[] = this.grid.getSelectedRecords();
        debugger;
        this.formId = selectedrecords[0].id;
        this.navigationService.goToNewQuestion(this.formId, this.LabelPageTypeno().FormPage, Duplicate.Allow);
    }

    sampleTemplateForm(formId) {
        debugger;
        this.formId = formId;
        this.navigationService.goToNewQuestion(this.formId, this.LabelPageTypeno().FormPage, Duplicate.TemplateAllow);
    }

    clear() {
        this.createForm.controls['template'].setValue(null);
    }

    // getTemplateForm(refresh) {
    //     debugger
    //     const srcText = this.searchtemplate? this.searchtemplate : "";

    //     this.formsService.getTemplateForms(this.orgId, srcText, refresh).subscribe(templateFormsData => {
    //         this.templateFormsData = templateFormsData;
    //         this.totalTemplate = this.templateFormsData.length;
    //     });

    // }

    TemplateFormList(refresh, a) {
        debugger
        const srcText = this.searchtemplate ? this.searchtemplate : "";
        let date = new Date();
        let connectuserData = {
            organisationId: this.orgId,
            search: srcText,
            skipCount: this.skipval,
            takeCount: 50,
            dateFrom: date
        }
        this.formsService.TemplateFormList(connectuserData).subscribe(data => {

            if (a == false) {
                this.templateFormsData = data;
            }
            else {

                data.forEach(element => {
                    this.templateFormsData.push(element);
                })
            }
            if (this.templateFormsData.length >= 50) {
                this.isMore = true;
            }
        });

    }

    viewMore() {
        this.skipval += 5;
        this.TemplateFormList(true, true);
    }
}