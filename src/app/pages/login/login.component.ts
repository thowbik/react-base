import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl,AbstractControl} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { OrganisationService } from '../organisation/organisation.service';
import { OrganisationPageSessionService } from '../../services/organisationpagesession.service';
import { Login } from '../../models';
import { AuthenticationService, UserSessionService, NavigationService } from '../../services';
import { enableRipple } from '@syncfusion/ej2-base';
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
import { SignupService } from '../signup/signup.service';

@Component({
    selector     : 'login',
    templateUrl  : './login.component.html',
    styleUrls    : ['./login.component.scss'],
})


export class LoginComponent implements OnInit
{
  countryList: any;
  public countryFields: Object;
    loginForm: FormGroup;
    vm: Login;
    returnUrl: string;
    @ViewChild('countrydropdown')   
    public ddlObj: DropDownListComponent;   
    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        
        private router: Router,
        private route: ActivatedRoute,
        private signupService: SignupService,
        private authService: AuthenticationService,
        private userSessionService:UserSessionService,
        private organisationService:OrganisationService,
        public navigationService: NavigationService,
        private organisationPageSessionService:OrganisationPageSessionService)
        {
            this.router = router;
            this.vm = new Login();
        
        
        }
   
    ngOnInit()
    {
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/'; 
        this.createForm();
        this.getCountryDetails(true);
    }
    getCountryDetails(refresh) {

      this.signupService.getCountryList(refresh).subscribe(countryList => {
  
        this.countryList = countryList;
        this.countryFields = { text: 'countryName', value: 'countryCode' };
        //this.form.controls['country'].setValue('78');
        //this.form.controls['country'].setValidators(null);
  
      });
    }
    createForm(){
        this.loginForm = new FormGroup({
          username: new FormControl('7709904343', [Validators.required]),
          password: new FormControl('1111', [Validators.required]),
          param: new FormControl('', [Validators.required])
    });
        
    }
    public onClose = (e) => {
      e.cancel = false;
    }
    login() {
         if (this.loginForm.valid) {
            this.vm.username=this.loginForm.value.username;
            this.vm.password=this.loginForm.value.password;
            this.vm.param=this.loginForm.value.param;
             this.authService.login(this.vm.username, this.vm.password,this.vm.param).subscribe(result => {
               if(result)
                 this.organisation();
             });
         }
         else {
            console.log("Form Invalid");
         }
      }
      organisation(){       
          let userId = this.userSessionService.userId();
              this.organisationService.getOrganisation(userId,true).subscribe(organisation=>{
                this.organisationPageSessionService.create(organisation[0]);
                this.navigationService.goToDashboard();
              });
      }

      proceedDashboard() {
        this.router.navigate([this.returnUrl]);
      }

      proceedOrganisation() {
        this.router.navigate(['/dashboard']);
      }  
      goToSignup() {
        this.router.navigate(['/newaccount']);
      }
      goToHome() {
        this.navigationService.goToHome();
      }
      
}
