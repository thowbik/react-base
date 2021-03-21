import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../guards';
import { GridModule,PageService } from '@syncfusion/ej2-angular-grids';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { LayoutSharedModule } from '../../shared.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxUploaderModule } from 'ngx-uploader';
import { ContactimportComponent } from './contactimport.component';
import { ContactsService } from '../contacts/contacts.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContactImportService } from './contactimport.service';
import {NgxImageCompressService} from 'ngx-image-compress';

const routes: Routes = [
    {
        path     : '**',
        component: ContactimportComponent,canActivate: [AuthGuard],
        data: {
            title: 'Contacts'
          }
    }
];

@NgModule({
    declarations: [
        ContactimportComponent
    ],
    imports     : [
        RouterModule.forChild(routes),
        GridModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ButtonModule,
        FontAwesomeModule,
        LayoutSharedModule,
        FlexLayoutModule,
        NgxUploaderModule,
    ],
    providers   : [
        ContactsService,PageService,ContactImportService,NgxImageCompressService
    ]
})
export class ContactimportModule
{
}

