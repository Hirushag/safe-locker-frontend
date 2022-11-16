import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationUtilsService } from 'src/app/utils/notification-utils.service';
import { Router } from '@angular/router';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-create-payment',
  templateUrl: './create-payment.component.html',
  styleUrls: ['./create-payment.component.scss']
})
export class CreatePaymentComponent implements OnInit {
  paymentform: FormGroup;

  constructor(
    private paymentService: PaymentService,
    private formBuilder: FormBuilder,
    private router: Router,
    private notificationUtils: NotificationUtilsService
  ) {}

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
  }
  

  get payment() {
    return this.paymentform.controls;
  }

  createPayment() {
    console.log("im janith",this.payment.payDate.value);
    this.notificationUtils.promptConfirmation().then(
      () => {
        this.notificationUtils.showMainLoading();
        this.paymentService.registerPayment({
          
          "payDate":this.payment.payDate.value,
          "customerId":this.payment.customerId.value,
          "customerName":this.payment.customerName.value,
          "amount": this.payment.amount.value,
          "discount": this.payment.discount.value,
          "paymentType":this.payment.paymentType.value,
          //"netPayment": this.payment.netPayment.value,

        }).subscribe(
          () => {
            this.paymentform.reset();
            this.router.navigateByUrl('/payment/view');
            this.notificationUtils.hideMainLoading();
            this.notificationUtils.showSuccessMessage('Payment Created.');
          },
          (error) => {
            this.notificationUtils.hideMainLoading();
            this.notificationUtils.showErrorMessage(
              'Error creating payment : ' + error.message
            );
          }
        );
      },
      () => {}
    );
  }
}