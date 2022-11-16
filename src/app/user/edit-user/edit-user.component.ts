import { Component, OnInit } from '@angular/core';
import { NotificationUtilsService } from 'src/app/utils/notification-utils.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent implements OnInit {
  userForm: FormGroup;
  userId: string;
  passwordError: boolean = false;
  showSuccess: boolean = false;

  constructor(
    private userService: UserService,
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
      name: [null, [Validators.required]],
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
      confirmPassword: [null],
    });
    this.loadUserData();
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

  updateUser() {
    this.notificationUtils.promptConfirmation().then(
      () => {
        this.notificationUtils.showMainLoading();
        // this.authService.editUser(this.userId, this.userForm.value).subscribe(
        this.userService
          .editUser(this.userId, {
            name: this.user.name.value,
            email: this.user.email.value,
            username: this.user.username.value,
            password: this.user.password.value,
            role: {
              id: 1
            },

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
    this.userService.getUserById(this.userId).subscribe(
      (data) => {
        this.notificationUtils.hideMainLoading();
        this.userForm.patchValue({
          email: data.email,
          name: data.name,
          username: data.username,
          password: data.password,
          role: data.role,
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
