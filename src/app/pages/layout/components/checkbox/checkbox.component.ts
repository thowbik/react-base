import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FieldConfig } from '../../../../models/field.interface';
@Component({
  selector: "app-checkbox",
  template: `
<div class="demo-full-width margin-top" [formGroup]="group" >
<ejs-checkbox label="{{field.label}}" [formControlName]="field.name">

</ejs-checkbox>
</div> 
`,
  styles: []
})
export class CheckboxComponent implements OnInit {
  field: FieldConfig;
  group: FormGroup;
  constructor() {}
  ngOnInit() {}
}
