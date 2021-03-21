import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';

@Component({
  selector: 'app-unsavedform',
  templateUrl: './unsavedform.component.html',
  styleUrls: ['./unsavedform.component.scss']
})
export class UnsavedformComponent implements OnInit {
  @ViewChild('saveChanges')
  public saveChanges: DialogComponent;
  public isOpen: boolean = true;
  @Output() click = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
  
  }
  okClick() {
    let selectedAction = true;
    this.click.emit(selectedAction);
  }
  cancelClick()
{ 
  let selectedAction = false;
  this.click.emit(selectedAction);
}
}
