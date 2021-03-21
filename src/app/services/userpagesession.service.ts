import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';

import * as _ from "lodash";

@Injectable()

export class UserPageSessionService {

  localStorageSessionKey: string;
  constructor() {
    this.localStorageSessionKey = 'React-' + environment.apiBaseUrl + '-UserPages';
  }

  create(FuseNavigation) {// jshint ignore:line
    this.setLocalStorageProperties(FuseNavigation);
  };

  destroy() {// jshint ignore:line
    this.setLocalStorageProperties('');
  };

  load() { // jshint ignore:line
    const jsonData = localStorage.getItem(this.localStorageSessionKey);
    return jsonData;
  };


  getUserPages() {
    const jsonData = localStorage.getItem(this.localStorageSessionKey);
    return jsonData == null ? '' : JSON.parse(jsonData);
  }

  isMenuCached(): boolean {
    const jsonData = localStorage.getItem(this.localStorageSessionKey);
    return !_.isEmpty(JSON.parse(jsonData));
  }

  setLocalStorageProperties(userPages) {// jshint ignore:line
    localStorage.setItem(this.localStorageSessionKey, JSON.stringify(userPages));
  };
} 
