import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationUtilsService } from 'src/app/utils/notification-utils.service';
import { StockService } from 'src/app/services/stock.service';

@Component({
  selector: 'app-create-item',
  templateUrl: './create-item.component.html',
  styleUrls: ['./create-item.component.scss']
})


export class CreateItemComponent implements OnInit {
  itemform: FormGroup;

  constructor(
    private stockService: StockService,
    private formBuilder: FormBuilder,
    private router: Router,
    private notificationUtils: NotificationUtilsService
  ) {}

  ngOnInit(): void {
    this.itemform = this.formBuilder.group({
    //  itemcode: [null, [Validators.required]],
      itemName: [null, [Validators.required]],
      price: [null, [Validators.required]],
      quantity: [null,]

    });
  }

  get item() {
    return this.itemform.controls;
  }

  createItem() {
    this.notificationUtils.promptConfirmation().then(
      () => {
        this.notificationUtils.showMainLoading();
        this.stockService.registerItem({

        "itemName": this.item.itemName.value,
        "price":this.item.price.value,
        "quantity": this.item.quantity.value,
      }).subscribe(
          () => {
            this.itemform.reset();
            this.router.navigateByUrl('/stock/view');
            this.notificationUtils.hideMainLoading();
            this.notificationUtils.showSuccessMessage('Item registered.');
          },
          (error) => {
            this.notificationUtils.hideMainLoading();
            this.notificationUtils.showErrorMessage(
              'Error creating Item : ' + error.message
            );
          }
        );
      },
      () => {}
    );
  }
}
