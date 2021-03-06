import { Component, OnInit } from '@angular/core';
import { Http, Headers, Response, RequestOptions, RequestOptionsArgs } from '@angular/http';
import { HttpHeaders } from '@angular/common/http';
import { HttpReqService } from './http-req.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.pug',
  styleUrls: ['./app.component.css']
})
export class AppComponent {



  title = 'app';
  bodyData: object = {
    id: '',
    text: '',
    title: '',
    important: '',
    done: ''
    };

    loginData: object = {
      username: '',
      password: ''
    };

  modalData: object = {
    id: '',
    text: '',
    title: '',
    important: '',
    done: ''
    };



    database: any;
    constructor(public http: Http) {
     }

    errorHandling(res) {

    }

    login() {
      this.http.post('http://localhost:8080/login', this.loginData)
        .subscribe((data) => this.database = JSON.parse(data['_body']));
    }

    getAll() {
      this.http.get('http://localhost:8080/blog/all').subscribe(
        (data) => this.database = JSON.parse(data['_body'])
      );
    }

    create() {
      this.http.post('http://localhost:3004/api/blogpost/', this.bodyData)
        .subscribe(() => this.getAll());
    }

    update() {
      this.http.put('http://localhost:3004/api/blogpost/' + this.modalData['id'], this.modalData)
      .subscribe(() => this.getAll());
    }

    delete() {
      if (confirm('Biztosan törli?')) {
      this.http.delete('http://localhost:3004/api/blogpost/' + this.bodyData['id'])
      .subscribe(() => this.getAll());
      }
    }

    deleteRow(id) {
      if (confirm('Biztosan törli?')) {
      this.http.delete('http://localhost:3004/api/blogpost/' + id)
      .subscribe(() => this.getAll());
      }
    }
}
