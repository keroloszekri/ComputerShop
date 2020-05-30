import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ComputerComponent } from './Components/computer/computer.component';
import { NewComputerComponent } from './Components/new-computer/new-computer.component';
import { RegisterComponent } from './Components/User/register/register.component';
import { LoginComponent } from './Components/User/login/login.component';
import { OuthGuard } from './guard/outh.guard';
import { EditComputerComponent } from './Components/edit-computer/edit-computer.component';
import { FavouriteComponent } from './Components/favourite/favourite.component';
import { ProfileComponent } from './Components/User/profile/profile.component';
import { AboutUsComponent } from './Components/about-us/about-us.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';


const routes: Routes =
  [
    { path: 'Home', component: ComputerComponent },
    { path: 'Favourite', component: FavouriteComponent, canActivate: [OuthGuard] },
    { path: 'ADD', component: NewComputerComponent, canActivate: [OuthGuard] },
    { path: 'Register', component: RegisterComponent },
    { path: 'EditComputer/:pid', component: EditComputerComponent },
    { path: 'Login', component: LoginComponent },
    { path: 'Profile', component: ProfileComponent },
    { path: 'About', component: AboutUsComponent },
    { path: '', redirectTo: '/Home', pathMatch: 'full' },
    //{path:'**' ,component:NotFoundComponent }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
