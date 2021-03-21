import { Component, OnInit, ViewChild } from '@angular/core';
import { TreeViewComponent, TabComponent, NodeCheckEventArgs } from '@syncfusion/ej2-angular-navigations';
import { ItemModel, MenuEventArgs } from '@syncfusion/ej2-angular-splitbuttons';
import { DialogComponent, DialogUtility } from '@syncfusion/ej2-angular-popups';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AlertService, OrganisationPageSessionService, UserSessionService, NavigationService } from '../../services';
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
import { LabelService } from './label.service';
import { LabelTypeno, LabelPageTypeno, paginationDataNo } from '../../models/';
import { OrganisationService } from '../organisation/organisation.service';
import { PageSettingsModel, ToolbarItems, SearchSettingsModel, IEditCell, parentsUntil, CheckBoxChangeEventArgs, SelectionSettingsModel, EditSettingsModel, Row, SaveEventArgs, QueryCellInfoEventArgs } from '@syncfusion/ej2-angular-grids';
import { TreeView } from '@syncfusion/ej2-navigations';
import { truncate } from 'fs';
import * as _ from "lodash";
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { TreeGridComponent, TreeGridModel } from '@syncfusion/ej2-angular-treegrid';
import { DeletePopupService } from '../../shared/component/deletepopup/deletepopup.service';
import { CheckBoxComponent } from '@syncfusion/ej2-angular-buttons';

@Component({
  selector: 'app-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss']
})

export class LabelComponent implements OnInit {


  public routeParams: any;
  public pagefrom: number;
  public newlabelForm: FormGroup;
  public id: number;
  orginizationTypes: any;
  temppntLabel: boolean = true;
  public labelTypeno: LabelTypeno;
  public selectedId: any;
  public cardTitle: any;
  public userIdGet: number;
  labelData: any;
  userId: any;
  organisationId: any;
  formchecked: boolean = false;
  deleteargs: any;
  deleteBtnlabel: boolean = false;
  public treeObj: TreeView;
  public localData: { [key: string]: Object }[] = null;
  showSharePopup: boolean;
  popTitle: string;
  pageBack: string;
  fieldData: any;
  public editSettings: Object;
  public selectionSettings: SelectionSettingsModel;
  showDeletePopup: boolean = false;
  backBtnTilte: any;
  public static: boolean;
  public commands: Object[];
  public field: Object = { value: 'id', parentID: 'parentId', text: 'labelName' };
  collapseTrue: boolean;
  subLabelList: boolean;
  @ViewChild('AddLabelDialog')
  public AddLabelDialog: DialogComponent;

  @ViewChild('Contactsdropdown')
  public ContactdropDownListObject: any;

  @ViewChild('sample1')
  public dropdownObj: any;

  @ViewChild('DeleteDialog')
  public DeleteDialog: DialogComponent;

  @ViewChild('treeGridContainer')
  public treeGridComponent: TreeGridComponent;
  @ViewChild('checkbox')
  public checkbox: CheckBoxComponent;

  LabelPageTypeno() { return LabelPageTypeno; }

  paginationDataNo() { return paginationDataNo; }


  constructor(
    private alertService: AlertService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private labelService: LabelService,
    private location: Location,
    private navigationService: NavigationService,
    private organisationService: OrganisationService,
    private organisationPageSessionService: OrganisationPageSessionService,
    private userSessionService: UserSessionService, private deletePopupService: DeletePopupService, ) {
    this.routeParams = route.snapshot.params;
    this.pagefrom = parseInt(this.routeParams.pagefrom);
  }

  ngOnInit(): void {
    if (this.pagefrom == this.LabelPageTypeno().FormPage) {
      this.backBtnTilte = 'Forms';
      this.pageBack = 'forms';
    } else {
      this.backBtnTilte = 'Questions';
      this.pageBack = 'questions';
    }
    //  this.collapseTrue = true;
    this.commands = [{ type: 'Edit', buttonOption: { content: 'Edit', cssClass: 'edit_button_label' } }];

    this.formchecked = false;
    this.editSettings = {
      allowEditing: true
    };
    this.userId = this.userSessionService.userId();
    this.organisationId = this.organisationPageSessionService.getOrganisationId();
    this.organisationService.getOrganisation(this.userId, true).subscribe(organisation => {
      this.orginizationTypes = organisation;
    });

    this.createLabel();
    this.labelList(true);
    this.getLabel(true);
  }
  createLabel() {
    this.newlabelForm = this.formBuilder.group({
      id: [0],
      labelName: [null],
      userId: [null],
      organisationId: [null],
      parentId: [0, null],
      labelType: [null],
      labelPageType: [this.pagefrom],
    });

  }
  ngAfterViewInit() {
    // this.labelList(true);
    // this.getLabel(true);
  }
  getLabel(refresh) {
    const srcText = localStorage.search ? localStorage.search : "";
    this.labelService.getLabelList(this.organisationId, srcText, this.pagefrom, refresh).subscribe(data1 => {
      if (this.pagefrom == this.LabelPageTypeno().QuestionPage) {
        data1.unshift({
          id: 0,
          labelName: 'All Questions',
          parentId: null,
          labelPageType: this.pagefrom
        });
      } else if (this.pagefrom == this.LabelPageTypeno().FormPage) {
        data1.unshift({
          id: 0,
          labelName: 'All Forms',
          parentId: null,
          labelPageType: this.pagefrom
        });
      }

      data1.forEach(element => {
        this.userIdGet = element.id;
        if (element.parentId == 0) {
          element.id = element.id;
          element.labelName = element.labelName;
          element.labelPageType = element.labelPageType;
          element.labelType = element.labelType;
          element.organisationId = element.organisationId;
          element.parentId = null;
          element.userId = element.userId;
        } else {
          element.id = element.id;
          element.labelName = element.labelName;
          element.labelPageType = element.labelPageType;
          element.labelType = element.labelType;
          element.organisationId = element.organisationId;
          element.parentId = element.parentId;
          element.userId = element.userId;
        }
        return element;
      });
      this.labelData = data1;
      setTimeout(() => {
        this.collapseTrue = true;
      }, 1000);
      //this.addLabel(this.pagefrom);
    });

  }
  addLabel(pagefrom) {
    if (this.checkbox != undefined)
      this.checkbox.checked = false;
    this.createLabel();
    this.selectedId = 0;
    this.deleteBtnlabel = false;
    this.cardTitle = this.selectedId == 0 ? 'Add New Label' : 'Manage Label';
    this.newlabelForm.controls['parentId'].setValue(null);
    this.newlabelForm.controls['labelName'].setValue(null);
    this.labelList(true);
    this.AddLabelDialog.show();
  }
  labelParent(event) {
    debugger
    this.newlabelForm.controls['parentId'].setValue(null);
    this.treeObj = undefined;
    debugger
    if (event.checked == true) {
      this.temppntLabel = false;
    } else {

      this.temppntLabel = true;
    }
  }

  labelList(refresh) {
    const srcText = localStorage.search ? localStorage.search : "";
    this.labelService.getLabelList(this.organisationId, srcText, this.pagefrom, true).subscribe(data => {
      data.forEach(element => {
        let item = data.find(({ parentId }) => parentId === element.id);
        if (item != undefined && item != null) {
          element.hasChild = true;
        }
        else {
          if (element.parentId != 0)
            element.pid = element.parentId;
        }
        element.name = element.labelName;
      });

      this.localData = data;
    });
  }

  public onOpen = (args) => {
    debugger
    if (this.treeObj) {
      this.treeObj.destroy();
    }
    if (this.localData.length == 0) {
      this.dropdownObj.popupObj.element.querySelector('#tree').innerHTML = "No records found";
    } else {
      this.dropdownObj.popupObj.element.firstElementChild.className = "e-content overflow";

      //if (this.treeObj == null || this.treeObj == undefined) {
      this.treeObj = new TreeView({
        fields: { dataSource: this.localData, id: 'id', parentID: 'pid', text: 'labelName', hasChildren: 'hasChild' },
        nodeSelected: (args: any) => {
          debugger
          let drop = (document.getElementById("games") as any).ej2_instances[0];
          drop.inputElement.value = args.nodeData.text;
          this.newlabelForm.controls['parentId'].setValue(args.nodeData.id);
          drop.hidePopup();
        }
      });
      this.treeObj.appendTo('#tree');
      this.treeObj.refresh();
      //}
    }
    this.labelList(true);
  }

  closedFromDeletePopup = function (data) {
    this.message = data;
    if (this.message) {
      this.showDeletePopup = false;
    }
  };
  queryCellInfo(args: QueryCellInfoEventArgs): void {
    if (args.data['index'] == 0) {
      if (args.cell.classList.contains("e-unboundcell")) {
        args.cell.querySelector('.e-unboundcelldiv').setAttribute('style', 'display:none');;
        // args.cell.innerText = "";

      }
    }
  }
  actionBegin(args): void {
    debugger
    this.formchecked = true;
    this.checkbox.checked = true;
    this.localData = this.localData.filter(e => e.id != args.rowData.id);
    this.deleteargs = args.rowData;
    if (args.requestType === 'beginEdit' || args.requestType === 'add') {
      this.newlabelForm.patchValue(args.rowData);
      this.deleteBtnlabel = true;
      if (args.rowData.parentId == null) {
        this.dropdownObj.value = null;
        this.temppntLabel = true;
        this.formchecked = false;
        this.checkbox.checked = false;
      }
      else {
        let drop = (document.getElementById("games") as any).ej2_instances[0];
        drop.inputElement.value = args.rowData.parentItem.labelName;
        this.formchecked = true;
        this.temppntLabel = false;
        this.checkbox.checked = true;
      }
      this.cardTitle = 'Manage Label';
      setTimeout(() => {
        this.AddLabelDialog.show();
      }, 0);
      
    }
  }
  onDeleteLabel() {
    debugger
    if (this.deleteargs.length == 1) {
      this.popTitle = 'label';
    } else {
      this.popTitle = 'labels';
    }
    this.showDeletePopup = true;
    setTimeout(() => {
      this.deletePopupService.updateHeaderMessage(this.popTitle);
    }, 100);
  }
  okClick(agrs) {
    if (agrs) {
      let selectItem = [];
      selectItem.push({
        id: this.deleteargs.id
      })
      this.labelService.deleteLabel(selectItem).subscribe(res => {
        this.AddLabelDialog.hide();
        this.alertService.success("Label(s) deleted successfully");
        this.showDeletePopup = false;
        this.getLabel(true);
      });
    }

  }
  formsQuestionPage(args) {
    if (!args.target.classList.contains("e-btn") && !args.target.classList.contains("e-treegridexpand") && !args.target.classList.contains("e-treegridcollapse")) {
      if (args.data.labelPageType == this.LabelPageTypeno().QuestionPage) {
        this.navigationService.goToQuestion(args.data.id);
      }
      else if (args.data.labelPageType == this.LabelPageTypeno().FormPage) {
        this.navigationService.goToForms(args.data.id);
      }

    }
  }
  Submit() {
    debugger
    if (this.newlabelForm.value.labelName) {
      if (this.checkbox.checked == true) {
        this.newlabelForm.controls['parentId'].setValidators(Validators.required);
        this.newlabelForm.controls['parentId'].updateValueAndValidity();
        // if (this.treeObj == undefined) {
        //   this.alertService.error("Choose the sub label");
        // }
        // else {
           //var asdasd= this.treeObj.getAllCheckedNodes();
          //this.newlabelForm.value.parentId = this.treeObj.getTreeData(this.treeObj.selectedNodes[0])[0].id;
          if (!this.newlabelForm.value.parentId) {
            this.alertService.error("Choose the sub label");
          }
          else
          {
          this.submitdata();
          }
        // }
      } else {
        /*  this.newlabelForm.controls['parentId'].setValidators(null);
         this.newlabelForm.controls['parentId'].updateValueAndValidity(); */
        this.newlabelForm.value.parentId = 0;
        this.submitdata();
      }
      // if(this.newlabelForm.value.parentId ==this.newlabelForm.value.id){
      //   this.alertService.error("Label Name is required");
      // }
    }
    else {
      this.alertService.error("Label Name is required");
    }
  }
  submitdata() {
    this.newlabelForm.value.labelType = LabelTypeno.labelTypeno;
    this.newlabelForm.value.labelPageType = this.pagefrom;
    this.newlabelForm.value.userId = this.userId;
    this.newlabelForm.value.organisationId = this.organisationId;
    this.labelService.saveLabel(this.newlabelForm.value).subscribe(data => {
      if (this.selectedId == 0) {
        this.alertService.success("Label created successfully");
      }
      else {
        this.alertService.success("Label Updated successfully");
      }
      this.getLabel(true);
      this.labelList(true);
      this.newlabelForm.reset();
      // this.collapseTrue = true;
      this.AddLabelDialog.hide();
    });


  }
  public onClose = (e) => {
    e.cancel = true;
    this.labelList(true);
  }
}