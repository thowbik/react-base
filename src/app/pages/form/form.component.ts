import { Component, OnInit, ViewChild } from '@angular/core';
import { ItemModel, MenuEventArgs } from '@syncfusion/ej2-angular-splitbuttons';
import { TabComponent } from '@syncfusion/ej2-angular-navigations';
import { DialogComponent, DialogUtility } from '@syncfusion/ej2-angular-popups';
import { GridComponent } from '@syncfusion/ej2-angular-grids';
import { Router } from '@angular/router';
import { NavigationService } from 'src/app/services';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class formComponent implements OnInit {

  public data: Object[];

  public headerText: Object = [{ 'text': 'Form' }, { 'text': 'Responses(73)' }, { 'text': 'Insights' },
  { 'text': 'Responders' }, { 'text': 'Correct Answer' }, { 'text': 'Form Options' }];
  public animation: object = {
    previous: { effect: 'SlideLeftIn', duration: 1000, easing: 'ease' },
    next: { effect: 'SlideRightIn', duration: 1000, easing: 'ease' }
  };
  public isOpen: boolean = false;
  public showCloseIcon: Boolean = true;
  public templatetab: boolean = true;
  public myquestiontab: boolean = false;
  public selectionSettings: Object;
  public items: ItemModel[] = [
    {
      text: 'Edit',
      iconCss: 'fa fa-pencil'
    },
    {
      text: 'Move',
      iconCss: 'fa fa-square-o'
    },
    {
      text: 'Duplicate',
      iconCss: 'fa fa-files-o'
    },
    {
      text: 'Delete',
      iconCss: 'fa fa-trash'
    },
    {
      text: 'More',
      iconCss: 'fa fa-ellipsis-h'
    }];

    @ViewChild('AddQuestionDialog')
    public AddQuestionDialog: DialogComponent;
    @ViewChild('grid')
    public grid: GridComponent;

  constructor(public navigationService: NavigationService) {}


  ngOnInit() {
    this.templatetab = true;
    this.myquestiontab = false;
    this.selectionSettings = { checkboxOnly: true };
   
  }
  public addQuestion = function (event: any): void {
  
    this.AddQuestionDialog.show();
  }


  template() {
    this.templatetab = true;
    this.myquestiontab = false;
  }
  myquestion()
  {
    this.myquestiontab = true;
    this.templatetab = false;
  }
  goToResponses() {
    this.navigationService.goToResponses();
  }

}
