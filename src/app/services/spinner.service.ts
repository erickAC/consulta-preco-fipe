import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  public isVisible = new BehaviorSubject<boolean>(false);

  constructor() { }

  hide() {
    this.isVisible.next(false);
  }

  show() {
    this.isVisible.next(true);
  }

}
