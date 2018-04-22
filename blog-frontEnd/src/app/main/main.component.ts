import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.pug',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  registerUser = {
    email: '',
    username: '',
    password: ''

  };
  password2 = '';

  constructor(public http: Http) {
  }

  register() {
    console.log(this.registerUser);
    this.http.post('http://localhost:8080/register', this.registerUser)
      .subscribe((data) => {
        window.alert('Sikeres regisztráció');
    });
  }
}
