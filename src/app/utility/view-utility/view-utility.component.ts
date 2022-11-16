import { Component, OnInit } from '@angular/core';
import { DeviceDataTable } from 'src/app/shared/models/device.model';
import { NotificationUtilsService } from 'src/app/utils/notification-utils.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { UtilityService } from 'src/app/services/utility.service';
import { Router } from '@angular/router';
import { CsvDataService } from 'src/app/services/csv-data.service';

declare const $: any;

@Component({
  selector: 'app-view-utility',
  templateUrl: './view-utility.component.html',
  styleUrls: ['./view-utility.component.scss']
})
export class ViewUtilityComponent implements OnInit {
  public dataTable: DeviceDataTable;

  constructor(private utilityService: UtilityService,
              private router:Router,
              private csvService: CsvDataService,
    private notificationUtils: NotificationUtilsService) { }

  ngOnInit(): void {
    this. loadData();
    this.dataTable = {
      headerRow: [
        'Utility Id',
        'Month',
        'Electricity  Bill',
        'Water Bill',
        'Others',
        'Total',
        'Action'
      ],
      footerRow: [
        'Utility Id',
        'Month',
        'Electricity  Bill',
        'Water Bill',
        'Others',
        'Total',
        'Action'
      ],
      dataRows: [],
    };
    this.initializeDataTable();
  }

total(i,o,p){

  return Number(i)+Number(o)+Number(p);
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
    this.utilityService.getAllUtility().subscribe(
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
  deleteUtility(UtilityId) {
    this.notificationUtils
      .promptConfirmation('This will remove selected Utility.')
      .then(
        () => {
          this.notificationUtils.showMainLoading();
          this.utilityService.deleteUtility(UtilityId).subscribe(
            (data) => {
              this.notificationUtils.showSuccessMessage('Utility deleted.');
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

  editUtility(id) {
    this.navigateWithQuery('/utility/edit', id);
  }

  navigateWithQuery(path, id) {
    this.router.navigate([path], {
      queryParams: {
        utilityId: id,
      },
      queryParamsHandling: 'merge',
    });
  }
   
  saveAsCSV() {
    if (this.dataTable.dataRows.length > 0) {
      const items = [];

      this.dataTable.dataRows.forEach((line) => {
        const csvLine = {
          [this.dataTable.headerRow[0]]: line.utilityId,
          [this.dataTable.headerRow[1]]: line.month,
          [this.dataTable.headerRow[2]]: line.electricityBill,
          [this.dataTable.headerRow[3]]: line.waterBill,
          [this.dataTable.headerRow[4]]: line.others,
          [this.dataTable.headerRow[5]]: line.total,
          
        };
        items.push(csvLine);
      });

      this.csvService.exportToCsv('Utility Data.csv', items);
    } else {
      this.notificationUtils.showInfoMessage('No Data Found.');
    }
  }
}
