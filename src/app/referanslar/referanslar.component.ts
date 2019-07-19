import {Component, OnInit} from '@angular/core';
import {MessageService} from 'primeng/api';
import {HttpClient} from '@angular/common/http';
import {GlobalService} from '../global.service';

@Component({
  selector: 'app-referanslar',
  templateUrl: './referanslar.component.html',
  styleUrls: ['./referanslar.component.css'],
  providers: [MessageService]
})
export class ReferanslarComponent implements OnInit {

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


  constructor(private http: HttpClient, private messageService: MessageService, public gservice: GlobalService) {
  }

  ngOnInit() {

    // this.fetchFY();
  }
/*
  private fetchFY() {


    this.http
      .get(
        'http://localhost/rest/firma/proje' + localStorage.getItem('ID')
      )

      .subscribe(fys => {
        //console.log(posts);
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
    if (this.yeniYetkili)
      yetkililer.push(this.yetkili);
    else
      yetkililer[this.yetkililer.indexOf(this.selectedYetkili)] = this.yetkili;

    this.http
      .post(
        'http://localhost/rest/firma/' + localStorage.getItem('ID') + '/firma-yetkilisi', this.yetkili
      )
      .subscribe(response => {
        console.log(response);

      });

    this.yetkililer = yetkililer;
    this.yetkili = null;
    this.displayDialog = false;

    window.location.reload();


    /!*this.messageService.add({severity:'success', summary:'Yetkili bilgileri kaydedildi', detail:''});*!/
  }

  deleteThis() {
    let index = this.yetkililer.indexOf(this.selectedYetkili);


    this.http
      .delete(
        'http://localhost/rest/firma/firma-yetkilisi/' + this.yetkili.id
      )
      .subscribe(response => {
        console.log(response);

      });

    this.yetkililer = this.yetkililer.filter((val, i) => i !== index);
    this.yetkili = null;
    this.displayDialog = false;
  }

  showDialogToAdd() {
    this.yeniYetkili = true;
    this.yetkili = {};
    this.displayDialog = true;
  }

*/
}
