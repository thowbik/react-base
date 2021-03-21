import { Component, OnInit, ViewChild } from '@angular/core';
import { RespondersService } from './responders.service';
import { ActivatedRoute } from '@angular/router';
import { SendFormToService } from 'src/app/shared/component/sendformto/sendformto.service';
import { AlertService, NavigationService } from 'src/app/services';
import { Location } from '@angular/common';
import { FormresponseStatusType, paginationDataNo } from '../../models/index';
import * as _ from "lodash";
import { GridComponent, CheckBoxChangeEventArgs, parentsUntil } from '@syncfusion/ej2-angular-grids';
import { DeletePopupService } from 'src/app/shared/component/deletepopup/deletepopup.service';
import { FormOptionsService } from '../formoptions/formoptions.service';
@Component({
  selector: 'app-responders',
  templateUrl: './responders.component.html',
  styleUrls: ['./responders.component.scss']
})
export class RespondersComponent implements OnInit {
  public respondersData: any[];
  public routeParams: any;
  public formId: any;
  public pageid: number;
  public selectedFormIds: any[];
  showSendFormToPopup: boolean;
  public isOpen: boolean = false;
  public formName: any;
  public selectedRespondersId: any[];
  dataLength: any;
  totalPages: number;
  pageType: string;
  itemType: string;
  public paginationData: any[];
  page = this.paginationDataNo().page;
  @ViewChild('grid')
  public grid: GridComponent;
  limit = this.paginationDataNo().limit;
  popTitle: string;
  showDeletePopup: boolean;
  selectcount: boolean;
  constructor(private respondersService: RespondersService,
    private route: ActivatedRoute,
    private location: Location,
    private alertService: AlertService,
    private deletePopupService: DeletePopupService,
    public sendFormToService: SendFormToService,
    public navigationService: NavigationService,private formOptionsService: FormOptionsService) {
    this.routeParams = route.snapshot.params;
    debugger;
    this.formId = this.routeParams.id;
    this.pageid = parseInt(this.routeParams.pageid);
    // this.routeParams.id.forEach(function (data) {

    //   this.selectedFormIds.push(data.id)

    // })
    // console.log(this.selectedFormIds);
  }
  paginationDataNo() { return paginationDataNo; }
  ngOnInit() {
    this.getResponders(true);
    this.respondersData = [];
    this.openSendFormPopup();
    this.formDetails(true);
  }
  getResponders(refresh) {
    debugger;
    this.respondersService.getResponders(this.formId, refresh).subscribe(responders => {
      this.respondersData = responders;
      this.dataLength = this.respondersData.length;
      this.totalPages = Math.ceil(this.respondersData.length / this.limit);
      this.pageType = this.totalPages > 1 ? 'pages' : 'page';
      this.itemType = this.dataLength > 1 ? 'items' : 'item';
      this.paginationData = _(this.respondersData)
        .drop((this.page - 1) * this.limit)
        .take(this.limit)
        .value();
      if (this.respondersData[0].formName) {
        this.formName = this.respondersData[0].formName;
      }
    });
  }
  Next() {
    this.page = this.page + 1;
    this.paginationData = _(this.respondersData)
      .drop((this.page - 1) * this.limit)
      .take(this.limit)
      .value();
  }
  Previous() {
    this.page = this.page - 1;
    this.paginationData = _(this.respondersData)
      .drop((this.page - 1) * this.limit)
      .take(this.limit)
      .value();
  }
  openSendFormPopup() {

    this.showSendFormToPopup = true;
    setTimeout(() => {
      let formIDs = [];
      formIDs.push({
        formId: this.formId,
      });
      this.sendFormToService.updateHeaderMessage(formIDs);

    }, 0);
  }
  FormresponseStatusType() {
    return FormresponseStatusType;
  }
  sendForm(args) {
    debugger;
    this.respondersService.ShareForms(args).subscribe(data => {
      this.alertService.success("Form sent successfully");
      this.getResponders(true);
      // this.Dialog.hide();
    });
  }
  back() {
    this.location.back();
  }
  closedSendFormToPopup(event) {
    debugger;
    if (event) {
      this.getResponders(true);
      this.showSendFormToPopup = false;

    }
  }

  change(args: CheckBoxChangeEventArgs) {
    if (args.checked && parentsUntil(args.target, 'e-gridchkbox')) {
      this.selectcount = this.grid.getSelectedRecords().length > 0 ? true : false;
    }
    else {
      this.selectcount = args.selectedRowIndexes.length > 0 ? true : false;
    }
  }

  onDelete() {
    debugger

    this.selectedRespondersId = this.grid.getSelectedRecords();
    if (this.selectedRespondersId.length == 1) {
      this.popTitle = 'Responders';
    }
    this.showDeletePopup = true;
    setTimeout(() => {
      this.deletePopupService.updateHeaderMessage(this.popTitle);
    }, 100);
  }
 
  okClick(args) {
    debugger
    if (args) {
      let selectItem = [];

      this.selectedRespondersId.forEach(function (data) {

        selectItem.push({
          id: data.id
        })

      })

      this.respondersService.deleteResponders(selectItem).subscribe(res => {
        this.alertService.success("Responders deleted successfully");
        this.showDeletePopup = false;
        this.getResponders(true);
        this.selectcount = false;
      });
    }
    this.showDeletePopup = false;
  }

  closedFromDeletePopup = function (data) {
    this.message = data;
    if (this.message) {
      this.showDeletePopup = false;
    }
  };


  formDetails(refresh) {
    debugger
    let id = this.formId;
    this.formOptionsService.getformDetails(id, refresh).subscribe(data => {
      this.formName = data.formName;
    });
  }
}
