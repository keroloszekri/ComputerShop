import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './Components/Layout/header/header.component';
import { ContentComponent } from './Components/Layout/content/content.component';
import { FooterComponent } from './Components/Layout/footer/footer.component';
import { ComputerComponent } from './Components/computer/computer.component';
import { NewComputerComponent } from './Components/new-computer/new-computer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './Components/User/login/login.component';
import { RegisterComponent } from './Components/User/register/register.component';
import { EditComputerComponent } from './Components/edit-computer/edit-computer.component';
import { FavouriteComponent } from './Components/favourite/favourite.component';
import { ProfileComponent } from './Components/User/profile/profile.component';
import { AboutUsComponent } from './Components/about-us/about-us.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ContentComponent,
    FooterComponent,
    ComputerComponent,
    NewComputerComponent,
    LoginComponent,
    RegisterComponent,
    EditComputerComponent,
    FavouriteComponent,
    ProfileComponent,
    AboutUsComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
