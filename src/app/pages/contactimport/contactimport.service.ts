import { Injectable } from '@angular/core';
import { DataService } from '../../services';

@Injectable()
export class ContactImportService 
{
    contacts: any;

    saveContactImportRoute ='/api/contactdetails/save';
    
    constructor( private dataService: DataService)
    {
    }
    saveContactImport(data)
    {
        return this.dataService.post(this.saveContactImportRoute,data);
    }
  
}
