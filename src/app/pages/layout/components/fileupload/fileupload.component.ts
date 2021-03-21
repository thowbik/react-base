import { Component, OnInit, ViewChild } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FieldConfig } from '../../../../models/field.interface';
import { UploadingEventArgs } from '@syncfusion/ej2-inputs';
import { getUniqueID } from '@syncfusion/ej2-base';
import { isNullOrUndefined, EmitType } from '@syncfusion/ej2-base';
@Component({
  selector: "app-button",
  template: `
  <div class="form-group" style="padding-top: 34px;" [formGroup]="group">
  <div class="e-float-input upload-area imageupload">
      <input type="text" id="upload" [formControlName]="field.name" class="imageupload">
      <button  id="browse" class="e-control e-btn e-info browsebutton" (click)='browseClick()'>Browse</button>
     
      <label class="e-float-text e-label-top filelabel" for="upload">Choose a file</label>
  </div>
  
  <ejs-uploader #defaultupload id='fileupload' allowedExtensions="image/*" [autoUpload]=false  (selected)='onFileSelect($event)'></ejs-uploader>
</div>
`,
  styles: []
})
export class FileComponent implements OnInit {
  @ViewChild('defaultupload')
  field: FieldConfig;
  group: FormGroup;
  public Imagename: string = '';
  public path: Object = {
    saveUrl: 'https://aspnetmvc.syncfusion.com/services/api/uploadbox/Save',
    removeUrl: 'https://aspnetmvc.syncfusion.com/services/api/uploadbox/Remove' };
  constructor() {}
  ngOnInit() {
  }
  public browseClick() {
    document.getElementsByClassName('e-file-select-wrap')[0].querySelector('button').click();
     return false;
  }
  public onFileSelect: EmitType<Object> = (args: any) => {
    this.Imagename = args.filesData[0].name;
    this.group.controls[this.field.name].setValue(this.Imagename);
   }
//   public onUploadBegin(args: UploadingEventArgs) {
//     debugger;
//     // check whether the file is uploading from paste.
//    // if (args.fileData.fileSource === 'paste') {
//         let newName: string = getUniqueID(args.fileData.name.substring(0, args.fileData.name.lastIndexOf('.'))) + '.png';
//         args.customFormData = [{'fileName': newName}];
//         //this.roleForm.patchValue(roledata);
//         //this.field.value.patchValue(newName);
//         //rolePageActionMappingList.push(rolePageActionMapping);
//         // this.field =[];
//         // this.field.push(newName); 
//         //console.log(this.field.name);
//    // }
// }
}
