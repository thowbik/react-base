import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { DataService } from '../../../services';

@Injectable()
export class SendFormToService
{
    headerMessage = new Subject<any>();
    getcontactsforSendFormToService: string = "/api/shareFormToContactsDropDown";
    getGroupsforSendFormToService: string = "/api/shareFormToGroupDropDown";
    saveFormRespondersRoute: string = "/api/formResponders";

    constructor(private dataService: DataService) {
    }

    updateHeaderMessage(message)
    {
        this.headerMessage.next(message);
    }

    getcontactsForSendFormTo(userId, orgId, refresh)
    {
        return this.dataService.getData(this.getcontactsforSendFormToService + "/" + userId + "/" + orgId, refresh);
    }

    getGroupsforSendFormTo(userId, orgId, refresh)
    {
        return this.dataService.getData(this.getGroupsforSendFormToService + "/" + userId + "/" + orgId, refresh);
    }

}
