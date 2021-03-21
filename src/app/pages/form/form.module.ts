import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../guards';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { LayoutSharedModule } from '../../shared.module';
import { TreeViewModule } from '@syncfusion/ej2-angular-navigations';
import { TabModule } from '@syncfusion/ej2-angular-navigations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DropDownButtonModule } from '@syncfusion/ej2-angular-splitbuttons';
import { GridModule } from '@syncfusion/ej2-angular-grids';
import { formComponent } from './form.component';
import { DialogComponent, DialogModule} from '@syncfusion/ej2-angular-popups';

const routes: Routes = [
    {
        path     : '**',
        component: formComponent,canActivate: [AuthGuard],
        data: {
            title: 'Form'
          }
    }
];

@NgModule({
    declarations: [
        formComponent
    ],
    imports     : [
        RouterModule.forChild(routes),
        ButtonModule,
        LayoutSharedModule,
        TabModule,
        GridModule,
        TreeViewModule,
        FontAwesomeModule,
        DropDownButtonModule,
        DialogModule
    ],
    providers   : [
       
    ]
})
export class FormModule
{
}

