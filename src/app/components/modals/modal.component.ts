import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Modal } from '../../models';

// Angular Material Dialog Example:
// https://material.angular.io/components/dialog/examples


@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
  })
  export class ModalComponent {

    // Constructor (Dependency Injection)
    constructor(
      public dialogRef: MatDialogRef<ModalComponent>,
      @Inject(MAT_DIALOG_DATA) public modal: Modal
    ) {}

    // Initialization
    ngOnInit() {
      console.log('modal creation code initializing. Modal info: ', this.modal);
        /* Reminder: the modal class has the following members:
        title: string;
        message: string;
        showCancel?: boolean;
        confirmText?: string;
        data?: any[];
        */
      if (!this.modal.confirmText) { this.modal.confirmText = 'Confirm'; }

    }


    onCancelClick(): void {
      this.dialogRef.close();
    }

    onConfirmClick(): void {
        this.dialogRef.close();
    }

  }
