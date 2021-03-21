import { CommonModule } from '@angular/common';  
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../guards';
import { FlexLayoutModule } from '@angular/flex-layout';
import { WelcomeComponent } from './welcome.component';
const routes: Routes = [
    {
        path     : '**',
        component: WelcomeComponent,
        data: {
            title: 'Home'
        }
    }
];

@NgModule({
    declarations: [
        WelcomeComponent
    ],
    imports     : [
        RouterModule.forChild(routes),       
        CommonModule,FlexLayoutModule,
        
      
    ],
    providers   : [
        
    ]
})
export class WelcomeModule
{
}