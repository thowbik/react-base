import { Injectable } from '@angular/core';
import 'rxjs/Rx';;
import { DataService } from '../../services';
import { dataReady } from '@syncfusion/ej2-grids';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class LabelService {
    postLabelRoute: string = "/api/addlabel";
    getLabelRoute: string = "/api/getLabelByOrganisationId";
    deleteRoute: string = "/api/multipleLable/delete";
    constructor(private dataService: DataService,private http: HttpClient) {
    }

    saveLabel(data) {
        return this.dataService.post(this.postLabelRoute,data);
    }

    getLabelList(orgId,search,labelPageType,refresh) {

        return this.dataService.getData(this.getLabelRoute + "/" + orgId + "?search=" + search + "&labelPageType=" + labelPageType, refresh);
    }
    deleteLabel(data){
        debugger;
        return this.dataService.post(this.deleteRoute, data).map(response => {
            this.dataService.clearRouteCache(this.deleteRoute);
            return response;
        });
    }
}