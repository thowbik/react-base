import { Component, OnInit, ViewChild, HostListener, ViewEncapsulation, ElementRef } from '@angular/core';
import { RouterModule, ROUTES, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { AlertService } from 'src/app/services/alert.service';
import { SignupService } from './signup.service';
import { TabComponent } from '@syncfusion/ej2-angular-navigations';
import { OrganisationPageSessionService } from 'src/app/services/organisationpagesession.service';
import { WizardComponent, WizardStep } from 'angular-archwizard';
import { NavigationService } from 'src/app/services/navigation.service';
import { Steps } from 'src/app/models/steps';
import { UserSessionService, NavPageService, UserPageSessionService, DataService } from 'src/app/services';
import { UserSession } from 'src/app/models/usersession';
import { OrganisationService } from '../organisation/organisation.service';
import { ItemModel, MenuEventArgs } from '@syncfusion/ej2-angular-splitbuttons';
import { FilteringEventArgs } from '@syncfusion/ej2-dropdowns';
import { EmitType } from '@syncfusion/ej2-base';
import { Query } from '@syncfusion/ej2-data';
import { NavBarService } from '../../services/navbar.service';
import { UserRoleSessionService } from '../../services/userRolesession.service';
import { AutoCompleteComponent, DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
//  import { EJComponents } from 'ej-angular2/src/ej/core';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  @ViewChild('signupTab') tabObj: TabComponent;
  @ViewChild('ejDialog') ejDialog: DialogComponent;
  @ViewChild('AcceptDialog')
  public AcceptDialog: DialogComponent;
  @ViewChild('TermsDialog')
  public TermsDialog: DialogComponent;
  form: FormGroup;
  verifyform: FormGroup;
  otpverifyform: FormGroup;
  @ViewChild(WizardComponent)
  @ViewChild('sample')
  public AutoCompleteObj: AutoCompleteComponent;
  @ViewChild('countrydropdown')   
  public ddlObj: DropDownListComponent;   

  @ViewChild('postalCode') postalCode:ElementRef;

  wizard: WizardComponent;
  public scrollareaHeight: number;
  public height: number;
  public isOpen: boolean = false;
  public headerText: Object = [{ 'text': 'Sign In' },
  { 'text': 'Enterprise Info' }, { 'text': 'Verify Info' }, { 'text': 'Choose a Plan' }, { 'text': 'Payment' }];
  public paymentMethod: string[] = ['Credit card', 'Debit card', 'Net Banking'];
  public paymentvalue: string = "Credit card";
  public chooseplan: string[] = ['Basic', 'Profesional', 'Premium'];
  public planvalue: string = "Basic";
  public successmessage: boolean;
  registeredUserInfo: any;
  verified: boolean;
  username: any;
  public basicform: FormGroup;
  stepNo: number;
  //sessionData = new UserSession();
  check: boolean;
  postalcode: string = "/^[0-9]{6}(?:-[0-9]{4})?$/";
  websitepattern: string = "^(?:https?:\/\/)?(?:[-a-z0-9]+\\.)+[-a-z0-9]+(?:(?:(?:\/[-=&?.#a-z0-9]+)+)\/?)?$";
  emailpattern: any = '[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$';
  enableSubmit: boolean;
  public items: ItemModel[] = [
    {
      text: 'Logout',
      iconCss: 'e-icons e-BT_Delete'
    }];
  public data: any[];
  termsAccepted: boolean;
  planDetails: any;
  basicplan: any;
  plusplan: any;
  proplan: any;
  innerWidth: number;
  innerHeight: number;
  countryList: any;
  public countryFields: Object;
  basicPlanChecked: boolean;
  plusPlanChecked: boolean;
  proPlanChecked: boolean;
  private _autofillChrome: boolean;
  // countrydata: Array<Object> = [];
  // fieldsvalues: Object;
  value: string;
  // cssclass = "custom";
    public submitted:boolean;
  public isShowOtp: boolean = false;
  constructor(private formBuilder: FormBuilder,
    private alertService: AlertService,
    private router: Router,
    private signupService: SignupService,
    private organisationPageSessionService: OrganisationPageSessionService,
    private userSessionService: UserSessionService,
    public navigationService: NavigationService,
    private organisationService: OrganisationService,
    private pageService: NavPageService,
    private navBarService: NavBarService,
    private userRoleSessionService: UserRoleSessionService,
    private userPageSessionService: UserPageSessionService,
    private dataService: DataService) {
    //     this.countrydata = [
    //       { skill: 'General Discussion', category: 'General' }, { skill: 'Asp.Net', category: 'Web' }, 
    // { skill: 'Asp.Net MVC', category: 'Web' }, { skill: 'Asp.Net Core', category: 'Web' },
    //  { skill: 'Angular', category: 'Web' }, { skill: 'Other', category: 'Other Products' }, { skill: 'Metro', category: 'Other Products' }
    //   ];
    //   this.fieldsvalues = { dataSource: this.countrydata, text: 'skill', value: 'skill' ,groupBy: 'category'};
  }
  //@HostListener('window:resize', ['$event'])
  ngOnInit() {
    this.submitted = false;
    this.onResize(event);
    this.getCountryDetails(true);
    this.getPlandetails(true);
    this.initializeValidators();
    this.successmessage = false;
    this.verified = false;
    this.enableSubmit = false;
    this.termsAccepted = false;
    this.createForm();
    this.username = this.userSessionService.userFullName();
    this.basicPlanChecked = false;
    this.plusPlanChecked = false;
    this.proPlanChecked = false
    this.rolePermissionchange();
  }
  onResize(event) {
    this.innerHeight = window.innerHeight;
    this.height = (this.innerHeight * 50) / 100;
    // alert("ScreenHeight:"+this.innerHeight);
    if (this.innerHeight > 1000) {
      this.height = 500;
    }
    else if (this.innerHeight > 900) {
      this.height = 450;
    }
    else if (this.innerHeight > 800) {
      this.height = 400;
    }
    else if (this.innerHeight > 780) {
      this.height = 400;
    }
    else if (this.innerHeight > 750) {
      this.height = 390;
    }
    else if (this.innerHeight > 700) {
      this.height = 380;
    }
    else if (this.innerHeight > 650) {
      this.height = 300;
    }
    else if (this.innerHeight > 600) {
      this.height = 260;
    }
    else if (this.innerHeight > 580) {
      this.height = 270;
    }
    else if (this.innerHeight > 550) {
      this.height = 220;
    }
    else if (this.innerHeight > 400) {
      this.height = 180;
    }

    this.scrollareaHeight = this.height;
    //alert(this.height);

  }
  public onChange(args: any): void {
    let valueEle: HTMLInputElement = document.getElementsByClassName('e-input')[0] as HTMLInputElement;
    // make empty the input value when typed characters is 'null' in input element
    if (this.AutoCompleteObj.value === "null" || this.AutoCompleteObj.value === null || this.AutoCompleteObj.value === "") {
        valueEle.value = '';
    }
}
  initializeValidators() {
    this.form = this.formBuilder.group({
      id: [0, null],
      userId: [0, null],
      name: ['', Validators.required],
      phoneNumber: ['', null],
      countryId: ['', Validators.required],
      webSite: ['', { validators: [Validators.required, Validators.pattern(this.websitepattern)],updateOn: 'blur' }],
      address1: ['', Validators.required],
      address2: ['', null],
      city: ['', Validators.required],
      state: ['', Validators.required],
      postalCode: ['', Validators.required],
      // }}],
      // email: new FormControl('', {
      //   validators: [Validators.required, Validators.pattern(this.emailpattern)]
      // }),
      isEmailVerified: ['false', Validators.required],
      IsEmailChanged: ['false', Validators.required],


    });
    this.verifyform = this.formBuilder.group({
      //emailAddress: ['', Validators.compose([Validators.required, Validators.email])],
      emailAddress: ['', { validators: [Validators.required, Validators.pattern(this.emailpattern)], updateOn: 'blur' }],
     // emailAddress: ['', Validators.required],
      adminName: ['', Validators.required],
      oneTimePW: ['', null],
      IsAcceptTerms: ['', null]
    });



    this.otpverifyform = this.formBuilder.group({
      id: ['', null],

    });
  }
  workflow = [
    { stepId: 0, step: Steps.workInfo },
    { stepId: 1, step: Steps.adminInfo },
    { stepId: 2, step: Steps.plan },
    { stepId: 3, step: Steps.Payment }
  ];
  getPlandetails(refresh) {

    this.signupService.getPlandetails(refresh).subscribe(plan => {

      this.planDetails = plan;
      this.basicplan = this.planDetails[0].htmLcontent;
      this.plusplan = this.planDetails[1].htmLcontent;
      this.proplan = this.planDetails[2].htmLcontent;
    });
  }
  getCountryDetails(refresh) {

    this.signupService.getCountryList(refresh).subscribe(countryList => {

      this.countryList = countryList;
      this.countryFields = { text: 'countryName', value: 'id' };
      //this.form.controls['country'].setValue('78');
      //this.form.controls['country'].setValidators(null);

    });
  }
  register() {
    //this.submitted = true;

    if (this.form.valid === true) {
     
      this.goToStep(2);
    }else{
      this.goToStep(0);
    }

  }
  public onClose = (e) => {
    e.cancel = false;
  }
  checkemail(event) {
    let str: any = this.verifyform.value.emailAddress;
    if (str.length > 0) {
      str = str.toLowerCase();
      this.verifyform.controls['emailAddress'].setValue(str);
    }
  }
  checkwebsite(event){
    let str: any = this.form.value.webSite;
    if (str.length > 0) {
      str = str.toLowerCase();
      this.form.controls['webSite'].setValue(str);
    }
    
  }
  emailverify() {

    if (this.form.valid) {
      //let str:string = this.form.value.name;
      //str = str[0].toUpperCase() + str.slice(1);
      //this.form.controls['name'].setValue(str);
      this.verifyform.value.adminName = this.username;
      this.form.value.emailAddress = this.verifyform.value.emailAddress;
      this.form.value.adminName = this.verifyform.value.adminName;
      //this.form.value.country = 78;

      this.form.value.IsEmailChanged = true;
      this.form.value.isEmailVerified = false;
      this.signupService.EmailVerify(this.form.value).subscribe(data => {
        if (data > 0) {
          this.enableSubmit = true;
          this.isShowOtp = true;
          this.alertService.success("Please check email for One-Time-Password");


          this.form.value.id = data;
        }


      });

    }
    //  this.verified =true;
    //  this.goToStep(1);   
  }

  otpverify() {

    this.otpverifyform.value.id = this.form.value.id;
    this.otpverifyform.value.oneTimePW = this.verifyform.value.oneTimePW;

    this.signupService.OtpVerify(this.otpverifyform.value).subscribe(response => {
      debugger;
      if (response == true) {
        this.form.value.IsEmailChanged = false;
        this.form.value.isEmailVerified = true;

        this.alertService.success("One-Time-Password verified successfully");
        this.verifyform.controls['emailAddress'].disable();
        this.verifyform.controls['oneTimePW'].disable();

        this.verified = true;
        this.isShowOtp = false;
      }
      else {
        this.alertService.error("Invalid One-Time-Password");
      }
    });
    this.goToStep(1);
  }
  getorgId() {
    this.form.value.IsAcceptTerms = this.verifyform.value.IsAcceptTerms;
    this.signupService.EmailVerify(this.form.value).subscribe(data => {
    });
    localStorage.setItem('orgid', this.form.value.id);
    this.basicform.controls['basic'].setValue(true);
  }

  changeemail() {
    this.enableSubmit = false;
    this.verified = false;
    this.isShowOtp = true;
    this.verifyform.controls['oneTimePW'].setValue(null);
    this.verifyform.controls['emailAddress'].enable();
    this.verifyform.controls['oneTimePW'].enable();
    // this.form.value.IsEmailChanged = true;
    // this.signupService.EmailVerify(this.form.value).subscribe(data => {


    // });
  }


  createForm() {
    this.basicform = this.formBuilder.group({
      basic: ['', null],
      plus: ['', null],
      pro: ['', null]

    });

  }

  acceptTerms(event) {

    if (event.checked == true) {

      this.termsAccepted = true;
      this.verifyform.controls['IsAcceptTerms'].setValue(true);
    } else {
      this.termsAccepted = false;
      this.verifyform.controls['IsAcceptTerms'].setValue(false);
    }
  }

  back() {
    this.navigationService.goToNewaccount();
  }

  goToStep(step) {
    this.wizard.model.navigationMode.goToStep(step);

  }
  goToHome() {
    this.navigationService.goToHome();
  }
  success() {
    //this.wizardSteps.every(step)
    //this.wizardState.completed;
    //return this.wizardStep.completed;
    //this.wizard.navigation.goToNextStep();

    this.successmessage = true;

  }

  finishFunction() {
    this.clearCachedMenu();
    this.organisation();

  }

  showAccept() {
    this.AcceptDialog.show();
  }
  showTermsofService() {

    this.TermsDialog.show();
  }

  hideSuccessmsg() {

    let selectedRadioButton = this.basicform.value.basic;
    if (selectedRadioButton) {

      this.successmessage = true;
      this.goToStep(4);
      this.basicform.value.basic = "";
      this.createForm();
    }
    else {

      this.stepNo = 2;
      this.successmessage = false;
    }

  }
  clearCachedMenu() {
    this.dataService.clearCache();
    this.organisationPageSessionService.destroy();
    this.userPageSessionService.destroy();
  }
  organisation() {
    this.data = [];
    let isMultipleOrganisation = this.userSessionService.isMultipleOrganisation();
    let orgId = localStorage.orgid;

    let userId = this.userSessionService.userId();
    // this.organisationService.getOrganisation(userId,true).subscribe(organisation=>{
    //   

    // });
    this.organisationPageSessionService.create(this.form.value);
    // this.pageService.getPageByOrganisationId(true,orgId).subscribe(data => {
    //   data.map(item => {
    //       return {
    //           id: item.name,
    //           title: item.name,
    //           type: 'item',
    //           url: item.url,
    //           icon: item.name+'.svg'
    //       }
    //   }).forEach(item => this.data.push(item));
    //   this.userPageSessionService.create(this.data);
    this.navigationService.goToDashboard();
    //});


  }
  
  onStateBlurMethod(){
    this.ddlObj.showPopup();
   }
   onCountryBlurMethod(){
    this.postalCode.nativeElement.focus();
   }  
  basicPlanSelected() {
    this.basicform.controls['basic'].setValue(true);
    this.basicform.controls['plus'].setValue(false);
    this.basicform.controls['pro'].setValue(false);
  }
  plusPlanSelected() {
    this.basicform.controls['basic'].setValue(false);
    this.basicform.controls['plus'].setValue(true);
    this.basicform.controls['pro'].setValue(false);
  }
  proPlanSelected() {
    this.basicform.controls['basic'].setValue(false);
    this.basicform.controls['plus'].setValue(false);
    this.basicform.controls['pro'].setValue(true);
  }
  logout(args: MenuEventArgs) {

    localStorage.removeItem('isLoggedin');
    localStorage.removeItem('search');
    localStorage.removeItem('orgid');
    this.userSessionService.destroy();
    this.navigationService.goToSignin();
  }
  public onFocusInput() {
    this._autofillChrome = false;
  }

  onKey(event) {
    // alert(event.key);
    let str: string = this.form.value.name;
    str = str[0].toUpperCase() + str.slice(1);
    this.form.controls['name'].setValue(str);
  }
  rolePermissionchange() {
    let organisationId = this.organisationPageSessionService.getOrganisationId();
    this.navBarService.getRolePermissionData(organisationId, true).subscribe(response => {
      this.userRoleSessionService.create(response);
    });
  }

}


