import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private MessageSource = new BehaviorSubject('');
  CurrentMessage = this.MessageSource.asObservable();

  constructor() { }

  ChangeCart(Message: string) {
    this.MessageSource.next(Message);
    console.log("in change cart " + this.MessageSource.value);
  }
}
