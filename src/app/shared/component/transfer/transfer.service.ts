import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { DataService } from '../../../services';

@Injectable()
export class TransferService {
    headerMessage = new Subject<any>();
    getcontactsforTransfer: string = "/api/getTransferOwnershipDropDown";
    transferOwnershipRoute: string = "/api/transferOwnership";

    constructor(private dataService: DataService) {
    }

    updateHeaderMessage(message) {
        this.headerMessage.next(message);
    }

    getcontactsForTransfer(orgId, refresh) {
        return this.dataService.getData(this.getcontactsforTransfer + "/" + orgId, refresh);
    }
    transferOwnership(user) {
        return this.dataService.post(this.transferOwnershipRoute, user).map(response => {

            return response;
        });
    }
}
