import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentService } from 'src/app/services/payment.service';
import { NotificationUtilsService } from 'src/app/utils/notification-utils.service';

@Component({
  selector: 'app-edit-payment',
  templateUrl: './edit-payment.component.html',
  styleUrls: ['./edit-payment.component.scss']
})
// export class EditPaymentComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

// }
export class EditPaymentComponent implements OnInit {
  paymentform: FormGroup;
  paymentId:String;

  constructor(
    private paymentService: PaymentService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private notificationUtils: NotificationUtilsService
  ) {

    this. paymentId = this.route.snapshot.queryParamMap.get('paymentId');

  }

  ngOnInit(): void {
    this.paymentform = this.formBuilder.group({
      payDate: [null, [Validators.required]],
      customerId: [null, [Validators.required]],
      customerName: [null, [Validators.required]],
      amount: [null, [Validators.required]],
      discount: [null,],
      paymentType:[null],
     // netPayment:[null]
      
      
      
    });
    this.loadPaymentData();
  }
  

  get payment() {
    return this.paymentform.controls;
  }

  updatePayment() {
    this.notificationUtils.promptConfirmation().then(
      () => {
        this.notificationUtils.showMainLoading();
          this.paymentService.editPayment(this.paymentId,  
            {
      
            "payDate": this.payment. payDate.value,
            "customerId":  this.payment.customerId.value,
            "customerName":  this.payment.customerName.value,
            "amount":  this.payment.amount.value,
            "discount": this.payment. discount.value,
            "paymentType":  this.payment. paymentType.value,
      
           

          }).subscribe(
          () => {
            this.notificationUtils.hideMainLoading();
            this.router.navigateByUrl('/payment/view');
            this.notificationUtils.showSuccessMessage('Payment updated.');
          },
          (error) => {
            this.notificationUtils.hideMainLoading();
            this.notificationUtils.showErrorMessage(
              'Error updating payment : ' + error.message
            );
          }
        );
      },
      () => {}
    );
  }

  loadPaymentData() {
    console.log(this.paymentId);
    this.notificationUtils.showMainLoading();
    this.paymentService.getPaymentById(this.paymentId).subscribe(
      (data) => {
        this.notificationUtils.hideMainLoading();
        this.paymentform.patchValue({
         
          payDate: data.payDate,
          customerId: data.customerId,
          customerName:data.customerName,
          amount: data.amount,
          discount: data.discount,
          paymentType:data.paymentType,
         
        });
      },
      (error) => {
        this.notificationUtils.hideMainLoading();
        this.notificationUtils.showErrorMessage(
          'Error loading payment : ' + error.message
        );
      }
    );
  }
}