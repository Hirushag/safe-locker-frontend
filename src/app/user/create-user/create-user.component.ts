import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationUtilsService } from 'src/app/utils/notification-utils.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss'],
})
export class CreateUserComponent implements OnInit {
  userForm: FormGroup;
  userRoles = ['ADMIN', 'CUSTOMER'];

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private notificationUtils: NotificationUtilsService
  ) {}

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      first_name: [null, [Validators.required]],
      last_name: [null, [Validators.required]],
      address1: [null],
      address2: [null],
      password: [0],
      role: [null, [Validators.required]],
      country: [null, [Validators.required]],
      countryCode: [null, [Validators.required]],
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

  get user() {
    return this.userForm.controls;
  }

  createUser() {
    this.notificationUtils.promptConfirmation().then(
      () => {
        this.notificationUtils.showMainLoading();
        this.authService
          .registerUser({
            firstName: this.user.first_name.value,
            lastName: this.user.last_name.value,
            email: this.user.email.value,
            password: this.user.password.value,
            address1: this.user.address1.value,
            address2: this.user.address2.value,
            country: this.user.country.value,
            role: this.user.role.value,
            countryCode: this.user.countryCode.value,
            contact: this.user.contact.value,
          })
          .subscribe(
            () => {
              this.userForm.reset();
              this.router.navigateByUrl('/user/view');
              this.notificationUtils.hideMainLoading();
              this.notificationUtils.showSuccessMessage('User registered.');
            },
            (error) => {
              this.notificationUtils.hideMainLoading();
              this.notificationUtils.showErrorMessage(
                'Error creating user : ' + error.message
              );
            }
          );
      },
      () => {}
    );
  }
}
