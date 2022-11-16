import { Component, OnInit } from '@angular/core';
import { DeviceDataTable } from 'src/app/shared/models/device.model';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { NotificationUtilsService } from 'src/app/utils/notification-utils.service';
import { CsvDataService } from 'src/app/services/csv-data.service';

declare const $: any;

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.scss'],
})
export class ViewUserComponent implements OnInit {
  public dataTable: DeviceDataTable;

  constructor(
    private authService: AuthService,
    private router: Router,
    private csvService: CsvDataService,
    private notificationUtils: NotificationUtilsService
  ) {}

  ngOnInit(): void {
    this.loadData();
    this.dataTable = {
      headerRow: [
        'First Name',
        'Last Name',
        'Email',
        'Address 1',
        'Address 2',
        'City',
        'Contact',
        'Actions',
      ],
      footerRow: [
        'First Name',
        'Last Name',
        'Email',
        'Address 1',
        'Address 2',
        'City',
        'Contact',
        'Actions',
      ],
      dataRows: [],
    };
  }

  loadData() {
    this.notificationUtils.showMainLoading();
    this.authService.getUsersByRole().subscribe(
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

  deleteUSer(userId) {
    this.notificationUtils
      .promptConfirmation('This will remove selected user.')
      .then(
        () => {
          this.notificationUtils.showMainLoading();
          this.authService.deleteUser(userId).subscribe(
            (data) => {
              this.notificationUtils.showSuccessMessage('User deleted.');
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

  editUser(id) {
    this.navigateWithQuery('/user/edit', id);
  }

  navigateWithQuery(path, id) {
    this.router.navigate([path], {
      queryParams: {
        userId: id,
      },
      queryParamsHandling: 'merge',
    });
  }

  saveAsCSV() {
    if (this.dataTable.dataRows.length > 0) {
      const items = [];

      this.dataTable.dataRows.forEach((line) => {
        const csvLine = {
          [this.dataTable.headerRow[0]]: line.firstName,
          [this.dataTable.headerRow[1]]: line.lastName,
          [this.dataTable.headerRow[2]]: line.email,
          [this.dataTable.headerRow[3]]: line.address1,
          [this.dataTable.headerRow[4]]: line.address2,
          [this.dataTable.headerRow[5]]: line.country,
          [this.dataTable.headerRow[6]]: line.contact,
        };
        items.push(csvLine);
      });

      this.csvService.exportToCsv('User Data.csv', items);
    } else {
      this.notificationUtils.showInfoMessage('No Data Found.');
    }
  }
}
