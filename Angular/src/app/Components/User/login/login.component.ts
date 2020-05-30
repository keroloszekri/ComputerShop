import { Component, OnInit } from '@angular/core';
import { ComputerAPIService } from '../../Services/computer-api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  LoginForm: FormGroup;
  constructor(private fb: FormBuilder, private httpApiService: ComputerAPIService) { }

  ngOnInit(): void {
    this.LoginForm = this.fb.group(
      {
        UserName: ['', [Validators.required]],
        Password: ['', [Validators.required]],
      })
  }

  Login() {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        var products = JSON.parse(this.response);
        localStorage.setItem("access_token", products.access_token);
        window.location.href = "/Home";
      }
      else {
        if (this.readyState == 4 && this.status == 400) {
          alert("user name or password isnt valid");

        }
        console.log("failed" + this.response);
      }
    };

    xhttp.open("POST", "http://localhost:64632/login", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("UserName=" + this.LoginForm.controls['UserName'].value + "&Password=" + this.LoginForm.controls['Password'].value + "&grant_type=password");

  }


}
