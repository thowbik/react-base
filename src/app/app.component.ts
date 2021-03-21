import { Component } from '@angular/core';
import { SpinnerComponent } from "./shared/component/spinnercomponent/spinner.component";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
 spinnerComponent = SpinnerComponent;
}
