import { Component,Inject,ViewChild, OnInit,ViewEncapsulation } from '@angular/core';
import { UserSessionService, OrganisationPageSessionService, AlertService, NavigationService } from '../../services';
import { SelectEventArgs,TabComponent } from '@syncfusion/ej2-angular-navigations';
@Component({
    selector     : 'settings-dashboard',
    templateUrl  : './settings.component.html',
    styleUrls    : ['./settings.component.scss']
})
export class SettingsComponent implements OnInit
{
    public animation: object = { previous: { effect: 'SlideLeftIn', duration: 1000, easing: 'ease' }, next: { effect: 'SlideRightIn', duration: 1000, easing: 'ease' } };
   
    public headerText: Object = [{ 'text': 'General' },{ 'text': 'Subscription' },{ 'text': 'Activity Log' },{ 'text': 'API' }];
    constructor()
    {
      
    }
    
    ngOnInit(): void
    {
       
    }

}


