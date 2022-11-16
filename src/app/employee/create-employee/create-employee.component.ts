import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { NotificationUtilsService } from 'src/app/utils/notification-utils.service';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.scss']
})

export class CreateEmployeeComponent implements OnInit {
  employeeForm: FormGroup;

  constructor(
    private employeeService: EmployeeService,
    private formBuilder: FormBuilder,
    private router: Router,
    private notificationUtils: NotificationUtilsService
  ) {}

  ngOnInit(): void {
    this.employeeForm = this.formBuilder.group({
      
      first_name: [null, [Validators.required]],
      last_name: [null, [Validators.required]],
      address1: [null],
      address2: [null],
      email: [null, [Validators.required, Validators.email]],
      city: [null],
      contact: [
        null,
        [
          Validators.required,
          Validators.maxLength(11),
          Validators.minLength(11),
        ],
      ],
    });
  }

  get employee() {
    return this.employeeForm.controls;
  }

  createEmployee() { console.log("im janith");
    this.notificationUtils.promptConfirmation().then(
      () => {
        this.notificationUtils.showMainLoading();
        this.employeeService.registerEmployee({

        "firstName": this.employee.first_name.value,
        "lastName": this.employee.last_name.value,
        "address1": this.employee.address1.value,
        "address2": this.employee.address2.value,
        "email": this.employee.email.value,
        "city": this.employee.city.value,
        "contact": this.employee.contact.value,
       

        }).subscribe(
          () => {
            this.employeeForm.reset();
            this.router.navigateByUrl('/employee/view');
            this.notificationUtils.hideMainLoading();
            this.notificationUtils.showSuccessMessage('Employee registered.');
          },
          (error) => {
            this.notificationUtils.hideMainLoading();
            this.notificationUtils.showErrorMessage(
              'Error creating employee : ' + error.message
            );
          }
        );
      },
      () => {}
    );
  }
}
