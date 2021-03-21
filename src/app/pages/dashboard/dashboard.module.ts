import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardService } from './dashboard.service';
import { DashboardComponent } from './dashboard.component';
import { AuthGuard } from '../../guards';
import { FlexLayoutModule } from "@angular/flex-layout";
// import { TreeMapModule, TreeMapLegendService, TreeMapTooltipService, TreeMapAllModule } from '@syncfusion/ej2-ng-treemap';

const routes: Routes = [
    {
        path     : '**',
        component: DashboardComponent,canActivate: [AuthGuard],
    }
];

@NgModule({
    declarations: [
        DashboardComponent
    ],
    imports     : [
        RouterModule.forChild(routes),FlexLayoutModule        
    ],
    providers   : [
        DashboardService
    ]
})
export class DashboardModule
{
}

