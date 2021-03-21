import { Injectable } from '@angular/core';
import { DataService } from '../../services';

@Injectable()
export class FormOptionsService {
    showCorrectAnswerTypeRoute: string = "/api/formOption/showCorrectAnswerType";

    timeLimitToRespondTypeRoute: string = "/api/formOption/timeLimitToRespondType";

    formDetailsRoute: string = "/api/form";

    CreateFormRoute: string = "/api/addForm";

    tagTypesRoute: string = "/api/templateForm/tagsType";

    timeLeftRoute: string = "/api/formOption/selectedDate";

    constructor(private dataService: DataService) {
    }

    showCorrectAnswerType(refresh) {
        debugger;
        return this.dataService.getData(this.showCorrectAnswerTypeRoute, refresh);
    }


    timeLimitToRespondType(refresh) {
        return this.dataService.getData(this.timeLimitToRespondTypeRoute, refresh);
    }

    tagTypes(refresh) {
        return this.dataService.getData(this.tagTypesRoute, refresh);
    }

    getformDetails(id, refresh) {
        debugger
        return this.dataService.getData(this.formDetailsRoute + "/" + id, refresh);

    }

    createForm(form) {
        debugger;
        return this.dataService.post(this.CreateFormRoute, form).map(response => {
            return response;
        });
    }

    getDaysDetails(date, refresh) {
        debugger
        return this.dataService.getData(this.timeLeftRoute + "/" + date, refresh);

    }
}