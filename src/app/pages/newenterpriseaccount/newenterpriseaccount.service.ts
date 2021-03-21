import { Injectable } from '@angular/core';
import 'rxjs/Rx';;
import { DataService } from '../../services';

@Injectable()
export class NewenterpriseaccountService {
    getUserRoute: string = "/api/getsignuptoken";
    constructor(private dataService: DataService) {
    }

    getsignuptoken(refresh) {
        return this.dataService.getData(this.getUserRoute , refresh);
    }
}