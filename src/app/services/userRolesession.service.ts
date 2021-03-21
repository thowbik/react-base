import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';

import * as _ from "lodash";

@Injectable()

export class UserRoleSessionService {

    localStorageSessionKey: string;

    constructor() {
        this.localStorageSessionKey = 'React-' + environment.apiBaseUrl + '-RolePagesPermission';
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
    setLocalStorageProperties(rolePages) {// jshint ignore:line
        localStorage.setItem(this.localStorageSessionKey, JSON.stringify(rolePages));
    };
    getRoleDatas() {
        const jsonData = localStorage.getItem(this.localStorageSessionKey);
        return jsonData == null ? '' : JSON.parse(jsonData);
    }


}