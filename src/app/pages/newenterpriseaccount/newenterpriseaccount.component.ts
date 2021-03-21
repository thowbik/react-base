import { Component, OnInit, HostListener, NgZone } from '@angular/core';
import { NavigationService, AuthenticationService, UserSessionService } from 'src/app/services';
import { NewenterpriseaccountService } from './newenterpriseaccount.service';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { Login } from 'src/app/models/login';
import * as jwtDecode from "jwt-decode";
import { UserSession } from 'src/app/models';
import { DataService } from "../../services/data.service";
import { OrganisationPageSessionService } from '../../services/organisationpagesession.service';
import { UserPageSessionService } from '../../services/userpagesession.service';
import 'rxjs/add/observable/interval';
import { SignalRService } from '../../services/signalR.service';
import { ChatMessage } from '../../models/chatMessage.model';
import { Observable } from 'rxjs';

// interface CallbackFcn {
//   (data: any): void;
// }

// declare class EventSource {
//   constructor(name: string);
//   onopen: CallbackFcn;
//   onmessage: CallbackFcn;
//   onerror: CallbackFcn;
//   addEventListener(evt: string, cb: CallbackFcn): void;
// }
@Component({
  selector: 'app-newenterpriseaccount',
  templateUrl: './newenterpriseaccount.component.html',
  styleUrls: ['./newenterpriseaccount.component.scss']
})
export class NewenterpriseaccountComponent implements OnInit {
  currentMessage: ChatMessage = new ChatMessage();
  allMessages: ChatMessage[] = [];
  canGetConnectionId: boolean;
  connectionId: string;
  accessToken: string;
  // public myAngularxQrCode: string ;
  loginForm: FormGroup;
  vm: Login;
  public myAngularxQrCode: string = null;
  public _eventSource: EventSource;
  accesstoken: any;
  finaldata_new: any;
  sessionData = new UserSession();
  innerWidth: number;
  canvassize: number;
  innerHeight: number;
  constructor(public navigationService: NavigationService,
    private NewenterpriseaccountService: NewenterpriseaccountService, private authService: AuthenticationService,
    private sessionService: UserSessionService, private signalRService: SignalRService, private ngZone: NgZone,
    private dataService: DataService,  private organisationPageSessionService:OrganisationPageSessionService,private userPageSessionService:UserPageSessionService) {
   
  }
  @HostListener('window:resize', ['$event'])

  ngOnInit() {
    //this.createForm();
    //this.delaycall();
    //this.login();
    this.onResize(event);
    this.subscribeToEvents();
    this.signalRService.initializeNewConnection();
    window.setInterval(() => {
      this.myAngularxQrCode = "";
      this.signalRService.initializeNewConnection();
    }, 20000);
    // this._eventSource.addEventListener('message', message => { 
    //   alert(message.data); 
    // });
    //console.log('/api/signupwithtoken/'+this.myAngularxQrCode);
    //https://<UrlToReact>/SignUpWithToken?Token=<someGuid>

    // this._eventSource.onmessage = (data) => this.__onMessage(data);

  }

  // delaycall() {
  //   this.sub = Observable.interval(50000)
  //   .subscribe((val) => {

  //     console.log('called');
  //     this.login(); 
  //   });
  // }

  getConnectionId() {
   
    if (this.canGetConnectionId) {
      this.signalRService.getConnectionId();
    }
  }
  // getQrCode() {
  //   debugger
  //   if (this.canGetConnectionId) {
  //     debugger
  //     this.myAngularxQrCode = this.signalRService.getQrCode(this.connectionId);
  //   }
  // }

  private subscribeToEvents(): void { 
    this.signalRService.connectionEstablished.subscribe(() => {
      this.canGetConnectionId = true;
      this.getConnectionId()
    });

 
    //window.setInterval(() => {
      this.signalRService.connectionId.subscribe((data: string) => {
         this.ngZone.run(() => {
          this.connectionId = data;
          this.myAngularxQrCode = data;
         
         });
      });
    
    //}, 50000);

    this.signalRService.accessToken.subscribe((data: string) => {
   
      this.ngZone.run(() => {
        this.accessToken = data;
        if (this.accessToken) {
          this.clearCachedMenu();
          const decodedToken = jwtDecode(this.accessToken);
          this.sessionData.authToken = this.accessToken;
          this.sessionData.userId = decodedToken["user.id"];
          this.sessionData.userFullName = decodedToken["user.fullname"];
          this.sessionData.isMultipleOrganisation = decodedToken["referrence1"];
          this.sessionService.create(this.sessionData);
          this.navigationService.goToSignup();
       }
      });
    });
  }


  clearCachedMenu() {
    this.dataService.clearCache();
    this.organisationPageSessionService.destroy();
    this.userPageSessionService.destroy();
  }  
  // getsignuptoken(refresh) {

  //   this.NewenterpriseaccountService.getsignuptoken(refresh).subscribe(urltoken => {
  //     this.myAngularxQrCode = urltoken.tokenUrl;

  //   });
  // }
  // public __onMessage(message: Object): void {
  //   debugger;
  //   console.log(message);
  // }


  //    response() {

  //       this.authService.getresponse(this.accesstoken).subscribe(finaldata => {
  //         debugger;

  //       }); 
  //  }


  goTosignup() {
    this.navigationService.goToSignup();
  }
  goToHome() {
    this.navigationService.goToHome();
  }

  onResize(event) {
    this.innerWidth = window.innerWidth;
    this.innerHeight = window.innerHeight;

    if (this.innerWidth < 800) {
      this.canvassize = 200;
    }

    else if (this.innerWidth > 1200) {
      this.canvassize = 204;
    }
    else {
      this.canvassize = 150;
    }
  }
  goToAppstore() {
    window.location.href = 'https://www.apple.com/in/ios/app-store/';
  }
  goToPlaystore() {
    window.location.href = 'https://play.google.com/store/apps';
  }
  
 




}