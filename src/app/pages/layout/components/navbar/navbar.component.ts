import {ViewChild,ChangeDetectorRef, Component, ElementRef, EventEmitter, HostBinding, HostListener, Input, OnDestroy, OnInit, Output, Renderer2, ViewEncapsulation
} from '@angular/core';
import { animate, AnimationBuilder, AnimationPlayer, style } from '@angular/animations';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SidebarComponent } from '@syncfusion/ej2-angular-navigations';
import { Toolbar } from '@syncfusion/ej2-navigations';
import { DataSource } from '@angular/cdk/collections';
import { UserPageSessionService, NavPageService, OrganisationPageSessionService } from '../../../../services';
import { NavBarService } from '../../../../services/navbar.service';
import { UserRoleSessionService } from '../../../../services/userRolesession.service';
import { Router } from '@angular/router';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import {Inject, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
    // changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent implements OnInit {

    public type: string = 'Auto';
    public width: string = '250px';
    public dockSize: string = '64px';
    public windowWidth:string ='(max-width: 800px)';
    public enableGestures: boolean = false;
    public enableDock: boolean = true;
    public closeOnDocumentClick: boolean = false;
    public showBackdrop: boolean = false;
    public data: any[];
    public item: any[];
    Localdata:any;
    @ViewChild('sidebar')
    public sidebar: SidebarComponent;
   // @HostBinding('class.is-open')
   @HostListener('window:resize', ['$event'])
    onResize(event) {
       
    }
    public isOpen = true;
    locationURL:any;
    public mediaQuery: any = window.matchMedia(this.windowWidth);
    constructor(private userPageSessionService: UserPageSessionService,
        private organisationPageSessionService: OrganisationPageSessionService,
        private navBarService: NavBarService,
        private pageService: NavPageService,
        private  location: Location,
        private userRoleSessionService:UserRoleSessionService,
        private router: Router,
        ) {
    }
    // toggleSidebar() {
    //     if(this.isOpen){
    //         this.mediaQuery  = window.matchMedia(this.windowWidth);
         
    //         if(this.mediaQuery.matches){
    //             this.navBarService.toggle();
    //         }
    //     }
    //   }
    ngOnInit() {
       //alert(abc);
        this.onResizeWindow();
        //this.sidebar.show();
        this.navBarService.change.subscribe(isOpen => {
            this.isOpen = isOpen;
            this.sidebar.toggle();
        });
        let organisationId = this.organisationPageSessionService.getOrganisationId();
        this.navBarService.getRolePermissionData(organisationId,true).subscribe(response => {
          this.userRoleSessionService.create(response);
        });
        this.getNav();
    }
    // ngAfterViewInit() {
    //     this.cd.detach();
    //   }

    onResizeWindow(){
        //  this.mediaQuery  = window.matchMedia(this.windowWidth);
         
        // if(!this.mediaQuery.matches){
            this.type="Push"
            this.sidebar.enableDock=true;
            this.closeOnDocumentClick = false;
            this.showBackdrop = false;
            this.sidebar.show();
        // }else{
        //     this.type="Over"
        //     this.sidebar.enableDock=true;
        //     this.closeOnDocumentClick = false;
        //     this.showBackdrop = false;
        //     this.isOpen = false;
        //     this.navBarService.isOpen = false;
        //     this.sidebar.hide();
        // }
    }

    getNav() {
        this.data = [];
      /*   if (this.userPageSessionService.isMenuCached()) {
            this.data = this.userPageSessionService.getUserPages();
        } else { */
          
            let organisationId = this.organisationPageSessionService.getOrganisationId();
            if(organisationId != null) {
                organisationId = this.organisationPageSessionService.getOrganisationId();
            }
            else {
                organisationId = 1;
            }
            this.pageService.getPageByOrganisationId(true,organisationId).subscribe(data => {
                this.Localdata=data;
                data.map(item => {
                    return {
                        id: item.name,
                        title: item.name,
                        type: 'item',
                        url: item.url,
                        icon: item.name+'.svg'
                    }
                }).forEach(item => this.data.push(item));
                this.userPageSessionService.create(this.Localdata);
               /*  if(this.data.length >= 1){
                  //this.locationURL = this.data[0].url;
                  debugger;
                    this.router.navigate([this.data[0].url]);
                  
                } */
            });
       /*  } */
    }

    ngOnDestroy() {
    }

}