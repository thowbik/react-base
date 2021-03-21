import { Injectable } from '@angular/core';
import { DataService } from '../../services';

@Injectable()
export class SignupService 
{
    RegisterUserRoute: string = "/api/organisation"; 
    OtpverifyRoute: string = "/api/organisationotpverification";
    
    getRegisteredUserRoute: string = "/api/organisationbyid"; 
    getPlanRoute: string = "/api/getplanDetails"; 
    getCountryRoute: string = "/api/getCountryList"; 
    constructor( private dataService: DataService)
    {
    }
    EmailVerify(user) {
       
        return this.dataService.post(this.RegisterUserRoute, user).map(response => {
           
            return response;
        });
    }  
    OtpVerify(otp) {
       
        return this.dataService.post(this.OtpverifyRoute,otp).map(response => {
          
            return response;
        });
    }  
    RegisterUser(user) {
       
        return this.dataService.post(this.RegisterUserRoute, user).map(response => {
            //this.dataService.clearRouteCache(this.getUserRoute);
            return response;
        });
    }  

    getRegisteredUser(id,refresh)
    {
        return this.dataService.getData(this.getRegisteredUserRoute+"/"+id,refresh);
    } 
    getPlandetails(refresh) {
        return this.dataService.getData(this.getPlanRoute,refresh);
    }
    getCountryList(refresh) { 
        return this.dataService.getData(this.getCountryRoute,refresh);
    }
    
}
