import { Component, OnInit } from '@angular/core';
import { NotificationUtilsService } from 'src/app/utils/notification-utils.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent implements OnInit {
  userForm: FormGroup;
  userId: string;
  userRoles = ['ADMIN', 'CUSTOMER'];

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private notificationUtils: NotificationUtilsService
  ) {
    this.userId = this.route.snapshot.queryParamMap.get('userId');
  }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      first_name: [null, [Validators.required]],
      last_name: [null, [Validators.required]],
      address1: [null],
      address2: [null],
      // address3: [null],
      password: [0],
      country: [null, [Validators.required]],
      countryCode: [null, [Validators.required]],
      role: [null, [Validators.required]],
      contact: [
        null,
        [
          Validators.required,
          Validators.maxLength(10),
          Validators.minLength(10),
        ],
      ],
    });
    this.loadUserData();
  }

  get user() {
    return this.userForm.controls;
  }

  updateUser() {
    this.notificationUtils.promptConfirmation().then(
      () => {
        this.notificationUtils.showMainLoading();
        // this.authService.editUser(this.userId, this.userForm.value).subscribe(
        this.authService
          .editUser(this.userId, {
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
              this.notificationUtils.hideMainLoading();
              this.router.navigateByUrl('/user/view');
              this.notificationUtils.showSuccessMessage('User updated.');
            },
            (error) => {
              this.notificationUtils.hideMainLoading();
              this.notificationUtils.showErrorMessage(
                'Error updating employee : ' + error.message
              );
            }
          );
      },
      () => {}
    );
  }

  loadUserData() {
    this.notificationUtils.showMainLoading();
    this.authService.getUserById(this.userId).subscribe(
      (data) => {
        this.notificationUtils.hideMainLoading();
        this.userForm.patchValue({
          email: data.email,
          first_name: data.firstName,
          last_name: data.lastName,
          address1: data.address1,
          address2: data.address2,
          password: data.password,
          country: data.country,
          role: data.role,
          countryCode: data.countryCode,
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
