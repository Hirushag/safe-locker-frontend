import { Component, OnInit, ElementRef } from '@angular/core';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  private toggleButton: any;
  private sidebarVisible: boolean;
  mobileMenuVisibility: any = 0;
  private routerSubscription: Subscription;

  constructor(private router: Router, private element: ElementRef) {
    this.sidebarVisible = false;
  }
  ngOnInit() {
    const navbar: HTMLElement = this.element.nativeElement;

    this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];
    this.routerSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.sidebarClose();
        const $layer = document.getElementsByClassName('close-layer')[0];
        if ($layer) {
          $layer.remove();
        }
      });
  }
  sidebarOpen() {
    const $toggle = document.getElementsByClassName('navbar-toggler')[0];
    const toggleButton = this.toggleButton;
    const body = document.getElementsByTagName('body')[0];
    setTimeout(() => {
      toggleButton.classList.add('toggled');
    }, 500);
    body.classList.add('nav-open');
    setTimeout(() => {
      $toggle.classList.add('toggled');
    }, 430);

    const $layer = document.createElement('div');
    $layer.setAttribute('class', 'close-layer');

    if (body.querySelectorAll('.wrapper-full-page')) {
      document
        .getElementsByClassName('wrapper-full-page')[0]
        .appendChild($layer);
    } else if (body.classList.contains('off-canvas-sidebar')) {
      document
        .getElementsByClassName('wrapper-full-page')[0]
        .appendChild($layer);
    }

    setTimeout(() => {
      $layer.classList.add('visible');
    }, 100);

    $layer.onclick = function() {
      // assign a function
      body.classList.remove('nav-open');
      this.mobileMenuVisibility = 0;
      this.sidebarVisible = false;

      $layer.classList.remove('visible');
      setTimeout(() => {
        $layer.remove();
        $toggle.classList.remove('toggled');
      }, 400);
    }.bind(this);

    body.classList.add('nav-open');
    this.mobileMenuVisibility = 1;
    this.sidebarVisible = true;
  }
  sidebarClose() {
    const $toggle = document.getElementsByClassName('navbar-toggler')[0];
    const body = document.getElementsByTagName('body')[0];
    this.toggleButton.classList.remove('toggled');
    const $layer = document.createElement('div');
    $layer.setAttribute('class', 'close-layer');

    this.sidebarVisible = false;
    body.classList.remove('nav-open');
    // $('html').removeClass('nav-open');
    body.classList.remove('nav-open');
    if ($layer) {
      $layer.remove();
    }

    setTimeout(() => {
      $toggle.classList.remove('toggled');
    }, 400);

    this.mobileMenuVisibility = 0;
  }
  sidebarToggle() {
    if (this.sidebarVisible === false) {
      this.sidebarOpen();
    } else {
      this.sidebarClose();
    }
  }
}
