import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FieldConfig } from '../../../../models/field.interface';
@Component({
  selector: "app-button",
  template: `
<div class="demo-full-width margin-top submit-button" [formGroup]="group">
<button type="submit" ejs-button class="dynamicform-submit" >{{field.label}}</button>
</div>
`,
  styles: []
})
export class ButtonComponent implements OnInit {
  field: FieldConfig;
  group: FormGroup;
  constructor() {}
  ngOnInit() {}
}
