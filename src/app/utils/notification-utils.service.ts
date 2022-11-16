import { Injectable } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import swal from 'sweetalert2';

@Injectable()
export class NotificationUtilsService {
  @BlockUI() blockUI: NgBlockUI;

  showMainLoading(message?: string) {
    this.blockUI.start('Please wait...');
  }

  hideMainLoading() {
    this.blockUI.stop();
  }

  public showErrorMessage(message?: string) {
    swal({
      title: 'Error',
      text: message,
      buttonsStyling: false,
      confirmButtonClass: 'btn btn-danger',
      type: 'error',
      background: '#f9fbff'
    }).catch(swal.noop);
  }

  public showSuccessMessage(message?: string) {
    swal({
      title: 'Success',
      text: message,
      buttonsStyling: false,
      confirmButtonClass: 'btn btn-success',
      type: 'success',
      background: '#f9fbff'
    }).catch(swal.noop);
  }

  public showWarningMessage(message?: string) {
    swal({
      title: 'Warning',
      text: message,
      buttonsStyling: false,
      confirmButtonClass: 'btn btn-warning',
      type: 'warning',
      background: '#f9fbff'
    }).catch(swal.noop);
  }

  public showInfoMessage(message?: string) {
    swal({
      title: 'Info',
      text: message,
      buttonsStyling: false,
      confirmButtonClass: 'btn btn-info',
      type: 'info',
      background: '#f9fbff'
    }).catch(swal.noop);
  }

  public promptConfirmation(message?: string) {
    return swal({
      title: 'Are you sure?',
      text: message,
      type: 'warning',
      background: '#f9fbff',
      showCancelButton: true,
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      buttonsStyling: false,
      useRejections: true
    });
  }
}
