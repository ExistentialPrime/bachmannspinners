// Angular System Imports
// -----------------------------------------------------------------------------------------------------
import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';

// 3rd Party Module Imports
// -----------------------------------------------------------------------------------------------------
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { OwlModule } from 'ngx-owl-carousel';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap'; // larger package, but import all NG-Bootstrap modules

// Component Imports
// -----------------------------------------------------------------------------------------------------
import { AppComponent } from './components/app.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { ModalComponent } from './components/modals/modal.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { BuildYourOwnComponent } from './components/build/build-your-own.component';
import { BuildWidgetComponent } from './components/build/build-widget.component';
import { ShopComponent } from './components/shop/shop.component';
import { CartComponent } from './components/cart/cart.component';
import { CartWidgetComponent } from './components/cart/cart-widget.component';

// Pipes
// -----------------------------------------------------------------------------------------------------
// TODO

// Services
// -----------------------------------------------------------------------------------------------------
import { BuildService } from './services/build.service';
import { HelperService } from './services/helper.service';
import { ShopService } from './services/shop.service';


// App Initialize (for Facebook SDK)
// -----------------------------------------------------------------------------------------------------
function initializeApp(): Promise<any> {
  return new Promise((resolve, reject) => {

		// wait for facebook sdk to initialize before starting the angular app
		window['fbAsyncInit'] = function () {
			FB.init({
					 appId: '177490725634484', // dragonville app id - still doesnt work
					cookie: true,
					xfbml: true,
					version: 'v15.0'
			});
		};

    // wait for facebook sdk to initialize before starting the angular app
		(function (d, s, id) {
			let js, fjs = d.getElementsByTagName(s)[0];
			if (d.getElementById(id)) { return; }
			js = d.createElement(s); js.id = id; js.crossorigin = 'anonymous'; js.nonce = 'aWPh3VhW';
			js.src = 'https://connect.facebook.net/en_US/sdk.js';
			fjs.parentNode.insertBefore(js, fjs);
		}(document, 'script', 'fb-root'));
  });
}



// Module Declaration
@NgModule({
  declarations: [
    AppComponent,
    BuildYourOwnComponent,
    FooterComponent,
    GalleryComponent,
    HeaderComponent,
    LandingPageComponent,
    ModalComponent,
    BuildWidgetComponent,
    ShopComponent,
    CartComponent,
    CartWidgetComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MatDialogModule,
    MatSnackBarModule,
		NgbCollapseModule,
		OwlModule
  ],
  providers: [
    BuildService,
    HelperService,
    ShopService,
		/*{
			provide: APP_INITIALIZER,
			useFactory: () => initializeApp,
			multi: true
		 }*/
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    ModalComponent,
  ],
})
export class AppModule { }
