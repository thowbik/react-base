import { Component, OnInit, ViewChild } from '@angular/core';
import { TreeViewComponent, TabComponent, NodeCheckEventArgs } from '@syncfusion/ej2-angular-navigations';
import { ItemModel, MenuEventArgs } from '@syncfusion/ej2-angular-splitbuttons';
import { DialogComponent, DialogUtility } from '@syncfusion/ej2-angular-popups';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
import { PageSettingsModel, ToolbarItems, SearchSettingsModel, IEditCell, parentsUntil, CheckBoxChangeEventArgs } from '@syncfusion/ej2-angular-grids';
import { AlertService, NavigationService, OrganisationPageSessionService, UserSessionService } from '../../services';
import { QuestionsService } from '../questions/questions.service';
import { OrganisationService } from '../organisation/organisation.service';
import { LabelTypeno, LabelPageTypeno } from '../../models';
import { TreeView } from '@syncfusion/ej2-navigations';

@Component({
  selector: 'app-questionlabel',
  templateUrl: './questionlabel.component.html',
  styleUrls: ['./questionlabel.component.scss']
})
export class QuestionlabelComponent implements OnInit {


  public datas: Object[];
  public localDatalist: Object[];
  public localData: { [key: string]: Object }[];
  public labelData: Object[];
  public labelValue: Object[];
  public selectedlabelValues: Object[];
  public formValue: Object[];
  public allowEditing: boolean = true;
  public newlabelForm: FormGroup;
  public id: number;
  public isOpen: boolean = false;
  orginizationTypes: any;
  temppntLabel: boolean = true;
  public labelTypeno: LabelTypeno;
  selectedId: any;
  public cardTitle: any;
  public userIdGet: number;
  public treeObj: TreeView;

  @ViewChild('AddLabelDialog')
  public AddLabelDialog: DialogComponent;

  @ViewChild('Contactsdropdown')
  public ContactdropDownListObject: DropDownListComponent;


  @ViewChild('sample1')
  public dropdownObj: any;

  constructor(
    private alertService: AlertService,
    private formBuilder: FormBuilder,
    private questionsService: QuestionsService,
    private navigationService: NavigationService,
    private organisationService: OrganisationService,
    private organisationPageSessionService: OrganisationPageSessionService,
    private userSessionService: UserSessionService) {
  }
  public datafields: Object = { text: "name", value: 'id' };
  public fields: Object = { text: "labelName", value: 'id' };
  public field: Object = { value: 'id', parentID: 'parentId', text: 'labelName' };

  ngOnInit() {
    this.createLabel();
    this.getLabel(false);
    let userId = this.userSessionService.userId();
    this.organisationService.getOrganisation(userId, true).subscribe(organisation => {
      this.orginizationTypes = organisation;
    });

    let orgId = this.organisationPageSessionService.getOrganisationId();
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
  }

  getLabel(refresh) {
    let orgId = this.organisationPageSessionService.getOrganisationId();

    /* this.questionsService.getLabelList(orgId, refresh).subscribe(data => {
      // this.localDatalist = data;
      // this.userIdGet = data.id;
      this.selectedId = 0;
      this.cardTitle = this.selectedId === 0 ? 'Add New Label' : 'Manage Label';
      
      if(data.length>0){
        data.forEach(element => {
          this.userIdGet = element.id;
          if(element.parentId == 0)
            delete element.parentId;
            return element;   
        }); 
      }
      this.labelData = data;  
    }); */
  }
  createLabel() {
    const userId = this.userSessionService.userId();
    const organisationId = this.organisationPageSessionService.getOrganisationId();
    this.newlabelForm = this.formBuilder.group({
      id: [0],
      labelName: [null],
      userId: [userId, null],
      organisationId: [organisationId, null],
      parentId: [0],
      labelType: [0],
      labelPageType: [0],
    });
  }

  getQuestionLabelSelect(args) {

    if (parentsUntil(args.target, 'e-row') && !(parentsUntil(args.target as Element, 'e-gridchkbox'))) {
        args.cancel = true;
        this.selectedId = args.data.id;
        this.AddLabelDialog.show();
        this.getLabel(true);
    }

}

  public addLabel = function (event: any): void {
    this.selectedId = 0;
    this.cardTitle = this.selectedId === 0 ? 'Add New Label' : 'Manage Label';
    this.getLabel(false);
    this.AddLabelDialog.show();
  };

  labelParent(event) {
    if (event.checked == true) {
      this.temppntLabel = false;
    } else {
      this.temppntLabel = true;
    }
  }
  Submit() {

    this.newlabelForm.value.labelType = LabelTypeno.labelTypeno;
    this.newlabelForm.value.labelPageType = LabelPageTypeno.QuestionPage;

   /*  this.questionsService.saveLabel(this.newlabelForm.value).subscribe(data => {
      this.getLabel(true);
      this.AddLabelDialog.hide();
      this.newlabelForm.reset();
   //   this.navigationService.goTolabel();
    }); */
  }

  public onOpen = () => {
    this.dropdownObj.popupObj.element.firstElementChild.className = "e-content overflow";
    // rendering the treeview only on first time 
    if (this.treeObj == null || this.treeObj == undefined) {
      this.treeObj = new TreeView({
        fields: { dataSource: this.localData, id: 'id', parentID: 'parentId', text: 'labelName', hasChildren: 'hasChild' },
        // use the nodeselected event to add the text to dropdown's input element.
        nodeSelected: (args: any) => {
          let drop = (document.getElementById("games") as any).ej2_instances[0];
          drop.inputElement.value = args.nodeData.text;
        }
      });
      this.treeObj.appendTo('#tree');
    }
  }
}
