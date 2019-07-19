import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MenuItem, Message, MessageService} from 'primeng/api';
import {GlobalService} from '../global.service';
import {environment} from '../../environments/environment';


@Component({
  selector: 'app-yetkili-kisiler',
  templateUrl: './yetkili-kisiler.component.html',
  styleUrls: ['./yetkili-kisiler.component.css'],
  providers: [MessageService]
})
export class YetkiliKisilerComponent implements OnInit {

  disabled: boolean = true;
  displayDialog: boolean;
  fy: any;
  yeniYetkili: boolean;
  yetkili: any = {};
  selectedYetkili: any;
  yetkililer: any;
  areusure: boolean = false;
  kturu: any;
  kontakTuru: any;
  navs: MenuItem[];


  constructor(private http: HttpClient, private messageService: MessageService, public gservice: GlobalService) {

    this.http
      .get(
        environment.apiUrl + '/rest/firma/parametre-getir?queryName=param_kontak_turu_query'
      )
      .subscribe(
        resp => {
          console.log(resp);
          this.kturu = resp;
        }
      );
  }

  ngOnInit() {
    this.navs = [
      {label: 'Firma Bilgileri',  routerLink: ['firma-bilgileri']},
      {label: 'Yetkili Kişiler', routerLink: ['yetkili-kisiler']},
      {label: 'Ürün ve Hizmetler', routerLink: ['urun-hizmetler']},
      {label: 'Projeler', routerLink: ['projeler']},
      {label: 'Türksat Projeleri', routerLink: ['turksat-projeleri']},
      //{label: 'Referanslar', routerLink: ['referanslar']},
      {label: 'Dokümanlar', routerLink: ['dokumanlar']}

    ];

    this.fetchFY();
  }


  private fetchFY() {


    this.http
      .get(
        environment.apiUrl + '/rest/firma/' + localStorage.getItem('ID') + '/firma-yetkilileri'
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

    this.http
      .post(
        environment.apiUrl + '/rest/firma/' + localStorage.getItem('ID') + '/firma-yetkilisi', this.yetkili
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

    /*window.location.reload();*/


    this.messageService.add({severity: 'success', summary: 'Yetkili bilgileri kaydedildi', detail: ''});
  }

  deleteThis() {
    let index = this.yetkililer.indexOf(this.selectedYetkili);


    this.http
      .delete(
        environment.apiUrl + '/rest/firma/firma-yetkilisi/' + this.yetkili.id
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
