import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FirmaBilgileriComponent} from './firma-bilgileri/firma-bilgileri.component';
import {YetkiliKisilerComponent} from './yetkili-kisiler/yetkili-kisiler.component';
import {UrunHizmetlerComponent} from './urun-hizmetler/urun-hizmetler.component';
import {ProjelerComponent} from './projeler/projeler.component';
import {TurksatProjelerComponent} from './turksat-projeler/turksat-projeler.component';
import {ReferanslarComponent} from './referanslar/referanslar.component';
import {DokumanlarComponent} from './dokumanlar/dokumanlar.component';
import {AuthComponent} from './auth/auth.component';
import {AktivasyonComponent} from './aktivasyon/aktivasyon.component';
import {AuthGuard} from './auth.guard';

const routes: Routes = [
  {path: '', redirectTo: '/giris', pathMatch: 'full'},
  {path: 'firma-bilgileri', component: FirmaBilgileriComponent, canActivate: [AuthGuard]},
  {path: 'yetkili-kisiler', component: YetkiliKisilerComponent, canActivate: [AuthGuard]},
  {path: 'urun-hizmetler', component: UrunHizmetlerComponent, canActivate: [AuthGuard]},
  {path: 'projeler', component: ProjelerComponent, canActivate: [AuthGuard]},
  {path: 'turksat-projeleri', component: TurksatProjelerComponent, canActivate: [AuthGuard]},
  {path: 'referanslar', component: ReferanslarComponent, canActivate: [AuthGuard]},
  {path: 'dokumanlar', component: DokumanlarComponent, canActivate: [AuthGuard]},
  /*, canActivate: [AuthGuard]*/
  {path: 'giris', component: AuthComponent},
  {path: 'aktivasyon', component: AktivasyonComponent},
  {path: '**', redirectTo: '/giris'}

  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
