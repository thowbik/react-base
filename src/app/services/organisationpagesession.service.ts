import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';

import * as _ from "lodash";

@Injectable()

export class OrganisationPageSessionService {

  localStorageSessionKey: string;
  localStorageSessionKey_isAdmin:string;
  
  constructor() {
    this.localStorageSessionKey = 'React-' + environment.apiBaseUrl + '-OrganisationPages';
    this.localStorageSessionKey_isAdmin = 'React-' + environment.apiBaseUrl + '-UserRoles';
  }

  create(Organisation) {
    this.setLocalStorageProperties(Organisation);
  };

  destroy() {
    this.setLocalStorageProperties('');
  };

  load() {
    const jsonData = localStorage.getItem(this.localStorageSessionKey);
    return jsonData;
  };

  createUserRole(Organisation) {
    this.setLocalStoragePropertiesUserRole(Organisation);
  };

  destroyUserRole() {
    this.setLocalStoragePropertiesUserRole('');
  };

  loadUserRole() {
    const jsonData = localStorage.getItem(this.localStorageSessionKey_isAdmin);
    return jsonData;
  };
  UserRole() {
    const jsonData = localStorage.getItem(this.localStorageSessionKey_isAdmin);
    if (jsonData != null) console.log("JSON.parse(jsonData).id-->" + JSON.parse(jsonData).rollId);
    return jsonData == null ? '' : JSON.parse(jsonData).rollId;
  }
  UserRoleData(){
    const jsonData = localStorage.getItem(this.localStorageSessionKey_isAdmin);
    return jsonData == null ? '' : JSON.parse(jsonData);
  }
  getOrganisation() {
    const jsonData = localStorage.getItem(this.localStorageSessionKey);
    return jsonData == null ? '' : JSON.parse(jsonData);
  }

  getOrganisationId() {
    const jsonData = localStorage.getItem(this.localStorageSessionKey);
    if (jsonData != null) console.log("JSON.parse(jsonData).id-->" + JSON.parse(jsonData).id);
    return jsonData == null ? '' : JSON.parse(jsonData).id;
  }
  getOrganisationCountry() {
    const jsonData = localStorage.getItem(this.localStorageSessionKey);
    return jsonData == null ? '' : JSON.parse(jsonData).countryId;
  }
  getEmail() {
    const jsonData = localStorage.getItem(this.localStorageSessionKey);
    return jsonData == null ? '' : JSON.parse(jsonData).emailAddress;
  }
  
  getOrganisationName() {
    const jsonData = localStorage.getItem(this.localStorageSessionKey);
    return jsonData == null ? '' : JSON.parse(jsonData).name;
  }

  isOrganisationCached(): boolean {
    const jsonData = localStorage.getItem(this.localStorageSessionKey);
    return !_.isEmpty(JSON.parse(jsonData));
  }

  setLocalStorageProperties(Organisation) {
    localStorage.setItem(this.localStorageSessionKey, JSON.stringify(Organisation));
  };
  setLocalStoragePropertiesUserRole(Organisation) {
    localStorage.setItem(this.localStorageSessionKey_isAdmin, JSON.stringify(Organisation));
  };

} 
