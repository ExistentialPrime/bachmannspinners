import { Component, OnInit } from '@angular/core';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import * as AOS from 'aos';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  // Properties
  isCollapsed: boolean; // is the navbar collapsed?

  // Constructor (Dependency Injection)
  constructor(
  ) { }

  // Initialization
  ngOnInit() {
    this.isCollapsed = true; // start with the hamburger collapsed
    AOS.init();
  }


}
