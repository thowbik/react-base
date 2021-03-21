import { Injectable } from '@angular/core';
import { DataService } from "./data.service";


@Injectable()
export class NavPageService {

  constructor(
    private dataService: DataService) { }

    getPageRoute: string = "/api/page/{PageType}";    

    // getPageByOrganisationId(refresh: Boolean, roleId: number) {
    //   return this.dataService.getData("/api/pages/"+roleId, refresh);
    //   }

    getPageByOrganisationId(refresh: Boolean, organisationId: number) {
    return this.dataService.getData("/api/modulepagemapping/"+organisationId, refresh);
    }

  savePage(pages) {
    return this.dataService.post('/api/page/', pages).map(response => {
      this.dataService.clearRouteCache(this.getPageRoute);
      return response;
    });
  }  
}
