import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationUtilsService } from 'src/app/utils/notification-utils.service';
import { SupplierService } from 'src/app/services/supplier.service';

@Component({
  selector: 'app-create-supplier',
  templateUrl: './create-supplier.component.html',
  styleUrls: ['./create-supplier.component.scss']
})
export class CreateSupplierComponent implements OnInit {
  supplierForm: FormGroup;

  constructor(
    private supplierService: SupplierService,
    private formBuilder: FormBuilder,
    private router: Router,
    private notificationUtils: NotificationUtilsService
  ) {}

  ngOnInit(): void {
    this.supplierForm = this.formBuilder.group({
     
      first_name: [null, [Validators.required]],
      last_name: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      city: [null],
      contact: [
        null,
        [
          Validators.required,
          Validators.maxLength(10),
          Validators.minLength(10),
        ],
      ],
    });
  }

  get supplier() {
    return this.supplierForm.controls;
  }

  createSupplier() {
    this.notificationUtils.promptConfirmation().then(
      () => {
        this.notificationUtils.showMainLoading();
        this.supplierService.registerSupplier({
          "firstName": this.supplier.first_name.value,
          "lastName": this.supplier.last_name.value,
          "email": this.supplier.email.value,
          "city": this.supplier.city.value,
          "contact":this.supplier.contact.value,
        }).subscribe(
          () => {
            this.supplierForm.reset();
            this.router.navigateByUrl('/supplier/view');
            this.notificationUtils.hideMainLoading();
            this.notificationUtils.showSuccessMessage('Supplier registered.');
          },
          (error) => {
            this.notificationUtils.hideMainLoading();
            this.notificationUtils.showErrorMessage(
              'Error creating Supplier : ' + error.message
            );
          }
        );
      },
      () => {}
    );
  }
}

