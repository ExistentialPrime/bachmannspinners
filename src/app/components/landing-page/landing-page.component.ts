import { Component, OnInit } from '@angular/core';
import { ModalComponent } from '../modals/modal.component';
import { Modal } from '../../models';
import { MatDialog } from '@angular/material';
import swal from "sweetalert2";
import * as AOS from 'aos';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html'
})
export class LandingPageComponent implements OnInit {

  // Constructor (Dependency Injection)
  constructor(
    public popup: MatDialog
  ) { }

  // Initialization
  ngOnInit() {
    AOS.init();
  }

  // Modal Test
  testModal() { 
    console.log('firing test modal...');
    let modalData: Modal = { 
      title: 'Modal Test Successful',
      message: 'Pretty cool huh',
      confirmText: 'Ok',
      showCancel: true,
      data: ['string first', 'string second']
    };
    const dialogRef = this.popup.open(ModalComponent, { data: modalData, panelClass: 'modal' });
  }

  testSwal() {
    swal('Swal works!', 'sweet alert 2 is set up correctly', 'success');
  }

}
