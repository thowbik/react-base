import { Component, OnInit, ViewChild, AfterViewInit, EventEmitter, Input } from '@angular/core';
import { PageSettingsModel, SearchSettingsModel } from '@syncfusion/ej2-angular-grids';
import { ToolbarItems, CheckBoxChangeEventArgs, parentsUntil, FilterSettingsModel, IFilter } from '@syncfusion/ej2-grids';
import { GridComponent, RowSelectEventArgs } from '@syncfusion/ej2-angular-grids';
import { UserSessionService, OrganisationPageSessionService, AlertService, NavigationService } from '../../services';
import { SearchPageService } from 'src/app/services/searchpage.service';

import { DialogComponent, DialogUtility } from '@syncfusion/ej2-angular-popups';
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { QuestionsService } from './questions.service';
import { LabelTypeno, LabelPageTypeno, RecordType, RolePageActionType, RoleMenu, paginationDataNo, Duplicate } from '../../models';
import { TreeView } from '@syncfusion/ej2-navigations';
import { OrganisationService } from '../organisation/organisation.service';
import { DeletePopupService } from '../../shared/component/deletepopup/deletepopup.service';
import { ItemModel, MenuEventArgs, DropDownButtonComponent } from '@syncfusion/ej2-angular-splitbuttons';
import { PermissionsService } from 'src/app/services/permissions.service';
import { SharedlabelService } from '../../shared/component/sharedlabel/sharedlabel.service';
import { LabelService } from '../label/label.service';
import { TransferService } from 'src/app/shared/component/transfer/transfer.service';
import { Search } from '@syncfusion/ej2-dropdowns';
// import * as _ from 'underscore';
import * as _ from "lodash";
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'questions-dashboard',
    templateUrl: './questions.component.html',
    styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {
    public searchOptions: SearchSettingsModel;
    public initialPage: PageSettingsModel;
    public selectcount: boolean = false;
    public selectcountrole: boolean = false;
    searchtext: any;
    public data: any;
    public localDatalist: Object[];
    public newlabelForm: FormGroup;
    public isOpen: boolean = false;
    showTransferPopup: boolean = false;
    temppntLabel: boolean = true;
    public TransferDialog: DialogComponent;
    public totalPages: any;
    public paginationData: any[];
    public formId: number;
    isAllowedDuplicate: boolean = false;
    Duplicate() {
        return Duplicate;
    }



    @ViewChild('connectgrid')
    public connectgrid: GridComponent;
    public isOpenDialogue: boolean = false;
    // public localData: { [key: string]: Object }[];
    public labelData: Object[];
    public labelValue: Object[];
    selectedId: any;
    public cardTitle: any;
    public userIdGet: number;
    public treeObj: TreeView;
    orginizationTypes: any;
    public localData: { [key: string]: Object }[];
    showDeletePopup: boolean = false;
    @ViewChild('grid')
    public grid: GridComponent;
    popTitle: string;
    public moreOptionButton: DropDownButtonComponent;
    @Input() emitIsMoreSelected = new EventEmitter<any>();
    public singleselect: DropDownListComponent;
    @ViewChild('moreButton')
    /* 
        @ViewChild('DeleteQuestionDialog')
        public DeleteQuestionDialog: DialogComponent; */
    public labelChild: Object[];

    public animation: object = { previous: { effect: 'SlideLeftIn', duration: 1000, easing: 'ease' }, next: { effect: 'SlideRightIn', duration: 1000, easing: 'ease' } };
    public orgId: any;
    public labelId: any;
    public pageType: number;
    public noEdit: boolean = false;
    existing_Label: boolean = false;
    selectformsData: Object[];
    showLabelPopup: boolean = false;
    public filterOptions: FilterSettingsModel;
    public filter: IFilter;
    public transferForm: FormGroup;
    TransferFromDropdownValue: any;
    TransferToDropdownValue: any;
    public routeParams: any;
    dataLength: any;
    pageNoType: string;
    itemType: string;
    constructor(
        private alertService: AlertService,
        private organisationPageSessionService: OrganisationPageSessionService,
        private userSessionService: UserSessionService,
        private formBuilder: FormBuilder,
        private labelService: LabelService,
        private route: ActivatedRoute,
        private deletePopupService: DeletePopupService,
        private organisationService: OrganisationService,
        public searchPageService: SearchPageService,
        private sharedlabelService: SharedlabelService,
        public permissionsService: PermissionsService,
        public navigationService: NavigationService,
        private transferService: TransferService,
        private _QuestionsService: QuestionsService,

        public questionsService: QuestionsService) {
        this.routeParams = route.snapshot.params;
        this.labelId = parseInt(this.routeParams.labelId);
    }
    paginationDataNo() { return paginationDataNo; }




    RecordType() { return RecordType; }
    rolePageActionType() { return RolePageActionType; }
    LabelPageTypeno() { return LabelPageTypeno; }

    limit = this.paginationDataNo().limit;
    page = this.paginationDataNo().page;


    public datafields: Object = { text: "name", value: 'id' };
    public fields: Object = { text: "labelName", value: 'id' };
    public field: Object = { value: 'id', parentID: 'parentId', text: 'labelName' };
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
        },
        // {
        //     text: 'Add an  Existing Label'
        // }
    ];


    ngOnInit(): void {
        let userId = this.userSessionService.userId();
        this.organisationService.getOrganisation(userId, true).subscribe(organisation => {
            this.orginizationTypes = organisation;
        });
        this.orgId = this.organisationPageSessionService.getOrganisationId();
        /*  this.questionsService.getLabelList(orgId, true).subscribe(data => {
             data.forEach(element => {
                 let item = data.find(({ parentId }) => parentId === element.id);
                 if (item != undefined && item != null)
                     element.hasChild = true;
                 else
                     element.hasChild = false;
             });
             this.localData = data;
         }); */
        this.permissionsService.loadPermissions(this.roleMenu().QQuestions);
        this.initialPage = { pageSize: 5 };
        this.searchPageService.change.subscribe(searchtext => {

            this.searchtext = searchtext;
            this.searchOptions = { fields: ['fullName'], operator: 'contains', key: this.searchtext, ignoreCase: true };
        });
        this.getQuestions(true);
        this.filterOptions = {
            type: 'Menu'
        };
        this.filter = {
            type: 'CheckBox'
        };
        this.initialvalidators();
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
    getQuestions(refresh) {
        debugger;
        this.pageType = this.LabelPageTypeno().QuestionPage;
        //let userId = this.userSessionService.userId();
        const srcText = localStorage.search ? localStorage.search : "";
        // alert(this.searchtext + " getContacts");
        debugger;
        this.questionsService.getQuestions(this.orgId, this.labelId, this.pageType, refresh).subscribe(questions => {
            this.data = questions;
            this.dataLength = this.data.length;
            this.totalPages = Math.ceil(this.data.length / this.limit);
            this.pageNoType = this.totalPages > 1 ? 'pages' : 'page'; 
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
    rowSelectedToggle() {
        let selectedrecords: any[] = this.grid.getSelectedRecords();
        console.log(selectedrecords);
        this.selectcount = selectedrecords.length > 0 ? true : false;

    }
    onDeleteQuestion() {
        let selectedrecords: any[] = this.grid.getSelectedRecords();
        if (selectedrecords.length == 1) {
            this.popTitle = 'question';
        } else {
            this.popTitle = 'questions';
        }

        this.showDeletePopup = true;
        setTimeout(() => {
            this.deletePopupService.updateHeaderMessage(this.popTitle);
        }, 100);
    }
    /*  public header: string = 'Confirmation';
     public bodycontents: string = 'Are you sure you want to delete the selected question?'
     public showCloseIcon: Boolean = true;
     public width: string = '35%';
     public animationSettings: Object = { effect: 'None' };
     public hide: any;
 
     public dlgButtons: Object[] = [{ click: this.okClick.bind(this), buttonModel: { content: 'Yes', isPrimary: 'true', cssClass: 'header-actions-button' } }, { click: this.cancelClick.bind(this), buttonModel: { content: 'No', cssClass: 'header-actions-button' } }]; */

    okClick(agrs) {
        debugger;
        if (agrs) {
            let selectItem = [];
            let selectedrecords: any[] = this.grid.getSelectedRecords();

            selectedrecords.forEach(function (data) {

                selectItem.push({
                    id: data.id
                })

            })
            this.questionsService.deleteQuestion(selectItem).subscribe(res => {
                this.alertService.success("Questions(s) deleted successfully");
                this.showDeletePopup = false;
                //  this.DeleteQuestionDialog.hide();
                this.getQuestions(true);
            });
        }
    }

    select(args) {

        if (parentsUntil(args.target, 'e-row') && !(parentsUntil(args.target as Element, 'e-gridchkbox'))) {
            // this.navigationService.goToNewQuestion(args.data.id, this.LabelPageTypeno().QuestionPage);

            args.cancel = true;
            let permissions = this.permissionsService.pageIds;
            debugger;
            let view_contactgrid = permissions.find(i => i === this.rolePageActionType().view);

            if ((view_contactgrid == this.rolePageActionType().view) && (args.data.isView = true))
                this.navigationService.goToNewQuestion(args.data.id, this.LabelPageTypeno().QuestionPage,Duplicate.None);
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
    change(args: CheckBoxChangeEventArgs) {
        if (args.checked && parentsUntil(args.target, 'e-gridchkbox')) {
            let selectedrecords: any[] = this.grid.getSelectedRecords();
            this.selectcount = selectedrecords.length > 0 ? true : false;
            this.isAllowedDuplicate = selectedrecords.length == 1 ? true : false;
        }
        else {
            this.selectcount = args.selectedRowIndexes.length > 0 ? true : false;
            this.isAllowedDuplicate = args.selectedRowIndexes.length == 1 ? true : false;
        }
    }
    closedFromDeletePopup = function (data) {
        this.message = data;
        if (this.message) {
            this.showDeletePopup = false;
        }
    };
    public goToQuestion = function (event: any, pagefrom): void {
        this.navigationService.goToNewQuestion('0', this.LabelPageTypeno().QuestionPage,Duplicate.None);
    }
    public addLabel = function (event: any, pagefrom): void {
        this.navigationService.goTolabel(this.LabelPageTypeno().QuestionPage);
    }

    moreOption(args: MenuEventArgs) {
        // this.showTransferPopup = false;
        this.showLabelPopup = false;
        this.showTransferPopup = false;
        let pageId = this.LabelPageTypeno().QuestionPage;
        this.emitIsMoreSelected.emit(args.item.text)
        if (args.item.text === 'Share') {
            /*   let permissions = this.permissionsService.pageIds;
              let addviewers = permissions.find(i => i === this.rolePageActionType().addviewers);
              if (addviewers == this.rolePageActionType().addviewers) */
            this.navigationService.goToShare(this.rolePageActionType().addviewers, this.RecordType().Question);
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
                    this.alertService.success('Please select any one question(s)');
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
                                type: 'Questions'
                            });

                            this.transferService.updateHeaderMessage(transferInputs);
                        }, 100);
                    } else {
                        this.alertService.error("You can only transfer your own question");
                    }
                }

            } else {
                this.alertService.error("You don't have permission to transfer the Question");
            }
        }
        else if (args.item.text === 'Create Label') {
            this.existing_Label = false;
            let selectedrecords: any[] = this.grid.getSelectedRecords();
            if (selectedrecords.length > 0) {
                setTimeout(() => {
                    this.sharedlabelService.pageGetId(pageId);
                    this.sharedlabelService.updateexistLabel(this.existing_Label);
                }, 100);
                this.showLabelPopup = true;
            } else {
                this.alertService.success('Please select any one question(s)');
            }
        } else if (args.item.text === 'Add an  Existing Label') {
            let selectedrecords: any[] = this.grid.getSelectedRecords();
            if (selectedrecords.length > 0) {
                this.existing_Label = true;
                setTimeout(() => {
                    this.sharedlabelService.pageGetId(pageId);
                    this.sharedlabelService.updateexistLabel(this.existing_Label);
                }, 100);
                this.showLabelPopup = true;
            } else {
                this.alertService.success('Please select any one question(s)');
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
                this.questionsService.formMapping(formsMAppingData).subscribe(data => {
                    this.getQuestions(true);
                    this.showLabelPopup = false;
                    //   this.newlabelForm.reset();
                    this.alertService.success("Label added successfully");
                    this.selectcount=false;

                });
            });
        } else {
            let formsMAppingData = {};
            formsMAppingData['labelId'] = args;
            formsMAppingData['formId'] = formId;
            debugger;
            this.questionsService.formMapping(formsMAppingData).subscribe(data => {
                this.showLabelPopup = false;
                //  this.newlabelForm.reset();
                this.alertService.success("Label updated successfully");
                this.getQuestions(true);
                this.selectcount=false;
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
            this.transferForm.value.recordType = RecordType.Question;

            if (this.transferForm.value.transferFromUserId != this.transferForm.value.transferToUserId) {
                this._QuestionsService.transferOwnership(this.transferForm.value).subscribe(data => {
                    this.alertService.success("Question successfully transfered");
                    // this.Dialog.hide();
                    this.getQuestions(true);
                    this.TransferDialog.hide();
                });
            } else {
                this.alertService.error("Question cannot be transfer for the same user");
            }
        }
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
        let pageId = this.LabelPageTypeno().QuestionPage;
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
            this.alertService.success('Please select any one question(s)');
        }
    }

    duplicateForm() {
        let selectedrecords: any[] = this.grid.getSelectedRecords();  
        debugger;
        this.formId = selectedrecords[0].id;
        this.navigationService.goToNewQuestion(this.formId, this.LabelPageTypeno().QuestionPage,Duplicate.Allow);
    }
}

