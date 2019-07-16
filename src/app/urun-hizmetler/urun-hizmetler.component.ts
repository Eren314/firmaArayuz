import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Message, MessageService} from 'primeng/api';
import {environment} from '../../environments/environment';
import {GlobalService} from '../global.service';


@Component({
  selector: 'app-urun-hizmetler',
  templateUrl: './urun-hizmetler.component.html',
  styleUrls: ['./urun-hizmetler.component.css'],
  providers: [MessageService]
})
export class UrunHizmetlerComponent implements OnInit {

  disabled: boolean = true;
  displayDialog: boolean;
  yeniYetkili: boolean;
  yetkili: any = {};
  selectedYetkili: any;
  yetkililer: any;
  urunHizmetTipi: any;
  areusure: boolean = false;
  uhturu: any;


  constructor(private http: HttpClient, private messageService: MessageService, public gservice: GlobalService) {

    this.http
      .get(
        environment.apiUrl + '/rest/firma/parametre-getir?queryName=param_urun_hizmet_tipi_query'
      )
      .subscribe(
        resp => {
          console.log(resp);
          this.uhturu = resp;
        }
      );
  }

  ngOnInit() {
    this.fetchFY();
  }


  private fetchFY() {


    this.http
      .get(
        environment.apiUrl + '/rest/firma/' + this.gservice.id + '/firma-urun-hizmetleri'
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
        environment.apiUrl + '/rest/firma/' + this.gservice.id + '/urun-hizmet', this.yetkili
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


    this.messageService.add({severity: 'success', summary: 'Ürün/Hizmet bilgileri kaydedildi', detail: ''});
  }

  deleteThis() {
    let index = this.yetkililer.indexOf(this.selectedYetkili);


    this.http
      .delete(
        environment.apiUrl + '/rest/firma/urun-hizmet/' + this.yetkili.id
      )
      .subscribe(response => {
        console.log(response);

      });

    this.yetkililer = this.yetkililer.filter((val, i) => i !== index);
    this.yetkili = null;
    this.displayDialog = false;
    this.areusure = false;

    this.messageService.add({severity: 'error', summary: 'Ürün/Hizmet silindi', detail: ''});

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
