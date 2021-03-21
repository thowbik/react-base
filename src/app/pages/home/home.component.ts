import { Component, OnInit } from '@angular/core';
import { NavigationService } from 'src/app/services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(public navigationService: NavigationService) { }

  ngOnInit() {
  }

  goTowelcome() {

    this.navigationService.goToWelcome();
  }
  goTosigin() {
    this.navigationService.goToSignin();
  }

  goTosignup() {
    this.navigationService.goToNewaccount();
  }
  goTohome() {
    this.navigationService.goToHome();
  }

}