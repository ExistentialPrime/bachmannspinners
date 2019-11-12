import { Component, OnInit } from '@angular/core';
import * as AOS from 'aos';
import swal from 'sweetalert2';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html'
})
export class GalleryComponent implements OnInit {

	// Owl Carousel NGX setup:
	// https://www.npmjs.com/package/ngx-owl-carousel
	// Options: https://owlcarousel2.github.io/OwlCarousel2/docs/api-options.html
	imageGallery = [];
  CarouselOptions = {
		items: 2,
		loop: true,
		dots: false, // dots are a bit akward for 50+ items
		nav: true,
		// center: true,
		lazyLoad: true,
		lazyLoadEager: 1,
		startPosition: 49, // start on giant pike!!
		navText: [
			'<div class="custom-owl-nav"><i class="fa fa-chevron-left"></i> PREV </div>',
			'<div class="custom-owl-nav"> NEXT <i class="fa fa-chevron-right"></i></div>'],
	};

  // Constructor (Dependency Injection)
  constructor() { }

  // Initialization
  ngOnInit() {
		AOS.init();
		this.initGallery();
	}

	private initGallery() {
		this.imageGallery = [];
		for (let i = 1; i <= 53; i++) {  // Gallery folder currently has 54 photos, about 5mb total
			this.imageGallery.push('/assets/img/gallery/bsg-' + i + '.jpg');
		}
	}

	expandImage(path): void {
		swal.fire({
			// title: 'Sweet!',
			// text: 'Modal with a custom image.',
			imageUrl: path,
		  imageWidth: 400,
			// imageHeight: 200,
			imageAlt: 'Caught on a bachman!',
		});
	}

}
