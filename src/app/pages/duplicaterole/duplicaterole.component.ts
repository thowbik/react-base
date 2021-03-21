import { Component, Inject, OnInit, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrganisationPageSessionService, UserSessionService, AlertService, NavigationService, NavPageService } from '../../services';
import { RoleService } from '../role/role.service';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { CheckBox } from '@syncfusion/ej2-buttons';
import { Role, RolePageActionMapping, RolePageActionType, RoleMenu } from '../../models';
import { GridComponent } from '@syncfusion/ej2-angular-grids';
import { QueryCellInfoEventArgs, RowSelectEventArgs, SelectionService, SelectionSettingsModel, CellSelectEventArgs } from '@syncfusion/ej2-angular-grids';
import { NavBarService } from '../../services/navbar.service';
import { UsersService } from '../users/users.service';
import { UserRoleSessionService } from '../../services/userRolesession.service';

@Component({
  selector: 'app-duplicaterole',
  templateUrl: './duplicaterole.component.html',
  styleUrls: ['./duplicaterole.component.scss']
})
export class DuplicateroleComponent implements OnInit {
  [x: string]: any;
  id = 0;
  @ViewChild('grid')
  public grid: GridComponent;

  @ViewChild('formgrid')
  public formgrid: GridComponent;
  @ViewChild('questiongrid')
  public questiongrid: GridComponent;
  @ViewChild('contactsgrid')
  public contactsgrid: GridComponent;
  @ViewChild('usergrid')
  public usergrid: GridComponent;
  @ViewChild('dashboardgrid')
  public dashboardgrid: GridComponent;
  @ViewChild('chatgrid')
  public chatgrid: GridComponent;
  @ViewChild('reportgrid')
  public reportgrid: GridComponent;
  @ViewChild('settingsgrid')
  public settingsgrid: GridComponent;

  public routeParams: any;
  public role: any;
  roleForm: FormGroup;
  public cardTitle: any;

  public dashboarddata: any;
  public data: any;
  public questionsdata: any;
  public chatdata: any;
  public userdata: any;
  public contactdata: any;
  public reportdata: any;
  public settingsdata: any;

  public dashboard_div: boolean = false;
  public forms_div: boolean = false;
  public question_div: boolean = false;
  public chat_div: boolean = false;
  public user_div: boolean = false;
  public contact_div: boolean = false;
  public report_div: boolean = false;
  public settings_div: boolean = false;

  public dashboard_grid: boolean = false;
  public forms_grid: boolean = false;
  public question_grid: boolean = false;
  public chat_grid: boolean = false;
  public user_grid: boolean = false;
  public contact_grid: boolean = false;
  public report_grid: boolean = false;
  public settings_grid: boolean = false;

  public dashboard_check: boolean;
  public forms_check: boolean;
  public question_check: boolean;
  public chat_check: boolean;
  public user_check: boolean;
  public contact_check: boolean;
  public report_check: boolean;
  public setting_check: boolean;

  public roleCheck_Admin: any;

  public selectionOptions: SelectionSettingsModel;
  formchecked: boolean;
  questionchecked: boolean;
  contactchecked: boolean;
  userchecked: boolean;
  pageIdList: any = [];
  public rowdata: any;
  public rolePageActionMapping: RolePageActionMapping;
  public rolePageActionType: RolePageActionType;
  selectedrecords: any;
  public customAttributes: object;
  public customchange: object;

  roleMenu() { return RoleMenu; }

  constructor(
    private route: ActivatedRoute,
    private alertService: AlertService,
    private navigationService: NavigationService,
    private navBarService: NavBarService,
    private usersService: UsersService,
    private userSessionService: UserSessionService,
    private organisationPageSessionService: OrganisationPageSessionService,
    private roleService: RoleService,
    private userRoleSessionService: UserRoleSessionService,
    private pageService: NavPageService,
    private formBuilder: FormBuilder,
  ) {
    this.routeParams = route.snapshot.params;
    this.id = this.routeParams.id;
    this.cardTitle = this.id == 0 ? "New Role" : "Duplicate Role";
  }
  ngOnInit(): void {
    this.customAttributes = { class: 'customcss' };
    this.customchange = { class: 'customchange' };

    if (this.id != 0) {
      this.getRole(true);
    } else {
      this.initializedashboarddata();
      this.initializeFormsdata();
      this.initializequestiondata();
      this.initializeContactdata();
      this.initializeUserdata();
      this.initializechatdata();
      this.initializereportdata();
      this.initializesettingdata();
    }
    let userId = this.userSessionService.userId();
    let orgId = this.organisationPageSessionService.getOrganisationId();
    this.roleCheck_Admin = this.organisationPageSessionService.UserRoleData();
    this.pageService.getPageByOrganisationId(true, orgId).subscribe(data => {
      let dashboard_page = data.find(i => i.id === this.roleMenu().dashboard);
      if (dashboard_page)
        this.dashboard_div = true;
      else
        this.dashboard_div = false;
      let forms_page = data.find(i => i.id === this.roleMenu().forms);
      if (forms_page)
        this.forms_div = true;
      else
        this.forms_div = false;

      let questions_page = data.find(i => i.id === this.roleMenu().questions);
      if (questions_page)
        this.question_div = true;
      else
        this.question_div = false;

      let chat_page = data.find(i => i.id === this.roleMenu().chat);
      if (chat_page)
        this.chat_div = true;
      else
        this.chat_div = false;

      let user_page = data.find(i => i.id === this.roleMenu().user);
      if (user_page)
        if (this.id == 0) {
          this.user_div = false;
        } else {
          this.roleCheck_Admin.isAdmin = false;
          this.user_div = true;
        }
      else
        this.user_div = false;

      let contact_page = data.find(i => i.id === this.roleMenu().contact);
      if (contact_page)
        this.contact_div = true;
      else
        this.contact_div = false;

      let report_page = data.find(i => i.id === this.roleMenu().report);
      if (report_page)
        this.report_div = true;
      else
        this.report_div = false;

      let settings_page = data.find(i => i.id === this.roleMenu().settings);
      if (settings_page)
        this.settings_div = true;
      else
        this.settings_div = false;

    });
    this.roleForm = this.formBuilder.group({

      name: ['', Validators.required],
      userId: [userId, Validators.required],
      organisationId: [orgId, null],
      id: [0, null],
      roleId: [0, null],
      description: ['', Validators.required]

    });

    this.selectionOptions = { mode: 'Cell', type: 'Multiple', checkboxMode: 'ResetOnRowClick' };
  }
  ngAfterViewInit() {
    this.initializedashboarddata();
    this.initializeFormsdata();
    this.initializequestiondata();
    this.initializeContactdata();
    this.initializeUserdata();
    this.initializechatdata();
    this.initializereportdata();
    this.initializesettingdata();
  }
  goToRoles() {
    this.navigationService.goToUserRole();
  }

  initializeFormsdata() {
    this.data = [{
      lablename: 'Forms',
      pageId: this.roleMenu().FForms,
      view: false,
      create: false,
      edit: false,
      delete: false,
      addviewers: false,
      changeownership: false,
      addcontributors: false,
      all: false
    },
    {
      lablename: 'Responses',
      pageId: this.roleMenu().FResponses,
      view: false,
      create: false,
      edit: false,
      delete: false,
      addviewers: false,
      changeownership: false,
      addcontributors: false,
      all: false
    },
    {
      lablename: 'Insights',
      pageId: this.roleMenu().FInsights,
      view: false,
      create: false,
      edit: false,
      delete: false,
      addviewers: false,
      changeownership: false,
      addcontributors: false,
      all: false
    },
    {
      lablename: 'Correct Answers',
      pageId: this.roleMenu().FCorrectAnswers,
      view: false,
      create: false,
      edit: false,
      delete: false,
      addviewers: false,
      changeownership: false,
      addcontributors: false,
      all: false
    }];
  }
  initializequestiondata() {
    this.questionsdata = [{
      lablename: 'Questions',
      pageId: this.roleMenu().QQuestions,
      view: false,
      create: false,
      edit: false,
      delete: false,
      addviewers: false,
      changeownership: false,
      addcontributors: false,
      all: false
    },
    {
      lablename: 'Responses',
      pageId: this.roleMenu().QResponses,
      view: false,
      create: false,
      edit: false,
      delete: false,
      addviewers: false,
      changeownership: false,
      addcontributors: false,
      all: false
    },
    {
      lablename: 'Insights',
      pageId: this.roleMenu().QInsights,
      view: false,
      create: false,
      edit: false,
      delete: false,
      addviewers: false,
      changeownership: false,
      addcontributors: false,
      all: false
    },
    {
      lablename: 'Correct Answers',
      pageId: this.roleMenu().QCorrectAnswers,
      view: false,
      create: false,
      edit: false,
      delete: false,
      addviewers: false,
      changeownership: false,
      addcontributors: false,
      all: false
    }];

  }
  initializeContactdata() {
    this.contactdata = [{
      lablename: 'All Contacts',
      pageId: this.roleMenu().CContactAll,
      view: false,
      create: false,
      edit: false,
      delete: false,
      addviewers: false,
      changeownership: false,
      all: false
    },
    {
      lablename: 'Employee Contact',
      pageId: this.roleMenu().CEmployee,
      view: false,
      create: false,
      edit: false,
      delete: false,
      addviewers: false,
      changeownership: false,
      all: false
    },
    {
      lablename: 'Connected Contact',
      pageId: this.roleMenu().CConnected,
      view: false,
      create: false,
      edit: false,
      delete: false,
      addviewers: false,
      changeownership: false,
      all: false
    }, {
      lablename: 'Group',
      pageId: this.roleMenu().CGroup,
      view: false,
      create: false,
      edit: false,
      delete: false,
      addviewers: false,
      changeownership: false,
      all: false
    }];
  }
  initializeUserdata() {
    this.userdata = [{
      lablename: 'Users',
      pageId: this.roleMenu().user,
      view: false,
      create: false,
      edit: false,
      delete: false,
      all: false
    },
    {
      lablename: 'Role',
      pageId: this.roleMenu().role,
      view: false,
      create: false,
      edit: false,
      delete: false,
      all: false
    }];
  }
  initializedashboarddata() {
    this.dashboarddata = [{
      lablename: 'Dashboard',
      pageId: this.roleMenu().dashboard,
      view: false,
      create: false,
      edit: false,
      delete: false,
      all: false
    }];
  }
  initializechatdata() {
    this.chatdata = [{
      lablename: 'Chat',
      pageId: this.roleMenu().chat,
      view: false,
      create: false,
      edit: false,
      delete: false,
      all: false
    }];
  }
  initializereportdata() {
    this.reportdata = [{
      lablename: 'Report',
      pageId: this.roleMenu().report,
      view: false,
      create: false,
      edit: false,
      delete: false,
      all: false
    }];
  }
  initializesettingdata() {
    this.settingsdata = [{
      lablename: 'Settings',
      pageId: this.roleMenu().settings,
      view: false,
      create: false,
      edit: false,
      delete: false,
      all: false
    }];
  }
  getRole(refresh) {
    this.roleService.getRole(this.id, refresh).subscribe(roledata => {
      let temp_item = roledata.rolePageActionMappingList;
      let temp_pageId = roledata.pageIdList;

      this.forms_grid = false;
      this.question_grid = false;
      this.contact_grid = false;
      this.user_grid = false;
      this.dashboard_grid = false;
      this.chat_grid = false;
      this.settings_grid = false;
      this.report_grid = false;

      if (temp_item && temp_item.length > 0) {
        temp_item.forEach(pageAction => {
          this.data.forEach(element => {

            if (pageAction.pageId == element.pageId) {
              if (pageAction.actionType == RolePageActionType.create) {
                element.create = true;
              }
              if (pageAction.actionType == RolePageActionType.view) {
                element.view = true;
              }
              if (pageAction.actionType == RolePageActionType.edit) {
                element.edit = true;
              }
              if (pageAction.actionType == RolePageActionType.delete) {
                element.delete = true;
              }
              if (pageAction.actionType == RolePageActionType.addviewers) {
                element.addviewers = true;
              }
              if (pageAction.actionType == RolePageActionType.changeownership) {
                element.changeownership = true;
              }
              if (pageAction.actionType == RolePageActionType.addcontributors) {
                element.addcontributors = true;
              }
              if (element.create && element.view && element.edit && element.delete && element.changeownership && element.addviewers && element.addcontributors == true) {
                element.all = true;
              }
            }

          });
          this.questionsdata.forEach(element => {
            if (pageAction.pageId == element.pageId) {
              if (pageAction.actionType == RolePageActionType.create) {
                element.create = true;
              }
              if (pageAction.actionType == RolePageActionType.view) {
                element.view = true;
              }
              if (pageAction.actionType == RolePageActionType.edit) {
                element.edit = true;
              }
              if (pageAction.actionType == RolePageActionType.delete) {
                element.delete = true;
              }
              if (pageAction.actionType == RolePageActionType.addviewers) {
                element.addviewers = true;
              }
              if (pageAction.actionType == RolePageActionType.changeownership) {
                element.changeownership = true;
              }
              if (pageAction.actionType == RolePageActionType.addcontributors) {
                element.addcontributors = true;
              }
              if (element.create && element.view && element.edit && element.delete && element.changeownership && element.addviewers && element.addcontributors == true) {
                element.all = true;
              }
            }

          });
          this.contactdata.forEach(element => {
            if (pageAction.pageId == element.pageId) {
              if (pageAction.actionType == RolePageActionType.create) {
                element.create = true;
              }
              if (pageAction.actionType == RolePageActionType.view) {
                element.view = true;
              }
              if (pageAction.actionType == RolePageActionType.edit) {
                element.edit = true;
              }
              if (pageAction.actionType == RolePageActionType.delete) {
                element.delete = true;
              }
              if (pageAction.actionType == RolePageActionType.addviewers) {
                element.addviewers = true;
              }
              if (pageAction.actionType == RolePageActionType.changeownership) {
                element.changeownership = true;
              }
              if (element.create && element.view && element.edit && element.delete && element.changeownership && element.addviewers == true) {
                element.all = true;
              }
            }
          });
          this.userdata.forEach(element => {
            if (pageAction.pageId == element.pageId) {
              if (pageAction.actionType == RolePageActionType.create) {
                element.create = true;
              }
              if (pageAction.actionType == RolePageActionType.view) {
                element.view = true;
              }
              if (pageAction.actionType == RolePageActionType.edit) {
                element.edit = true;
              }
              if (pageAction.actionType == RolePageActionType.delete) {
                element.delete = true;
              }
              if (element.create && element.view && element.edit && element.delete == true) {
                element.all = true;
              }
            }
          });
          this.chatdata.forEach(element => {
            if (pageAction.pageId == element.pageId) {
              if (pageAction.actionType == RolePageActionType.create) {
                element.create = true;
              }
              if (pageAction.actionType == RolePageActionType.view) {
                element.view = true;
              }
              if (pageAction.actionType == RolePageActionType.edit) {
                element.edit = true;
              }
              if (pageAction.actionType == RolePageActionType.delete) {
                element.delete = true;
              }
              if (element.create && element.view && element.edit && element.delete == true) {
                element.all = true;
              }
            }
          });
          this.reportdata.forEach(element => {
            if (pageAction.pageId == element.pageId) {
              if (pageAction.actionType == RolePageActionType.create) {
                element.create = true;
              }
              if (pageAction.actionType == RolePageActionType.view) {
                element.view = true;
              }
              if (pageAction.actionType == RolePageActionType.edit) {
                element.edit = true;
              }
              if (pageAction.actionType == RolePageActionType.delete) {
                element.delete = true;
              }
              if (element.create && element.view && element.edit && element.delete == true) {
                element.all = true;
              }
            }
          });
          this.settingsdata.forEach(element => {
            if (pageAction.pageId == element.pageId) {
              if (pageAction.actionType == RolePageActionType.create) {
                element.create = true;
              }
              if (pageAction.actionType == RolePageActionType.view) {
                element.view = true;
              }
              if (pageAction.actionType == RolePageActionType.edit) {
                element.edit = true;
              }
              if (pageAction.actionType == RolePageActionType.delete) {
                element.delete = true;
              }
              if (element.create && element.view && element.edit && element.delete == true) {
                element.all = true;
              }
            }
          });
          this.dashboarddata.forEach(element => {
            if (pageAction.pageId == element.pageId) {
              if (pageAction.actionType == RolePageActionType.create) {
                element.create = true;
              }
              if (pageAction.actionType == RolePageActionType.view) {
                element.view = true;
              }
              if (pageAction.actionType == RolePageActionType.edit) {
                element.edit = true;
              }
              if (pageAction.actionType == RolePageActionType.delete) {
                element.delete = true;
              }
              if (element.create && element.view && element.edit && element.delete == true) {
                element.all = true;
              }
            }
          });

          if (pageAction.pageId == this.roleMenu().FForms || pageAction.pageId == this.roleMenu().FResponses ||
            pageAction.pageId == this.roleMenu().FInsights ||
            pageAction.pageId == this.roleMenu().FCorrectAnswers || pageAction.pageId == this.roleMenu().forms) {
            this.roleForms(true);
          }
          else if (pageAction.pageId == this.roleMenu().QQuestions || pageAction.pageId == this.roleMenu().QResponses
            || pageAction.pageId == this.roleMenu().QInsights
            || pageAction.pageId == this.roleMenu().QCorrectAnswers || pageAction.pageId == this.roleMenu().questions) {
            this.roleQuestion(true);
          }
          else if (pageAction.pageId == this.roleMenu().CContactAll || pageAction.pageId == this.roleMenu().CConnected
            || pageAction.pageId == this.roleMenu().CEmployee
            || pageAction.pageId == this.roleMenu().CGroup || pageAction.pageId == this.roleMenu().contact) {
            this.roleContact(true);
          } else if (pageAction.pageId == this.roleMenu().user || pageAction.pageId == this.roleMenu().role) {
            this.roleUser(true);
          }
          else if (pageAction.pageId == this.roleMenu().dashboard) {
            this.roleDashboard(true);
          }
          else if (pageAction.pageId == this.roleMenu().chat) {
            this.roleChat(true);
          }
          else if (pageAction.pageId == this.roleMenu().report) {
            this.roleReport(true);
          }
          else if (pageAction.pageId == this.roleMenu().settings) {
            this.roleSettings(true);
          }
        });
      }
      this.roleForm.patchValue(this.data);
      this.roleForm.patchValue(this.questionsdata);
      this.roleForm.patchValue(this.contactdata);
      this.roleForm.patchValue(this.userdata);
      this.roleForm.patchValue(this.dashboarddata);
      this.roleForm.patchValue(this.settingsdata);
      this.roleForm.patchValue(this.reportdata);
      this.roleForm.patchValue(this.chatdata);
    });

  }
  firstName(event) {
    let str: string = this.roleForm.value.name;
    str = str[0].toUpperCase() + str.slice(1);
    this.roleForm.controls['name'].setValue(str);
  }
  roleForms(forms) {
    if (forms.checked == false || forms == false) {
      this.forms_grid = false;
      this.initializeFormsdata();
    }
    else {
      this.forms_grid = true;
      this.formchecked = true;
    }
  }
  roleQuestion(questions) {
    if (questions.checked == false || questions == false) {
      this.question_grid = false;
      this.initializequestiondata();
    }
    else {
      this.question_grid = true;
      this.questionchecked = true;
    }
  }
  roleContact(contacts) {
    if (contacts.checked == false || contacts == false) {
      this.contact_grid = false;
      this.initializeContactdata();
    }
    else {
      this.contact_grid = true;
      this.contactchecked = true;
    }
  }
  roleUser(user) {
    if (user.checked == false || user == false) {
      this.user_grid = false;
      this.initializeUserdata();
    }
    else {
      this.user_grid = true;
      this.userchecked = true;
    }
  }
  roleDashboard(dashboard) {
    if (dashboard.checked == false || dashboard == false) {
      this.dashboard_grid = false;
      this.initializedashboarddata();
    }
    else {
      this.dashboard_grid = true;
      this.dashboardchecked = true;
    }
  }
  roleChat(chat) {
    if (chat.checked == false || chat == false) {
      this.chat_grid = false;
      this.initializechatdata();
    }
    else {
      this.chat_grid = true;
      this.chatchecked = true;
    }
  }
  roleReport(report) {
    if (report.checked == false || report == false) {
      this.report_grid = false;
      this.initializereportdata();
    }
    else {
      this.report_grid = true;
      this.reportchecked = true;
    }
  }
  roleSettings(setting) {
    if (setting.checked == false || setting == false) {
      this.settings_grid = false;
      this.initializesettingdata();
    }
    else {
      this.settings_grid = true;
      this.settingchecked = true;
    }
  }
  contactSelected(args: CellSelectEventArgs) {
    this.selectedrecords = args.cellIndex;
    this.rowdata = args.data;
    if (this.selectedrecords.cellIndex === 1)
      this.rowdata.view = !this.rowdata.view;
    else if (this.selectedrecords.cellIndex === 2)
      this.rowdata.create = !this.rowdata.create;
    else if (this.selectedrecords.cellIndex === 3)
      this.rowdata.edit = !this.rowdata.edit;
    else if (this.selectedrecords.cellIndex === 4)
      this.rowdata.delete = !this.rowdata.delete;
    else if (this.selectedrecords.cellIndex === 5)
      this.rowdata.addviewers = !this.rowdata.addviewers;
    else if (this.selectedrecords.cellIndex === 6)
      this.rowdata.changeownership = !this.rowdata.changeownership;
    else if (this.selectedrecords.cellIndex === 7) {
      let currentRowData = this.contactdata.find(i => i.pageId === this.rowdata.pageId);
      this.rowdata.all = !this.rowdata.all;
      currentRowData.view = this.rowdata.all;
      currentRowData.create = this.rowdata.all;
      currentRowData.delete = this.rowdata.all;
      currentRowData.edit = this.rowdata.all;
      currentRowData.changeownership = this.rowdata.all;
      currentRowData.addviewers = this.rowdata.all;
      this.contactdata = this.contactdata;
    }
  }
  contactDataSelected(args) {
    args.event.target.closest('tr').querySelectorAll('.e-checkbox')[0].ej2_instances[0].checked = args.checked;
    args.event.target.closest('tr').querySelectorAll('.e-checkbox')[1].ej2_instances[0].checked = args.checked;
    args.event.target.closest('tr').querySelectorAll('.e-checkbox')[2].ej2_instances[0].checked = args.checked;
    args.event.target.closest('tr').querySelectorAll('.e-checkbox')[3].ej2_instances[0].checked = args.checked;
    args.event.target.closest('tr').querySelectorAll('.e-checkbox')[4].ej2_instances[0].checked = args.checked;
    args.event.target.closest('tr').querySelectorAll('.e-checkbox')[5].ej2_instances[0].checked = args.checked;
  }
  userSelected(args: CellSelectEventArgs) {
    this.selectedrecords = args.cellIndex;
    this.rowdata = args.data;
    if (this.selectedrecords.cellIndex === 1)
      this.rowdata.view = !this.rowdata.view;
    else if (this.selectedrecords.cellIndex === 2)
      this.rowdata.create = !this.rowdata.create;
    else if (this.selectedrecords.cellIndex === 3)
      this.rowdata.edit = !this.rowdata.edit;
    else if (this.selectedrecords.cellIndex === 4)
      this.rowdata.delete = !this.rowdata.delete;
    else if (this.selectedrecords.cellIndex === 5) {
      let currentRowData = this.userdata.find(i => i.pageId === this.rowdata.pageId);
      this.rowdata.all = !this.rowdata.all;
      currentRowData.view = this.rowdata.all;
      currentRowData.create = this.rowdata.all;
      currentRowData.delete = this.rowdata.all;
      currentRowData.edit = this.rowdata.all;
      this.userdata = this.userdata;
    }
  }
  userDataSelected(args) {
    args.event.target.closest('tr').querySelectorAll('.e-checkbox')[0].ej2_instances[0].checked = args.checked;
    args.event.target.closest('tr').querySelectorAll('.e-checkbox')[1].ej2_instances[0].checked = args.checked;
    args.event.target.closest('tr').querySelectorAll('.e-checkbox')[2].ej2_instances[0].checked = args.checked;
    args.event.target.closest('tr').querySelectorAll('.e-checkbox')[3].ej2_instances[0].checked = args.checked;
  }
  cellsSelected(args: CellSelectEventArgs) {
    this.selectedrecords = args.cellIndex;
    this.rowdata = args.data;
    if (this.selectedrecords.cellIndex === 1)
      this.rowdata.view = !this.rowdata.view;
    else if (this.selectedrecords.cellIndex === 2)
      this.rowdata.create = !this.rowdata.create;
    else if (this.selectedrecords.cellIndex === 3)
      this.rowdata.edit = !this.rowdata.edit;
    else if (this.selectedrecords.cellIndex === 4)
      this.rowdata.delete = !this.rowdata.delete;
    else if (this.selectedrecords.cellIndex === 5)
      this.rowdata.addviewers = !this.rowdata.addviewers;
    else if (this.selectedrecords.cellIndex === 6)
      this.rowdata.changeownership = !this.rowdata.changeownership;
    else if (this.selectedrecords.cellIndex === 7)
      this.rowdata.addcontributors = !this.rowdata.addcontributors;
    else if (this.selectedrecords.cellIndex === 8) {
      let currentRowData = this.data.find(i => i.pageId === this.rowdata.pageId);
      this.rowdata.all = !this.rowdata.all;
      currentRowData.view = this.rowdata.all;
      currentRowData.create = this.rowdata.all;
      currentRowData.delete = this.rowdata.all;
      currentRowData.edit = this.rowdata.all;
      currentRowData.changeownership = this.rowdata.all;
      currentRowData.addviewers = this.rowdata.all;
      currentRowData.addcontributors = this.rowdata.all;
      this.data = this.data;
    }
  }
  allSelected(args) {
    args.event.target.closest('tr').querySelectorAll('.e-checkbox')[0].ej2_instances[0].checked = args.checked;
    args.event.target.closest('tr').querySelectorAll('.e-checkbox')[1].ej2_instances[0].checked = args.checked;
    args.event.target.closest('tr').querySelectorAll('.e-checkbox')[2].ej2_instances[0].checked = args.checked;
    args.event.target.closest('tr').querySelectorAll('.e-checkbox')[3].ej2_instances[0].checked = args.checked;
    args.event.target.closest('tr').querySelectorAll('.e-checkbox')[4].ej2_instances[0].checked = args.checked;
    args.event.target.closest('tr').querySelectorAll('.e-checkbox')[5].ej2_instances[0].checked = args.checked;
    args.event.target.closest('tr').querySelectorAll('.e-checkbox')[6].ej2_instances[0].checked = args.checked;
  }
  questionsSelected(args: CellSelectEventArgs) {
    this.selectedrecords = args.cellIndex;
    this.rowdata = args.data;
    if (this.selectedrecords.cellIndex === 1)
      this.rowdata.view = !this.rowdata.view;
    else if (this.selectedrecords.cellIndex === 2)
      this.rowdata.create = !this.rowdata.create;
    else if (this.selectedrecords.cellIndex === 3)
      this.rowdata.edit = !this.rowdata.edit;
    else if (this.selectedrecords.cellIndex === 4)
      this.rowdata.delete = !this.rowdata.delete;
    else if (this.selectedrecords.cellIndex === 5)
      this.rowdata.addviewers = !this.rowdata.addviewers;
    else if (this.selectedrecords.cellIndex === 6)
      this.rowdata.changeownership = !this.rowdata.changeownership;
    else if (this.selectedrecords.cellIndex === 7)
      this.rowdata.addcontributors = !this.rowdata.addcontributors;
    else if (this.selectedrecords.cellIndex === 8) {
      let currentRowData = this.questionsdata.find(i => i.pageId === this.rowdata.pageId);
      this.rowdata.all = !this.rowdata.all;
      currentRowData.view = this.rowdata.all;
      currentRowData.create = this.rowdata.all;
      currentRowData.delete = this.rowdata.all;
      currentRowData.edit = this.rowdata.all;
      currentRowData.changeownership = this.rowdata.all;
      currentRowData.addviewers = this.rowdata.all;
      currentRowData.addcontributors = this.rowdata.all;
      this.questionsdata = this.questionsdata;
    }
  }
  allSelectedquestiondata(args) {
    args.event.target.closest('tr').querySelectorAll('.e-checkbox')[0].ej2_instances[0].checked = args.checked;
    args.event.target.closest('tr').querySelectorAll('.e-checkbox')[1].ej2_instances[0].checked = args.checked;
    args.event.target.closest('tr').querySelectorAll('.e-checkbox')[2].ej2_instances[0].checked = args.checked;
    args.event.target.closest('tr').querySelectorAll('.e-checkbox')[3].ej2_instances[0].checked = args.checked;
    args.event.target.closest('tr').querySelectorAll('.e-checkbox')[4].ej2_instances[0].checked = args.checked;
    args.event.target.closest('tr').querySelectorAll('.e-checkbox')[5].ej2_instances[0].checked = args.checked;
    args.event.target.closest('tr').querySelectorAll('.e-checkbox')[6].ej2_instances[0].checked = args.checked;
  }
  dashboardSelected(args: CellSelectEventArgs) {

    this.selectedrecords = args.cellIndex;
    this.rowdata = args.data;
    if (this.selectedrecords.cellIndex === 1)
      this.rowdata.view = !this.rowdata.view;
    else if (this.selectedrecords.cellIndex === 2)
      this.rowdata.create = !this.rowdata.create;
    else if (this.selectedrecords.cellIndex === 3)
      this.rowdata.edit = !this.rowdata.edit;
    else if (this.selectedrecords.cellIndex === 4)
      this.rowdata.delete = !this.rowdata.delete;
    else if (this.selectedrecords.cellIndex === 5) {
      let currentRowData = this.dashboarddata.find(i => i.pageId === this.rowdata.pageId);
      this.rowdata.all = !this.rowdata.all;
      currentRowData.view = this.rowdata.all;
      currentRowData.create = this.rowdata.all;
      currentRowData.delete = this.rowdata.all;
      currentRowData.edit = this.rowdata.all;
      this.dashboarddata = this.dashboarddata;
    }
  }
  dashboardDataSelected(args) {
    args.event.target.closest('tr').querySelectorAll('.e-checkbox')[0].ej2_instances[0].checked = args.checked;
    args.event.target.closest('tr').querySelectorAll('.e-checkbox')[1].ej2_instances[0].checked = args.checked;
    args.event.target.closest('tr').querySelectorAll('.e-checkbox')[2].ej2_instances[0].checked = args.checked;
    args.event.target.closest('tr').querySelectorAll('.e-checkbox')[3].ej2_instances[0].checked = args.checked;
  }
  chatSelected(args: CellSelectEventArgs) {
    this.selectedrecords = args.cellIndex;
    this.rowdata = args.data;
    if (this.selectedrecords.cellIndex === 1)
      this.rowdata.view = !this.rowdata.view;
    else if (this.selectedrecords.cellIndex === 2)
      this.rowdata.create = !this.rowdata.create;
    else if (this.selectedrecords.cellIndex === 3)
      this.rowdata.edit = !this.rowdata.edit;
    else if (this.selectedrecords.cellIndex === 4)
      this.rowdata.delete = !this.rowdata.delete;
    else if (this.selectedrecords.cellIndex === 5) {
      let currentRowData = this.chatdata.find(i => i.pageId === this.rowdata.pageId);
      this.rowdata.all = !this.rowdata.all;
      currentRowData.view = this.rowdata.all;
      currentRowData.create = this.rowdata.all;
      currentRowData.delete = this.rowdata.all;
      currentRowData.edit = this.rowdata.all;
      this.chatdata = this.chatdata;
    }
  }
  chatDataSelected(args) {
    args.event.target.closest('tr').querySelectorAll('.e-checkbox')[0].ej2_instances[0].checked = args.checked;
    args.event.target.closest('tr').querySelectorAll('.e-checkbox')[1].ej2_instances[0].checked = args.checked;
    args.event.target.closest('tr').querySelectorAll('.e-checkbox')[2].ej2_instances[0].checked = args.checked;
    args.event.target.closest('tr').querySelectorAll('.e-checkbox')[3].ej2_instances[0].checked = args.checked;
  }
  reportSelected(args: CellSelectEventArgs) {
    this.selectedrecords = args.cellIndex;
    this.rowdata = args.data;
    if (this.selectedrecords.cellIndex === 1)
      this.rowdata.view = !this.rowdata.view;
    else if (this.selectedrecords.cellIndex === 2)
      this.rowdata.create = !this.rowdata.create;
    else if (this.selectedrecords.cellIndex === 3)
      this.rowdata.edit = !this.rowdata.edit;
    else if (this.selectedrecords.cellIndex === 4)
      this.rowdata.delete = !this.rowdata.delete;
    else if (this.selectedrecords.cellIndex === 5) {
      let currentRowData = this.reportdata.find(i => i.pageId === this.rowdata.pageId);
      this.rowdata.all = !this.rowdata.all;
      currentRowData.view = this.rowdata.all;
      currentRowData.create = this.rowdata.all;
      currentRowData.delete = this.rowdata.all;
      currentRowData.edit = this.rowdata.all;
      this.reportdata = this.reportdata;
    }
  }
  reportDataSelected(args) {
    args.event.target.closest('tr').querySelectorAll('.e-checkbox')[0].ej2_instances[0].checked = args.checked;
    args.event.target.closest('tr').querySelectorAll('.e-checkbox')[1].ej2_instances[0].checked = args.checked;
    args.event.target.closest('tr').querySelectorAll('.e-checkbox')[2].ej2_instances[0].checked = args.checked;
    args.event.target.closest('tr').querySelectorAll('.e-checkbox')[3].ej2_instances[0].checked = args.checked;
  }
  settingsSelected(args: CellSelectEventArgs) {
    this.selectedrecords = args.cellIndex;
    this.rowdata = args.data;
    if (this.selectedrecords.cellIndex === 1)
      this.rowdata.view = !this.rowdata.view;
    else if (this.selectedrecords.cellIndex === 2)
      this.rowdata.create = !this.rowdata.create;
    else if (this.selectedrecords.cellIndex === 3)
      this.rowdata.edit = !this.rowdata.edit;
    else if (this.selectedrecords.cellIndex === 4)
      this.rowdata.delete = !this.rowdata.delete;
    else if (this.selectedrecords.cellIndex === 5) {
      let currentRowData = this.settingsdata.find(i => i.pageId === this.rowdata.pageId);
      this.rowdata.all = !this.rowdata.all;
      currentRowData.view = this.rowdata.all;
      currentRowData.create = this.rowdata.all;
      currentRowData.delete = this.rowdata.all;
      currentRowData.edit = this.rowdata.all;
      this.settingsdata = this.settingsdata;
    }
  }
  settingsDataSelected(args) {
    args.event.target.closest('tr').querySelectorAll('.e-checkbox')[0].ej2_instances[0].checked = args.checked;
    args.event.target.closest('tr').querySelectorAll('.e-checkbox')[1].ej2_instances[0].checked = args.checked;
    args.event.target.closest('tr').querySelectorAll('.e-checkbox')[2].ej2_instances[0].checked = args.checked;
    args.event.target.closest('tr').querySelectorAll('.e-checkbox')[3].ej2_instances[0].checked = args.checked;
  }
  save() {
    if (this.roleForm.valid) {
      this.roleForm.value.organisationId = this.organisationPageSessionService.getOrganisationId();
      var rolePageActionMappingList = [];
      var pageIdList = [];
      this.data.forEach(element => {

        if (element.create) {
          var rolePageActionMapping = new RolePageActionMapping();
          rolePageActionMapping.pageId = element.pageId;
          rolePageActionMapping.actionType = RolePageActionType.create;
          rolePageActionMappingList.push(rolePageActionMapping);
        }
        if (element.view) {
          var rolePageActionMapping = new RolePageActionMapping();
          rolePageActionMapping.pageId = element.pageId;
          rolePageActionMapping.actionType = RolePageActionType.view;
          rolePageActionMappingList.push(rolePageActionMapping);
        }
        if (element.edit) {
          var rolePageActionMapping = new RolePageActionMapping();
          rolePageActionMapping.pageId = element.pageId;
          rolePageActionMapping.actionType = RolePageActionType.edit;
          rolePageActionMappingList.push(rolePageActionMapping);
        }
        if (element.delete) {
          var rolePageActionMapping = new RolePageActionMapping();
          rolePageActionMapping.pageId = element.pageId;
          rolePageActionMapping.actionType = RolePageActionType.delete;
          rolePageActionMappingList.push(rolePageActionMapping);
        }
        if (element.changeownership) {
          var rolePageActionMapping = new RolePageActionMapping();
          rolePageActionMapping.pageId = element.pageId;
          rolePageActionMapping.actionType = RolePageActionType.changeownership;
          rolePageActionMappingList.push(rolePageActionMapping);
        }
        if (element.addviewers) {
          var rolePageActionMapping = new RolePageActionMapping();
          rolePageActionMapping.pageId = element.pageId;
          rolePageActionMapping.actionType = RolePageActionType.addviewers;
          rolePageActionMappingList.push(rolePageActionMapping);
        }
        if (element.addcontributors) {
          var rolePageActionMapping = new RolePageActionMapping();
          rolePageActionMapping.pageId = element.pageId;
          rolePageActionMapping.actionType = RolePageActionType.addcontributors;
          rolePageActionMappingList.push(rolePageActionMapping);
        }
        if (element.create || element.view || element.edit || element.delete || element.view || element.changeownership || element.addcontributors == true) {
          pageIdList.push(this.roleMenu().forms);
          this.forms_check = false;
        } else {
          this.forms_check = true;
        }

      });
      this.questionsdata.forEach(element => {
        if (element.create) {
          var rolePageActionMapping = new RolePageActionMapping();
          rolePageActionMapping.pageId = element.pageId;
          rolePageActionMapping.actionType = RolePageActionType.create;
          rolePageActionMappingList.push(rolePageActionMapping);
        }
        if (element.view) {
          var rolePageActionMapping = new RolePageActionMapping();
          rolePageActionMapping.pageId = element.pageId;
          rolePageActionMapping.actionType = RolePageActionType.view;
          rolePageActionMappingList.push(rolePageActionMapping);
        }
        if (element.edit) {
          var rolePageActionMapping = new RolePageActionMapping();
          rolePageActionMapping.pageId = element.pageId;
          rolePageActionMapping.actionType = RolePageActionType.edit;
          rolePageActionMappingList.push(rolePageActionMapping);
        }
        if (element.delete) {
          var rolePageActionMapping = new RolePageActionMapping();
          rolePageActionMapping.pageId = element.pageId;
          rolePageActionMapping.actionType = RolePageActionType.delete;
          rolePageActionMappingList.push(rolePageActionMapping);
        }
        if (element.changeownership) {
          var rolePageActionMapping = new RolePageActionMapping();
          rolePageActionMapping.pageId = element.pageId;
          rolePageActionMapping.actionType = RolePageActionType.changeownership;
          rolePageActionMappingList.push(rolePageActionMapping);
        }
        if (element.addviewers) {
          var rolePageActionMapping = new RolePageActionMapping();
          rolePageActionMapping.pageId = element.pageId;
          rolePageActionMapping.actionType = RolePageActionType.addviewers;
          rolePageActionMappingList.push(rolePageActionMapping);
        }
        if (element.addcontributors) {
          var rolePageActionMapping = new RolePageActionMapping();
          rolePageActionMapping.pageId = element.pageId;
          rolePageActionMapping.actionType = RolePageActionType.addcontributors;
          rolePageActionMappingList.push(rolePageActionMapping);
        }
        if (element.create || element.view || element.edit || element.delete || element.view || element.changeownership || element.addcontributors == true) {
          pageIdList.push(this.roleMenu().questions);
          this.question_check = false;
        } else {
          this.question_check = true;
        }

      });
      this.contactdata.forEach(element => {
        if (element.create) {
          var rolePageActionMapping = new RolePageActionMapping();
          rolePageActionMapping.pageId = element.pageId;
          rolePageActionMapping.actionType = RolePageActionType.create;
          rolePageActionMappingList.push(rolePageActionMapping);
        }
        if (element.view) {
          var rolePageActionMapping = new RolePageActionMapping();
          rolePageActionMapping.pageId = element.pageId;
          rolePageActionMapping.actionType = RolePageActionType.view;
          rolePageActionMappingList.push(rolePageActionMapping);
        }
        if (element.edit) {
          var rolePageActionMapping = new RolePageActionMapping();
          rolePageActionMapping.pageId = element.pageId;
          rolePageActionMapping.actionType = RolePageActionType.edit;
          rolePageActionMappingList.push(rolePageActionMapping);
        }
        if (element.delete) {
          var rolePageActionMapping = new RolePageActionMapping();
          rolePageActionMapping.pageId = element.pageId;
          rolePageActionMapping.actionType = RolePageActionType.delete;
          rolePageActionMappingList.push(rolePageActionMapping);
        }
        if (element.changeownership) {
          var rolePageActionMapping = new RolePageActionMapping();
          rolePageActionMapping.pageId = element.pageId;
          rolePageActionMapping.actionType = RolePageActionType.changeownership;
          rolePageActionMappingList.push(rolePageActionMapping);
        }
        if (element.addviewers) {
          var rolePageActionMapping = new RolePageActionMapping();
          rolePageActionMapping.pageId = element.pageId;
          rolePageActionMapping.actionType = RolePageActionType.addviewers;
          rolePageActionMappingList.push(rolePageActionMapping);
        }
        if (element.create || element.view || element.edit || element.delete || element.view || element.changeownership || element.addcontributors == true) {
          pageIdList.push(this.roleMenu().contact);
          this.contact_check = false;
        }
        else {
          this.contact_check = true;
        }

      });
      this.userdata.forEach(element => {
        if (element.create) {
          var rolePageActionMapping = new RolePageActionMapping();
          rolePageActionMapping.pageId = element.pageId;
          rolePageActionMapping.actionType = RolePageActionType.create;
          rolePageActionMappingList.push(rolePageActionMapping);
        }
        if (element.view) {
          var rolePageActionMapping = new RolePageActionMapping();
          rolePageActionMapping.pageId = element.pageId;
          rolePageActionMapping.actionType = RolePageActionType.view;
          rolePageActionMappingList.push(rolePageActionMapping);
        }
        if (element.edit) {
          var rolePageActionMapping = new RolePageActionMapping();
          rolePageActionMapping.pageId = element.pageId;
          rolePageActionMapping.actionType = RolePageActionType.edit;
          rolePageActionMappingList.push(rolePageActionMapping);
        }
        if (element.delete) {
          var rolePageActionMapping = new RolePageActionMapping();
          rolePageActionMapping.pageId = element.pageId;
          rolePageActionMapping.actionType = RolePageActionType.delete;
          rolePageActionMappingList.push(rolePageActionMapping);
        }
        if (element.create || element.view || element.edit || element.delete || element.view == true) {
          pageIdList.push(this.roleMenu().user);
          this.user_check = false;
        } else {
          this.user_check = true;
        }

      });
      this.reportdata.forEach(element => {
        if (element.create) {
          var rolePageActionMapping = new RolePageActionMapping();
          rolePageActionMapping.pageId = element.pageId;
          rolePageActionMapping.actionType = RolePageActionType.create;
          pageIdList.push(element.pageId);
          rolePageActionMappingList.push(rolePageActionMapping);
        }
        if (element.view) {
          var rolePageActionMapping = new RolePageActionMapping();
          rolePageActionMapping.pageId = element.pageId;
          rolePageActionMapping.actionType = RolePageActionType.view;
          pageIdList.push(element.pageId);
          rolePageActionMappingList.push(rolePageActionMapping);
        }
        if (element.edit) {
          var rolePageActionMapping = new RolePageActionMapping();
          rolePageActionMapping.pageId = element.pageId;
          rolePageActionMapping.actionType = RolePageActionType.edit;
          pageIdList.push(element.pageId);
          rolePageActionMappingList.push(rolePageActionMapping);
        }
        if (element.delete) {
          var rolePageActionMapping = new RolePageActionMapping();
          rolePageActionMapping.pageId = element.pageId;
          rolePageActionMapping.actionType = RolePageActionType.delete;
          pageIdList.push(element.pageId);
          rolePageActionMappingList.push(rolePageActionMapping);
        }
        if (element.create || element.view || element.edit || element.delete || element.view == true) {
          this.report_check = false;
        } else {
          this.report_check = true;
        }

      });
      this.dashboarddata.forEach(element => {
        if (element.create) {
          var rolePageActionMapping = new RolePageActionMapping();
          rolePageActionMapping.pageId = element.pageId;
          rolePageActionMapping.actionType = RolePageActionType.create;
          pageIdList.push(element.pageId);
          rolePageActionMappingList.push(rolePageActionMapping);
        }
        if (element.view) {
          var rolePageActionMapping = new RolePageActionMapping();
          rolePageActionMapping.pageId = element.pageId;
          rolePageActionMapping.actionType = RolePageActionType.view;
          pageIdList.push(element.pageId);
          rolePageActionMappingList.push(rolePageActionMapping);
        }
        if (element.edit) {
          var rolePageActionMapping = new RolePageActionMapping();
          rolePageActionMapping.pageId = element.pageId;
          rolePageActionMapping.actionType = RolePageActionType.edit;
          pageIdList.push(element.pageId);
          rolePageActionMappingList.push(rolePageActionMapping);
        }
        if (element.delete) {
          var rolePageActionMapping = new RolePageActionMapping();
          rolePageActionMapping.pageId = element.pageId;
          rolePageActionMapping.actionType = RolePageActionType.delete;
          pageIdList.push(element.pageId);
          rolePageActionMappingList.push(rolePageActionMapping);
        }
        if (element.create || element.view || element.edit || element.delete || element.view == true) {
          this.dashboard_check = false;
        } else {
          this.dashboard_check = true;
        }
      });
      this.chatdata.forEach(element => {
        if (element.create) {
          var rolePageActionMapping = new RolePageActionMapping();
          rolePageActionMapping.pageId = element.pageId;
          rolePageActionMapping.actionType = RolePageActionType.create;
          pageIdList.push(element.pageId);
          rolePageActionMappingList.push(rolePageActionMapping);
        }
        if (element.view) {
          var rolePageActionMapping = new RolePageActionMapping();
          rolePageActionMapping.pageId = element.pageId;
          rolePageActionMapping.actionType = RolePageActionType.view;
          pageIdList.push(element.pageId);
          rolePageActionMappingList.push(rolePageActionMapping);
        }
        if (element.edit) {
          var rolePageActionMapping = new RolePageActionMapping();
          rolePageActionMapping.pageId = element.pageId;
          rolePageActionMapping.actionType = RolePageActionType.edit;
          pageIdList.push(element.pageId);
          rolePageActionMappingList.push(rolePageActionMapping);
        }
        if (element.delete) {
          var rolePageActionMapping = new RolePageActionMapping();
          rolePageActionMapping.pageId = element.pageId;
          rolePageActionMapping.actionType = RolePageActionType.delete;
          pageIdList.push(element.pageId);
          rolePageActionMappingList.push(rolePageActionMapping);
        }
        if (element.create || element.view || element.edit || element.delete || element.view == true) {
          this.chat_check = false;
        } else {
          this.chat_check = true;
        }
      });
      this.settingsdata.forEach(element => {
        if (element.create) {
          var rolePageActionMapping = new RolePageActionMapping();
          rolePageActionMapping.pageId = element.pageId;
          rolePageActionMapping.actionType = RolePageActionType.create;
          pageIdList.push(element.pageId);
          rolePageActionMappingList.push(rolePageActionMapping);
        }
        if (element.view) {
          var rolePageActionMapping = new RolePageActionMapping();
          rolePageActionMapping.pageId = element.pageId;
          rolePageActionMapping.actionType = RolePageActionType.view;
          pageIdList.push(element.pageId);
          rolePageActionMappingList.push(rolePageActionMapping);
        }
        if (element.edit) {
          var rolePageActionMapping = new RolePageActionMapping();
          rolePageActionMapping.pageId = element.pageId;
          rolePageActionMapping.actionType = RolePageActionType.edit;
          pageIdList.push(element.pageId);
          rolePageActionMappingList.push(rolePageActionMapping);
        }
        if (element.delete) {
          var rolePageActionMapping = new RolePageActionMapping();
          rolePageActionMapping.pageId = element.pageId;
          rolePageActionMapping.actionType = RolePageActionType.delete;
          pageIdList.push(element.pageId);
          rolePageActionMappingList.push(rolePageActionMapping);
        }
        if (element.create || element.view || element.edit || element.delete || element.view == true) {
          this.setting_check = false;
        } else {
          this.setting_check = true;
        }
      });

      if (rolePageActionMappingList.length > 0 && pageIdList.length > 0) {
        /*                 if (this.forms_check == false || ) { */
        this.roleForm.value.rolePageActionMappingList = rolePageActionMappingList;
        this.roleForm.value.pageIdList = pageIdList.filter(function (item, pos) {
          return pageIdList.indexOf(item) == pos;
        });
        this.roleService.saveRole(this.roleForm.value).subscribe(data => {
          this.alertService.success("Role saved successfully");
          let organisationId = this.organisationPageSessionService.getOrganisationId();
          this.navBarService.getRolePermissionData(organisationId, true).subscribe(response => {
            this.userRoleSessionService.create(response);
            this.navigationService.goToUserRole();
          });
        });
        /*  } else {
             if (this.forms_check == true)

                 this.alertService.error("Atleast select anyone of all the forms fields");
             else if (this.dashboard_check == true)
                 this.alertService.error("Atleast select anyone of all the dashboard fields");
             else if (this.question_check == true)
                 this.alertService.error("Atleast select anyone of all the question fields");
             else if (this.user_check == true)
                 this.alertService.error("Atleast select anyone of all the user fields");
             else if (this.chat_check == true)
                 this.alertService.error("Atleast select anyone of all the chat fields");
             else if (this.report_check == true)
                 this.alertService.error("Atleast select anyone of all the report fields");
             else if (this.setting_check == true)
                 this.alertService.error("Atleast select anyone of all the setting fields");
             else if (this.contact_check == true)
                 this.alertService.error("Atleast select anyone of all the contact fields");

         } */

      } else {
        this.alertService.error("Atleast select anyone of all the fields");
      }

    }
    else {
      console.log("Form Invalid");
    }
  }
}
