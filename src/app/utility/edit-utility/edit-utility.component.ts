import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilityService } from 'src/app/services/utility.service';
import { NotificationUtilsService } from 'src/app/utils/notification-utils.service';

@Component({
  selector: 'app-edit-utility',
  templateUrl: './edit-utility.component.html',
  styleUrls: ['./edit-utility.component.scss']
})
// export class EditUtilityComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

export class EditUtilityComponent implements OnInit {
  utilityform: FormGroup;
  utilityId:String;

  constructor(
    private utilityService: UtilityService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private notificationUtils: NotificationUtilsService
  ) {
    this. utilityId = this.route.snapshot.queryParamMap.get('utilityId');
  }

  ngOnInit(): void {
    this.utilityform = this.formBuilder.group({
     month: [null, [Validators.required]],
      waterBill: [null, [Validators.required]],
      electricityBill: [null, [Validators.required]],
      otherBills: [null,]
      
    });
    this.loadItemData();
  }

  get utility() {
    return this.utilityform.controls;
  }
  updateUtility() {
    this.notificationUtils.promptConfirmation().then(
      () => {
        this.notificationUtils.showMainLoading();
        // this.authService.editUser(this.userId, this.userForm.value).subscribe(
          this.utilityService.editUtility(this.utilityId,  {
             
        "month": this.utility.month.value,
        "electricityBill": this.utility.electricityBill.value,
        "waterBill": this.utility.waterBill.value,
        "others": this.utility.otherBills.value,
       
               
             }).subscribe(
          () => {
            this.notificationUtils.hideMainLoading();
            this.router.navigateByUrl('/utility/view');
            this.notificationUtils.showSuccessMessage('utility updated.');
          },
          (error) => {
            this.notificationUtils.hideMainLoading();
            this.notificationUtils.showErrorMessage(
              'Error updating utility : ' + error.message
            );
          }
        );
      },
      () => {}
    );
  }

  loadItemData() {
    this.notificationUtils.showMainLoading();
    this.utilityService.getUtilityById(this. utilityId).subscribe(
      (data) => {
        this.notificationUtils.hideMainLoading();
        this.utilityform.patchValue({

          month: data.month,
          electricityBill:data. electricityBill,
          waterBill: data.waterBill,
          otherBills: data.others,
              
         
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
