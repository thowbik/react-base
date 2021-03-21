import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';


const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: '',
                redirectTo: 'dashboard', pathMatch: 'full'
            },
            {
                path: 'dashboard',
                loadChildren: '../dashboard/dashboard.module#DashboardModule'
            }, {
                path: 'users',
                loadChildren: '../users/users.module#UsersModule'
            }, {
                path: 'user/:id',
                loadChildren: '../user/user.module#UserModule'
            }, {
                path: 'role/:id',
                loadChildren: '../role/role.module#RoleModule'
            }, {
                path: 'contacts',
                loadChildren: '../contacts/contacts.module#ContactsModule'
            }, {
                path: 'forms/:labelId',
                loadChildren: '../forms/forms.module#FormsPageModule'
            }, {
                path: 'questions/:labelId',
                loadChildren: '../questions/questions.module#QuestionsModule'
            }, {
                path: 'chats',
                loadChildren: '../chats/chats.module#ChatsModule'
            }, {
                path: 'reports',
                loadChildren: '../reports/reports.module#ReportsModule'
            }, {
                path: 'setting',
                loadChildren: '../settings/settings.module#SettingsModule'
            }, {
                path: 'contact/:id/:page',
                loadChildren: '../contact/contact.module#ContactModule'
            }, {
                path: 'profile',
                loadChildren: '../profile/profile.module#ProfileModule'
            }, {
                path: 'label/:pagefrom',
                loadChildren: '../label/label.module#LabelModule'
            },
            {
                path: 'userrole',
                loadChildren: '../userrole/userrole.module#UserroleModule'
            },
            {
                path: 'form',
                loadChildren: '../form/form.module#FormModule'
            },
            {
                path: 'connected',
                loadChildren: '../contacts-connected/contacts-connected.module#ContactsConnectedModule'
            },
            {
                path: 'employees',
                loadChildren: '../contacts-employees/contacts-employees.module#ContactsEmployeesModule'
            },
            {
                path: 'groups',
                loadChildren: '../contacts-groups/contacts-groups.module#ContactsGroupsModule'
            }, {
                path: 'duplicaterole/:id',
                loadChildren: '../duplicaterole/duplicaterole.module#DuplicateroleModule'
            },{
                path: 'import',
                loadChildren: '../contactimport/contactimport.module#ContactimportModule'
            },
            {
                path: 'responses',
                loadChildren: '../responses/responses.module#ResponsesModule'
            },
            {
                path: 'formoptions/:id/:pageid',
                loadChildren: '../formoptions/formoptions.module#FormoptionsModule'
            },
            {
                path: 'contactgrouplist/:id',
                loadChildren: '../contact-grouplist/contact-grouplist.module#ContactGroupListModule'
            },
            {
                path: 'newquestion/:id/:pageid/:duplicateNo',
                loadChildren: '../newquestion/newquestion.module#NewquestionModule'
            },
            {
                path: 'questionlabel',
                loadChildren: '../questionlabel/questionlabel.module#QuestionlabelModule'
            },
            {
                path: 'share/:id/:page',
                loadChildren: '../share/share.module#ShareModule'
            },
              {
                path: 'responders/:id/:pageid',
                loadChildren: '../responders/responders.module#RespondersModule'
            },
            // {
            //     path: 'insights',
            //     loadChildren: '../insights/insights.module#InsightsModule'
            // }


        ]
    }
];



@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule { }
