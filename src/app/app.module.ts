import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {ButtonModule} from 'primeng/button';
import { FirmaBilgileriComponent } from './firma-bilgileri/firma-bilgileri.component';
import { YetkiliKisilerComponent } from './yetkili-kisiler/yetkili-kisiler.component';
import { UrunHizmetlerComponent } from './urun-hizmetler/urun-hizmetler.component';
import {HttpClientModule} from '@angular/common/http';
import {CardModule} from 'primeng/card';
import {InputTextModule} from 'primeng/inputtext';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {MultiSelectModule} from 'primeng/multiselect';
import {ListboxModule} from 'primeng/listbox';
import { FormsModule } from '@angular/forms';
import {TableModule} from 'primeng/table';
import {InputMaskModule} from 'primeng/inputmask';
import {KeyFilterModule} from 'primeng/keyfilter';
import {DropdownModule} from 'primeng/dropdown';
import {TriStateCheckboxModule} from 'primeng/tristatecheckbox';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {ToastModule} from 'primeng/toast';
import {DialogModule} from 'primeng/dialog';
import {TabMenuModule} from 'primeng/tabmenu';
import {MenuModule} from 'primeng/menu';
import { ReferanslarComponent } from './referanslar/referanslar.component';
import { ProjelerComponent } from './projeler/projeler.component';
import { TurksatProjelerComponent } from './turksat-projeler/turksat-projeler.component';
import { DokumanlarComponent } from './dokumanlar/dokumanlar.component';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ToggleButtonModule} from 'primeng/togglebutton';
import {CalendarModule} from 'primeng/calendar';
import { AuthComponent } from './auth/auth.component';
import { AktivasyonComponent } from './aktivasyon/aktivasyon.component';
import {PasswordModule} from 'primeng/password';
import { BaslikComponent } from './baslik/baslik.component';
import {AuthGuard} from './auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    FirmaBilgileriComponent,
    YetkiliKisilerComponent,
    UrunHizmetlerComponent,
    ReferanslarComponent,
    ProjelerComponent,
    TurksatProjelerComponent,
    DokumanlarComponent,
    AuthComponent,
    AktivasyonComponent,
    BaslikComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ButtonModule,
    HttpClientModule,
    CardModule,
    InputTextModule,
    InputTextareaModule,
    MultiSelectModule,
    ListboxModule,
    FormsModule,
    TableModule,
    InputMaskModule,
    KeyFilterModule,
    DropdownModule,
    TriStateCheckboxModule,
    MessageModule,
    MessagesModule,
    ToastModule,
    DialogModule,
    TabMenuModule,
    MenuModule,
    ConfirmDialogModule,
    ToggleButtonModule,
    CalendarModule,
    PasswordModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
