import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutSharedModule } from './shared.module';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { GridModule, GridAllModule, ExcelExportService} from '@syncfusion/ej2-angular-grids';
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { TabModule } from '@syncfusion/ej2-angular-navigations';
import { TimePickerModule } from '@syncfusion/ej2-angular-calendars';
import { TextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { SidebarModule } from '@syncfusion/ej2-angular-navigations';
import { AccordionModule } from '@syncfusion/ej2-angular-navigations';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import { DateRangePickerModule } from '@syncfusion/ej2-angular-calendars';
import { DropDownButtonModule } from '@syncfusion/ej2-angular-splitbuttons';
import { MenuModule } from '@syncfusion/ej2-angular-navigations';
import { SwitchModule } from '@syncfusion/ej2-angular-buttons';
import { ToastModule } from '@syncfusion/ej2-angular-notifications';
import { RadioButtonModule } from '@syncfusion/ej2-angular-buttons';
import { SliderModule } from '@syncfusion/ej2-angular-inputs';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
//import { HttpModule } from '@angular/http';
//TextBoxModel

import {
  PageService, SortService, FilterService,
  GroupService, SearchService, ToolbarService
}from '@syncfusion/ej2-angular-grids';

import { LayoutModule } from './pages/layout/layout.module';
//import { SpinnerComponent } from './shared/component/spinnercomponent/spinner.component';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService, UserSessionService, NavigationService, DataService, OrganisationPageSessionService, UserPageSessionService, AlertService, NavPageService, HttpInterceptorService } from './services';
import { OrganisationService } from './pages/organisation/organisation.service';
import { CheckBoxModule } from '@syncfusion/ej2-angular-buttons';
import { AuthGuard } from './guards';
import { ToastrModule } from 'ngx-toastr';
import { SpinnerComponent } from './shared/component/spinnercomponent/spinner.component';
import { SharedModule } from './shared/shared.module';
import { NavBarService } from './services/navbar.service';
import { SearchPageService } from './services/searchpage.service';
import { SigninComponent } from './pages/signin/signin.component';
import { NewenterpriseaccountComponent } from './pages/newenterpriseaccount/newenterpriseaccount.component';
import { ResponsesComponent } from './pages/responses/responses.component';
import { FormoptionsComponent } from './pages/formoptions/formoptions.component';
import { NewquestionComponent } from './pages/newquestion/newquestion.component';
import { NgxPermissionsModule } from 'ngx-permissions';
import { ShareComponent } from './pages/share/share.component';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { RespondersComponent } from './pages/responders/responders.component';
import { AddresponseComponent } from './pages/addresponse/addresponse.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ButtonModule,
    GridModule,
    GridAllModule,
    TabModule,
    TimePickerModule,
    DialogModule,
    TextBoxModule,
    SidebarModule,
    AccordionModule,
    DatePickerModule,
    ToastModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    DateRangePickerModule,
    DropDownButtonModule,
    MenuModule,
    SwitchModule,
    RadioButtonModule,
    SliderModule,
    LayoutModule,
    LayoutSharedModule,
    AppRoutingModule,
    NgHttpLoaderModule,
    HttpClientModule,
    NgxPermissionsModule,
    CheckBoxModule,
    SharedModule,
    DropDownListModule

  ],
  providers: [
    PageService,
    SortService,
    FilterService,
    SearchService,
    ToolbarService,
    GroupService,
    AuthenticationService,
    AlertService,
    AuthGuard,
    NavPageService,
    SearchPageService,
    UserSessionService,
    OrganisationService,
    NavigationService,
    DataService,
    NavBarService,
    OrganisationPageSessionService,
    ExcelExportService,
    UserPageSessionService, {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    }

  ],
  exports: [
    HttpClientModule
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    SpinnerComponent]
})
export class AppModule { }
