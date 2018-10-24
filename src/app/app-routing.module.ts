// Angular Imports required for routing
// -----------------------------------------------------------------------------
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components for routes
// -----------------------------------------------------------------------------
import { LandingPageComponent } from './components/landing-page/landing-page.component';

// Routes
// -----------------------------------------------------------------------------
const routes: Routes = [
  { path: '', component: LandingPageComponent, pathMatch: 'full' }
];

// Module Declaration
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
