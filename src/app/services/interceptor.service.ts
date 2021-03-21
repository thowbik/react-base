import { Injectable, Injector } from '@angular/core';
import { Router } from "@angular/router";
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../environments/environment';
import { UserSessionService } from "./usersession.service";
import { AuthenticationService } from "./authentication.service";
import { AlertService } from "./alert.service";

@Injectable()

export class HttpInterceptorService implements HttpInterceptor {

  constructor(
    private router: Router,
    private sessionService: UserSessionService,
    private authService: AuthenticationService,
    private alertService: AlertService) { }

  private baseUrl = environment.apiBaseUrl;

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const started = Date.now();

    // add authorization header with jwt token if available  
    const authToken = this.sessionService.authToken();

    var isTokenEndPoint = request.url.match('/api/token');
    if (isTokenEndPoint === null && this.sessionService.userId() && authToken) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${authToken}`
        }
      });
    }

    return next.handle(request).do((event: any) => {
      if (event instanceof HttpResponse) {
        const action = request.urlWithParams.replace(this.baseUrl, "");
        const elapsed = Date.now() - started;
        console.log(`${action} took ${elapsed} milliseconds`);
      }
    }).catch((error, caught) => {
      if (error instanceof HttpErrorResponse) {
        if (error.status === 401) {
          this.authService.logOut();
          this.router.navigate(['/signin']);
        } else {
          this.broadcastFriendlyErrorMessage(error);
        }
      }
      //return the error to the method that called it
      return Observable.throw(error);
    }) as any;
  }

  broadcastFriendlyErrorMessage(rejection) {
    var msg = '';
    if (rejection.status === 0 && (rejection.statusText === '' || rejection.statusText === 'Unknown Error')) {
      this.alertService.error('Unable to connect to the server, please try again in a couple of seconds.');
    }
    else if (rejection.status === 400) {
      if (rejection.error) {// jshint ignore:line
        msg = rejection.error;// jshint ignore:line
      }
      this.alertService.error(msg);
    }
    else if (rejection.status === 404) {
      if (rejection.message) {
        this.alertService.error(rejection.message);
      }
    }
    else if (rejection.status === 500) {
      if (rejection.message) {
        var ex = rejection.message;
        while (ex.innerException) {
          ex = ex.innerException;
        }
        this.alertService.error(ex.exceptionMessage);
      }
    }//Below condition is adeded to handle errors from file uplaod control
    else if (rejection.responseStatus === 401) {
      this.authService.logOut();
      this.router.navigate(['/signin']);
    }
    else if (rejection.responseStatus === 0) {
      this.alertService.error('Error occured, while uploading file');
    }
    else if (rejection.responseStatus === 400) {
      if (rejection.response) {// jshint ignore:line
        msg = rejection.response;// jshint ignore:line
      }
      this.alertService.error(msg);
    }
  }
}
