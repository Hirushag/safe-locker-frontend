import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StockService } from 'src/app/services/stock.service';
import { NotificationUtilsService } from 'src/app/utils/notification-utils.service';

@Component({
  selector: 'app-edit-stock',
  templateUrl: './edit-stock.component.html',
  styleUrls: ['./edit-stock.component.scss']
})
// export class EditStockComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }
export class EditStockComponent implements OnInit {
  itemform: FormGroup;
  stockId:String;
  

  constructor(
    private stockService: StockService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private notificationUtils: NotificationUtilsService
  ) {
    this. stockId = this.route.snapshot.queryParamMap.get('itemId');
  }

  ngOnInit(): void {
    this.itemform = this.formBuilder.group({
    //  itemcode: [null, [Validators.required]],
      itemName: [null, [Validators.required]],
      price: [null, [Validators.required]],
      quantity: [null,]
      
    });
    this.loadItemData()
  }

  get item() {
    return this.itemform.controls;
  }

  updateItem() {
    this.notificationUtils.promptConfirmation().then(
      () => {
        this.notificationUtils.showMainLoading();
        // this.authService.editUser(this.userId, this.userForm.value).subscribe(
          this.stockService.editItem(this. stockId,  {
           
            "itemName": this.item.itemName.value,
            "price":this.item.price.value,
            "quantity": this.item. quantity.value
               
             }).subscribe(
          () => {
            this.notificationUtils.hideMainLoading();
            this.router.navigateByUrl('/stock/view');
            this.notificationUtils.showSuccessMessage('Item updated.');
          },
          (error) => {
            this.notificationUtils.hideMainLoading();
            this.notificationUtils.showErrorMessage(
              'Error updating Item : ' + error.message
            );
          }
        );
      },
      () => {}
    );
  }

  loadItemData() {
    this.notificationUtils.showMainLoading();
    this.stockService.getItemById(this. stockId).subscribe(
      (data) => {
        this.notificationUtils.hideMainLoading();
        this.itemform.patchValue({

          itemName: data.itemName,
          price:data. price,
          quantity: data.quantity,
         
        });
      },
      (error) => {
        this.notificationUtils.hideMainLoading();
        this.notificationUtils.showErrorMessage(
          'Error loading work : ' + error.message
        );
      }
    );
  }

}
