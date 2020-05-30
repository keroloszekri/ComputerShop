import { Component, OnInit } from '@angular/core';
import { ComputerAPIService } from '../Services/computer-api.service';
import { IComputer } from '../ModelView/icomputer';
import { ICart } from '../ModelView/icart';
import { CartService } from '../Services/cart.service';

@Component({
  selector: 'app-computer',
  templateUrl: './computer.component.html',
  styleUrls: ['./computer.component.css']
})
export class ComputerComponent implements OnInit {

  CartList: ICart[] = [];
  ListComputer: IComputer[];
  Cart: ICart;
  Message: string;
  constructor(private ComputerService: ComputerAPIService, private CartService: CartService) {
    this.Cart = { PrdID: 0, PrdName: "", PrdDiscount: 0, PrdPrice: 0, PrdQuentity: 1 };
  }

  ngOnInit(): void {
    this.ComputerService.GetAll().subscribe(
      (res) => {
        console.log(res);
        this.ListComputer = res;
        console.log(this.ListComputer)
      },
      (err) => { console.log(err) });
  }
  DeleteRecord(id) {
    this.ComputerService.Delete(id).subscribe(
      (response) => { window.location.href = "/Home" },
      (err) => { console.log(err) }
    );
  }

  AddFavourite(ID, Name, Price, Quentity, Discount) {
    this.Cart.PrdID = ID;
    this.Cart.PrdName = Name;
    this.Cart.PrdQuentity = Quentity;
    this.Cart.PrdDiscount = Discount;
    this.Cart.PrdPrice = Price;

    console.log(this.Cart);
    this.ComputerService.AddCart(this.Cart).subscribe(
      (res) => { console.log(res); },
      (err) => { console.log(err); }
    )

    this.ComputerService.GetCards().subscribe(
      (res) => {
        this.CartList = res;
        this.CartService.CurrentMessage.subscribe(response => this.Message = response);
        this.CartService.ChangeCart(this.CartList.length.toString());
      },
      (err) => { console.log(err) });

  }
}
