import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {NotificationUtilsService} from 'src/app/utils/notification-utils.service';
import {Router} from '@angular/router';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss'],
})
export class CreateUserComponent implements OnInit {
  userForm: FormGroup;
  passwordError: boolean = false;
  showSuccess: boolean = false;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router,
    private notificationUtils: NotificationUtilsService
  ) {
  }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
      confirmPassword: [null],
    });
  }

  get user() {
    return this.userForm.controls;
  }

  checkPassword() {
    // tslint:disable-next-line:triple-equals
    if (this.user.password.value != this.user.confirmPassword.value) {
      this.passwordError = true;
      this.showSuccess = false;

    } else {
      this.passwordError = false;
      this.showSuccess = true;

    }
  }

  createUser() {
    this.checkPassword();

    this.notificationUtils.promptConfirmation().then(
      () => {
        this.notificationUtils.showMainLoading();
        this.userService
          .createUser({
            name: this.user.name.value,
            email: this.user.email.value,
            username: this.user.username.value,
            password: this.user.password.value,
            role: {
              id: 1
            }
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
      () => {
      }
    );
  }
}
