// import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';
// import { AuthGuard } from '../../guards';
// import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
// import { LayoutSharedModule } from '../../shared.module';
// import { TabModule } from '@syncfusion/ej2-angular-navigations';
// import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
// import { DropDownButtonModule } from '@syncfusion/ej2-angular-splitbuttons';
// import { GridModule } from '@syncfusion/ej2-angular-grids';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
// import { CheckBoxModule } from '@syncfusion/ej2-angular-buttons';
// import { SharedModule } from '../../shared/shared.module';
// import { InsightsService } from './insights.service';
// import { InsightsComponent } from './insights.component';
// import { ChartModule } from '@syncfusion/ej2-angular-charts';
// import {
//     BarSeriesService, StackingBarSeriesService, CategoryService, DateTimeService, ScrollBarService, ColumnSeriesService, LineSeriesService, ChartAnnotationService,
//     RangeColumnSeriesService, StackingColumnSeriesService, LegendService, TooltipService,HistogramSeriesService
// } from '@syncfusion/ej2-angular-charts';
// const routes: Routes = [
//     {
//         path: '**',
//         component: InsightsComponent, canActivate: [AuthGuard],
//         data: {
//             title: 'Forms'
//         }
//     }
// ];

// @NgModule({
//     declarations: [
//         InsightsComponent
//     ],
//     imports: [
//         RouterModule.forChild(routes), ButtonModule,
//         LayoutSharedModule, TabModule, GridModule,
//         ReactiveFormsModule,
//         DropDownListModule,
//         FormsModule,
//         CheckBoxModule,
//         SharedModule,
//         FontAwesomeModule,
//         DropDownButtonModule,
//         ChartModule
//     ],
//     providers: [
//         InsightsService,
//         BarSeriesService,
//         StackingBarSeriesService,
//         CategoryService,
//         DateTimeService,
//         ScrollBarService,
//         LineSeriesService,
//         ColumnSeriesService,
//         ChartAnnotationService,
//         RangeColumnSeriesService,
//         StackingColumnSeriesService,
//         LegendService,
//         TooltipService,
//         HistogramSeriesService
//     ]
// })
// export class InsightsModule {
// }

