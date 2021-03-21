import { Component, OnInit, ViewEncapsulation } from '@angular/core';


@Component({
    selector     : 'app-dashboard',
    templateUrl  : './dashboard.component.html',
    styleUrls    : ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit
{
    public data: object[] = [
        {State:"United States", GDP:17946, percentage:11.08, Rank:1},
        {State:"China", GDP:10866, percentage: 28.42, Rank:2},
        {State:"Japan", GDP:4123, percentage:-30.78, Rank:3},
        {State:"China", GDP:10866, percentage: 28.42, Rank:2},
        {State:"Japan", GDP:4123, percentage:-30.78, Rank:3},
        ];
    ngOnInit(){
        this.data;
    }
}



