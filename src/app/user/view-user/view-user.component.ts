import { Component, OnInit } from '@angular/core';
import { DeviceDataTable } from 'src/app/shared/models/device.model';
import { Router } from '@angular/router';
import { NotificationUtilsService } from 'src/app/utils/notification-utils.service';
import { CsvDataService } from 'src/app/services/csv-data.service';
import {UserService} from '../../services/user.service';

declare const $: any;

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.scss'],
})
export class ViewUserComponent implements OnInit {
  public dataTable: DeviceDataTable;

  constructor(
    private userService: UserService,
    private router: Router,
    private csvService: CsvDataService,
    private notificationUtils: NotificationUtilsService
  ) {}

  ngOnInit(): void {
    this.loadData();
    this.dataTable = {
      headerRow: [
        'Name',
        'Email',
        'Username',
        'Role',
        'Actions',
      ],
      footerRow: [
        'Name',
        'Email',
        'Username',
        'Role',
        'Actions',
      ],
      dataRows: [],
    };
  }

  loadData() {
    this.notificationUtils.showMainLoading();
    this.userService.getAllUsers().subscribe(
      (data) => {
        this.destroyDataTable();
        this.dataTable.dataRows = data.dataBundle;
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
          this.userService.deleteUser(userId).subscribe(
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
          [this.dataTable.headerRow[0]]: line.name,
          [this.dataTable.headerRow[1]]: line.email,
          [this.dataTable.headerRow[2]]: line.username,
          [this.dataTable.headerRow[3]]: line.role,
        };
        items.push(csvLine);
      });

      this.csvService.exportToCsv('User Data.csv', items);
    } else {
      this.notificationUtils.showInfoMessage('No Data Found.');
    }
  }
}
