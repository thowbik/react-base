import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FieldConfig } from '../../../../models/field.interface';
@Component({
  selector: "app-radiobutton",
  template: `
<div class="demo-full-width margin-top" [formGroup]="group">
<div>
<label class="radio-label-padding">{{field.label}}:</label>
<br>
</div>
<div class="radiobuttonoptions" *ngFor='let item of field.options' >
<ejs-radiobutton name="{{field.name}}"  [label]='item' [value]="item"  [formControlName]="field.name"></ejs-radiobutton>
</div>
</div>
 `,
  styles: []
})
export class RadiobuttonComponent implements OnInit {
  
  field: FieldConfig;
  group: FormGroup;

  constructor() {}
  ngOnInit() {
  
  } 
}
