import { Component, Inject, ViewChild, OnInit, ViewEncapsulation, ChangeDetectorRef, ElementRef, Renderer } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { DatePickerComponent } from '@syncfusion/ej2-angular-calendars';
import { FormValidator } from '@syncfusion/ej2-inputs';
import { Contact, ContactStatusType, RoleMenu, RolePageActionType } from '../../models/index';
import { ContactService } from './contact.service';
import { UserSessionService, OrganisationPageSessionService, AlertService, NavigationService } from '../../services';
import { SelectEventArgs, TabComponent } from '@syncfusion/ej2-angular-navigations';
import { ActivatedRoute } from '@angular/router';
import { AutoCompleteComponent, DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/timer';
import { Location } from '@angular/common';
import { PermissionsService } from '../../services/permissions.service';
import { PopupEventArgs } from '@syncfusion/ej2-dropdowns';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']

})
export class ContactComponent implements OnInit {

  @ViewChild('formElement') element: any;
  @ViewChild('ejDate') ejDate: DatePickerComponent;
  public animation: object = {
    previous: { effect: 'SlideLeftIn', duration: 300, easing: 'ease' },
    next: { effect: 'SlideRightIn', duration: 300, easing: 'ease' }
  };
  public id = 0;
  public pagefrom: number;
  public routeParams: any;
  public targetElement: HTMLElement;
  public contactForm: FormGroup;
  public build: FormBuilder;
  public formObject: FormValidator;
  public dateValue: Object = new Date();
  public country: Object[];
  public text: String = 'Select a country';
  public m: Contact;
  public cardTitle: any;
  public btnTitle: any;
  public data: any;
  public today: Date = new Date();
  public viewcontact: boolean;
  public genderType: boolean;
  // public contactType: boolean;
  public refreshbtn: boolean;
  public currentYear: number;
  public currentMonth: number;
  public currentDay: number;
  public maxDate: Object;
  public fields: Object = { text: "countryName", value: "id" };
  public countryFields: Object = { text: "countryName", value: "countryCode" };
  public headerText: Object = [{ 'text': 'Address' }, { 'text': 'Products/Services' }, { 'text': 'Custom Fields' }, { 'text': 'Notes' }];
  nowhitespacepattern: any = "^[-_a-zA-Z0-9]+[^\s]*$";
  emailpattern: any = '[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$';
  public updateBtnshow: boolean;
  public genderTypedisable: boolean;
  public contactTypedisable: boolean;
  public countryCode: any;
  public message: string;
  organisationCountry: any;
  private subscription: Subscription;
  private timer: Observable<any>;
  countryList: any;
  selectedFlag: string;
  isEdit: boolean;
  public labelEmail: any;
  @ViewChild('dropdown')
  public dropdown: DropDownListComponent;
  @ViewChild('ejDatePicker')
  public datePicker: DatePickerComponent;


  public destinationBox: boolean = false;
  public submitted: boolean;
  public selectedCountry: any;
  public selectedCountryDetails: any;
  selectedCountryShortCode: any;
  ContactStatusType() { return ContactStatusType; }

  roleMenu() { return RoleMenu; }

  rolePageActionType() { return RolePageActionType; }

  @ViewChild('newphoneNumber') inputEl: ElementRef;

  constructor(@Inject(FormBuilder) private builder: FormBuilder,
    private contactService: ContactService,
    private route: ActivatedRoute,
    private renderer: Renderer,
    private location: Location,
    private userSessionService: UserSessionService,
    private organisationPageSessionService: OrganisationPageSessionService,
    private alertService: AlertService,
    public permissionsService: PermissionsService,
    public Ref: ChangeDetectorRef,
    private navigationService: NavigationService) {
    this.build = builder;
    this.viewcontact = false;
    this.routeParams = route.snapshot.params;
    this.id = this.routeParams.id;
    this.pagefrom = this.routeParams.page;
    this.cardTitle = this.id == 0 ? "New Contact" : "View Contact";

  }

  ngOnInit(): void {
    this.submitted = false;
    this.selectedCountryDetails = {};
    this.createForm();
    this.getCountryDetails(true);
    this.btnTitle = this.id == 0 ? "Save" : "Save";
    this.selectedFlag = this.id == 0 ? "in" : "in";
    if (this.id != 0) {
      this.viewcontact = true;
      //this.getContact(true);

    } else {
      this.labelEmail = 'Email:';
      this.updateBtnshow = true;
    }
    //  this.createForm();
    this.permissionsService.loadPermissions(this.pagefrom);
  }
  ngAfterViewInit() {
    this.Ref.detectChanges();
    setTimeout(() => {
      this.inputEl.nativeElement.focus();
    }, );
  }

  getContact(refresh) {
debugger;
    this.contactService.getContact(this.id, refresh).subscribe(users => {
      this.data = users;
      this.selectedCountry = users.countryCode;
      this.contactForm.controls['countryCode'].setValue(users.countryCode);
      
    //   const selectedCountryShortCode = this.countryList.find(element => {
    //     debugger;
    //     return element.countryCode == this.selectedCountry;
    // });
    this.selectedCountryDetails = this.countryList.find(i => i.countryCode === this.selectedCountry)
    if(this.selectedCountryDetails)
    {
      this.selectedCountryShortCode = this.selectedCountryDetails.shortName;
    }
    
    debugger;
    // this.telInputObject(event);
    // telInputObject(obj) {
    //   obj.intlTelInput('setCountry', 'in');
    // }
  
      this.isEdit = this.data.isEdit;
      this.genderTypedisable = true;
      this.contactTypedisable = true;
      this.refreshbtn = true;
      this.contactForm.patchValue(this.data);

      this.contactForm.controls['firstName'].disable();
      this.contactForm.controls['lastName'].disable();
      this.contactForm.controls['mobileNumber'].disable();
      this.contactForm.controls['emailAddress'].disable();
      this.contactForm.controls['dateOfBirth'].disable();
      this.contactForm.controls['address1'].disable();
      this.contactForm.controls['address2'].disable();
      this.contactForm.controls['city'].disable();
      this.contactForm.controls['state'].disable();
      this.contactForm.controls['countryId'].disable();
      this.contactForm.controls['postalCode'].disable();
      this.contactForm.controls['designation'].disable();
      this.contactForm.controls['notes'].disable();

      if (this.data.contactType == 1) {
        this.labelEmail = 'Work Email Address:';
        this.contactForm.controls['emailAddress'].setValidators(Validators.compose([Validators.required, Validators.pattern(this.emailpattern)]));
        this.contactForm.controls['mobileNumber'].setValidators(Validators.compose([Validators.required, Validators.minLength(7), Validators.maxLength(12)]));
        this.contactForm.controls['emailAddress'].updateValueAndValidity();
        // this.contactForm.controls['designation'].setValue(null);
        this.destinationBox = true;
      } else {
        this.labelEmail = 'Email:';
        //  this.contactForm.controls['dateOfBirth'].setValidators(null);
        this.contactForm.controls['designation'].setValidators(null);
        this.contactForm.controls['notes'].setValidators(null);
        this.contactForm.controls['emailAddress'].setValidators(null);
        this.contactForm.controls['mobileNumber'].setValidators(null);
        //  this.contactForm.controls['genderType'].setValidators(null);
        this.contactForm.controls['designation'].updateValueAndValidity();
        this.contactForm.controls['notes'].updateValueAndValidity();
        // this.contactForm.controls['dateOfBirth'].updateValueAndValidity();
        // this.contactForm.controls['genderType'].updateValueAndValidity();
        this.contactForm.controls['emailAddress'].updateValueAndValidity();
        this.contactForm.controls['mobileNumber'].updateValueAndValidity();
        this.destinationBox = false;
      }
      let permissions = this.permissionsService.pageIds;
    });
  }
  createForm() {
    /*  this.contactForm = new FormGroup({
       emailAddress: new FormControl('', {
         validators: [Validators.required, Validators.pattern(this.emailpattern)],
         updateOn: 'blur'
       }),
     }); */
    let userId = this.userSessionService.userId();
    let orgId = this.organisationPageSessionService.getOrganisationId();
    this.contactForm = this.build.group({

      firstName: ['', Validators.compose([Validators.required, Validators.pattern(this.nowhitespacepattern)])],
      lastName: ['', Validators.compose([Validators.required, Validators.pattern(this.nowhitespacepattern)])],
      mobileNumber: ['', { validators: [Validators.required, Validators.minLength(7), Validators.maxLength(12)], updateOn: 'blur' }],
      emailAddress: ['', { validators: [Validators.required, Validators.pattern(this.emailpattern)], updateOn: 'blur' }],
      designation: [''],
      notes: [''],
      dateOfBirth: [''],
      genderType: [0],
      address1: [''],
      address2: [''],
      city: [''],
      state: [''],
      countryId: [''],
      postalCode: [''],
      contactType: ['', Validators.required],
      organisationId: [orgId, null],
      userId: [userId, null],
      id: [this.id, null],
      contactId: [0, null],
      connectionStatusType: [''],
      countryCode: ['', Validators.required],
    });
    this.organisationCountry = this.organisationPageSessionService.getOrganisationCountry();
    this.contactForm.controls['countryCode'].setValue('+91');
    this.getDatemethod(true);
    //  this.contactForm.controls['countryId'].setValue(this.organisationCountry);
  }
  telInputObject(obj) {
    console.log(obj);
    debugger;
    obj.intlTelInput('setCountry', 'IN'); 
    // alert(this.selectedCountryShortCode.shortName);
    setTimeout(() => {
      obj.intlTelInput('setCountry', this.selectedCountryShortCode); 
    }, 100);
    
  }
  getDatemethod(refresh) {
    this.contactService.getDate(true).subscribe(data => {
      /*    this.currentYear = this.today.getFullYear();
         this.currentMonth = this.today.getMonth();
         this.currentDay = this.today.getDate();
         this.maxDate =  this.currentYear + ' ' + this.currentMonth + ' ' + this.currentDay; */
      let date_split = data.split(" ");
      this.maxDate = date_split[2] + ' ' + date_split[1] + ' ' + date_split[0];
    });
  }
  onCountryChange(event) {
    this.countryCode = event.dialCode;
    this.contactForm.controls['countryCode'].setValue("+" + this.countryCode);
  }
  checkemail(event) {
    let str: any = this.contactForm.value.emailAddress;
    if (str.length > 0) {
      str = str.toLowerCase();
      this.contactForm.controls['emailAddress'].setValue(str);
    }
  }
  onEdit() {
    // this.contactForm.controls['mobileNumber'].enable();
    this.updateBtnshow = true;
    this.viewcontact = false;
    this.genderTypedisable = false;

    if (this.data.connectionStatusType == this.ContactStatusType().Connected) {
      this.contactTypedisable = true;
    } else {
      this.contactTypedisable = false;
    }

    this.refreshbtn = false;
    this.contactForm.controls['firstName'].enable();
    this.contactForm.controls['lastName'].enable();
    if (this.contactForm.value['mobileNumber']) {
      this.contactForm.controls['mobileNumber'].disable();
    }
    this.contactForm.controls['emailAddress'].enable();
    this.contactForm.controls['dateOfBirth'].enable();
    this.contactForm.controls['address1'].enable();
    this.contactForm.controls['address2'].enable();
    this.contactForm.controls['city'].enable();
    this.contactForm.controls['state'].enable();
    this.contactForm.controls['countryId'].enable();
    this.contactForm.controls['postalCode'].enable();
    this.contactForm.controls['designation'].enable();
    this.contactForm.controls['notes'].enable();

    if (this.data.contactType == 1) {
      this.labelEmail = 'Work Email Address:';
      this.contactForm.controls['emailAddress'].setValidators(Validators.compose([Validators.required, Validators.pattern(this.emailpattern)]));
      this.contactForm.controls['mobileNumber'].setValidators(Validators.compose([Validators.required, Validators.minLength(7), Validators.maxLength(12)]));
      this.contactForm.controls['emailAddress'].updateValueAndValidity();
      // this.contactForm.controls['designation'].setValue(null);
      this.destinationBox = true;
    } else {
      this.labelEmail = 'Email:';
      //  this.contactForm.controls['dateOfBirth'].setValidators(null);
      this.contactForm.controls['designation'].setValidators(null);
      this.contactForm.controls['notes'].setValidators(null);
      this.contactForm.controls['emailAddress'].setValidators(null);
      this.contactForm.controls['mobileNumber'].setValidators(null);
      //   this.contactForm.controls['genderType'].setValidators(null);
      this.contactForm.controls['designation'].updateValueAndValidity();
      this.contactForm.controls['notes'].updateValueAndValidity();
      //  this.contactForm.controls['dateOfBirth'].updateValueAndValidity();
      // this.contactForm.controls['genderType'].updateValueAndValidity();
      this.contactForm.controls['emailAddress'].updateValueAndValidity();
      this.contactForm.controls['mobileNumber'].updateValueAndValidity();
      this.destinationBox = false;
    }
    // this.onSubmit();
  }
  public onClose = (e) => {
    e.cancel = false;
  }

  Cancel() {
    this.location.back();
  }
  /*   refresh() {
      //  this.contactForm.controls['mobileNumber'].setValue("");
    } */
  mobileNoCheck(newphoneNumber) {
    let data_mobileNo = {};
    data_mobileNo['mobilenumber'] = newphoneNumber;
    if (!data_mobileNo) {
      this.contactService.userExit(data_mobileNo).subscribe(data => {
        if (data.value == true) {
          this.alertService.success('This contact is a react user.');
        }
      });
    }
  }
  getCountryDetails(refresh) {
    this.contactService.getCountryList(refresh).subscribe(country => {
      this.countryList = country;
      // this.createForm();
      this.organisationCountry = this.organisationPageSessionService.getOrganisationCountry();
      this.contactForm.controls['countryId'].setValue(this.organisationCountry);
      console.log(this.contactForm.value.countryId);
      if (this.id != 0) {
        this.getContact(true);
        this.viewcontact = true;
      }
    });

  }
  firstName(event) {
    let str: string = this.contactForm.value.firstName;
    if (str.length > 0) {
      str = str[0].toUpperCase() + str.slice(1);
      this.contactForm.controls['firstName'].setValue(str);
    }
  }
  onStateBlurMethod() {
    this.dropdown.showPopup();
  }
  onDesignationBlurMethod() {
    this.datePicker.show();
  }
  onLastNameBlurMethod() {
    if (!this.destinationBox)
      this.datePicker.show();
  }
  lastName(event) {
    let str: string = this.contactForm.value.lastName;
    str = str[0].toUpperCase() + str.slice(1);
    this.contactForm.controls['lastName'].setValue(str);
  }
  onddlPopupOpen(event: PopupEventArgs, ddlObj) {
    event.popup.offsetY = -(parseInt(ddlObj.popupHeight));
    event.popup.collision = { X: 'fit', Y: 'fit' };
    event.popup.dataBind();
    event.popup.refreshPosition(ddlObj.element, false);
  }
  createlabelEmail(event) {
    this.contactForm.controls['contactType'].setValue(event.value);
    if (event.value == 1) {
      this.labelEmail = 'Work Email Address:';
      this.contactForm.controls['emailAddress'].setValidators(Validators.compose([Validators.required, Validators.pattern(this.emailpattern)]));
      this.contactForm.controls['mobileNumber'].setValidators(Validators.compose([Validators.required, Validators.minLength(7), Validators.maxLength(12)]));
      this.contactForm.controls['emailAddress'].updateValueAndValidity();
      // this.contactForm.controls['designation'].setValue(null);
      this.destinationBox = true;
    } else {
      this.labelEmail = 'Email:';
      //  this.contactForm.controls['dateOfBirth'].setValidators(null);
      this.contactForm.controls['designation'].setValidators(null);
      this.contactForm.controls['notes'].setValidators(null);
      this.contactForm.controls['emailAddress'].setValidators(null);
      this.contactForm.controls['mobileNumber'].setValidators(null);
      //   this.contactForm.controls['genderType'].setValidators(null);
      this.contactForm.controls['designation'].updateValueAndValidity();
      this.contactForm.controls['notes'].updateValueAndValidity();
      // this.contactForm.controls['dateOfBirth'].updateValueAndValidity();
      // this.contactForm.controls['genderType'].updateValueAndValidity();
      this.contactForm.controls['emailAddress'].updateValueAndValidity();
      this.contactForm.controls['mobileNumber'].updateValueAndValidity();
      this.destinationBox = false;
    }
  }
  onSubmit() {
    debugger
    this.submitted = true;

    this.organisationCountry = this.organisationPageSessionService.getOrganisationCountry();
    if (this.contactForm.valid) {

      if (this.contactForm.value.countryId == null || this.contactForm.value.countryId == 0) {
        this.contactForm.value.countryId = this.organisationCountry;
      }

      const mobNo = this.contactForm.getRawValue().mobileNumber;
      const email = this.contactForm.value.emailAddress;
      const contactType = this.contactForm.value.contactType;
      if (contactType == 2) {
        this.contactForm.value['designation'] = '';
      }
      if (!(mobNo || email)) {
        this.alertService.error("Mobile number or email is required");
      }
      else {
        if (this.id != 0) {
          this.contactForm.value['imageURL'] = this.data.imageURL;
        }
        this.contactForm.value['mobileNumber'] = this.contactForm.getRawValue().mobileNumber;
        this.contactForm.value['mobileNumber'] = this.contactForm.getRawValue().mobileNumber;
        if (this.id == 0) {
          this.contactForm.value['connectionStatusType'] = this.ContactStatusType().AddedAsContact;
        }

        this.contactService.saveContact(this.contactForm.value).subscribe(data => {
          if (this.id != 0) {
            this.alertService.success("Contact updated successfully");
          } else {
            this.alertService.success("Contact added successfully");
          }
          this.location.back();
        });
      }
    }
  }
}
