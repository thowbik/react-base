import { CommonModule } from '@angular/common';  
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../guards';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HomeComponent } from './home.component';
const routes: Routes = [
    {
        path     : '**',
        component: HomeComponent,
        data: {
            title: 'Home'
        }
    }
];

@NgModule({
    declarations: [
        HomeComponent
    ],
    imports     : [
        RouterModule.forChild(routes),       
        CommonModule,FlexLayoutModule,
        
      
    ],
    providers   : [
        
    ]
})
export class HomeModule
{
}