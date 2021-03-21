import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class DataService {

  constructor(private http: HttpClient) {
  }

  private baseUrl = environment.apiBaseUrl;
  private cache: any = {};
  getData(route, refresh) {
    if (this.dataForRouteIsCached(route, refresh)) {
      return Observable.of(this.cache[route]);
    } else { //no cached data or refresh requested
      return this.http.get<any>(this.baseUrl + route).map(response => {
        this.cache[route] = response;
        return response;
      });
    }
  };


  getDataWithParams(route, params, refresh) {
    if (this.dataForRouteIsCached(route, refresh)) {
      return Observable.of(this.cache[route]);
    } else { //no cached data or refresh requested
      return this.http.get<any>(this.baseUrl + route, { params: params }).map(response => {
        this.cache[route] = response;
        return response;
      });
    }
  };
/*   getDate(route,refresh){
    return this.http.get<any>(this.baseUrl + route,refresh);
  } */
  getRecord(route) {
    return this.http.get<any>(this.baseUrl + route);
  };

  getRecordWithParams(route, params) {
    return this.http.get<any>(this.baseUrl + route, { params: params });
  };

  post(route, data) {
    return this.http.post<any>(this.baseUrl + route, data);
  }


  delete(route) {
    return this.http.delete(this.baseUrl + route).map(response => {
      return response;
    });
  }

  deleteAll(route, data) {
    var param = { 'Content-Type': 'application/json' }
    return this.http.delete(this.baseUrl + route, { headers: param, observe: data }).map(response => {
      return response;
    });
  }

  getReport(route) {
    return this.http.get(this.baseUrl + route, { responseType: 'blob' });
  };

  getExternalData(route) {
    return this.http.get<any>(route).map(response => {
      return response;
    });
  };

  dataForRouteIsCached(route, refresh) {
    return this.cache[route] && (refresh === false || refresh == undefined);
  }

  clearCache() {
    this.cache = {};
  }

  clearRouteCache(route) {
    this.cache[route] = null;
  }

}
