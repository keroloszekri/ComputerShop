import { Component, OnInit } from '@angular/core';
import { ComputerAPIService } from '../../Services/computer-api.service';
import { CartService } from '../../Services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  CountProduct: string;
  constructor(public LoggedService: ComputerAPIService, private CartService: CartService) {

  }

  ngOnInit(): void {
    this.CartService.CurrentMessage.subscribe(response => this.CountProduct = response);
  }
}
