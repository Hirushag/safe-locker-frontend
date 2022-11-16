import { Component, OnInit } from '@angular/core';
import { DeviceDataTable } from 'src/app/shared/models/device.model';
import { NotificationUtilsService } from 'src/app/utils/notification-utils.service';
import { SupplierService } from 'src/app/services/supplier.service';
import { Router } from '@angular/router';
import { CsvDataService } from 'src/app/services/csv-data.service';
declare const $: any;

@Component({
  selector: 'app-view-supplier',
  templateUrl: './view-supplier.component.html',
  styleUrls: ['./view-supplier.component.scss']
})

export class ViewSupplierComponent implements OnInit {
  public dataTable: DeviceDataTable;

  constructor(private supplierService: SupplierService,
              private router:Router,
              private csvService: CsvDataService,
             private notificationUtils: NotificationUtilsService) { }

  ngOnInit(): void {
    this.loadData();
    this.dataTable = {
      headerRow: [
        'Supplier Id',
        'First Name',
        'Last Name',
        'Email',
        'City',
        'Contact',
        'Actions',
      ],
      footerRow: [
        'Supplier Id',
        'First Name',
        'Last Name',
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
    this.supplierService.getAllSuppliers().subscribe(
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

  
  deleteSupplier(supplierId) {
    console.log(supplierId);
    this.notificationUtils
      .promptConfirmation('This will remove selected supplier.')
      .then(
        () => {
          this.notificationUtils.showMainLoading();
          this.supplierService.deleteSupplier(supplierId).subscribe(
            (data) => {
              this.notificationUtils.showSuccessMessage('supplier deleted.');
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

  editSupplier(id) {
    this.navigateWithQuery('/supplier/edit', id);
  }

  navigateWithQuery(path, id) {
    this.router.navigate([path], {
      queryParams: {
        supplierId: id,
      },
      queryParamsHandling: 'merge',
    });
  }
  saveAsCSV() {
    if (this.dataTable.dataRows.length > 0) {
      const items = [];

      this.dataTable.dataRows.forEach((line) => {
        const csvLine = {
          [this.dataTable.headerRow[0]]: line.supplierId,
          [this.dataTable.headerRow[1]]: line.firstName,
          [this.dataTable.headerRow[2]]: line.lastName,
          [this.dataTable.headerRow[3]]: line.email,
          [this.dataTable.headerRow[4]]: line.city,
          [this.dataTable.headerRow[5]]: line.contact,
          
        };
        items.push(csvLine);
      });

      this.csvService.exportToCsv('Supplier Data.csv', items);
    } else {
      this.notificationUtils.showInfoMessage('No Data Found.');
    }
  }

}