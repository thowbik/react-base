import { Injectable } from '@angular/core';
import { DataService } from '../../services';

@Injectable()
export class QuestionsService 
{
    getFormsRoute: string = "/api/forms";
    getQuestionsRoute: string = "/api/getFormByLabelId";
    deleteQuestionRoute: string = "/api/multipleForm/delete";
    formsmappingLabel:string = "/api/addFormLabelMapping";
    transferOwnershipRoute: string = "/api/transferOwnership";

    constructor( private dataService: DataService)
    {
    }

    
    getForms(orgId,refresh)
    {
        return this.dataService.getData(this.getFormsRoute+"/"+orgId, refresh);
    }
    deleteQuestion(selectedrecords) {
            return this.dataService.post(this.deleteQuestionRoute, selectedrecords).map(response => {
                this.dataService.clearRouteCache(this.getQuestionsRoute);
                return response;
            });
        }
    
    getQuestions(orgId,labelId,formPageType,refresh) {
        return this.dataService.getData(this.getQuestionsRoute +"/"+orgId + "?labelId=" + labelId + "&formPageType=" + formPageType, refresh);
    }
    formMapping(data)
    {
        return this.dataService.post(this.formsmappingLabel,data);
    }
    transferOwnership(user) {
        return this.dataService.post(this.transferOwnershipRoute, user).map(response => {
    
            return response;
        });
    }
}