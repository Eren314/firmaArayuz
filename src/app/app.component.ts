import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Firma} from './firma-bilgileri/firma.module';
import {MenuItem} from 'primeng/api';
import {GlobalService} from './global.service';
import {Router} from '@angular/router';
import { isDevMode } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements  OnInit {
  title = 'firmaArayuz';
  loadedPosts: any = {};
  adi: string;
  adres: string;
  telefon: string;
  kurulusYili: number;
  fax: string = '';
  webAdresi: string;
  personelSayisi: number;
  disabled: boolean = true;
  firmaDurumu: boolean;
  personelNitelikleri: string;
  notlar: string;
  firmaDegerlendirme: string;
  kullanilanTeknolojiler: string;
  firmaCalismaAlanlari: any[];
  fy: any;
  navs: MenuItem[];


  constructor(private http: HttpClient, private gservice: GlobalService, public router: Router) {
  }

  ngOnInit() {
    this.navs = [
      {label: 'Firma Bilgileri',  routerLink: ['firma-bilgileri']},
      {label: 'Yetkili Kişiler', routerLink: ['yetkili-kisiler']},
      {label: 'Ürün ve Hizmetler', routerLink: ['urun-hizmetler']},
      {label: 'Projeler', routerLink: ['projeler']},
      {label: 'Türksat Projeleri', routerLink: ['turksat-projeleri']},
      {label: 'Dokümanlar', routerLink: ['dokumanlar']}

    ];


    this.fetchPosts();
  }

  private fetchPosts() {


      this.http
    .get(
      'http://localhost/rest/firma/' + this.gservice.id
    )

    .subscribe(posts => {
      //console.log(posts);
      this.loadedPosts = posts;
      console.log(this.loadedPosts);
      this.adi = this.loadedPosts.adi;
      this.adres = this.loadedPosts.adres;
      this.telefon = this.loadedPosts.telefon;
      this.webAdresi = this.loadedPosts.webAdresi;
      this.fax = this.loadedPosts.fax;
      this.kurulusYili = this.loadedPosts.kurulusYili;
      this.personelSayisi = this.loadedPosts.personelSayisi;
      this.adres = this.loadedPosts.adres;
      this.firmaDurumu = this.loadedPosts.firmaDurumu;
      this.personelNitelikleri = this.loadedPosts.personelNitelikleri;
      this.notlar = this.loadedPosts.notlar;
      this.firmaDegerlendirme = this.loadedPosts.firmaDegerlendirme;
      this.kullanilanTeknolojiler = this.loadedPosts.kullanilanTeknolojiler;
      this.firmaCalismaAlanlari = this.loadedPosts.firmaCalismaAlanlari;

    });
    }



  toggleDisabled() {
    this.disabled = !this.disabled;
  }

  storedv(){
    return this.gservice.id;
  }






}
