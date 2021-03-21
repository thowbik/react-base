import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
    imports  : [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        FlexLayoutModule
    ],
    exports  : [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        FlexLayoutModule
    ]
})
export class LayoutSharedModule
{
}
