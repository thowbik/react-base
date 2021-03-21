import { Injectable } from '@angular/core';
import { DataService } from '../../services';

@Injectable()
export class ContactService 
{
    contacts: any;

    saveContactRoute: string = "/api/contact";
    editContactRoute: string = "/api/contact";
    userExitCheck:string = "/api/isExistingMobileNo";
    getCountryRoute: string = "/api/getCountryList"; 
    getDateURl: string  = "/api/utility/getDateTime";
    constructor( private dataService: DataService)
    {
    }
    saveContact(data)
    {
        return this.dataService.post(this.saveContactRoute,data);
    }
    updateContact(data)
    {
        return this.dataService.post(this.editContactRoute,data);
    }
    getContact(id, refresh)
    { 
        return this.dataService.getData(this.editContactRoute+"/"+id, refresh);
    }
    userExit(newphoneNumber){
        return this.dataService.getRecordWithParams(this.userExitCheck,newphoneNumber);
    }
    getCountryList(refresh) {
        return this.dataService.getData(this.getCountryRoute,refresh);
    }
    getDate(refresh){
        return this.dataService.getData(this.getDateURl,refresh);
    }
}
