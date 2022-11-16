import { Component, OnInit } from '@angular/core';
import { DeviceDataTable } from 'src/app/shared/models/device.model';
import { NotificationUtilsService } from 'src/app/utils/notification-utils.service';
import { StockService } from 'src/app/services/stock.service';
import { Router } from '@angular/router';
import { CsvDataService } from 'src/app/services/csv-data.service';
declare const $: any;

@Component({
  selector: 'app-view-stock',
  templateUrl: './view-stock.component.html',
  styleUrls: ['./view-stock.component.scss']
})
export class ViewStockComponent implements OnInit {
  public dataTable: DeviceDataTable;

  constructor(private stockService: StockService,
              private router:Router,
              private csvService: CsvDataService,
              private notificationUtils: NotificationUtilsService) { }

  ngOnInit(): void {
    this.loadData();
    this.dataTable = {
      headerRow: [
        'ItemCode',
        'ItemName',
        'Price',
        'Quantity',
        'Action'
      ],
      footerRow: [
        'ItemCode',
        'ItemName',
        'Price',
        'Action'
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
    this.stockService.getAllStocks().subscribe(
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
  deleteItem(stockId) {
    console.log(stockId);
    this.notificationUtils
      .promptConfirmation('This will remove selected Item.')
      .then(
        () => {
          this.notificationUtils.showMainLoading();
          this.stockService.deleteItem(stockId).subscribe(
            (data) => {
              this.notificationUtils.showSuccessMessage('Item deleted.');
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

  editItem(id) {
    this.navigateWithQuery('/stock/edit', id);
  }

  navigateWithQuery(path, id) {
    this.router.navigate([path], {
      queryParams: {
        itemId: id,
      },
      queryParamsHandling: 'merge',
    });
  }
  saveAsCSV() {
    if (this.dataTable.dataRows.length > 0) {
      const items = [];

      this.dataTable.dataRows.forEach((line) => {
        const csvLine = {
          [this.dataTable.headerRow[0]]: line.itemCode,
          [this.dataTable.headerRow[1]]: line.itemName,
          [this.dataTable.headerRow[2]]: line.price,
          [this.dataTable.headerRow[3]]: line.quantity,
    
        };
        items.push(csvLine);
      });

      this.csvService.exportToCsv('Stock Data.csv', items);
    } else {
      this.notificationUtils.showInfoMessage('No Data Found.');
    }
  }

}

