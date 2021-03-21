import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatsComponent } from './chats.component';
import { ChatsService } from './chats.service';
import { AuthGuard } from '../../guards';
import { TabModule } from '@syncfusion/ej2-angular-navigations';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LayoutSharedModule } from '../../shared.module';
import { FormsModule } from '@angular/forms';
const routes: Routes = [
    {
        path     : '**',
        component: ChatsComponent,canActivate: [AuthGuard],
        data: {
            title: 'Chats'
          }
    }
];

@NgModule({
    declarations: [
        ChatsComponent
    ],
    imports     : [
        RouterModule.forChild(routes),
        TabModule,LayoutSharedModule,
        ButtonModule,
        FontAwesomeModule,
        FormsModule
    ],
    providers   : [
        ChatsService
    ]
})
export class ChatsModule
{
}

