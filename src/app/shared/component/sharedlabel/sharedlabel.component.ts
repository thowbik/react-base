import { Component, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { TreeViewComponent, TabComponent, NodeCheckEventArgs } from '@syncfusion/ej2-angular-navigations';
import { ItemModel, MenuEventArgs } from '@syncfusion/ej2-angular-splitbuttons';
import { DialogComponent, DialogUtility } from '@syncfusion/ej2-angular-popups';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AlertService, OrganisationPageSessionService, UserSessionService } from '../../../services';
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
import { PageSettingsModel, ToolbarItems, SearchSettingsModel, IEditCell, parentsUntil, CheckBoxChangeEventArgs, SelectionSettingsModel, EditSettingsModel, Row, SaveEventArgs } from '@syncfusion/ej2-angular-grids';
import { TreeView } from '@syncfusion/ej2-navigations';
import { truncate } from 'fs';
import * as _ from "lodash";
import { ActivatedRoute } from '@angular/router';
import { TreeGridComponent } from '@syncfusion/ej2-angular-treegrid';
import { LabelTypeno, LabelPageTypeno, paginationDataNo } from '../../../models/index';
import { LabelService } from '../../../pages/label/label.service';
import { SharedlabelService } from './sharedlabel.service';
import { CheckBoxComponent } from '@syncfusion/ej2-angular-buttons';

@Component({
  selector: 'app-sharedlabel',
  templateUrl: './sharedlabel.component.html',
  styleUrls: ['./sharedlabel.component.scss']
})
export class SharedlabelComponent implements OnInit {

  public routeParams: any;
  //public pagefrom: number;
  public datas: Object[];
  public newlabelForm: FormGroup;
  public isOpen: boolean = false;

  temppntLabel: boolean = false;

  labelData: any;
  userId: any;
  organisationId: any;
  formchecked: boolean;

  @ViewChild('AddLabelDialog')
  public AddLabelDialog: DialogComponent;

  @ViewChild('checkbox')
  public checkbox: CheckBoxComponent;

  @ViewChild('sample1')
  public dropdownObj: any;
  public treeObj: TreeView;
  public localData: { [key: string]: Object }[] = null;
  popTitle: string;
  selectedId: number;
  cardTitle: string;
  LabelPageTypeno() { return LabelPageTypeno; }
  paginationDataNo() { return paginationDataNo; }
  fieldData: any;
  pageFrom: any;
  @Output() click = new EventEmitter<any>();
  @Output() emitClosePopupFromLabel: EventEmitter<String> = new EventEmitter<String>();
  public updateLabel: any;
  public chooseLabel: any;

  constructor(
    private alertService: AlertService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private labelService: LabelService,
    private userSessionService: UserSessionService,
    private sharedlabelService: SharedlabelService,
    private organisationPageSessionService: OrganisationPageSessionService) {
  }
  public field: Object = { value: 'id', parentID: 'parentId', text: 'labelName' };
  public commands: Object[];
  ngOnInit() {
    this.pageGetId();
  }
  pageGetId() {
    this.sharedlabelService.pagefrom.subscribe((data) => {
      this.pageFrom = parseInt(data);
      this.createLabel();
      this.organisationId = this.organisationPageSessionService.getOrganisationId();
      this.userId = this.userSessionService.userId();
      this.existingLabel();
      this.labelList(true);
    });

  }
  existingLabel() {
    debugger
    this.sharedlabelService.existLabel.subscribe((data) => {
      this.updateLabel = data;
      if (this.updateLabel == true) {
        this.cardTitle = 'Apply Label';
        this.chooseLabel = 'Choose Label';
        this.temppntLabel = false;
        this.formchecked = true;
      } else {
        this.cardTitle = 'Create Label';
        this.chooseLabel = 'Create as Sub - Label under';
        this.formchecked = false;
        this.temppntLabel = true;
      }

    });
  }
  createLabel() {
    this.newlabelForm = this.formBuilder.group({
      id: [0],
      labelName: [null],
      userId: [null],
      organisationId: [null],
      parentId: [0],
      labelType: [null],
      labelPageType: [this.pageFrom],
    });
    this.isOpen = true;
    this.newlabelForm.controls['parentId'].setValue(null);
    this.newlabelForm.controls['labelName'].setValue(null);
  }
  labelParent(event) {
    debugger
    this.newlabelForm.controls['parentId'].setValue(null);
    this.treeObj = undefined;
    if (event.checked == true) {
      this.temppntLabel = false;
    } else {
      this.newlabelForm.controls['parentId'].setValue(null);
      this.temppntLabel = true;
    }
  }

  labelList(refresh) {
    const srcText = localStorage.search ? localStorage.search : "";
    this.labelService.getLabelList(this.organisationId, srcText, this.pageFrom, true).subscribe(data => {
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

  public onOpen = () => {
    if (this.localData.length == 0) {
      this.dropdownObj.popupObj.element.querySelector('#tree').innerHTML = "No records found";
    } else {
      this.dropdownObj.popupObj.element.firstElementChild.className = "e-content overflow";
      // rendering the treeview only on first time 
      if (this.treeObj == null || this.treeObj == undefined) {
        this.treeObj = new TreeView({
          fields: { dataSource: this.localData, id: 'id', parentID: 'pid', text: 'name', hasChildren: 'hasChild' },
          nodeSelected: (args: any) => {
            let drop = (document.getElementById("games") as any).ej2_instances[0];
            drop.inputElement.value = args.nodeData.text;
            this.newlabelForm.controls['parentId'].setValue(args.nodeData.id);
            drop.hidePopup();
          }
        });
        this.treeObj.appendTo('#tree');
        this.treeObj.refresh();
      }
    }
  }

  Submit() {
    debugger
    if (this.newlabelForm.value.labelName || this.updateLabel) {
      this.newlabelForm.value.labelType = LabelTypeno.labelTypeno;
      this.newlabelForm.value.labelPageType = this.pageFrom;
      this.newlabelForm.value.userId = this.userId;
      this.newlabelForm.value.organisationId = this.organisationId;

      if (this.updateLabel == true) {
        if (!this.treeObj) {
          this.alertService.error("Choose the label");
        }
        else {
          let labelId = this.treeObj.selectedNodes[0];
          if (!labelId) {
            this.alertService.error("Choose the label");
          } else {
            this.click.emit(labelId);
          }
        }
      }
      else {
        if (this.temppntLabel == false) {

          if (this.checkbox.checked == true) {
            if (!this.treeObj) {
              this.alertService.error("Choose the sub label");
            }
            else {
              //this.newlabelForm.value.parentId =  this.treeObj.getTreeData(this.treeObj.selectedNodes[0])[0].id;
              if (!this.newlabelForm.value.parentId) {
                this.alertService.error("Choose the sub label");
              }
              else {
                this.click.emit(this.newlabelForm.value);
              }
            }
          }
        }
        else {
          this.newlabelForm.value.parentId = 0;
          this.click.emit(this.newlabelForm.value);
        }
      }

    }
    else {
      this.alertService.error("Label Name is required");
    }
  }

  dialogClose() {
    this.emitClosePopupFromLabel.emit("Label Popup Closed"); //emmiting the event.
    this.isOpen = false;
  }
  dialogOpen() {
    this.isOpen = true;
  }
  public onClose = (e) => {
    e.cancel = true;
  }
}
