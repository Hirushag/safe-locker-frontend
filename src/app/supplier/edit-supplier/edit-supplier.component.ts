import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SupplierService } from 'src/app/services/supplier.service';
import { NotificationUtilsService } from 'src/app/utils/notification-utils.service';

@Component({
  selector: 'app-edit-supplier',
  templateUrl: './edit-supplier.component.html',
  styleUrls: ['./edit-supplier.component.scss']
})
// export class EditSupplierComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

export class EditSupplierComponent implements OnInit {
  supplierForm: FormGroup;
  supplierId: String;

  constructor(
    private supplierService: SupplierService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private notificationUtils: NotificationUtilsService
  ) {
    this. supplierId = this.route.snapshot.queryParamMap.get('supplierId');
  }

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
    this.loadItemData();
  }

  get supplier() {
    return this.supplierForm.controls;
  }

  updateSupplier() {
    this.notificationUtils.promptConfirmation().then(
      () => {
        this.notificationUtils.showMainLoading();
        // this.authService.editUser(this.userId, this.userForm.value).subscribe(
          this.supplierService.editSupplier(this. supplierId,  {
           
            "firstName": this.supplier.first_name.value,
            "lastName": this.supplier.last_name.value,
            "email": this.supplier.email.value,
            "city": this.supplier.city.value,
            "contact": this.supplier.contact.value,
               
             }).subscribe(
          () => {
            this.notificationUtils.hideMainLoading();
            this.router.navigateByUrl('/supplier/view');
            this.notificationUtils.showSuccessMessage('supplier updated.');
          },
          (error) => {
            this.notificationUtils.hideMainLoading();
            this.notificationUtils.showErrorMessage(
              'Error updating supplier : ' + error.message
            );
          }
        );
      },
      () => {}
    );
  }

  loadItemData() {
    this.notificationUtils.showMainLoading();
    this.supplierService.getSupplierById(this. supplierId).subscribe(
      (data) => {
        this.notificationUtils.hideMainLoading();
        this.supplierForm.patchValue({

          first_name: data.firstName,
          last_name: data.lastName,
          email: data.email,
          city: data.city,
          contact: data.contact,
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
