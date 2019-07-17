import {Component, OnInit} from '@angular/core';
import {environment} from '../../environments/environment';
import {GlobalService} from '../global.service';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  sifre: string;
  fakeSifre = 'Eren314159265';
  eposta: string;
  resp: any;
  firmaId: any;

  constructor(private http: HttpClient, public router: Router, public gservice: GlobalService) {
  }

  ngOnInit() {

    /*this.http
      .post(
        'http://localhost/rest/giris/a.hincalan@panates.com', this.fakeSifre
      )

      .subscribe(posts => {
        console.log(posts);
        this.resp = posts
        this.gservice.id = this.resp.firmaId;

      });*/
  }

  giris() {
    this.http
      .post(
        'http://localhost/rest/giris/' + this.eposta, this.sifre
      )

      .subscribe(posts => {
        console.log(posts);
        this.resp = posts
        this.gservice.id = this.resp.firmaId;

      });



    setTimeout(() => {
      this.router.navigateByUrl('/firma-bilgileri');
    }, 1000);
  }

}
