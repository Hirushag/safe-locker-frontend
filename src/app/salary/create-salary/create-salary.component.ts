import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { NotificationUtilsService } from 'src/app/utils/notification-utils.service';
import { SalaryService } from 'src/app/services/salary.service';

@Component({
  selector: 'app-create-salary',
  templateUrl: './create-salary.component.html',
  styleUrls: ['./create-salary.component.scss']
})

export class CreateSalaryComponent implements OnInit {
  salaryform: FormGroup;

  constructor(
    private salaryService: SalaryService,
    private formBuilder: FormBuilder,
    private router: Router,
    private notificationUtils: NotificationUtilsService
  ) {}

  ngOnInit(): void {
    this.salaryform = this.formBuilder.group({
      payDate: [null, [Validators.required]],
      employeeId: [null, [Validators.required]],
      basicSalary: [null, [Validators.required]],
      salaryAdvance: [null, [Validators.required]],
      paymentType: [null,],
      netPayment: [null,]
      
    });
  }

  get salary() {
    return this.salaryform.controls;
  }

  createSalary() {
    this.notificationUtils.promptConfirmation().then(
      () => {
        this.notificationUtils.showMainLoading();
        this.salaryService.registerSalary({

        
        "payDate": this.salary.payDate.value,
        "employeeId": this.salary.employeeId.value,
        "basicSalary": this.salary.basicSalary.value,
        "salaryAdvance": this.salary.salaryAdvance.value,
        "paymentType": this.salary.paymentType.value,
        "netPayment": this.salary.netPayment.value

        }).subscribe(
          () => {
            this.salaryform.reset();
            this.router.navigateByUrl('/salary/view');
            this.notificationUtils.hideMainLoading();
            this.notificationUtils.showSuccessMessage('Salary Created.');
          },
          (error) => {
            this.notificationUtils.hideMainLoading();
            this.notificationUtils.showErrorMessage(
              'Error creating Salary : ' + error.message
            );
          }
        );
      },
      () => {}
    );
  }
}