import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarRef } from '@angular/material';
import { SnackbarComponent } from './snackbar.component';

@Injectable()
export class SnackbarService {

  private TYPE = { 'error': 'minus-circle', 'success': 'check-circle' }

  constructor(private snackBar: MatSnackBar) { }

  showMessage(message: string, type: 'error' | 'success'): MatSnackBarRef<any> {
    return this.snackBar.openFromComponent(SnackbarComponent, {
      duration: 3000, panelClass: 'dark-snackbar', data: { message: message, type: this.TYPE[type] }
    });
  }

}
