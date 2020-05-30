import { Component, OnInit } from '@angular/core';
import { ComputerAPIService } from '../Services/computer-api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-new-computer',
  templateUrl: './new-computer.component.html',
  styleUrls: ['./new-computer.component.css']
})
export class NewComputerComponent implements OnInit {

  InsertForm: FormGroup;
  selectFile: File = null;
  imageURL: string;

  constructor(private ComputerService: ComputerAPIService, private fb: FormBuilder) {

  }
  ngOnInit(): void {
    this.InsertForm = this.fb.group(
      {
        Name: ['', [Validators.required]],
        Price: ['', [Validators.required]],
        Quentity: ['', [Validators.required]],
        Brand: ['', [Validators.required]],
        ModelNumer: ['', [Validators.required]],
        Ram: ['', [Validators.required]],
        HardDisk: ['', [Validators.required]],
        Discount: ['', [Validators.required]],
        Img: ['', [Validators.required]],

      }
    );
  }

  public onFileSelected(event) {
    //console.log(event.target.files[0]);
    this.selectFile = <File>event.target.files[0];
  }

  Add() {
    this.ComputerService.AddComputer(this.InsertForm.value, this.selectFile, this.selectFile.name).subscribe(
      (res) => { console.log(res); window.location.href = "/Home" },
      (err) => { console.log(err) }
    );
  }

}
