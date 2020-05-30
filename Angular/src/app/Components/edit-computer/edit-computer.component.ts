import { Component, OnInit } from '@angular/core';
import { ComputerAPIService } from '../Services/computer-api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IComputer } from '../ModelView/icomputer';

@Component({
  selector: 'app-edit-computer',
  templateUrl: './edit-computer.component.html',
  styleUrls: ['./edit-computer.component.css']
})
export class EditComputerComponent implements OnInit {
  [x: string]: any;

  computer: IComputer;
  EditForm: FormGroup;
  EditComputer: IComputer = { ID: "", Name: "", Brand: "", Discount: 0, HardDisk: 0, ModelNumer: "", Price: 0, Quentity: 0, Ram: 0, Img: "" };
  EditCmpID: any;
  selectFile: File = null;
  constructor(private ComputerService: ComputerAPIService, private fb: FormBuilder, private _actvivateRouterServ: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.EditCmpID = this.pID = this._actvivateRouterServ.snapshot.params['pid'];
    this.ComputerService.getOneProduct(this.EditCmpID).subscribe(
      data => {
        this.EditComputer = data;
      });;
    this.EditForm = this.fb.group(
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
    this.selectFile = <File>event.target.files[0];
  }

  Edit() {
    console.log(this.EditForm.value);
    this.ComputerService.Edit(this._actvivateRouterServ.snapshot.params['pid'], this.EditForm.value, this.selectFile, this.selectFile.name).subscribe(
      (res) => {
        console.log(res);
        window.location.href = "/Home";
      },
      (err) => { console.log(err) }
    );

  }



}
