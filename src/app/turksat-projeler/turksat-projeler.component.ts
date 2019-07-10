import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Message, MessageService} from 'primeng/api';
import {GlobalService} from '../global.service';


@Component({
  selector: 'app-turksat-projeler',
  templateUrl: './turksat-projeler.component.html',
  styleUrls: ['./turksat-projeler.component.css'],
  providers: [MessageService]
})
export class TurksatProjelerComponent implements OnInit {

  ti
  title = 'firmaArayuz';
  loadedPosts: any;
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
  displayDialog: boolean;
  fy: any;
  yeniYetkili: boolean;
  yetkili: any = {};
  selectedYetkili: any;
  yetkililer: any;
  urunHizmetTipi: any;
  areusure: boolean = false;
  uhturu: any;


  constructor(private http: HttpClient, private messageService: MessageService, private gservice: GlobalService) {

  }

  ngOnInit() {
    this.fetchFY();
  }

  private fetchFY() {


    this.http
      .get(
        'http://localhost/rest/firma/' + this.gservice.id + '/alt-yukleniciler'
      )

      .subscribe(fys => {
        this.yetkililer = fys;
        console.log(this.yetkililer);

      });
  }

  toggleDisabled() {
    this.disabled = !this.disabled;
  }

  onRowSelect(event) {
    this.yeniYetkili = false;
    this.yetkili = this.cloneYetkili(event.data);
    this.displayDialog = true;
  }

  cloneYetkili(c: any): any {
    let yetkili = {};
    for (let prop in c) {
      yetkili[prop] = c[prop];
    }
    return yetkili;
  }

  saveThis() {

    let yetkililer = [...this.yetkililer];

    this.http
      .post(
        'http://localhost/rest/firma/' + this.gservice.id + '/urun-hizmet', this.yetkili
      )
      .subscribe(response => {
        console.log(response);

      });
    if (this.yeniYetkili)
      yetkililer.push(this.yetkili);
    else
      yetkililer[this.yetkililer.indexOf(this.selectedYetkili)] = this.yetkili;

    this.yetkililer = yetkililer;
    this.yetkili = null;
    this.displayDialog = false;

    /!*window.location.reload();*!/


    this.messageService.add({severity: 'success', summary: 'Ürün-Hizmet bilgileri kaydedildi', detail: ''});
  }

  deleteThis() {
    let index = this.yetkililer.indexOf(this.selectedYetkili);


    this.http
      .delete(
        'http://localhost/rest/firma/urun-hizmet/' + this.yetkili.id
      )
      .subscribe(response => {
        console.log(response);

      });

    this.yetkililer = this.yetkililer.filter((val, i) => i !== index);
    this.yetkili = null;
    this.displayDialog = false;
    this.areusure = false;

    this.messageService.add({severity: 'error', summary: 'Yetkili silindi', detail: ''});

  }

  showDialogToAdd() {
    this.yeniYetkili = true;
    this.yetkili = {};
    this.displayDialog = true;
  }

  areusureopen() {
    this.areusure = true;
  }

  areusureclose() {
    this.areusure = false;
  }

}
