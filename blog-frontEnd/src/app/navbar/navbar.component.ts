import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { NgForm } from '@angular/forms';
declare var $: any;
declare var jquery: any;
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.pug',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {


  menuList: Array<{ label: string, url: string }> = [
    { label: 'Főoldal', url: '/main' },
    { label: 'Profil', url: '/profile' },
    { label: 'Tudásbázis', url: '/knowledge' },
    { label: 'RestfulAPI', url: '/restfulapi' },
    { label: 'Kapcsolat', url: '/contact' }
  ];

  userId = '';

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

  loginText = '';

  database: any;
  constructor(public http: Http) {
    console.log(this.readCookie('userid'));
    console.log(this.readCookie('usernm'));
    this.userId = this.readCookie('userid');
    const nm = this.readCookie('usernm');
    if (nm === '') {
      this.loginText = 'Bejelentkezés' ; 
    } else {
      this.loginText = nm;
    }

  }

    readCookie(index) {
      const c = document.cookie.split('; ');
      const id = JSON.stringify(c.filter(data => data.startsWith(`${index}=`))).substr(9);
      const result = id.substr(0, id.indexOf('"'));
      return result;
    }

    login(loginData: NgForm) {
      this.http.post('http://localhost:8080/login', loginData.value)
        .subscribe((data) => {
          const adat = JSON.parse(data['_body'])
          console.log(JSON.parse(data['_body']));
          if ( adat['success'] ) {
          $('#loginModal').modal('hide');
          this.loginText = adat.userName;
          this.userId = adat.id;
          document.cookie = `userid=${adat.id}`;
          document.cookie = `usernm=${adat.userName}`;
        }
      });

    }

    getAll() {
      this.http.get('http://localhost:8080/blog/all').subscribe(
        (data) => this.database = JSON.parse(data['_body'])
      );
    }


  ngOnInit() {
  }}
