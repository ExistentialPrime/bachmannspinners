import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import * as AOS from 'aos';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html'
})
export class LandingPageComponent implements OnInit {

  // Constructor (Dependency Injection)
  constructor(
  ) { }

  // Initialization
  ngOnInit() {
    AOS.init();
  }

  showVideo() {
    swal('Play Video', 'We need a sweet promo video or fish catch or release video here', 'success');
  }
  

}
