import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UtilityService, OrganisationPageSessionService, AlertService, NavigationService } from '../../services';
import { UserService } from '../user/user.service';

@Component({
    selector     : 'register',
    templateUrl  : './register.component.html',
    styleUrls    : ['./register.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class RegisterComponent implements OnInit
{
    registerForm: FormGroup;
    routeParams: any;
    user: any;
    id=0;
    action;
    genderTypes:any;
    private orgId=this.organisationPageSessionService.getOrganisationId();
    
   
    constructor(private route: ActivatedRoute,
        private alertService: AlertService,
        private navigationService: NavigationService,
        private utilityService:UtilityService,
        private organisationPageSessionService:OrganisationPageSessionService,
        private userService: UserService, private formBuilder: FormBuilder
    )
    {
       this.routeParams = route.snapshot.params;
       this.id=0;
    }
    
    ngOnInit(): void
    {
        this.registerForm = this.formBuilder.group({
            firstName : ['', Validators.required],
            lastName  : ['', Validators.required],
            mobileNumber: ['', Validators.compose([Validators.required, Validators.maxLength(10)])],
            emailAddress: ['', Validators.compose([Validators.required, Validators.email])],
            dateOfBirth : ['', Validators.required],
            genderType:['', Validators.required],
            roleId:['1', null],
            organisationId:['', null],
            id:[this.id,null]
        });
        this.getGenderType(false);
       // this.getUser(true);
       
    }

    getGenderType(refresh) {
        this.utilityService.getGenderType(refresh).subscribe(genderTypes => {
          this.genderTypes = genderTypes;
        });
      }

      save() {
        if (this.registerForm.valid) {
          this.registerForm.value.organisationId=1;
          this.userService.saveUser(this.registerForm.value).subscribe(data => {
            this.alertService.success("Registered successfully");
            this.navigationService.goToUser();
          });
        }
      }
}


