import { Component, OnInit } from '@angular/core';
import { IComputer } from '../../ModelView/icomputer';
import { ComputerAPIService } from '../../Services/computer-api.service';
import { IUser } from '../../ModelView/iuser';
import { CartService } from '../../Services/cart.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  listProfileProduct: IComputer[];
  user: IUser = { Name: "", Address: "", Email: "" };
  constructor(private ComputerService: ComputerAPIService) { }

  ngOnInit(): void {
    this.ComputerService.GetProfile().subscribe(
      (res) => {
        console.log(res);
        this.listProfileProduct = res;
        console.log(this.listProfileProduct);
        this.GetUserInfo()
      },
      (err) => { console.log(err) });

  }

  DeleteRecord(id) {
    this.ComputerService.Delete(id).subscribe(
      (response) => { window.location.href = "/Profile" },
      (err) => { console.log(err) }
    );
  }

  GetUserInfo() {
    this.ComputerService.GetUserInfo().subscribe(
      (res) => { this.user = res; console.log(res); },
      (err) => { console.log(err) }
    );
  }


}
