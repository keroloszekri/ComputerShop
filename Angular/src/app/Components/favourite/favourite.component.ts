import { Component, OnInit } from '@angular/core';
import { ICart } from '../ModelView/icart';
import { ComputerAPIService } from '../Services/computer-api.service';
import { CartService } from '../Services/cart.service';

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.css']
})
export class FavouriteComponent implements OnInit {

  CartList: ICart[] = [];
  Cart: ICart = { PrdID: 0, PrdQuentity: 1, PrdPrice: 0, PrdDiscount: 0, PrdName: "", UserID: "" };
  ProductPriceInMaster: number = 0;
  Message: string;
  constructor(private ComputerService: ComputerAPIService, private CartService: CartService) {
    this.OnTotalPriceChane();
  }

  ngOnInit(): void {
    this.ComputerService.GetCards().subscribe(
      (res) => {
        console.log(res);
        this.CartList = res;
        this.OnTotalPriceChane();
        console.log(this.CartList);
        this.CartService.CurrentMessage.subscribe(response => this.Message = response);
        this.CartService.ChangeCart(this.CartList.length.toString());
      },
      (err) => { console.log(err) });

  }

  Edit(ID, Quentity) {
    console.log(" Start In Ts ");
    this.Cart.PrdQuentity = Quentity;
    this.ComputerService.EditCart(ID, this.Cart).subscribe(
      (res) => {
        console.log(res);
        window.location.href = "/Favourite";
      },
      (err) => { console.log(err) }
    );
  }

  Delete(id) {
    this.ComputerService.DeleteCart(id).subscribe(
      (response) => { window.location.href = "/Favourite" },
      (err) => { console.log(err) }
    );
  }

  OnTotalPriceChane() {
    this.ProductPriceInMaster = 0;
    for (let item of this.CartList) {
      this.ProductPriceInMaster += (item.PrdPrice - item.PrdDiscount) * item.PrdQuentity;
      console.log(this.ProductPriceInMaster);
    }
  }

  ngOnChange() {
    this.CartService.CurrentMessage.subscribe(response => this.Message = response);
    this.CartService.ChangeCart(this.CartList.length.toString());
  }
}
