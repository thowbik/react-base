import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards';
const appRoutes: Routes = [
  {
    path: '',
    loadChildren: './pages/layout/layout.module#LayoutModule',

  },
  {
    path: 'login',
    loadChildren: './pages/login/login.module#LoginModule'
  },
  {
    path: 'register',
    loadChildren: './pages/register/register.module#RegisterModule'
  },
  {
    path: 'organisation',
    loadChildren: './pages/organisation/organisation.module#OrganisationModule'
  },
  {
    path: 'profile',
    loadChildren: './pages/profile/profile.module#ProfileModule'
  },
  {
    path: 'signup',
    loadChildren: './pages/signup/signup.module#SignupModule'
  },
  {
    path: 'home',
    loadChildren: './pages/home/home.module#HomeModule'
  },
  {
    path: 'welcome',
    loadChildren: './pages/welcome/welcome.module#WelcomeModule'
  },
  {
    path: 'signin',
    loadChildren: './pages/signin/signin.module#SigninModule'
  },
  {
    path: 'newaccount',
    loadChildren: './pages/newenterpriseaccount/newenterpriseaccount.module#NewenterpriseaccountModule'
  },
  {
      path: 'formview/:formId',
      loadChildren: './pages/formview/formview.module#FormViewModule'
  },
  {
    path: 'response/:id/:pageType',
    loadChildren: './pages/addresponse/addresponse.module#AddresponseModule'
}];


@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],

})
export class AppRoutingModule { }
