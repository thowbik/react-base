import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FieldConfig } from '../../../../models/field.interface';

@Component({
  selector: "app-input",
  template: `<form name="form" [formGroup]="group">
  <div class='form-group'>
  <label class="label">{{field.label}}</label>
  <div fxLayout="row">
      <input [type]="field.inputType" class="demo-full-width form-input" [formControlName]="field.name">
  </div>
  <ng-container *ngFor="let validation of field.validations;">
<div class="errors" *ngIf="group.get(field.name).hasError(validation.name)">{{validation.message}}</div>
</ng-container>
</div>
</form>`,
  styles: []
})
export class InputComponent implements OnInit {
  field: FieldConfig;
  group: FormGroup;
  constructor() {}
  ngOnInit() {}
}
