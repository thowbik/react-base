import { Injectable } from '@angular/core';
import { DataService } from '../../services';

@Injectable()
export class UsersService 
{
    users: any;
    getUserRoute: string = "/api/contactusers";
    AddUserRoute: string = "/api/invite";
    getInvitedUserRoute: string = "/api/inviteduser";
    getParticularUserRoute: string = "/api/userRoleMapping";
    getRoleRoute: string = "/api/roles";
    updateRoleMapping: string = "/api/userRoleMapping";
    getContactRoute: string = "/api/contacts";
    deleteUserRoute: string = "/api/multiplecontactusers/delete";
    deleteRoleRoute: string = "/api/multiplerole/delete";
    contactsForUserDropDown: string = "/api/contactsForUserDropDown";
    rolePermission:string = "/api/role";
    userroleList:string = "/api/checkUserAdmin";
    constructor( private dataService: DataService)
    {
    }
    getUsers(orgId, userId,search, refresh)
    {
        return this.dataService.getData(this.getInvitedUserRoute+"/"+userId+"/"+orgId + "?search=" + search, refresh);
    }

    getUsersByGlobalSearch(orgId, userId, searchValue, refresh)
    {
        return this.dataService.getData(this.getInvitedUserRoute+"/"+userId+"/"+orgId, refresh);
    }

    saveUser(user) {
        return this.dataService.post(this.AddUserRoute, user).map(response => {
            this.dataService.clearRouteCache(this.getUserRoute);
            return response;
        });
    }

    saveRoleMappingUser(user){
        return this.dataService.post(this.updateRoleMapping, user).map(response => {
            this.dataService.clearRouteCache(this.getUserRoute);
            return response;
        });
    }

    getRoles(orgId,refresh)
    {
        return this.dataService.getData(this.getRoleRoute+"/"+orgId, refresh);
    }

    deleteUsers(selectedrecords) {
        return this.dataService.post(this.deleteUserRoute, selectedrecords).map(response => {
            this.dataService.clearRouteCache(this.getUserRoute);
            return response;
        });
    }

    getContacts(orgId,refresh)
    {
        return this.dataService.getData(this.getContactRoute+"/"+orgId, refresh);
    }
    getcontactsForUserDropDown(orgId, profileType, refresh)
    {
        return this.dataService.getData(this.contactsForUserDropDown+"/"+orgId+"/"+profileType, refresh);
    }
    deleteRole(selectedrecords) {
        return this.dataService.post(this.deleteRoleRoute, selectedrecords).map(response => {
            this.dataService.clearRouteCache(this.getUserRoute);
            return response;
        });
    }
    getUser(id, refresh)
    { 
        return this.dataService.getData(this.getParticularUserRoute +  "/" + id, refresh);
       
    }

    getRolePermissionData(organisationId,refresh)
    {
        return this.dataService.getData(this.rolePermission +  "/" + organisationId, refresh);
    }

    getUserRoleList(orgId, refresh) {
        return this.dataService.getData(this.userroleList +  "/" + orgId, refresh);
    }
}