import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FieldConfig } from '../../../../models/field.interface';
@Component({
  selector: "app-date",
  template: `
  <div class="demo-full-width margin-top" [formGroup]="group">
  <label class="label">{{field.label}}</label>
  <div class="form-input">
  <ejs-datepicker #ejDatePicker class="date-contact" format='dd/MM/yyyy' [formControlName]="field.name"
                                name="datepicker" required>
                            </ejs-datepicker>
                            </div>
  </div>

  
`,
  styles: []
})
export class DateComponent implements OnInit {
  field: FieldConfig;
  group: FormGroup;
  constructor() {}
  ngOnInit() {
  }
}
