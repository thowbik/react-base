
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DataService } from '../../services';

@Injectable()
export class ContactsEmployeesService {
    contacts: any;
    getEmployeesRoute: string = "/api/contacts";
    getContactdetailRoute: string = "/api/contact";
    deleteContactRoute: string = "/api/multiplecontact/delete";
    userconnection:string = "/api/userconnection";
    getcontactsforTransfer: string = "/api/getTransferOwnershipDropDown";
    transferOwnershipRoute: string = "/api/transferOwnership";
    constructor(private dataService: DataService) {
    }

    getEmployees(orgId,Employee, search,refresh) {
        return this.dataService.getData(this.getEmployeesRoute + "/" + orgId + "?contactType=" + Employee, refresh);
    }

   

    deleteContact(selectedrecords) {
        return this.dataService.post(this.deleteContactRoute, selectedrecords).map(response => {
            this.dataService.clearRouteCache(this.getEmployeesRoute);
            return response;
        });
    }
    userconnecction(data){
        return this.dataService.post(this.userconnection,data);
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
