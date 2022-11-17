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
  ShowOtpField: boolean = false;
  otp: any;
  user: string;

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
      username: [
        null, [Validators.required]
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


  OTPRequest() {
    this.authService.OTPRequest().subscribe(data => {
      console.log(data);

      if(data.isSuccess == true){
        this.ShowOtpField = true;
      }
    });
  }

  login() {

    const val = this.dataModel.value;
    const body = new URLSearchParams();
    body.set('username', val.username);
    body.set('password', val.password);
    this.notificationUtils.showMainLoading('Authenticating....');
    this.authService
      .attemptLogin(body.toString())
      .subscribe(
        (data) => {

          console.log(data);
          if (data) {
            sessionStorage.removeItem('accessToken');
            sessionStorage.setItem('accessToken', data.accessToken);
            this.notificationUtils.hideMainLoading();
            this.OTPRequest();

            return;
          } else {
            this.notificationUtils.showErrorMessage(
              'Invalid User Name OR Password'
            );
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

  submitOtp() {
    console.log(this.otp);
    this.notificationUtils.showMainLoading('Authenticating....');
    this.authService.OTPSubmit(this.otp).subscribe(data => {

      console.log(data);
      // tslint:disable-next-line:triple-equals
      if (data.isSuccess == true) {

        sessionStorage.removeItem('user');
        this.user =  JSON.stringify(data.dataBundle);
        sessionStorage.setItem('user', this.user);
        this.notificationUtils.hideMainLoading();
        this.notificationUtils.showSuccessMessage('Login Success !!!');
        // @ts-ignore
        this.router.navigateByUrl('/user/view');

      }

    });


  }
}
