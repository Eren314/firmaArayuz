import {Component, OnInit} from '@angular/core';
import {LazyLoadEvent, MessageService} from 'primeng/api';
import {HttpClient} from '@angular/common/http';
import {Dialog} from 'primeng/dialog';
import {environment} from '../../environments/environment';
import {GlobalService} from '../global.service';

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
  alfa: any;
  ktut: any;
  kurum: any;
  sorgulanacak: string;
  loading: boolean;
  table: any;
  first: any;


  constructor(private http: HttpClient, private messageService: MessageService, public gservice: GlobalService) {
    this.kurumlar = {};
    this.sorgulanacak = '';

  }

  ngOnInit() {
    this.fetchFY();
    this.loading = true;

    this.http
      .get(
        environment.apiUrl + '/rest/firma/kurum_query-lazy-list?sorgu=' + this.sorgulanacak.toUpperCase() + '&firstRecord=0&pageSize=0'
      )
      .subscribe(
        resp => {
          console.log(resp);
          this.kurumlar = resp;
        }
      );

  }


  private fetchFY() {


    this.http
      .get(
        environment.apiUrl + '/rest/firma/' + localStorage.getItem('ID') + '/firma-projeleri'
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
    this.firmaReferans.tarihi = new Date(this.firmaReferans.tarihi);

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
    this.yetkili.firmaReferans.referansTipi = 'KAMU';
    this.yetkili.firmaReferans.kurum = this.firmaReferans.kurum;


    this.http
      .post(
        environment.apiUrl + '/rest/firma/' + localStorage.getItem('ID') + '/firma-proje', this.yetkili
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
    this.yetkili.firmaReferans = null;
    this.yetkili = {};
    //this.firmaReferans = {};
    this.displayDialog = false;

    this.fetchFY();


    /*window.location.reload();*/


    this.messageService.add({severity: 'success', summary: 'Proje bilgileri kaydedildi', detail: ''});

    setTimeout(() => {
      this.fetchFY();
    }, 400);


  }

  deleteThis() {
    let index = this.yetkililer.indexOf(this.selectedYetkili);


    this.http
      .delete(
        environment.apiUrl + '/rest/firma/firma-proje/' + this.yetkili.id
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
    this.firmaReferans.kurum = {};
    this.displayDialog = true;
  }

  onRowSelect2(event) {
    this.yeniYetkili = false;
    this.ktut = this.cloneYetkili(event.data);
  }


  areusureopen() {
    this.areusure = true;
  }

  areusureclose() {
    this.areusure = false;
  }

  sorgulama() {

    /*this.http
      .get(
        'http://localhost/rest/firma/kurum_query-lazy-list?sorgu=' + this.sorgulanacak.toUpperCase() + '&firstRecord=0&pageSize=10'
      )
      .subscribe(
        resp => {
          console.log(resp);
          this.kurumlar = resp;
        }
      );*/

    this.display2 = true;
  }


  ksec() {
    this.display2 = false;
    this.firmaReferans.kurum = this.ktut;
  }

  showDialogMaximized(event, dialog: Dialog) {
    dialog.maximized = true;
    //dialog.toggleMaximize(event);
  }

  loadLazy(event: LazyLoadEvent) {

    this.loading = false;
    this.http
      .get(
        environment.apiUrl + '/rest/firma/kurum_query-lazy-list?sorgu=' + this.sorgulanacak + '&firstRecord=' + (event.first ? event.first : '0') + '&pageSize=10'
      )
      .subscribe(
        resp => {
          console.log(resp);
          this.kurumlar = resp;
        }
      );
  }


}
