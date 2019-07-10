import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Firma} from '../firma.module';
import {Message, MessageService} from 'primeng/api';
import {GlobalService} from '../global.service';


@Component({
  selector: 'app-firma-bilgileri',
  templateUrl: './firma-bilgileri.component.html',
  styleUrls: ['./firma-bilgileri.component.css'],
  providers: [MessageService],
  encapsulation: ViewEncapsulation.None
})
export class FirmaBilgileriComponent implements OnInit {

  title = 'firmaArayuz';
  loadedPosts: any = {};
  adi: string;
  adres: string;
  telefon: string;
  eposta: string;
  kurulusYili: number;
  fax: string = '';
  webAdresi: string;
  personelSayisi: number;
  disabled: boolean = false;
  firmaDurumu: boolean;
  firmaBuyuklugu: any;
  guvenlikSorusturmasiDurumu: any;
  personelNitelikleri: string;
  notlar: string;
  firmaDegerlendirme: string;
  kullanilanTeknolojiler: string;
  firmaCalismaAlanlari: any[];
  vergiNumarasi: string;
  fy: any;
  buyukluk: any;
  sor: any;
  calal: any;
  kturu: any;
  faaliyetAlani: boolean;
  faalAlan: any[];
  firmaKullanilanTeknolojiler: any[];
  firmaKT: any;
  firmaN: any;
  firmaNitelikleri: any[];


  constructor(private http: HttpClient, private messageService: MessageService, private gservice: GlobalService) {

    this.http
      .get(
        'http://localhost/rest/firma/parametre-getir?queryName=param_firma_buyuklugu_query'
      )
      .subscribe(
        resp => {
          this.buyukluk = resp;
        }
      );
    this.http
      .get(
        'http://localhost/rest/firma/parametre-getir?queryName=param_kontak_turu_query'
      )
      .subscribe(
        resp => {
          this.kturu = resp;
        }
      );
    this.http
      .get(
        'http://localhost/rest/firma/parametre-getir?queryName=param_calisma_alani_query'
      )
      .subscribe(
        resp => {
          this.calal = resp;
        }
      );
    this.http
      .get(
        'http://localhost/rest/firma/parametre-getir?queryName=param_firma_kullanilan_teknolojiler_query'
      )
      .subscribe(
        resp => {
          this.firmaKT = resp;
        }
      );
    this.http
      .get(
        'http://localhost/rest/firma/parametre-getir?queryName=param_firma_niteligi_query'
      )
      .subscribe(
        resp => {
          this.firmaN = resp;
        }
      );
    this.http
      .get(
        'http://localhost/rest/firma/parametre-getir?queryName=param_guvenlik_sorusturmasi_durumu_query'
      )
      .subscribe(
        resp => {
          this.sor = resp;
        }
      );

    this.faalAlan = [
      {id: 1, ad: 'true'},
      {id: 2, ad: 'false'}
    ];

  }

  ngOnInit() {
    this.fetchPosts();
  }

  private fetchPosts() {


    this.http
      .get(
        'http://localhost/rest/firma/' + this.gservice.id
      )

      .subscribe(posts => {
        this.loadedPosts = posts;
        console.log(this.loadedPosts);
        this.adi = this.loadedPosts.adi;
        this.adres = this.loadedPosts.adres;
        this.telefon = this.loadedPosts.telefon;
        this.webAdresi = this.loadedPosts.webAdresi;
        this.eposta = this.loadedPosts.eposta;
        this.fax = this.loadedPosts.fax;
        this.kurulusYili = this.loadedPosts.kurulusYili;
        this.personelSayisi = this.loadedPosts.personelSayisi;
        this.adres = this.loadedPosts.adres;
        this.firmaDurumu = this.loadedPosts.firmaDurumu;
        this.personelNitelikleri = this.loadedPosts.personelNitelikleri;
        this.notlar = this.loadedPosts.notlar;
        this.firmaDegerlendirme = this.loadedPosts.firmaDegerlendirme;
        this.firmaBuyuklugu = this.loadedPosts.firmaBuyuklugu;
        this.kullanilanTeknolojiler = this.loadedPosts.kullanilanTeknolojiler;
        this.firmaCalismaAlanlari = this.loadedPosts.firmaCalismaAlanlari;
        this.vergiNumarasi = this.loadedPosts.vergiNumarasi;
        this.faaliyetAlani = this.loadedPosts.faaliyetAlani;
        this.firmaKullanilanTeknolojiler = this.loadedPosts.firmaKullanilanTeknolojiler;
        this.firmaNitelikleri = this.loadedPosts.firmaNitelikleri;


      });
  }


  private saveThis() {


    this.http
      .post(
        'http://localhost/rest/firma', this.loadedPosts
      )
      .subscribe(response => {
        console.log(response);

      });
    this.messageService.add({severity: 'success', summary: 'Firma bilgileri kaydedildi', detail: ''});


  }

  toggleDisabled() {
    this.disabled = !this.disabled;
  }

  mail() {

    this.http
      .get(
        'http://localhost/rest/firma/html-mail?to="erenb.unlu@gmail.com"&subject="Deneme"&message="Test"'
      )

      .subscribe(fys => {
        this.fy = fys;
        console.log(this.fy);


      });

  }


}
