import { Component, Inject, ViewChild, OnInit, EventEmitter } from '@angular/core';
import { ExcelExportService, ExcelExportProperties } from '@syncfusion/ej2-angular-grids';

import { UploadOutput, UploadInput, UploadFile, humanizeBytes, UploaderOptions } from 'ngx-uploader';
import 'd3';
import 'nvd3';
import { ContactsService } from 'src/app/pages/contacts/contacts.service';
import { AlertService } from 'src/app/services/alert.service';
import { OrganisationPageSessionService } from 'src/app/services/organisationpagesession.service';
import { UserSessionService } from 'src/app/services/usersession.service';
import { SearchPageService } from 'src/app/services/searchpage.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { environment } from '../../../environments/environment.prod';
import { ContactImportService } from './contactimport.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import {NgxImageCompressService} from 'ngx-image-compress';

@Component({
  selector: 'app-contactimport',
  templateUrl: './contactimport.component.html',
  styleUrls: ['./contactimport.component.scss']
})
export class ContactimportComponent implements OnInit {

  options: UploaderOptions;
  formData: FormData;
  files: UploadFile[];
  uploadInput: EventEmitter<UploadInput>;
  humanizeBytes: Function;
  dragOver: boolean;
  public OrganisationId = 0;
  public documentType = 1; // DocumentType enum Contact_Import
  public canRemoveFile = false;
  public uploadButtonName: string;

  constructor(private contactsService: ContactsService,
    
    private imageCompress: NgxImageCompressService,
    private alertService: AlertService,
    private organisationPageSessionService: OrganisationPageSessionService,
    private userSessionService: UserSessionService,
    public searchPageService: SearchPageService,
    public contactImportService: ContactImportService,
    public navigationService: NavigationService,
    private formBuilder: FormBuilder) {

    this.options = {
      concurrency: 0,
      // allowedContentTypes: ['text/csv']
    };
    this.files = []; // local uploading files array
    this.uploadInput = new EventEmitter<UploadInput>(); // input events, we use this to emit data to ngx-uploader
    this.humanizeBytes = humanizeBytes;
  }
  imgResultBeforeCompress: string;
  imgResultAfterCompress: string;
  ngOnInit() {
    this.uploadButtonName = 'Choose File';
    this.OrganisationId = this.organisationPageSessionService.getOrganisationId();
  }
  goToContacts() {
    this.navigationService.goToContacts();
  }
  checkFileValidation(output: UploadOutput) {

    if (this.isValidFileSize(output.file)) {
      this.files.push(output.file);
    } else {
      this.clearUploadControlValue();
      this.alertService.error('File is too large, maximum allowed size is : 1 MB');
    }

  }

  clearUploadControlValue() {
    this.uploadButtonName = 'Choose File';
    this.removeAllFiles();
    const elem: HTMLInputElement = <HTMLInputElement>document.getElementById('documentUpload');
    elem.value = '';
    this.files = [];
  }

  isValidFileSize(uploadFile: UploadFile) {
    // 1 MB File size
    return uploadFile.size < 1048576;
  }
  // onFileChange(event) {
  //   debugger
  //   let reader = new FileReader();
  //   if(event.target.files && event.target.files.length > 0) {
  //     let file = event.target.files[0];
  //     reader.readAsDataURL(file);
  //     reader.onload = () => {
  //       this.imgResultBeforeCompress = reader.result.toString().toString()
  //       console.log('Size in bytes was:', this.imageCompress.byteCount(this.imgResultBeforeCompress));
  //       this.imageCompress.compressFile(this.imgResultBeforeCompress, 1, 50, 25).then(
  //         result => {
  //           this.imgResultAfterCompress = result;
  //           console.log('Size in bytes is now:', this.imageCompress.byteCount(this.imgResultAfterCompress));
  //         }
  //       );
  //     };
  //   }
  // }
  onUploadOutput(output: UploadOutput): void {

    if (output.type === 'allAddedToQueue') { // when all files added in queue
      // uncomment this if you want to auto upload files when added

      // if (this.files.length > 0) {
      //   const token = this.userSessionService.authToken();
      //   const event: UploadInput = {
      //     type: 'uploadAll',
      //     url: environment.apiBaseUrl + '/api/contactdetails/save',
      //     method: 'POST',
      //     headers: { 'Authorization': 'Bearer ' + token },

      //     data: {

      //       id: this.id.toString(),
      //       // documentType: this.applicationdata.documentid
      //     }
      //   };
      //   this.uploadInput.emit(event);
      // }
    } else if (output.type === 'addedToQueue' && typeof output.file !== 'undefined') { // add file to array when added
      if(output.file.name){
        var fileExtension = '|' + output.file.name.slice(output.file.name.lastIndexOf('.') + 1) + '|';
        var type = '|' + output.file.type.slice(output.file.type.lastIndexOf('/') + 1) + '|';
        var result = ('|csv|'.indexOf(type) !== -1 || '|csv|'.indexOf(fileExtension) !== -1);

        if (!result) {
          this.alertService.error('Invalid file format, allowed type are :.csv');
        }
        else{
          this.files = [];
          this.files.push(output.file);
          this.uploadButtonName = 'Remove File'; 
        }
      }
      
             
    } else if (output.type === 'uploading' && typeof output.file !== 'undefined') {
      // update current data in files array for uploading file
      const index = this.files.findIndex(file => typeof output.file !== 'undefined' && file.id === output.file.id);
      this.files[index] = output.file;
    } else if (output.type === 'removed') {
      // remove file from array when removed
      this.files = this.files.filter((file: UploadFile) => file !== output.file);
    } 
    else if (output.type === 'rejected') {
      this.clearUploadControlValue();
      this.cancelUpload(output.file.id);
      this.alertService.error('Invalid file format, allowed type are :.csv');
      this.files = [];
    } 
    else if (output.type === 'done') {
      if (output.file.responseStatus === 200) {
        // File uplaoded successfully
        this.uploadButtonName = 'Choose File';
        this.removeFile(output.file.id);
        this.alertService.success('File uploaded successfully');
        this.clearUploadControlValue();

      } else {

      }
      this.clearUploadControlValue();
    }
  }

  cancelUpload(id: string): void {
    this.uploadInput.emit({ type: 'cancel', id: id });
  }

  removeFile(id: string): void {
    this.uploadInput.emit({ type: 'remove', id: id });
  }

  removeAllFiles(): void {
    this.uploadInput.emit({ type: 'removeAll' });
  }
  // onsubmit() {
  //   let userId = this.userSessionService.userId();
  //   let orgId = this.organisationPageSessionService.getOrganisationId();
  //   this.contactImportService.saveContactImport(this.files).subscribe(data => {
  //     this.alertService.success("Contact Imported successfully");
  //     this.navigationService.goToContacts();
  //   });
  // }

  onsubmit(): void {
    if (this.files.length > 0) {
      const token = this.userSessionService.authToken();
      const event: UploadInput = {
        type: 'uploadAll',
        url: environment.apiBaseUrl + '/api/contactdetails/save',
        method: 'POST',
        headers: { 'Authorization': 'Bearer ' + token },

        data: {

          organisationId: this.OrganisationId.toString(),
          documentType: this.documentType.toString(),
        }
      };
      this.uploadInput.emit(event);
    } else {
      this.alertService.error('Please choose the file');
    }
  }
  removeSelectedFile() {
    this.uploadButtonName = 'Choose File';
    this.files = [];
  }
}
