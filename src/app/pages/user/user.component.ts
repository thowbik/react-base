import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UtilityService, OrganisationPageSessionService, AlertService, NavigationService } from '../../services';
import { UserService } from './user.service';
import {PageSettingsModel ,ToolbarItems ,SearchSettingsModel} from '@syncfusion/ej2-angular-grids';

@Component({
    selector     : 'user-dashboard',
    templateUrl  : './user.component.html',
    styleUrls    : ['./user.component.scss']
})
export class UserComponent implements OnInit
{
    routeParams: any;
    user: any;
    form: FormGroup;
    id=0;
    cardTitle;
    action;
    genderTypes:any;
    roleTypes:any;
    private orgId=this.organisationPageSessionService.getOrganisationId();
    public headerText: Object = [{ 'text': 'Users' }, { 'text': 'Roles' }];
    public data: Object[];
    public pageSettings: PageSettingsModel;
    public toolbarOptions: ToolbarItems[];
    public searchOptions: SearchSettingsModel; 
    
   
    constructor(private route: ActivatedRoute,
        private alertService: AlertService,
        private navigationService: NavigationService,
        private utilityService:UtilityService,
        private organisationPageSessionService:OrganisationPageSessionService,
        private userService: UserService, private formBuilder: FormBuilder
    )
    {
       this.routeParams = route.snapshot.params;
       this.id=this.routeParams.id;
       this.cardTitle=this.id==0?"Add":"Edit";
       this.action=this.id==0?"Add":"Save";
    }
    
    ngOnInit(): void
    {
        this.data = [
          {
            Name: 'Chandran Periyasamy', Rating: "Super Admin", Status: 'ACTIVE', LastActivity: '17:05 PM Today',
            FNames: true, ShipCity: 'Reims', ShipAddress: '59 rue de l Abbaye',
              ShipRegion: 'CJ', ShipPostalCode: '51100', ShipCountry: 'France', Freight: 32.38, Verified: !0
          },
          {
            Name: 'John Doe', Rating: 'Admin', Status: 'ACTIVE', LastActivity: '17:05 PM Today',
            FNames: false, ShipCity: 'Münster', ShipAddress: 'Luisenstr. 48',
              ShipRegion: 'CJ', ShipPostalCode: '44087', ShipCountry: 'Germany', Freight: 11.61, Verified: !1
          },
          ]; 
        this.pageSettings = { pageSize: 6 };
        this.toolbarOptions = ['Search'];
        this.searchOptions = { fields: ['Name'], operator: 'contains', key: '', ignoreCase: true };

        this.form = this.formBuilder.group({
            firstName : ['', Validators.required],
            lastName  : ['', Validators.required],
            mobileNumber: ['', Validators.compose([Validators.required, Validators.maxLength(10)])],
            emailAddress: ['', Validators.compose([Validators.required, Validators.email])],
            dateOfBirth : ['', Validators.required],
            genderType:['', Validators.required],
            //roleId:['', Validators.required],
            organisationId:['', null],
            id:[this.id,null]
        });
        this.getGenderType(false);
        this.getRoles(true);
        this.getUser(true);
       
    }

    getGenderType(refresh) {
        this.utilityService.getGenderType(refresh).subscribe(genderTypes => {
          this.genderTypes = genderTypes;
        });
      }
    getUser(refresh) {
        if(this.id==0) return;
        
        this.userService.getUser(this.id,this.orgId,refresh).subscribe(user => {
          this.user = user;
          this.form.patchValue(this.user);
        });
        
      }

      getRoles(refresh) {
        this.userService.getRoles(this.orgId,refresh).subscribe(roles => {
            this.roleTypes = roles;
        });
      }

      save() {
        if (this.form.valid) {
          this.form.value.organisationId=this.organisationPageSessionService.getOrganisationId();
          this.userService.saveUser(this.form.value).subscribe(data => {
            this.alertService.success("User saved successfully");
            this.navigationService.goToUser();
          });
        }
      }
}



