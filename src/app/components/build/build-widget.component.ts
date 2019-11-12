import { Component, OnInit } from '@angular/core';
import { BuildService } from './../../services/build.service';
import { CustomSpinner } from './../../models';

@Component({
  selector: 'app-build-widget',
  templateUrl: './build-widget.component.html'
})
export class BuildWidgetComponent implements OnInit {

  // Properties
  spinner: CustomSpinner;

  // Constructor (Dependency Injection)
  constructor(
    private buildService: BuildService,
  ) { }

  // Initialization
  ngOnInit() {
    this.buildService.startNewSpinner();
    this.buildService.currentSpinner$.subscribe(s => { this.spinnerUpdated(s) });
  }

  private spinnerUpdated(s):void {
    console.log('Spinner has been updated: ', s)
    this.spinner = s;
  }

}
