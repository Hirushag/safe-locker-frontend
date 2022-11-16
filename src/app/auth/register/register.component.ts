import { Component, OnInit, OnDestroy } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { NotificationUtilsService } from 'src/app/utils/notification-utils.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {
  registrationForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private notificationUtils: NotificationUtilsService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('register-page');
    body.classList.add('off-canvas-sidebar');

    this.registrationForm = this.formBuilder.group({
      firstName: [
        null,
        [
          Validators.required,
          Validators.minLength(2),
          Validators.pattern(/^[a-zA-Z\s]+$/)
        ]
      ],
      lastName: [
        null,
        [
          Validators.required,
          Validators.minLength(2),
          Validators.pattern(/^[a-zA-Z\s]+$/)
        ]
      ],
      email: [
        null,
        [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$')
        ]
      ],
      password: [null, [Validators.required, Validators.minLength(8)]],
      confirmPassword: [null, [Validators.required, Validators.minLength(8)]],
      addressLine1: [null, [Validators.required, Validators.maxLength(50)]],
      addressLine2: [null, [Validators.required, Validators.maxLength(50)]],
     // addressLine3: [null, [Validators.maxLength(50)]],
      agreement: [null, [Validators.required, Validators.pattern('true')]],
     // role: [null, [Validators.required]],
      countryCode: [null, [Validators.required]],
      country: [null, [Validators.required, Validators.max(30)]],
      contact: [null, [Validators.required, Validators.pattern(/^[0-9]{10}$/)]]
    });
  }

  get registration() {
    return this.registrationForm.controls;
  }

  ngOnDestroy() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('register-page');
    body.classList.remove('off-canvas-sidebar');
  }

  register() {
    this.notificationUtils
      .promptConfirmation('This will create your account.')
      .then(
        data => {
          this.notificationUtils.showMainLoading('Creating user....');
          this.authService
            .registerUser({
              email: this.registration.email.value,
              firstName: this.registration.firstName.value,
              lastName: this.registration.lastName.value,
              address1: this.registration.addressLine1.value,
              address2: this.registration.addressLine2.value,
              country: this.registration.country.value,
              role: "CUSTOMER",
              countryCode: this.registration.countryCode.value,
              contact: this.registration.contact.value,
              password: this.registration.password.value

            })
            .subscribe(
              () => {
                this.notificationUtils.showSuccessMessage(
                  'Registration completed please login.'
                );
                this.router.navigateByUrl('/login');
                this.notificationUtils.hideMainLoading();
              },
              error => {
                this.notificationUtils.showErrorMessage(error.message);
                this.notificationUtils.hideMainLoading();
              }
            );
        },
        () => {}
      );
  }
}
