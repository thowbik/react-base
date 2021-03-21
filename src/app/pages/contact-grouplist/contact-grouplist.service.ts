import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DataService } from '../../services';

@Injectable()
export class ContactGroupListService {
  
    contacts: any;

    saveContactGroupRoute: string = "/api/addGroupMembers";
    editContactGroupRoute: string = "/api/addGroup";
    getContactGroupRoute: string  = "/api/getGroupMembers";
    deleteContactGroupRoute: string = "/api/multipleGroupUserMapping/delete";
    makeGroupAdminRoute: string = "/api/makeGroupAdmin";
    contactsForGroupDropDown: string = "/api/contactsForGroupDropDown";

    constructor( private dataService: DataService)
    {
    }

    saveContactGroupMember(data)
    {
        return this.dataService.post(this.saveContactGroupRoute, data);
    }

    updateContactGroup(data)
    {
        return this.dataService.post(this.editContactGroupRoute, data);
    }

    getContactGroupMember(id , refresh) {
        return this.dataService.getData(this.getContactGroupRoute + "/" + id , refresh);
    }

    getContactSearchMember(organisationId, search, refresh) {
        return this.dataService.getData(this.getContactGroupRoute + "/" + organisationId + "?search=" + search, refresh);
    }

    deleteContactGroupMember(selectedrecords) {
        return this.dataService.post(this.deleteContactGroupRoute, selectedrecords).map(response => {
            this.dataService.clearRouteCache(this.getContactGroupRoute);
            return response;
        });
    }

    makeAdminGroupMember(selectedrecords) {
        return this.dataService.post(this.makeGroupAdminRoute, selectedrecords).map(response => {
            this.dataService.clearRouteCache(this.getContactGroupRoute);
            return response;
        });
    }


    getcontactsForGroupDropDown(orgId, groupId, profileType, refresh) {
        return this.dataService.getData(this.contactsForGroupDropDown + "/" + orgId + "/" + groupId + "/" + profileType, refresh);
    }


}
