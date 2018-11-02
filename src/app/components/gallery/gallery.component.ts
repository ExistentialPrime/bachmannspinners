import { Component, OnInit } from '@angular/core';
import * as AOS from 'aos';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html'
})
export class GalleryComponent implements OnInit {

  // Constructor (Dependency Injection)
  constructor() { }

  // Initialization
  ngOnInit() {
    AOS.init();
  }

}
