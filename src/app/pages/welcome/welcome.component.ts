import { Component, OnInit } from '@angular/core';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  constructor(public navigationService:NavigationService) { }

  ngOnInit() {
  }

  goTohome() {
    this.navigationService.goToHome();
  }

}
