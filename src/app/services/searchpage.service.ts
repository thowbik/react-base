import { Injectable, Output, EventEmitter } from '@angular/core'

@Injectable()
export class SearchPageService {

 

  @Output() change: EventEmitter<any> = new EventEmitter();
  searchtext: any;

  search(searchvalue) {
    this.searchtext = searchvalue;
    this.change.emit(this.searchtext);
  }

}