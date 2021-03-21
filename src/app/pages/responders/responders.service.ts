import { Injectable } from '@angular/core';
import { DataService } from '../../services';

@Injectable()
export class RespondersService {
    getRespondersRoute: string = "/api/formResponders";
    getQuestionsRoute: string = "/api/getFormByLabelId";
    deleteQuestionRoute: string = "/api/multipleForm/delete";
    formsmappingLabel: string = "/api/addFormLabelMapping";
    transferOwnershipRoute: string = "/api/transferOwnership";
    PostedShareFormsRoute: string = "/api/formResponders";
    deleteRespondersRoute: string = "/api/multipleFormResponders/delete";
    constructor(private dataService: DataService) {
    }


    getResponders(formId, refresh) {
        return this.dataService.getData(this.getRespondersRoute + "/" + formId, refresh);
    }
    ShareForms(Responders) {
        debugger;
        return this.dataService.post(this.PostedShareFormsRoute, Responders).map(response => {
            debugger;
            return response;
        });
    }
    deleteQuestion(selectedrecords) {
        return this.dataService.post(this.deleteQuestionRoute, selectedrecords).map(response => {
            this.dataService.clearRouteCache(this.getQuestionsRoute);
            return response;
        });
    }
    deleteResponders(selectedrecords) {
        return this.dataService.post(this.deleteRespondersRoute, selectedrecords).map(response => {
            this.dataService.clearRouteCache(this.getRespondersRoute);
            return response;
        });
    }

    transferOwnership(user) {
        return this.dataService.post(this.transferOwnershipRoute, user).map(response => {

            return response;
        });
    }
}