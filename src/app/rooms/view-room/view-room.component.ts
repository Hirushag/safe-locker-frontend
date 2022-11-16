import { Component, OnInit } from '@angular/core';
import { NotificationUtilsService } from 'src/app/utils/notification-utils.service';
import { DeviceDataTable } from 'src/app/shared/models/device.model';
import { RoomService } from 'src/app/services/room.service';
import { Router } from '@angular/router';
import { CsvDataService } from 'src/app/services/csv-data.service';

declare const $: any;

@Component({
  selector: 'app-view-room',
  templateUrl: './view-room.component.html',
  styleUrls: ['./view-room.component.scss'],
})
export class ViewRoomsComponent implements OnInit {
  public dataTable: DeviceDataTable;

  constructor(
    private roomService: RoomService,
    private router: Router,
    private notificationUtils: NotificationUtilsService,
    private csvService: CsvDataService
  ) {}

  ngOnInit(): void {
    this.loadData();
    this.dataTable = {
      headerRow: [
        'RoomID',
        'RoomName',
        'RoomType',
        'Price',
        'Children',
        'Adults',
        'Description',
        'Action',
      ],
      footerRow: [
        'RoomID',
        'RoomName',
        'RoomType',
        'Price',
        'Children',
        'Adults',
        'Description',
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
    this.roomService.getAllRooms().subscribe(
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

  deleteRoom(roomId) {
    this.notificationUtils
      .promptConfirmation('This will remove selected ROOM.')
      .then(
        () => {
          this.notificationUtils.showMainLoading();
          this.roomService.deleteRoom(roomId).subscribe(
            (data) => {
              this.notificationUtils.showSuccessMessage('Room deleted.');
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

  editRoom(id) {
    console.log('im janith');
    this.navigateWithQuery('/rooms/edit', id);
  }

  navigateWithQuery(path, id) {
    this.router.navigate([path], {
      queryParams: {
        roomId: id,
      },
      queryParamsHandling: 'merge',
    });
  }

  saveAsCSV() {
    if (this.dataTable.dataRows.length > 0) {
      const items = [];

      this.dataTable.dataRows.forEach((line) => {
        const csvLine = {
          [this.dataTable.headerRow[0]]: line.roomId,
          [this.dataTable.headerRow[1]]: line.roomName,
          [this.dataTable.headerRow[2]]: line.roomType,
          [this.dataTable.headerRow[3]]: line.price,
          [this.dataTable.headerRow[4]]: line.children,
          [this.dataTable.headerRow[5]]: line.adults,
          [this.dataTable.headerRow[6]]: line.description,
        };
        items.push(csvLine);
      });

      this.csvService.exportToCsv('Room Data.csv', items);
    } else {
      this.notificationUtils.showInfoMessage('No Data Found.');
    }
  }
}
