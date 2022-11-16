import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { NotificationUtilsService } from 'src/app/utils/notification-utils.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-create-utility',
  templateUrl: './create-utility.component.html',
  styleUrls: ['./create-utility.component.scss']
})
export class CreateUtilityComponent implements OnInit {
  utilityform: FormGroup;

  constructor(
    private utilityService: UtilityService,
    private formBuilder: FormBuilder,
    private router: Router,
    private notificationUtils: NotificationUtilsService
  ) {}

  ngOnInit(): void {
    this.utilityform = this.formBuilder.group({
     month: [null, [Validators.required]],
      waterBill: [null, [Validators.required]],
      electricityBill: [null, [Validators.required]],
      otherBills: [null,]
      
    });
  }

  get utility() {
    return this.utilityform.controls;
  }

  createUtility() {
    this.notificationUtils.promptConfirmation().then(
      () => {
        this.notificationUtils.showMainLoading();
        this.utilityService.registerUtility({

          
        "month":this.utility.month.value,
        "electricityBill":this.utility.electricityBill.value,
        "waterBill":this.utility. waterBill.value,
        "others": this.utility.otherBills.value,

        }).subscribe(
          () => {
            this.utilityform.reset();
            this.router.navigateByUrl('/utility/view');
            this.notificationUtils.hideMainLoading();
            this.notificationUtils.showSuccessMessage('Utility registered.');
          },
          (error) => {
            this.notificationUtils.hideMainLoading();
            this.notificationUtils.showErrorMessage(
              'Error creating Utilities : ' + error.message
            );
          }
        );
      },
      () => {}
    );
  }
}