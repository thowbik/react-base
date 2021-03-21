import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { DataService } from '../../../services';

@Injectable()
export class DeletePopupService {
    headerMessage = new Subject<any>();
    constructor(private dataService: DataService) {
    }

    updateHeaderMessage(message) {
        this.headerMessage.next(message);
    }
}
