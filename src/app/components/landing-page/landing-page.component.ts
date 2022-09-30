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
    swal.fire('Play Video', 'Waiting on Chris or Tim to upload a sweet GoPro vid of their monster 25.5" brown', 'success');
  }

	submitContact() {
		swal.fire('Contact us via Facebook', 'Email form not yet functional. Please contact us on Facebook in the meantime.', 'warning');
	}



}
