import { Component, OnInit ,ViewChild} from '@angular/core';
import { NavBarService } from '../../services/navbar.service';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
    public pushRightClass: string;
    public pushLeftClass: string;
    @ViewChild("container") lab;
    constructor(public navBarService:NavBarService) {
        this.pushRightClass = 'push-right';
        this.pushLeftClass = 'push-left';
    }

    ngOnInit() {
        // this.lab.nativeElement.classList.add(this.pushLeftClass);
        // this.lab.nativeElement.classList.remove(this.pushRightClass);
        // this.navBarService.change.subscribe(isOpen => {
        //     if(isOpen) {
        //         this.lab.nativeElement.classList.add(this.pushLeftClass);
        //         this.lab.nativeElement.classList.remove(this.pushRightClass);
        //     }else{
        //         this.lab.nativeElement.classList.add(this.pushRightClass);
        //         this.lab.nativeElement.classList.remove(this.pushLeftClass);
        //     }
        // });
    }
    
}
