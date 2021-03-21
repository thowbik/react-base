import { Injectable } from '@angular/core';
import { DataService } from '../../services';

@Injectable()
export class AddresponseService 
{
    getRespondersRoute: string = "/api/formResponders";
    getQuestionsRoute: string = "/api/getFormByLabelId";
    deleteQuestionRoute: string = "/api/multipleForm/delete";
    formsmappingLabel:string = "/api/addFormLabelMapping";
    transferOwnershipRoute: string = "/api/transferOwnership";
    PostedShareFormsRoute: string = "/api/formResponders";
    responseRoute: string = "/api/multiQuestionAnswer";
    constructor( private dataService: DataService)
    {
    }

    
    getResponders(formId,refresh)
    {
        return this.dataService.getData(this.getRespondersRoute+"/"+formId, refresh);
    }
    
    deleteQuestion(selectedrecords) {
            return this.dataService.post(this.deleteQuestionRoute, selectedrecords).map(response => {
                this.dataService.clearRouteCache(this.getQuestionsRoute);
                return response;
            });
        }
    
   
        saveResponse(responseData) {
            debugger;
        return this.dataService.post(this.responseRoute, responseData).map(response => {
    
            return response;
        });
    }
}