import { Component, OnInit } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  items: NbMenuItem[];

  constructor() { }

  ngOnInit(): void {
    this.items = [
      { link: '/home', title: 'Home', icon: 'home'},
      {link: '/number', title: 'Number Game', icon: 'alert-triangle'}
    ]
  }

}
