import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FieldConfig } from '../../../../models/field.interface';
@Component({
  selector: "app-select",
  template: `
  <div class="demo-full-width margin-top" [formGroup]="group">
  <label class="label">{{field.label}}</label>
  <div class="form-input">
  <ejs-multiselect #samples [dataSource]='field.options'  [value]="field.value" [formControlName]="field.name">
  </ejs-multiselect>
  </div>
  <ng-container *ngFor="let validation of field.validations;">
  <div *ngIf="group.get(field.name).hasError(validation.name)">{{validation.message}}</div>
  </ng-container>
  </div>
`,
  styles: []
})
export class SelectComponent implements OnInit {
  field: FieldConfig;
  group: FormGroup;
  constructor() {}
  ngOnInit() {
  }
}
