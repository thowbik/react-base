import { NgModule,Injectable } from '@angular/core';
import { NgxPermissionsService } from 'ngx-permissions';
import { NgxPermissionsModule } from 'ngx-permissions';
import { UserRoleSessionService } from './userRolesession.service';

@Injectable()
@NgModule({  
  imports: [
      NgxPermissionsModule.forRoot()
  ],
  exports: [
    NgxPermissionsModule
  ]
})
export class PermissionsService {
  
  pageIds:any;

  constructor(private permissionsService: NgxPermissionsService,
  private userRoleSessionService:UserRoleSessionService) { }
  
  loadPermissions(rolepageID) {
    let roleData = this.userRoleSessionService.getRoleDatas();
    let const_data  = roleData.rolePageActionMappingList.filter(i => i.pageId === parseInt(rolepageID));
    this.pageIds = [];
    const_data.forEach(element => {
      this.pageIds.push(element.actionType);
    });
    console.log(this.pageIds);
    this.permissionsService.loadPermissions(this.pageIds);
    
  }
  
}