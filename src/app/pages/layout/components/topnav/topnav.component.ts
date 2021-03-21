import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ItemModel, MenuEventArgs } from '@syncfusion/ej2-angular-splitbuttons';
import { NavbarComponent } from '../navbar/navbar.component';
import { NavBarService } from '../../../../services/navbar.service';
import { UserPageSessionService, NavigationService, OrganisationPageSessionService, NavPageService, UserSessionService, DataService } from '../../../../services';
import { OrganisationService } from '../../../organisation/organisation.service';

import { SearchPageService } from 'src/app/services/searchpage.service';
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import * as _ from 'lodash';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MenuListData } from '../../../../models';
import { UserRoleSessionService } from '../../../../services/userRolesession.service';
import { UsersService } from '../../../users/users.service';
import {Inject, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.scss'],
  //changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopnavComponent implements OnInit {
  public pushRightClass: string;
  public listingdata: any = [];
  public searchform: FormGroup;
  public fields: Object;
  public orginizationTypes: any = [];
  public value: any;
  public orgId: any;
  public userName: string;
  public text: string = 'Select a Pages';
  public isOpen: boolean = false;
  @ViewChild('element') element;
  @Input() sideBar: NavbarComponent;
  @ViewChild('DeleteDialog')
  public DeleteDialog: DialogComponent;
  public menuListData: MenuListData;
  public organisationwidth: number;
  public items: ItemModel[] = [
    {
      text: 'Logout',
      iconCss: 'e-icons e-BT_Delete'
    }];

  public mobileItems: ItemModel[] = [
    {
      text: 'Logout',
      iconCss: 'e-icons e-BT_Delete'
    }];
  searchedtext: string;
  eventstring: any;
  max_orginization_length: number;
  max_orginization_check: number;
  organisationData: any;
  constructor(
    private formBuilder: FormBuilder,
    private userSessionService: UserSessionService,
    private userPageSessionService: UserPageSessionService,
    private pageService: NavPageService, 
    private organisationService: OrganisationService,
    private organisationPageSessionService: OrganisationPageSessionService,
    private router: Router,
    private navigationService: NavigationService,
    public searchPageService: SearchPageService,
    private navBarService: NavBarService,
    private usersService: UsersService,
    private userRoleSessionService: UserRoleSessionService,
    private sessionService: UserSessionService,
    private dataService: DataService,private cd: ChangeDetectorRef) {
    this.router = router;
    this.router.events.subscribe(val => {
      if (val instanceof NavigationEnd && window.innerWidth <= 992 && this.isToggled()) {
        this.toggleSidebar();
      }
    });
  }
  ngOnInit() {
    debugger
    this.createForm();
    this.pushRightClass = 'push-right';
    let userId = this.userSessionService.userId();
    this.userName = this.userSessionService.userFullName();


    this.organisationService.getOrganisation(userId, true).subscribe(organisation => {

      this.orginizationTypes = organisation;
      //this.orginizationTypes = this.orginizationTypes.splice(1, this.orginizationTypes.length);
      this.fields = { text: 'name' };
      this.value = this.organisationPageSessionService.getOrganisationName();

      if (this.value != null) {
        this.orgId = this.organisationPageSessionService.getOrganisationId();

      }
      else {
        this.userPageSessionService.destroy();
        this.orgId = this.orginizationTypes[0].id;

        this.value = this.orginizationTypes[0].name;
        this.organisationwidth = this.value.length;
        this.organisationPageSessionService.create(this.orginizationTypes[0]);

      }
      let org_name = [];
      this.orginizationTypes.forEach(element => {
        let count = element.name.length;
        org_name.push({
          val: count,
        })
      });

      this.pageService.getPageByOrganisationId(true, this.orgId).subscribe(data => {
        data.forEach(element => {
          var menuListData = new MenuListData();
          menuListData.id = element.id;
          menuListData.name = element.name;
          menuListData.Class = 'tick';
          this.listingdata.push(menuListData);
        });
      });
      this.getUserRoleList(this.orgId, false);
    });
  }
  // ngAfterViewInit() {
  //   this.cd.detach();
  // }
  createForm() {
    this.searchform = this.formBuilder.group({
      page: ['', null],
    });

  }

  // maps the local data column to fields property
  public localFields: Object = { text: 'name', value: 'name', iconCss: 'Class' };

  // set the placeholder to DropDownList input element
  public localWaterMark: string = 'Select a game';
  // set the height of the popup element
  public height: string = '200px';
  public cssClass: string = 'customdropdownClass';
  //public width : string = '200px';
  public customClass: string = 'e-active-tick';
  orginizationChange(organisation) {
    this.userRoleSessionService.destroy();
    this.userPageSessionService.destroy();
    this.organisationPageSessionService.destroyUserRole();
    this.organisationPageSessionService.create(organisation.itemData);
    this.getUserRoleList(organisation.itemData.id, true);
    debugger;
  }
  rolePermissionchange(organisationId, isOrganisationChange) {
    //let organisationId = this.organisationPageSessionService.getOrganisationId();
    this.navBarService.getRolePermissionData(organisationId, true).subscribe(response => {
      this.pageService.getPageByOrganisationId(true, organisationId).subscribe(data => {
        this.organisationData = data;
        this.userRoleSessionService.create(response);
        if (isOrganisationChange) {
          if (this.organisationData.length >= 1) {
            setTimeout(() => {
              window.location.reload();
            }, 100);
            this.router.navigate([this.organisationData[0].url]);
          }
        }
        //window.location.reload();
      });
    });
  }
  getUserRoleList(organisationId, isOrganisationChange) {
    // let organisationId = this.organisationPageSessionService.getOrganisationId();
    this.usersService.getUserRoleList(organisationId, true).subscribe(userroleList => {
      this.organisationPageSessionService.createUserRole(userroleList);
      debugger;
      if (isOrganisationChange == true)
        this.rolePermissionchange(organisationId, isOrganisationChange);
    });
  }

  isToggled(): boolean {
    const dom: Element = document.querySelector('body');
    return dom.classList.contains(this.pushRightClass);
  }

  // @HostListener('click')
  // click() {
  //   this.sideBar.toggleClick();
  // }
  search(searchvalue: string) {
    this.searchedtext = searchvalue;
    localStorage.setItem('search', searchvalue);
    let selectedpage = this.searchform.value.page;
    this.eventstring = selectedpage.toString().trim().toLowerCase();
    this.searchPageService.search(this.searchedtext);
    this.router.navigate(['/' + this.eventstring]);
  }


  toggleSidebar() {
    this.navBarService.toggle();
  }
  onLoggedout() {
    debugger
    localStorage.removeItem('isLoggedin');
    localStorage.removeItem('search');
    localStorage.removeItem('copyDataStorage');
    //localStorage.removeItem('isLoggedin');  
    this.sessionService.destroy();
    this.userSessionService.destroy();
    this.userPageSessionService.destroy(); // user page - menu listing
    this.organisationPageSessionService.destroy();
    this.organisationPageSessionService.destroyUserRole(); // userPage
    this.userRoleSessionService.destroy(); // Role Permission 
    this.navigationService.goToSignin();
    //this.DeleteDialog.show();
  }
  cancelClick() {
    this.DeleteDialog.hide();
  }

  profileclick(args: MenuEventArgs) {

    if (args.item.text === 'Logout') {
      this.onLoggedout();
    }
    /*  else if (args.item.text === 'Profile') {
       this.navigationService.goToProfile();
     } */
  }
  onResize(event) {
    event.target.innerWidth;
  }
  public onClose = (e) => {
    e.cancel = false;
  }

}