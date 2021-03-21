import { Injectable } from '@angular/core';
import { DataService } from '../../services';

@Injectable()
export class FormsService {
    getFormsRoute: string = "/api/getFormByLabelId";

    deleteFormsRoute: string = "/api/multipleForm/delete";

    formsmappingLabel: string = "/api/addFormLabelMapping";

    transferOwnershipRoute: string = "/api/transferOwnership";

    // getTemplateFormRoute: string = "/api/getTeamplateForm"

    PostTemplateFormRoute: string = "/api/getTemplateForms"


    constructor(private dataService: DataService) {
    }

    getForms(orgId, labelId, formPageType, refresh) {
        return this.dataService.getData(this.getFormsRoute + "/" + orgId + "?labelId=" + labelId + "&formPageType=" + formPageType, refresh);
    }

    deleteForms(selectedrecords) {
        return this.dataService.post(this.deleteFormsRoute, selectedrecords).map(response => {
            this.dataService.clearRouteCache(this.getFormsRoute);
            return response;
        });
    }
    formMapping(data) {
        return this.dataService.post(this.formsmappingLabel, data);
    }
    transferOwnership(user) {
        return this.dataService.post(this.transferOwnershipRoute, user).map(response => {

            return response;
        });
    }

    // getTemplateForms(orgId, search, refresh) {
    //     return this.dataService.getData(this.getTemplateFormRoute + "/" + orgId + "?search=" + search, refresh);
    // }

    TemplateFormList(data) {
        debugger
        return this.dataService.post(this.PostTemplateFormRoute, data).map(response => {

            return response;
        });
    }
}