import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SalaryService } from 'src/app/services/salary.service';
import { NotificationUtilsService } from 'src/app/utils/notification-utils.service';

@Component({
  selector: 'app-edit-salary',
  templateUrl: './edit-salary.component.html',
  styleUrls: ['./edit-salary.component.scss']
})
// export class EditSalaryComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

// }
export class EditSalaryComponent implements OnInit {
  salaryform: FormGroup;
  salaryId: String;

  constructor(
    private salaryService: SalaryService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private notificationUtils: NotificationUtilsService
  ) {
    this. salaryId = this.route.snapshot.queryParamMap.get('salaryId');
  }

  ngOnInit(): void {
    this.salaryform = this.formBuilder.group({
      payDate: [null, [Validators.required]],
      employeeId: [null, [Validators.required]],
      basicSalary: [null, [Validators.required]],
      salaryAdvance: [null, [Validators.required]],
      paymentType: [null,],
    //  netPayment: [null,]
      
    });
    this.loadSalaryData();
  }

  get salary() {
    return this.salaryform.controls;
  }

  updateSalary() {
    this.notificationUtils.promptConfirmation().then(
      () => {
        this.notificationUtils.showMainLoading();
          this.salaryService.editSalary(this.salaryId,  
            {
      
        "payDate":this.salary. payDate.value,
        "employeeId": this.salary. employeeId.value,
        "basicSalary": this.salary. basicSalary.value,
        "salaryAdvance":this.salary. salaryAdvance.value,
        "paymentType":this.salary.  paymentType.value,
      //  "netPayment": this.salary. netPayment.value,
      
          
          }).subscribe(
          () => {
            this.notificationUtils.hideMainLoading();
            this.router.navigateByUrl('/salary/view');
            this.notificationUtils.showSuccessMessage('salary updated.');
          },
          (error) => {
            this.notificationUtils.hideMainLoading();
            this.notificationUtils.showErrorMessage(
              'Error updating salary : ' + error.message
            );
          }
        );
      },
      () => {}
    );
  }

  loadSalaryData() {
    console.log(this.salaryId);
    this.notificationUtils.showMainLoading();
    this.salaryService.getSalaryById(this.salaryId).subscribe(
      (data) => {
        this.notificationUtils.hideMainLoading();
        this.salaryform.patchValue({
         
        payDate: data.payDate,
        employeeId: data.employeeId,
        basicSalary:data.basicSalary,
        salaryAdvance:data.salaryAdvance,
        paymentType:data. paymentType,
        netPayment:data.netPayment.value,
         
        });
      },
      (error) => {
        this.notificationUtils.hideMainLoading();
        this.notificationUtils.showErrorMessage(
          'Error loading salary : ' + error.message
        );
      }
    );
  }
}