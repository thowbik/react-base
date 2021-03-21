import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { UserSession } from '../models/usersession';

@Injectable()

export class UserSessionService {

  session = new UserSession();
  localStorageSessionKey: string;
  localStorageSessionKeyLabel: string;
  constructor() {
    this.localStorageSessionKey = 'React-' + environment.apiBaseUrl + '-AuthData';
    this.localStorageSessionKeyLabel = 'React-' + environment.apiBaseUrl + '-labelData';
  }

  create(session) {// jshint ignore:line
    this.setLocalStorageProperties(session);
  };

  createLabel(session){
    this.setLocalStorageLabel(session);
  }

  getLabel(){
    const jsonData = localStorage.getItem(this.localStorageSessionKeyLabel);
    return jsonData == null ? '' : JSON.parse(jsonData);
  }

  destroy() {// jshint ignore:line
    this.setLocalStorageProperties(new UserSession());
  };

  load() { // jshint ignore:line
    const jsonData = localStorage.getItem(this.localStorageSessionKey);
    return jsonData;
  };

  authToken() {
    const jsonData = localStorage.getItem(this.localStorageSessionKey);
    return jsonData == null ? '' : JSON.parse(jsonData).authToken;
  }

  userId(): number {
    const jsonData = localStorage.getItem(this.localStorageSessionKey);
    return jsonData == null ? 0 : +JSON.parse(jsonData).userId;
  }

  userFullName() {
    const jsonData = localStorage.getItem(this.localStorageSessionKey);
    return jsonData == null ? '' : JSON.parse(jsonData).userFullName;
  }
  roleId(): number {
    const jsonData = localStorage.getItem(this.localStorageSessionKey);
    return jsonData == null ? 0 : +JSON.parse(jsonData).roleId;
  }

 

  isMultipleOrganisation():boolean {
    const jsonData = localStorage.getItem(this.localStorageSessionKey);
    
    return jsonData == null ? false : JSON.parse(jsonData).isMultipleOrganisation.toLowerCase()== 'true' ? true : false;;
  }

  isQc(): boolean {
    return this.roleId() === 4;
  }


  setLocalStorageProperties(session) {// jshint ignore:line
    localStorage.setItem(this.localStorageSessionKey, JSON.stringify(session));
  };

  setLocalStorageLabel(session) {// jshint ignore:line
    localStorage.setItem(this.localStorageSessionKeyLabel, JSON.stringify(session));
  };


} 
