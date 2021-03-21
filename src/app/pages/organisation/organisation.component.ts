import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl} from '@angular/forms';

import { Router, ActivatedRoute } from '@angular/router';
import {OrganisationService} from '../organisation/organisation.service';
import { OrganisationPageSessionService } from '../../services/organisationpagesession.service';
import { AuthenticationService, NavigationService, UserSessionService, UserPageSessionService } from '../../services';
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';

@Component({
    selector     : 'organisation',
    templateUrl  : './organisation.component.html',
    styleUrls    : ['./organisation.component.scss'],
})
export class OrganisationComponent implements OnInit
{
    public text: String = 'Select  Organisation';
    public fields: Object = { text: 'name', value: 'id' };
    public orginizationTypes:any;
    form: FormGroup;
    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
    private route: ActivatedRoute,
    private userPageSessionService: UserPageSessionService,
    private authService:AuthenticationService,
    private navigationService:NavigationService,
    private organisationService:OrganisationService,

    private organisationPageSessionService: OrganisationPageSessionService,
    private userSessionService:UserSessionService)
    {
        this.router = router;
    }

   
    ngOnInit(): void
    {
        let userId=this.userSessionService.userId();
        this.form = this.formBuilder.group({
            orginizationType:['', Validators.required],
        });
        this.organisationService.getOrganisation(userId,true).subscribe(organisation=>{
        this.orginizationTypes=organisation;
            
        });
    }

    orginizationChange(organisation) 
    {  
        this.organisationPageSessionService.create(organisation.itemData);
        this.proceedDashboard();
        this.userPageSessionService.destroy();
    }
    proceedDashboard() {
        this.router.navigate(['/dashboard']);
    }

      onLogout() {
        this.authService.logOut();
        this.navigationService.goToLogin();
      }
}
