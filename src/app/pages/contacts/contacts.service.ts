import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DataService } from '../../services';

@Injectable()
export class ContactsService {
    contacts: any;
    getContactRoute: string = "/api/contacts";
    getContactdetailRoute: string = "/api/contact";
    deleteContactRoute: string = "/api/multiplecontact/delete";
    userconnection:string = "/api/userconnection";
    rolePermission:string = "/api/role";
    getcontactsforTransfer: string = "/api/getTransferOwnershipDropDown";
    transferOwnershipRoute: string = "/api/transferOwnership";
    
    constructor(private dataService: DataService) {
    }

    getContacts(orgId, search,refresh) {

        return this.dataService.getData(this.getContactRoute + "/" + orgId + "?search=" + search, refresh);
    }

    getContactlist(orgId, refresh) {

        return this.dataService.getData(this.getContactRoute + "/" + orgId, refresh);
    }

    deleteContact(selectedrecords) {
        return this.dataService.post(this.deleteContactRoute, selectedrecords).map(response => {
            this.dataService.clearRouteCache(this.getContactRoute);
            return response;
        });
    }
    userconnecction(data){
        return this.dataService.post(this.userconnection,data);
    }
    inviteconnecction(data){
        return this.dataService.post(this.userconnection,data);
    }
    getRolePermissionData(organisationId,refresh)
    {
        return this.dataService.getData(this.rolePermission +  "/" + organisationId, refresh);
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
