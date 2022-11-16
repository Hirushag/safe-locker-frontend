import { Component, OnInit } from '@angular/core';
import { DeviceDataTable } from 'src/app/shared/models/device.model';
import { NotificationUtilsService } from 'src/app/utils/notification-utils.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { Router } from '@angular/router';
import { CsvDataService } from 'src/app/services/csv-data.service';
declare const $: any;

@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.scss']
})

export class ViewEmployeeComponent implements OnInit {
  public dataTable: DeviceDataTable;

  constructor(private employeeService: EmployeeService,
              private router:Router,
              private csvService: CsvDataService,
    private notificationUtils: NotificationUtilsService) { }

  ngOnInit(): void {
    this.loadData();
    this.dataTable = {
      headerRow: [
        'Employee Id',
        'First Name',
        'Last Name',
        'Address1',
        'Address2',
        'Email',
        'City',
        'Contact',
        'Actions',
      ],
      footerRow: [
        'Employee Id',
        'First Name',
        'Last Name',
        'Address1',
        'Address2',
        'Email',
        'City',
        'Contact',
        'Actions',
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
    this.employeeService.getAllEmployees().subscribe(
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
  deleteEmployee(employeeId) {
    this.notificationUtils
      .promptConfirmation('This will remove selected employee.')
      .then(
        () => {
          this.notificationUtils.showMainLoading();
          this.employeeService.deleteEmployee(employeeId).subscribe(
            (data) => {
              this.notificationUtils.showSuccessMessage('Employee deleted.');
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

  editEmployee(id) {
    this.navigateWithQuery('/employee/edit', id);
  }

  navigateWithQuery(path, id) {
    this.router.navigate([path], {
      queryParams: {
        employeeId: id,
      },
      queryParamsHandling: 'merge',
    });
  }
  saveAsCSV() {
    if (this.dataTable.dataRows.length > 0) {
      const items = [];

      this.dataTable.dataRows.forEach((line) => {
        const csvLine = {
          [this.dataTable.headerRow[0]]: line.employeeId,
          [this.dataTable.headerRow[1]]: line.firstName,
          [this.dataTable.headerRow[2]]: line.lastName,
          [this.dataTable.headerRow[3]]: line.address1,
          [this.dataTable.headerRow[4]]: line.address2,
          [this.dataTable.headerRow[5]]: line.email,
          [this.dataTable.headerRow[4]]: line.city,
          [this.dataTable.headerRow[5]]: line.contact,
          
        };
        items.push(csvLine);
      });

      this.csvService.exportToCsv('Employee Data.csv', items);
    } else {
      this.notificationUtils.showInfoMessage('No Data Found.');
    }
  }
}

