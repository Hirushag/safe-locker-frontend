import { Component, OnInit } from '@angular/core';
import { DeviceDataTable } from 'src/app/shared/models/device.model';
import { SalaryService } from 'src/app/services/salary.service';
import { NotificationUtilsService } from 'src/app/utils/notification-utils.service';
import { Router } from '@angular/router';
import { CsvDataService } from 'src/app/services/csv-data.service';
declare const $: any;
@Component({
  selector: 'app-view-salary',
  templateUrl: './view-salary.component.html',
  styleUrls: ['./view-salary.component.scss']
})
 

export class ViewSalaryComponent implements OnInit {
  public dataTable: DeviceDataTable;

  constructor(private salaryService: SalaryService,
              private router:Router,
              private csvService: CsvDataService,
    private notificationUtils: NotificationUtilsService) {
     
     }

  ngOnInit(): void {
    this.loadData();
    this.dataTable = {
      headerRow: [
        'Salary ID',
        'Pay Date',
        'Employee Id',
        'Basic Salary',
        'Salary Advance',
        'PaymentType',
        'Net Payment',
        'Action',
      ],
      footerRow: [
        'Salary ID',
        'Pay Date',
        'Employee Id',
        'Basic Salary',
        'Salary Advance',
        'PaymentType',
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
    this.salaryService.getAllSalaries().subscribe(
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
  
  deleteSalary(salaryId) {
    this.notificationUtils
      .promptConfirmation('This will remove selected Salary.')
      .then(
        () => {
          this.notificationUtils.showMainLoading();
          this.salaryService.deleteSalary(salaryId).subscribe(
            (data) => {
              this.notificationUtils.showSuccessMessage('Salary deleted.');
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

  editSalary(id) {
    this.navigateWithQuery('/salary/edit', id);
  }

  navigateWithQuery(path, id) {
    this.router.navigate([path], {
      queryParams: {
        salaryId: id,
      },
      queryParamsHandling: 'merge',
    });
  }
  netPayment(x,y){

    return(x-y);
  }

  saveAsCSV() {
    if (this.dataTable.dataRows.length > 0) {
      const items = [];

      this.dataTable.dataRows.forEach((line) => {
        const csvLine = {
          [this.dataTable.headerRow[0]]: line.salaryId,
          [this.dataTable.headerRow[1]]: line.payDate,
          [this.dataTable.headerRow[2]]: line.employeeId,
          [this.dataTable.headerRow[3]]: line.basicSalary,
          [this.dataTable.headerRow[4]]: line.salaryAdvance,
          [this.dataTable.headerRow[5]]: line.paymentType,
          [this.dataTable.headerRow[6]]: line.netPayment,
        };
        items.push(csvLine);
      });

      this.csvService.exportToCsv('Salary Data.csv', items);
    } else {
      this.notificationUtils.showInfoMessage('No Data Found.');
    }
  }
}

