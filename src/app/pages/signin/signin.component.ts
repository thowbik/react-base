import { Component, OnInit, HostListener, NgZone } from '@angular/core';
import { NavigationService, AuthenticationService, UserSessionService, NavPageService } from 'src/app/services';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { Login } from 'src/app/models/login';
import { AlertService } from 'src/app/services/alert.service';
import * as jwtDecode from "jwt-decode";
import { UserSession } from 'src/app/models';
import { DataService } from "../../services/data.service";
import { OrganisationPageSessionService } from '../../services/organisationpagesession.service';
import { UserPageSessionService } from '../../services/userpagesession.service';
import 'rxjs/add/observable/interval';
import { SignalRService } from '../../services/signalR.service';
import { ChatMessage } from '../../models/chatMessage.model';
import { Observable } from 'rxjs';
import { OrganisationService } from '../organisation/organisation.service';
import { NavBarService } from '../../services/navbar.service';
import { UserRoleSessionService } from '../../services/userRolesession.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})

export class SigninComponent implements OnInit {
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
  public pagedata: any[];
  public item: any[];
  public data: any[];
  constructor(public navigationService: NavigationService,
    private alertService: AlertService,
    private authService: AuthenticationService,
    private sessionService: UserSessionService,
    private signalRService: SignalRService,
    private ngZone: NgZone,
    private dataService: DataService,
    private organisationPageSessionService: OrganisationPageSessionService,
    private userSessionService: UserSessionService,
    private navBarService: NavBarService,
    private userRoleSessionService: UserRoleSessionService,
    private userPageSessionService: UserPageSessionService,
    private organisationService: OrganisationService,
    private pageService: NavPageService) {

    this.subscribeToEvents();

  }
  @HostListener('window:resize', ['$event'])

  ngOnInit() {

    this.onResize(event);
    this.signalRService.initializeNewConnection();
    window.setInterval(() => {
      this.myAngularxQrCode = "";
      this.signalRService.initializeNewConnection();
    }, 20000);
    
  }

  getConnectionId() {

    if (this.canGetConnectionId) {
      this.signalRService.getConnectionId();
    }
  }

  private subscribeToEvents(): void {
    this.signalRService.connectionEstablished.subscribe(() => {
      this.canGetConnectionId = true;
      this.getConnectionId()
    });

    this.signalRService.connectionId.subscribe((data: string) => {
      this.ngZone.run(() => {
        this.connectionId = data;
        this.myAngularxQrCode = data;
      });
    });
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

          if (decodedToken["referrence1"] == "False") {
            this.alertService.error("You did not connect with any enterprise account");
          }
          else {
            this.sessionService.create(this.sessionData);
            this.rolePermissionchange();
            this.organisation();
          }

        }
      });
    });
  }


  clearCachedMenu() {
    this.dataService.clearCache();
    this.organisationPageSessionService.destroy();
    this.userPageSessionService.destroy();
  }
  

  organisation() {

    let userId = this.userSessionService.userId();
    this.organisationService.getOrganisation(userId, true).subscribe(organisation => {
      this.organisationPageSessionService.create(organisation[0]);
      this.navigationService.goToDashboard();
    });
  }



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
  rolePermissionchange() {
    let organisationId = this.organisationPageSessionService.getOrganisationId();
    this.navBarService.getRolePermissionData(organisationId, true).subscribe(response => {
      this.userRoleSessionService.create(response);
    });
  }
}
