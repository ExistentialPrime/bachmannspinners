// Angular System Imports
// -----------------------------------------------------------------------------------------------------
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
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
    ShopService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    ModalComponent,
  ],
})
export class AppModule { }
