import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BusinessGuard } from './services/guards/business.guard';
import { PersonalGuard } from './services/guards/personal.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule',
  },
  {
    path: 'list',
    loadChildren: './list/list.module#ListPageModule'
  },
  {
    path: 'business/profile',
    loadChildren: './pages/business/profile/profile.module#ProfilePageModule',
    //canActivate: [BusinessGuard]
  },
  {
    path: 'business/coupons',
    loadChildren: './pages/business/coupons/coupons.module#CouponsPageModule',
    //canActivate: [BusinessGuard]
  },
  {
    path: 'personal/profile',
    loadChildren: './pages/personal/profile/profile.module#ProfilePageModule',
    //canActivate: [PersonalGuard]
  },
  {
    path: 'personal/coupons',
    loadChildren: './pages/personal/coupons/coupons.module#CouponsPageModule',
    //canActivate: [PersonalGuard]
  },
  {
    path: 'personal/managesubscription',
    loadChildren: './pages/personal/managesubscription/managesubscription.module#ManagesubscriptionPageModule',
    //canActivate: [PersonalGuard]
  },
  { path: 'register', loadChildren: './pages/register/register.module#RegisterPageModule' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'referandearn', loadChildren: './pages/referandearn/referandearn.module#ReferandearnPageModule' },
  { path: 'businessregister', loadChildren: './pages/business/register/register.module#RegisterPageModule' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
