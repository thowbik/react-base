import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { DataService } from '../../../services';

@Injectable({
  providedIn: 'root'
})
export class SharedlabelService {

  existLabel = new Subject<string>();

  pagefrom = new Subject<string>();

  constructor(private dataService: DataService) { }

  updateexistLabel(message) {
    this.existLabel.next(message);
  }

  pageGetId(pageId){
    this.pagefrom.next(pageId);
  }
}
