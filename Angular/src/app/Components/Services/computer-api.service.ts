import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IComputer } from '../ModelView/icomputer';
import { environment } from 'src/environments/environment';
import { ICart } from '../ModelView/icart';
import { IUser } from '../ModelView/iuser';

@Injectable({
  providedIn: 'root'
})
export class ComputerAPIService {

  constructor(private HttpClientService: HttpClient) {

  }

  GetAll(): Observable<IComputer[]> {
    const httpOption =
    {
      headers: new HttpHeaders({
        //'Content-Type': 'multipart/form-data',
        'Authorization': 'Bearer ' + localStorage.getItem("access_token")
      })
    };
    //console.log(this.HttpClientService.get<IDepartment[]>(`${environment.API_URL}/department`));
    return this.HttpClientService.get<IComputer[]>(`${environment.API_URL}/Computers/GetComputers`, httpOption);
  }

  AddComputer(Comp, selectedFile, selectedFileName) {
    console.log(Comp)
    //console.log(Comp.ID)
    const formData = new FormData();
    //formData.append('ID', Comp.ID);
    formData.append('Name', Comp.Name);
    formData.append('Price', Comp.Price);
    formData.append('Quentity', Comp.Quentity);
    formData.append('Brand', Comp.Brand);
    formData.append('ModelNumer', Comp.ModelNumer);
    formData.append('Ram', Comp.Ram);
    formData.append('HardDisk', Comp.HardDisk);
    formData.append('Discount', Comp.Discount);
    formData.append('Img', selectedFile, selectedFileName);

    console.log("formData i Add Product");
    console.log(formData);
    const httpOption =
    {
      headers: new HttpHeaders({
        //'Content-Type': 'multipart/form-data',
        'Authorization': 'Bearer ' + localStorage.getItem("access_token")
      })
    };
    return this.HttpClientService.post(`${environment.API_URL}/Computers/PostComputer`, formData, httpOption);
  }

  Delete(ID): Observable<{}> {
    const httpOption =
    {
      headers: new HttpHeaders({
        //'Content-Type': 'multipart/form-data',
        'Authorization': 'Bearer ' + localStorage.getItem("access_token")
      })
    };
    return this.HttpClientService.delete(`${environment.API_URL}/Computers/DeleteComputer/${ID}`, httpOption).pipe();
  }

  Register(form) {
    return this.HttpClientService.post(`${environment.API_URL}/Account/Registeration`, form)
  }

  Login(form) {
    const httpOption =
    {
      headers: new HttpHeaders({
        "Content-type": "application/x-www-form-urlencoded"
        //'Authorization': 'Bearer ' +localStorage.getItem("access_token")
      })
    };
    //form.append('grant_type',"password")
    return this.HttpClientService.post(`http://localhost:64632/Login`, { form, grant_type: "password" }, httpOption);
  }

  LoggedIn() {
    return !!localStorage.getItem('access_token')
  }

  // No Update Image

  // Edit(ID : number , Comp:IComputer ): Observable<{}> {
  //   const httpOption =
  //   {
  //     headers: new HttpHeaders({
  //       //'Content-Type': 'multipart/form-data',
  //      'Authorization': 'Bearer ' +localStorage.getItem("access_token")
  //     })
  //   };
  //   return this.HttpClientService.put(`${environment.API_URL}/Computers/PutComputer/${ID}`,Comp,httpOption).pipe();
  // }

  //Update Image

  Edit(ID, Comp, selectedFile, selectedFileName): Observable<{}> {
    const formData = new FormData();
    //formData.append('ID', Comp.ID);
    formData.append('Name', Comp.Name);
    formData.append('Price', Comp.Price);
    formData.append('Quentity', Comp.Quentity);
    formData.append('Brand', Comp.Brand);
    formData.append('ModelNumer', Comp.ModelNumer);
    formData.append('Ram', Comp.Ram);
    formData.append('HardDisk', Comp.HardDisk);
    formData.append('Discount', Comp.Discount);
    formData.append('Img', selectedFile, selectedFileName);
    console.log("formData");
    console.log(formData);
    const httpOption =
    {
      headers: new HttpHeaders({
        //'Content-Type': 'multipart/form-data',
        'Authorization': 'Bearer ' + localStorage.getItem("access_token")
      })
    };
    return this.HttpClientService.put(`${environment.API_URL}/Computers/PutComputer/${ID}`, formData, httpOption).pipe();
  }

  getOneProduct(ID: any): Observable<IComputer> {
    const httpOption =
    {
      headers: new HttpHeaders({
        //'Content-Type': 'multipart/form-data',
        'Authorization': 'Bearer ' + localStorage.getItem("access_token")
      })
    };
    console.log(this.HttpClientService.get<IComputer>(`${environment.API_URL}/Computers/GetComputer/${ID}`, httpOption));
    return (this.HttpClientService.get<IComputer>(`${environment.API_URL}/Computers/GetComputer/${ID}`, httpOption));
  }

  GetProfile(): Observable<IComputer[]> {
    const httpOption =
    {
      headers: new HttpHeaders({
        //'Content-Type': 'multipart/form-data',
        'Authorization': 'Bearer ' + localStorage.getItem("access_token")
      })
    };
    //console.log(this.HttpClientService.get<IDepartment[]>(`${environment.API_URL}/department`));
    return this.HttpClientService.get<IComputer[]>(`${environment.API_URL}/Computers/GetProfile`, httpOption);
  }

  LoggOff() {

    localStorage.removeItem('access_token');
    window.location.href = "/Home";
  }

  AddCart(Cart) {
    console.log(Cart)
    const httpOption =
    {
      headers: new HttpHeaders({
        //'Content-Type': 'multipart/form-data',
        'Authorization': 'Bearer ' + localStorage.getItem("access_token")
      })
    };
    return this.HttpClientService.post(`${environment.API_URL}/Carts/PostCart`, Cart, httpOption);
  }

  GetCards(): Observable<ICart[]> {
    const httpOption =
    {
      headers: new HttpHeaders({
        //'Content-Type': 'multipart/form-data',
        'Authorization': 'Bearer ' + localStorage.getItem("access_token")
      })
    };
    //console.log(this.HttpClientService.get<IDepartment[]>(`${environment.API_URL}/department`));
    return this.HttpClientService.get<ICart[]>(`${environment.API_URL}/Carts/GetOwnCart`, httpOption);
  }

  EditCart(prdId: number, cart2: any): Observable<{}> {
    console.log(cart2);
    const httpOption =
    {
      headers: new HttpHeaders({
        //'Content-Type': 'multipart/form-data',
        'Authorization': 'Bearer ' + localStorage.getItem("access_token")
      })
    };
    return this.HttpClientService.put(`http://localhost:64632/PutCart/${prdId}`, cart2, httpOption);
    // put(,Cart,httpOption).pipe();
  }

  DeleteCart(prdID): Observable<{}> {
    const httpOption =
    {
      headers: new HttpHeaders({
        //'Content-Type': 'multipart/form-data',
        'Authorization': 'Bearer ' + localStorage.getItem("access_token")
      })
    };
    return this.HttpClientService.delete(`http://localhost:64632/DeleteCart/${prdID}`, httpOption).pipe();
  }

  GetUserInfo(): Observable<IUser> {
    const httpOption =
    {
      headers: new HttpHeaders({
        //'Content-Type': 'multipart/form-data',
        'Authorization': 'Bearer ' + localStorage.getItem("access_token")
      })
    };
    return this.HttpClientService.get<IUser>(`${environment.API_URL}/Account/GetUser`, httpOption)
  }
}



