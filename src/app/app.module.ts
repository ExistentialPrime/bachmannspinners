// Angular System Imports
// -----------------------------------------------------------------------------------------------------
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';

// 3rd Party Module Imports
// -----------------------------------------------------------------------------------------------------
import { MatSelectModule, MatPaginatorModule, MatTableModule, MatSortModule } from '@angular/material';
import { MatDialogModule } from '@angular/material/dialog';

// Component Imports
// -----------------------------------------------------------------------------------------------------
import { AppComponent } from './components/app.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { ModalComponent } from './components/modals/modal.component';

// Pipes
// -----------------------------------------------------------------------------------------------------
// TODO

// Services
// -----------------------------------------------------------------------------------------------------
// import { AppRouterModule } from './app-router.module';  // separate file for easy routing

// Module Declaration
@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    ModalComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    MatDialogModule
  ],
  providers: [
    // services here
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    ModalComponent,
  ],
})
export class AppModule { }
