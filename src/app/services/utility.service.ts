import { Injectable } from '@angular/core';
import { DataService } from "./data.service";


@Injectable()
export class UtilityService {

  constructor(
    private dataService: DataService) { }

  
  getGenderType(refresh:Boolean){
    return this.dataService.getData('/api/utility/gendertype', refresh);
  }

   
}
