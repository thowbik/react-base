import { Injectable } from '@angular/core';
import { BehaviorSubject,Observable } from 'rxjs';
import { DataService } from '../../services';

@Injectable()
export class ContactsConnectedService 
{
    contacts: any;
    getContactRoute: string = "/api/contacts";
    deleteContactRoute: string = "/api/multiplecontact/delete";
    getcontactsforTransfer: string = "/api/getTransferOwnershipDropDown";
    transferOwnershipRoute: string = "/api/transferOwnership";
    constructor( private dataService: DataService)
    {
    }

    getContacts(orgId, Connected, refresh)
    {
        return this.dataService.getData(this.getContactRoute+ "/" + orgId + "?connectionStatusType=" + Connected, refresh);
    }
    deleteContact(selectedrecords) {
        return this.dataService.post(this.deleteContactRoute, selectedrecords).map(response => {
            this.dataService.clearRouteCache(this.getContactRoute);
            return response;
        });
    }
    getcontactsForTransfer(orgId, refresh) {
        return this.dataService.getData(this.getcontactsforTransfer+"/"+orgId, refresh); 
    }
    transferOwnership(user) {
        return this.dataService.post(this.transferOwnershipRoute, user).map(response => {
    
            return response;
        });
    }
}