import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Firma} from './firma-bilgileri/firma.module';
import {MenuItem} from 'primeng/api';
import {Router} from '@angular/router';
import { isDevMode } from '@angular/core';
import {environment} from '../environments/environment';
import {GlobalService} from './global.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [GlobalService],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements  OnInit {

  loadedPosts: any = {};
  adi: string;
  disabled: boolean = true;
  navs: MenuItem[];
  version: string;
  zaman: string;
  mode: string;



  constructor(private http: HttpClient, public router: Router, public gservice: GlobalService) {
    this.version = environment.version;
    this.zaman = environment.zaman;
    this.mode = environment.mode;

  }

  ngOnInit() {


    this.navs = [
      {label: 'Firma Bilgileri',  routerLink: ['firma-bilgileri']},
      {label: 'Yetkili Kişiler', routerLink: ['yetkili-kisiler']},
      {label: 'Ürün ve Hizmetler', routerLink: ['urun-hizmetler']},
      {label: 'Projeler', routerLink: ['projeler']},
      {label: 'Türksat Projeleri', routerLink: ['turksat-projeleri']},
      //{label: 'Dokümanlar', routerLink: ['dokumanlar']}

    ];


    this.fetchPosts();
  }

  private fetchPosts() {


      this.http
    .get(
         environment.apiUrl + '/rest/firma/' + localStorage.getItem('ID')
    )

    .subscribe(posts => {
      //console.log(posts);
      this.loadedPosts = posts;
      this.adi = this.loadedPosts.adi;

    });
    }



  toggleDisabled() {
    this.disabled = !this.disabled;
  }

  storedv(){
    return localStorage.getItem('ID');
  }






}
