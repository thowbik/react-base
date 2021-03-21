import { Injectable } from '@angular/core';
import { DataService } from '../../services';

@Injectable()

export class ContactsGroupsService  
{
    contacts: any;

    saveContactGroupRoute: string = "/api/addGroup";
    editContactGroupRoute: string = "/api/addGroup";
    getContactGroupRoute: string  = "/api/getGroupByUserId";
    deleteContactGroupRoute: string = "/api/multipleGroup/delete";
    getSingleGroupRoute: string = "/api/editSingleGroup";
    getcontactsforTransfer: string = "/api/getTransferOwnershipDropDown";
    transferOwnershipRoute: string = "/api/transferOwnership";

    constructor( private dataService: DataService)
    {
    }

    saveContactGroup(data)
    {
        return this.dataService.post(this.saveContactGroupRoute,data);
    }

    updateContactGroup(data)
    {
        return this.dataService.post(this.editContactGroupRoute,data);
    }

    getContactGroup(userId,orgId, refresh) {
        return this.dataService.getData(this.getContactGroupRoute + "/" + userId + "/" + orgId, refresh);
    }

    getContactSearchGroup(organisationId, search, refresh) {
        return this.dataService.getData(this.getContactGroupRoute + "/" + organisationId + "?search=" + search, refresh);
    }

    getSingleGroup(groupId, refresh) {
        return this.dataService.getData(this.getSingleGroupRoute + "/" + groupId , refresh);
    }

    deleteContactGroup(selectedrecords) {
        return this.dataService.post(this.deleteContactGroupRoute, selectedrecords).map(response => {
            this.dataService.clearRouteCache(this.getContactGroupRoute);
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
