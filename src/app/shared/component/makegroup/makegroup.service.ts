import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
 import { DataService } from '../../../services';

@Injectable()
export class MakeGroupService {
    existGroup = new Subject<string>();
    openmembers = new Subject<string>();
    editGroup = new Subject<string>();
    selectedId = new Subject<string>();
    newContactGroup = new Subject<string>();
    saveContactGroupRoute: string = "/api/addGroup";
    saveContactGroupMemberRoute: string = "/api/addGroupMembers";

    constructor( private dataService: DataService) {
    }

    updateexistGroup(message) {
        this.existGroup.next(message);
    }
    saveContactGroup(data) {
        return this.dataService.post(this.saveContactGroupRoute, data);
    }
    saveContactGroupMember(data) {
        return this.dataService.post(this.saveContactGroupMemberRoute, data);
    }
    updateGrouppage(pagefrom){
        this.openmembers.next(pagefrom);
    }
    updateeditingGroup(edit,selectedId){
        this.editGroup.next(edit);
        this.selectedId.next(selectedId);

    }
    newContact_Group(newContactGroup){
        this.newContactGroup.next(newContactGroup);
    }
}
