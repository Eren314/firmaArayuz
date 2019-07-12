import {Component, OnInit} from '@angular/core';
import {MessageService} from 'primeng/api';
import {HttpClient} from '@angular/common/http';
import {GlobalService} from '../global.service';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-projeler',
  templateUrl: './projeler.component.html',
  styleUrls: ['./projeler.component.css'],
  providers: [MessageService]
})
export class ProjelerComponent implements OnInit {

  disabled: boolean = true;
  displayDialog: boolean;
  display2: boolean;
  yeniYetkili: boolean;
  yetkili: any = {};
  firmaReferans: any = {};
  dataList: any = {};
  selectedYetkili: any;
  yetkililer: any;
  areusure: boolean = false;
  kurumlar: any;
  trh: Date;
  alfa: any;


  constructor(private http: HttpClient, private messageService: MessageService, private gservice: GlobalService) {

    /*this.http
      .get(
        'http://localhost/rest/firma/parametre-getir?queryName=param_urun_hizmet_tipi_query'
      )
      .subscribe(
        resp => {
          console.log(resp);
          this.kurumlar = resp;
        }
      );*/
    this.kurumlar = {};
  }

  ngOnInit() {

    this.fetchFY();
  }


  private fetchFY() {


    this.http
      .get(
        'http://localhost/rest/firma/' + this.gservice.id + '/firma-projeleri'
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
    this.firmaReferans = this.cloneYetkili(event.data.firmaReferans);
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
    this.yetkili.firmaReferans = this.firmaReferans;

    this.http
      .post(
        'http://localhost/rest/firma/' + this.gservice.id + '/firma-proje', this.yetkili
      )
      .subscribe(response => {
        console.log(response);
        //console.log(this.yetkili);

      });


    if (this.yeniYetkili)
      yetkililer.push(this.yetkili);
    else
      yetkililer[this.yetkililer.indexOf(this.selectedYetkili)] = this.yetkili;

    this.yetkililer = yetkililer;
    this.yetkili = {};
    //this.firmaReferans = {};
    this.displayDialog = false;

    /*window.location.reload();*/


    this.messageService.add({severity: 'success', summary: 'Proje bilgileri kaydedildi', detail: ''});


  }

  deleteThis() {
    let index = this.yetkililer.indexOf(this.selectedYetkili);


    this.http
      .delete(
        'http://localhost/rest/firma/firma-proje/' + this.yetkili.id
      )
      .subscribe(response => {
        console.log(response);

      });

    this.yetkililer = this.yetkililer.filter((val, i) => i !== index);
    this.yetkili = {};
    this.displayDialog = false;
    this.areusure = false;

    this.messageService.add({severity: 'error', summary: 'Yetkili silindi', detail: ''});

  }

  showDialogToAdd() {
    this.yeniYetkili = true;
    this.yetkili = {};
    this.yetkili.firmaReferans = {};
    this.firmaReferans = {};
    this.displayDialog = true;
  }

  areusureopen() {
    this.areusure = true;
  }

  areusureclose() {
    this.areusure = false;
  }

  sorgulama() {

    this.http
      .get(
        'http://localhost/rest/firma/kurum_query-lazy-list?sorgu=Ankara&firstRecord=0&pageSize=10'
      )
      .subscribe(
        resp => {
          console.log(resp);
          this.kurumlar = resp;
        }
      );

    this.display2 = true;
    /*this.kurumlar = [
      { ad: 'Vin1'},
      { ad: 'Vin2'},
      { ad: 'Vin3'}];*/
  }

  }
