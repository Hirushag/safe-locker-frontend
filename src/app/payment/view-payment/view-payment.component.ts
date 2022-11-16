import { Component, OnInit } from '@angular/core';
import { DeviceDataTable } from 'src/app/shared/models/device.model';
import { NotificationUtilsService } from 'src/app/utils/notification-utils.service';
import { PaymentService } from 'src/app/services/payment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CsvDataService } from 'src/app/services/csv-data.service';

declare const $: any;

@Component({
  selector: 'app-view-payment',
  templateUrl: './view-payment.component.html',
  styleUrls: ['./view-payment.component.scss']
})
export class ViewPaymentComponent implements OnInit {
  public dataTable: DeviceDataTable;
 
 

  constructor(private paymentService: PaymentService,
              private router:Router,
              private route: ActivatedRoute,
              private csvService: CsvDataService,
    private notificationUtils: NotificationUtilsService) { }

  ngOnInit(): void {
    this.loadData();
    this.dataTable = {
      headerRow: [
        'Payment ID',
        'Pay Date',
        'Customer Id',
        'Customer Name',
        'Amount',
        'Discount %',
        'PaymentType',
        'Net Payment',
        'Action',
      ],
      footerRow: [
        'Payment ID',
        'Pay Date',
        'Customer Id',
        'Customer Name',
        'Amount',
        'Discoun %',
        'PaymentType',
        'Net Payment',
        'Action',
      ],
      dataRows: [],
    };
    this.initializeDataTable();
  }

  destroyDataTable() {
    $('#dataTable').DataTable().destroy();
  }

  initializeDataTable() {
    $(document).ready(() => {
      $('#dataTable').DataTable({
        pagingType: 'full_numbers',
        lengthMenu: [
          [10, 25, 50],
          [10, 25, 50],
        ],
        responsive: true,
        language: {
          search: '_INPUT_',
          searchPlaceholder: 'Search records',
        },
      });
    });
  }

  loadData() {
    this.notificationUtils.showMainLoading();
    this.paymentService.getAllPayments().subscribe(
      (data) => {
        this.destroyDataTable();
        this.dataTable.dataRows = data;
        this.notificationUtils.hideMainLoading();
        this.initializeDataTable();
      },
      (error) => {
        this.notificationUtils.showErrorMessage(error.message);
        this.notificationUtils.hideMainLoading();
      }
    );
  }
  
  deletePayment(paymentId) {
    this.notificationUtils
      .promptConfirmation('This will remove selected payment.')
      .then(
        () => {
          this.notificationUtils.showMainLoading();
          this.paymentService.deletePayment(paymentId).subscribe(
            (data) => {
              this.notificationUtils.showSuccessMessage('payment deleted.');
              this.notificationUtils.hideMainLoading();
              this.loadData();
            },
            (error) => {
              this.notificationUtils.showErrorMessage(error.message);
              this.notificationUtils.hideMainLoading();
            }
          );
        },
        () => {}
      );
  }

  editPayment(id) {
    this.navigateWithQuery('/payment/edit', id);
  }

  navigateWithQuery(path, id) {
    this.router.navigate([path], {
      queryParams: {
        paymentId: id,
      },
      queryParamsHandling: 'merge',
    });
  }

  netPayment(x,y){

  return (x-(x*0.01*y)); 

  }

  saveAsCSV() {
    if (this.dataTable.dataRows.length > 0) {
      const items = [];

      this.dataTable.dataRows.forEach((line) => {
        const csvLine = {
          [this.dataTable.headerRow[0]]: line.paymentId,
          [this.dataTable.headerRow[1]]: line.payDate,
          [this.dataTable.headerRow[2]]: line.customerId,
          [this.dataTable.headerRow[3]]: line.customerName,
          [this.dataTable.headerRow[4]]: line.amount,
          [this.dataTable.headerRow[5]]: line.discount,
          [this.dataTable.headerRow[6]]: line.paymentType,
          [this.dataTable.headerRow[7]]: line.netPayment,
        };
        items.push(csvLine);
      });

      this.csvService.exportToCsv('Payment Data.csv', items);
    } else {
      this.notificationUtils.showInfoMessage('No Data Found.');
    }
  }
}


