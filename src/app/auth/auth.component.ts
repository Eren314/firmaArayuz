import {Component, OnInit} from '@angular/core';
import {environment} from '../../environments/environment';
import {GlobalService} from '../global.service';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {MenuItem, MessageService} from 'primeng/api';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  providers: [MessageService]
})
export class AuthComponent implements OnInit {

  sifre: string;
  eposta: string;
  resp: any;
  firmaId: any;
  adSoyad: any;
  error: any;

  constructor(private http: HttpClient, public router: Router, public gservice: GlobalService, private messageService: MessageService) {
    localStorage.setItem('AUTH', 'no');
  }

  ngOnInit() {
  }

  giris() {
    this.http
      .post(
        'http://localhost/rest/giris/' + this.eposta, this.sifre
      )

      .subscribe(posts => {
        console.log(posts);
        this.resp = posts;
        this.gservice.id = this.resp.firmaId;
        localStorage.setItem('ID', this.resp.firmaId);
        localStorage.setItem('ADSOYAD', this.resp.adSoyad);
        localStorage.setItem('AUTH', 'yes');

      },error => {
        this.error = error.error;
        this.eposta = '';
        this.sifre = '';
      });



    setTimeout(() => {
      this.router.navigateByUrl('/firma-bilgileri');
    }, 1000);
  }

}
