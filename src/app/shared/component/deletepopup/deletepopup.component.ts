import { Component, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { DeletePopupService } from './deletepopup.service';

@Component({
  selector: 'app-deletepopup',
  templateUrl: './deletepopup.component.html',
  styleUrls: ['./deletepopup.component.scss']
})
export class DeletepopupComponent implements OnInit {

  public isOpen: boolean = false;
  pagefrom: any;
  @ViewChild('DeleteDialog')
  public DeleteDialog: DialogComponent;

  @Output() click = new EventEmitter<any>();
  @Output() emitClosePopupDelete: EventEmitter<String> = new EventEmitter<String>();

  constructor(public deletePopupService: DeletePopupService) { }

  ngOnInit() {
    this.getHeaderMessage();
  }
  getHeaderMessage() {
    this.deletePopupService.headerMessage.subscribe(data => {
      this.pagefrom = data;
      this.isOpen = true;
    });
  }
  okClick() {
    let selectedDeleteData = true;
    this.click.emit(selectedDeleteData);
  }

  dialogClose() {
    this.emitClosePopupDelete.emit("Delete Popup Closed"); //emmiting the event.
    this.isOpen = false;
  }
  dialogOpen() {
    this.isOpen = true;
  }
  cancelClick() {
    this.DeleteDialog.hide();
  }

}
