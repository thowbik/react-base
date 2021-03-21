import { Injectable } from '@angular/core';
import { DataService } from '../../services';

@Injectable()
export class NewquestionService {
    CreateFormRoute: string = "/api/addForm";
    PostedQuestionRoute: string = "/api/multiQuestion";
    //editQuestionRoute: string = "/api/getSingleQuestion"; 
    editQuestionRoute: string = "/api/question";
    ConditionalActionsType: string = "/api/question/conditionalActionsType";
    deleteSingleQuestion: string = "/api/question/delete";
    sampleQuestion: string = "/api/getSampleForm";
    getFormsRoute: string = "/api/getFormByLabelId";
    PostedShareFormsRoute: string = "/api/formResponders"
    getGifImageRoute: string = "/api/getGifs";
    templateTypeRoute:string = "/api/templateForm/templateType";
    tagTypesRoute:string = "/api/templateForm/tagsType"
    constructor(private dataService: DataService) {
    }
    createForm(form) {
        debugger;
        return this.dataService.post(this.CreateFormRoute, form).map(response => {
            //this.dataService.clearRouteCache(this.getUserRoute);
            return response;

        });
    }
    PostedQuestion(question) {
        debugger;
        return this.dataService.post(this.PostedQuestionRoute, question).map(response => {
            debugger;
            return response;
        });
    }

    getSelectedQuestion(id, refresh) {
        return this.dataService.getData(this.editQuestionRoute + "/" + id, refresh);

    }
    conditionalActionsType(refresh) {
        debugger;
        return this.dataService.getData(this.ConditionalActionsType, refresh);

    }
    templateType(refresh) {
        return this.dataService.getData(this.templateTypeRoute, refresh);

    }
    tagTypes(refresh) {
        return this.dataService.getData(this.tagTypesRoute, refresh);

    }
    DeleteSingleQuestion(id) {
        debugger;
        return this.dataService.post(this.deleteSingleQuestion, id).map(response => {
            //this.dataService.clearRouteCache(this.editQuestionRoute);
            return response;
        });
    }
    getSampleQuestions(refresh) {
        return this.dataService.getData(this.sampleQuestion, refresh);
    }
    //http://localhost:8081/api/getGifs?search=good&next=19
    getGifImages(search, next, refresh) {
        return this.dataService.getData(this.getGifImageRoute  + "?search=" + search + "&next=" +next, refresh);
    }
    getMyForms(orgId, labelId, formPageType, refresh) {
        return this.dataService.getData(this.getFormsRoute + "/" + orgId + "?labelId=" + labelId + "&formPageType=" + formPageType, refresh);
    }

    ShareForms(Responders) {
        debugger;
        return this.dataService.post(this.PostedShareFormsRoute, Responders).map(response => {
            debugger;
            return response;
        });
    }

}
