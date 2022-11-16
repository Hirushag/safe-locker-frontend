import { Component, OnInit } from '@angular/core';
import { NotificationUtilsService } from 'src/app/utils/notification-utils.service';
import { DeviceDataTable } from 'src/app/shared/models/device.model';
import { ReservationService } from 'src/app/services/reservation.service';
import { CsvDataService } from 'src/app/services/csv-data.service';
declare const $: any;

@Component({
  selector: 'app-view-reservation',
  templateUrl: './view-reservation.component.html',
  styleUrls: ['./view-reservation.component.scss']
})
export class ViewReservationComponent implements OnInit {
  public dataTable: DeviceDataTable;

  constructor(private reservationService: ReservationService,
    private notificationUtils: NotificationUtilsService,
    private csvService: CsvDataService) { }

  ngOnInit(): void {
    this.loadData();
    this.dataTable = {
      headerRow: [
        'Reservation ID',
        'RoomId',
        'CustomerId',
        'Check IN',
        'Check Out',
        'Childern',
        'Adults',
        'Action',
      ],
      footerRow: [
        'Reservation ID',
        'RoomId',
        'CustomerId',
        'Check IN',
        'Check Out',
        'Childern',
        'Adults',
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
    this.reservationService.getAllReservations().subscribe(
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

  deleteReservation(reservationId) {
    this.notificationUtils
      .promptConfirmation('This will remove selected reservation.')
      .then(
        () => {
          this.notificationUtils.showMainLoading();
          this.reservationService.deleteReservation(reservationId).subscribe(
            (data) => {
              this.notificationUtils.showSuccessMessage('reservation deleted.');
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

  saveAsCSV() {
    if (this.dataTable.dataRows.length > 0) {
      const items = [];

      this.dataTable.dataRows.forEach((line) => {
        const csvLine = {
          [this.dataTable.headerRow[0]]: line.reservationId,
          [this.dataTable.headerRow[1]]: line.roomId,
          [this.dataTable.headerRow[2]]: line.customerId,
          [this.dataTable.headerRow[3]]: line.checkIN,
          [this.dataTable.headerRow[4]]: line.checkOut,
          [this.dataTable.headerRow[5]]: line.children,
          [this.dataTable.headerRow[6]]: line.adults,
        };
        items.push(csvLine);
      });

      this.csvService.exportToCsv('Room Data.csv', items);
    } else {
      this.notificationUtils.showInfoMessage('No Data Found.');
    }
  }

}
