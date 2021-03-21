import { Component,Inject,ViewChild, OnInit,ViewEncapsulation } from '@angular/core';
import { EditSettingsModel, ToolbarItems, IEditCell } from '@syncfusion/ej2-angular-grids';
import { SaveEventArgs } from '@syncfusion/ej2-angular-grids';
import { ChangeEventArgs } from '@syncfusion/ej2-inputs';
import { CheckBox } from '@syncfusion/ej2-buttons';
import {  GridComponent } from '@syncfusion/ej2-angular-grids';
import { DatePickerComponent } from '@syncfusion/ej2-angular-calendars';
import { FormValidators } from '@syncfusion/ej2-angular-inputs';
import { UserSessionService, OrganisationPageSessionService, AlertService, NavigationService } from '../../services';
import { FormBuilder, FormGroup, Validators,FormControl,AbstractControl} from '@angular/forms';
import { UserService } from '../user/user.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  private orgId:any;
  private userId:any;
  public user:Object;
  private genderType:any;
  constructor(private formBuilder: FormBuilder,
  private userSessionService:UserSessionService,
  private organisationPageSessionService:OrganisationPageSessionService,
  private alertService:AlertService,private userService: UserService,
  private navigationService:NavigationService) { }
  profileForm: FormGroup;
  ngOnInit() {
    this.profileForm = this.formBuilder.group({
      mobileNumber: [null],
      emailAddress:[null],
      firstName:[null],
      lastName:[null],
      dateOfBirth:[null],
      genderType:[true],
    })
    this.getUser(true);
  }
  getUser(refresh)
  {
    let userId=this.userSessionService.userId();
    let orgId=this.organisationPageSessionService.getOrganisationId();
    let userName=this.userSessionService.userFullName();
    this.userService.getUser(userId,orgId,refresh).subscribe(user => {
      this.user=user;
      this.profileForm.patchValue(this.user);
   
    }); 
  }

}
