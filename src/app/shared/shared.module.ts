import { NgModule } from '@angular/core';
import { ComponentsModule } from "./component/components.module";
import { DirectivesModule } from "./directives/directives.module";
import { OnlyNumber } from './directives/onlynumber.directive';
import { AutofocusDirective } from './directives/autofocus.directive';
 

@NgModule({
  imports: [
    ComponentsModule,
    DirectivesModule,
    
  ],
  declarations: [

  ],
  exports: [
    ComponentsModule,
    DirectivesModule,OnlyNumber, AutofocusDirective
   
  ]
})


export class SharedModule { }
