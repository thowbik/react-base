import { NgModule } from '@angular/core';
import { OnlyNumber } from "./onlynumber.directive";
import { AutofocusDirective } from './autofocus.directive';

export const components = [
  OnlyNumber,
  AutofocusDirective,
];

@NgModule({
  declarations: [components],
  exports: [components]
})
export class DirectivesModule {}
