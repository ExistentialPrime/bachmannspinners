// Angular Imports required for routing
// -----------------------------------------------------------------------------
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components for routes
// -----------------------------------------------------------------------------
import { BuildYourOwnComponent } from './components/build/build-your-own.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { ShopComponent } from './components/shop/shop.component';
import { CartComponent } from './components/cart/cart.component';

// Routes
// -----------------------------------------------------------------------------
const routes: Routes = [
  { path: '', component: LandingPageComponent, pathMatch: 'full' },
  { path: 'gallery', component: GalleryComponent },
  { path: 'shop', component: ShopComponent },
  { path: 'cart', component: CartComponent },
  { path: 'build-your-own', component: BuildYourOwnComponent },
];

// Module Declaration
@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
