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
    path: '/upload-file',
    title: 'Upload Files',
    type: 'sub',
    icontype: 'source',
    collapse: 'upload-file',
    children: [
      { path: 'view', title: 'View Files', ab: 'VF', active: true },
      { path: 'create', title: 'Upload Files', ab: 'UF', active: true },
    ],
  },

  {
    path: '/message',
    title: 'Message',
    type: 'sub',
    icontype: 'source',
    collapse: 'message',
    children: [
      // { path: 'view', title: 'View Files', ab: 'VF', active: true },
      { path: 'create', title: 'Create Message', ab: 'CM', active: true },
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
  user: any;

  constructor() {}

  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  }

  ngOnInit() {
   this.user =  sessionStorage.getItem('user');
   console.log(this.user);
   this.user = JSON.parse(this.user);
   console.log(this.user);

   this.userName = this.user.role.name


    if (this.user.role.name === 'ADMIN') {
      this.menuItems = [
        {
          path: '/upload-file',
          title: 'Upload File',
          type: 'sub',
          icontype: 'devices_other',
          collapse: 'upload-file',
          children: [
            {
              path: 'view',
              title: 'View Uploaded File',
              ab: 'VR',
              active: true,
            },
            {
              path: 'create',
              title: 'Upload File',
              ab: 'CR',
              active: true,
            },
            // { path: 'edit', title: 'Edit reservation', ab: 'ER', active: false },
          ],
        },
        {
          path: '/user',
          title: 'Users',
          type: 'sub',
          icontype: 'devices_other',
          collapse: 'user',
          children: [
            {
              path: 'view',
              title: 'View Users',
              ab: 'VR',
              active: true,
            },
            {
              path: 'create',
              title: 'Create Users',
              ab: 'CR',
              active: true,
            },
            // { path: 'edit', title: 'Edit reservation', ab: 'ER', active: false },
          ],
        },
        {
          path: '/message',
          title: 'Message',
          type: 'sub',
          icontype: 'devices_other',
          collapse: 'message',
          children: [
            // {
            //   path: 'view',
            //   title: 'View Message',
            //   ab: 'VR',
            //   active: true,
            // },
            {
              path: 'create',
              title: 'Create Message',
              ab: 'CR',
              active: true,
            },
            // { path: 'edit', title: 'Edit reservation', ab: 'ER', active: false },
          ],
        },
      ];
    } else if(this.user.role.name === 'CLIENT') {

      this.menuItems = [
        {
          path: '/message',
          title: 'Message',
          type: 'sub',
          icontype: 'devices_other',
          collapse: 'message',
          children: [
            {
              path: 'view',
              title: 'View Message',
              ab: 'VR',
              active: true,
            },
            {
              path: 'create',
              title: 'Create Message',
              ab: 'CR',
              active: true,
            },
            // { path: 'edit', title: 'Edit reservation', ab: 'ER', active: false },
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
