import { Component, OnInit } from '@angular/core';

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
  constructor() { }

  ngOnInit() {
  }

}
