import { Component, OnInit } from '@angular/core';
import PerfectScrollbar from 'perfect-scrollbar';

declare const $: any;

// Metadata
export interface RouteInfo {
  path: string;
  title: string;
  type: string;
  icontype: string;
  collapse?: string;
  children?: ChildrenItems[];
}

export interface ChildrenItems {
  path: string;
  title: string;
  ab: string;
  type?: string;
  active: boolean;
}

// Menu Items
export const ROUTES: RouteInfo[] = [


  {
    path: '/dashboard/',
    title: 'Dashboard',
    type: 'link',
    icontype: 'dashboard',
    collapse: 'dashboard',
   
  },
  
  {
    path: '/user',
    title: 'Users',
    type: 'sub',
    icontype: 'person',
    collapse: 'user',
    children: [
      { path: 'view', title: 'View Users', ab: 'VU', active: true },
      { path: 'create', title: 'Create Users', ab: 'CU', active: true },
      { path: 'edit', title: 'Edit Users', ab: 'EU', active: false },
    ],
  },
  {
    path: '/reservation',
    title: 'Reservation',
    type: 'sub',
    icontype: 'devices_other',
    collapse: 'reservation',
    children: [
      { path: 'view', title: 'View reservation', ab: 'VR', active: true },
      { path: 'create', title: 'Create reservation', ab: 'CR', active: true },
      { path: 'reserve', title: 'Reserve', ab: 'RR', active: true},
    ],
  },
  {
    path: '/rooms',
    title: 'Rooms',
    type: 'sub',
    icontype: 'room',
    collapse: 'room',
    children: [
      { path: 'view', title: 'View Room', ab: 'VR', active: true },
      { path: 'create', title: 'Create Room', ab: 'CR', active: true },
      { path: 'edit', title: 'Edit Rooms', ab: 'ER', active: false },
    ],
  },
  {
    path: '/employee',
    title: 'Employees',
    type: 'sub',
    icontype: 'supervised_user_circle',
    collapse: 'Employee',
    children: [
      { path: 'view', title: 'View Employees', ab: 'VU', active: true },
      { path: 'create', title: 'Create Employees', ab: 'CU', active: true },
      { path: 'edit', title: 'Edit Employees', ab: 'EU', active: false },
    ],
  },
  {
    path: '/payment',
    title: 'Payments',
    type: 'sub',
    icontype: 'payment',
    collapse: 'payment',
    children: [
      { path: 'view', title: 'View Payments', ab: 'VP', active: true },
      { path: 'create', title: 'Create Payments', ab: 'CP', active: true },
      { path: 'edit', title: 'Edit Payments', ab: 'EP', active: false },
    ],
  },
  {
    path: '/salary',
    title: 'Salaries',
    type: 'sub',
    icontype: 'polymer',
    collapse: 'salary',
    children: [
      { path: 'view', title: 'View Salaries', ab: 'VS', active: true },
      { path: 'create', title: 'Create Salaries', ab: 'CS', active: true },
      { path: 'edit', title: 'Edit Salaries', ab: 'ES', active: false },
    ],
  },
  {
    path: '/stock',
    title: 'Stocks',
    type: 'sub',
    icontype: 'source',
    collapse: 'stock',
    children: [
      { path: 'view', title: 'View Stocks', ab: 'VS', active: true },
      { path: 'create', title: 'Create Items', ab: 'CI', active: true },
      { path: 'edit', title: 'Edit Items', ab: 'EI', active: false },
    ],
  },
  {
    path: '/supplier',
    title: 'Suppliers',
    type: 'sub',
    icontype: 'person_search',
    collapse: 'supplier',
    children: [
      { path: 'view', title: 'View Suppliers', ab: 'VS', active: true },
      { path: 'create', title: 'Create Suppliers', ab: 'CS', active: true },
      { path: 'edit', title: 'Edit suppliers', ab: 'ES', active: false },
    ],
  },
  {
    path: '/utility',
    title: 'Utilities',
    type: 'sub',
    icontype: 'rss_feed',
    collapse: 'utility',
    children: [
      { path: 'view', title: 'View Utilities', ab: 'VU', active: true },
      { path: 'create', title: 'Create Utilities', ab: 'CU', active: true },
      { path: 'edit', title: 'Edit Utilities', ab: 'EU', active: false },
    ],
  },
  {
    path: '/expenses',
    title: 'Expenses',
    type: 'sub',
    icontype: 'euro_symbol',
    collapse: 'expenses',
    children: [
      { path: 'view', title: 'View Expenses', ab: 'VE', active: true },
      { path: 'create', title: 'Create Expenses', ab: 'CE', active: true },
      { path: 'edit', title: 'Edit Expenses', ab: 'EE', active: false },
    ],
  },
];

@Component({
  selector: 'app-sidebar-cmp',
  templateUrl: 'sidebar.component.html',
})
export class SidebarComponent implements OnInit {
  public menuItems: any[];
  ps: any;
  userName: any;

  constructor() {}

  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  }

  ngOnInit() {
    if (sessionStorage.getItem('role') === 'CUSTOMER') {
      this.menuItems = [
        {
          path: '/reservation',
          title: 'Reservation',
          type: 'sub',
          icontype: 'devices_other',
          collapse: 'reservation',
          children: [
            {
              path: 'reserve',
              title: 'reserve',
              ab: 'VR',
              active: true,
            },
            {
              path: 'create',
              title: 'Create reservation',
              ab: 'CR',
              active: false,
            },
            { path: 'edit', title: 'Edit reservation', ab: 'ER', active: false },
          ],
        },
      ];
    } else {
      this.menuItems = ROUTES.filter((menuItem) => menuItem);
    }
    if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
      const elemSidebar = <HTMLElement>(
        document.querySelector('.sidebar .sidebar-wrapper')
      );
      this.ps = new PerfectScrollbar(elemSidebar);
    }
  }

  updatePS(): void {
    if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
      this.ps.update();
    }
  }

  isMac(): boolean {
    let bool = false;
    if (
      navigator.platform.toUpperCase().indexOf('MAC') >= 0 ||
      navigator.platform.toUpperCase().indexOf('IPAD') >= 0
    ) {
      bool = true;
    }
    return bool;
  }
}
