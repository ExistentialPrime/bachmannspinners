/* --------------------------------------------------------------------------
 * Build Service
 * A service for supporting the build-your-own-spinner page. Holds the current
 * selections and preferences
 * 
 * Notes:
 * - etc
 * --------------------------------------------------------------------------*/

import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { map, take, filter, distinctUntilChanged } from 'rxjs/operators';
import { CustomSpinner, Bead, Blade } from '../models';
import { HelperService } from './helper.service';

@Injectable({
  providedIn: 'root'
})
export class BuildService {

    // Properties
    public savedSpinners: CustomSpinner[];        // List of all saved custom spinners

    // Our main Observable stream for the current spinner build in progress
    private _spinner = new BehaviorSubject<CustomSpinner>(null);
    currentSpinner$ = this._spinner.asObservable()
        .pipe(filter(Boolean), distinctUntilChanged()); // ignore null/identical


    // Constructor (Dependency Injection and setup)
    constructor(
        private helper: HelperService,
    ) {
      this.savedSpinners = [];
    }

    // Start a new spinner (save old one if it exists)
    public startNewSpinner(): void {

    if (this._spinner.getValue() !== null) { this.savedSpinners.push(this._spinner.getValue()); }

    let newSpinner: CustomSpinner = {
        id: this.helper.generateUUID(),
        name: 'Unnamed Spinner',
        components: [
            new Bead({ color: 'Red', size: 14, position: 1 }),
            new Blade({ color: 'Gold', size: 3, position: 2 }),
            new Bead({ color: 'Red', size: 14, position: 3 }),
        ]
     }

     this._spinner.next(newSpinner); // subscribers to currentSpinner$ will get the new one
    }


    // Private Support Functions
    // ---------------------------------------------------------------------------------------
    


}
