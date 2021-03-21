import { Injectable } from '@angular/core';
import { DataService } from '../../services';

@Injectable()
export class ChatsService 
{
    getFormsRoute: string = "/api/forms";
    
    constructor( private dataService: DataService)
    {
    }

    
    getForms(orgId,refresh)
    {
        return this.dataService.getData(this.getFormsRoute+"/"+orgId, refresh);
    }
}
