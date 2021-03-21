import { Injectable } from '@angular/core';
import { DataService } from '../../services';
import { environment } from '../../../environments/environment';

@Injectable()
export class ShareService {
  ShareData: string = "/api/UserPrivilege";
  updateShareData:string = "/api/updateUserPrivilege";
  getShareContactRoute: string = "/api/getUserPrivilege";
  deleteShareData: string = "/api/multipleUserPrivilege/delete";
  getUserLists: string = "/api/getUserPrivilegeDropDown";
  updateShareUser:string = "/api/updateUserPrivilege";
  getContactsForShare: string = "/api/getTransferOwnershipDropDown";
  localStorageSessionKey: string;

  constructor(private dataService: DataService) {
    this.localStorageSessionKey = 'React-' + environment.apiBaseUrl + '-shareContact';
  }

  create(shareContact) {
    this.setLocalStorageProperties(shareContact);
  };

  destroy() {
    this.setLocalStorageProperties('');
  };

  load() {
    const jsonData = localStorage.getItem(this.localStorageSessionKey);
    return jsonData;
  };

  setLocalStorageProperties(shareContact) {
    localStorage.setItem(this.localStorageSessionKey, JSON.stringify(shareContact));
  };
  saveShareContact(data) {
    return this.dataService.post(this.ShareData, data);
  }
  updateShareContact(data) {
    return this.dataService.post(this.updateShareData, data);
  }
  getShareContact(orgId, recordType,userId,refresh) {

    return this.dataService.getData(this.getShareContactRoute + "/" + orgId + "/" + recordType+ "/" + userId, refresh);
  }
  deleteShareUsers(selectedrecords) {
    return this.dataService.post(this.deleteShareData, selectedrecords).map(response => {
      this.dataService.clearRouteCache(this.getShareContactRoute);
      return response;
    });
  }
  getUserList(orgId,recordType,userId, refresh){
    return this.dataService.getData(this.getUserLists + "/" + orgId + "/" + recordType+ "/" + userId, refresh);
  }
  updateShareUsers(data){
    return this.dataService.post(this.updateShareUser, data);
  }
  getcontactsForShare(orgId, refresh) {
    return this.dataService.getData(this.getContactsForShare + "/" + orgId, refresh);
}

}
