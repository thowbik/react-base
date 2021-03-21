import { Injectable } from '@angular/core';
import { BehaviorSubject,Observable } from 'rxjs';
import { DataService } from '../../services';

@Injectable()
export class OrganisationService 
{
    users: any;
    getOrganisationRoute: string = "/api/organisation";
    onProductsChanged: BehaviorSubject<any>;

    
    constructor( private dataService: DataService)
    {
         this.onProductsChanged = new BehaviorSubject({});
    }

    

   
    getOrganisation(id,refresh: Boolean)
    {
        return this.dataService.getData(this.getOrganisationRoute+"/"+id, refresh);
    }
}
