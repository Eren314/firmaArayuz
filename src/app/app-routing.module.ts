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

const routes: Routes = [
  {path: '', redirectTo: '/giris', pathMatch: 'full'},
  {path: 'firma-bilgileri', component: FirmaBilgileriComponent},
  {path: 'yetkili-kisiler', component: YetkiliKisilerComponent},
  {path: 'urun-hizmetler', component: UrunHizmetlerComponent},
  {path: 'projeler', component: ProjelerComponent},
  {path: 'turksat-projeleri', component: TurksatProjelerComponent},
  {path: 'referanslar', component: ReferanslarComponent},
  {path: 'dokumanlar', component: DokumanlarComponent},
  {path: 'giris', component: AuthComponent}

  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
