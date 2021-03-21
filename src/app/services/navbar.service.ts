import { Injectable, Output, EventEmitter } from '@angular/core'
import { DataService } from 'src/app/services';


@Injectable()
export class NavBarService {

  isOpen = true;
  rolePermission:string = "/api/GetRoleByOrganisationId";

  @Output() change: EventEmitter<boolean> = new EventEmitter();

  constructor(private dataService: DataService) {
  }

  toggle() {
    this.isOpen = !this.isOpen;
    this.change.emit(this.isOpen);
  }

  getRolePermissionData(organisationId,refresh)
  {
      return this.dataService.getData(this.rolePermission +  "/" + organisationId, refresh);
  }

}