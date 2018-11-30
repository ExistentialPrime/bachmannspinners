// Angular System Imports
// -----------------------------------------------------------------------------------------------------
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';

// 3rd Party Module Imports
// -----------------------------------------------------------------------------------------------------
import { MatDialogModule } from '@angular/material/dialog';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
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

// Pipes
// -----------------------------------------------------------------------------------------------------
// TODO

// Services
// -----------------------------------------------------------------------------------------------------
import { BuildService } from './services/build.service';

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
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    MatDialogModule,
    NgbCollapseModule
  ],
  providers: [
    BuildService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    ModalComponent,
  ],
})
export class AppModule { }
