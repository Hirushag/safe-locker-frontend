import { Component, OnInit, ElementRef, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { NotificationUtilsService } from 'src/app/utils/notification-utils.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  private toggleButton: any;
  private sidebarVisible: boolean;
  private nativeElement: Node;
  public dataModel: FormGroup;

  constructor(
    private element: ElementRef,
    private notificationUtils: NotificationUtilsService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.nativeElement = element.nativeElement;
    this.sidebarVisible = false;
    this.dataModel = this.formBuilder.group({
      email: [
        null,
        Validators.pattern(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/),
      ],
      password: [null, [Validators.required, Validators.min(8)]],
    });
  }

  ngOnInit() {
    const navbar: HTMLElement = this.element.nativeElement;
    this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('login-page');
    body.classList.add('off-canvas-sidebar');
  }
  sidebarToggle() {
    const toggleButton = this.toggleButton;
    const body = document.getElementsByTagName('body')[0];
    const sidebar = document.getElementsByClassName('navbar-collapse')[0];
    if (this.sidebarVisible === false) {
      setTimeout(() => {
        toggleButton.classList.add('toggled');
      }, 500);
      body.classList.add('nav-open');
      this.sidebarVisible = true;
    } else {
      this.toggleButton.classList.remove('toggled');
      this.sidebarVisible = false;
      body.classList.remove('nav-open');
    }
  }
  ngOnDestroy() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('login-page');
    body.classList.remove('off-canvas-sidebar');
  }

  login() {
    this.notificationUtils.showMainLoading('Authenticating....');
    this.authService
      .attemptLogin({
        email: this.dataModel.get('email').value,
        password: this.dataModel.get('password').value,
      })
      .subscribe(
        (data) => {
          if (data.role === 'CUSTOMER') {
            sessionStorage.setItem('role', data.role);
            sessionStorage.setItem('customerId', data.userId);
            this.router.navigateByUrl('/reservation/reserve');
            this.notificationUtils.hideMainLoading();
            return;
          } else {
            sessionStorage.setItem('role', data.role);
            this.router.navigateByUrl('/dashboard/view');
            this.notificationUtils.hideMainLoading();
          }
        },
        () => {
          this.notificationUtils.showErrorMessage(
            'Invalid User Name OR Password'
          );
          this.notificationUtils.hideMainLoading();
        }
      );
  }
}
