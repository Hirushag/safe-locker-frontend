import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import moment = require('moment');
import { AuthService } from '../services/auth.service';
import { NotificationUtilsService } from '../utils/notification-utils.service';
declare const $: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(
    private notificationUtils: NotificationUtilsService,
    private authService: AuthService,
  ) {}
  worldMapData: any = {};
  totalCustomers = 0;
  totalReservations = 0;

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData() {
    this.notificationUtils.showMainLoading();
    this.authService.getUsersByRole().subscribe(
      (data) => {
        const userData = [];
        let total = 0;

        data.forEach((user) => {
          if (user.role === 'CUSTOMER') {
            let isFound = false;
            for (const selectedUser of userData) {
              if (selectedUser.countryCode === user.countryCode) {
                selectedUser.total += 1;
                total += 1;
                isFound = true;
              }
            }
            if (!isFound) {
              userData.push({
                countryCode: user.countryCode,
                country: user.country,
                total: 1,
                percentage: user.countryCode,
              });
              total += 1;
            }
          }
        });

        userData.forEach((user) => {
          user.percentage = ((user.total / total) * 100).toFixed(2) + '%';
        });

        const labels = [];
        const labelData = [];
        userData.forEach((user) => {
          labels.push(user.countryCode);
          labelData.push(user.total);
        });
        this.createBarChart('websiteViewsChart', labels, labelData);
        this.createMap(userData);
        this.totalCustomers = total;
        this.notificationUtils.hideMainLoading();
      },
      (error) => {
        this.notificationUtils.showErrorMessage(error.message);
        this.notificationUtils.hideMainLoading();
      }
    );
  }


  createMap(data) {
    console.log(data);
    this.worldMapData = {
      dataRows: data,
    };

    $('#worldMap').vectorMap({
      map: 'world_en',
      backgroundColor: 'transparent',
      borderColor: '#818181',
      borderOpacity: 0.25,
      borderWidth: 1,
      color: '#b3b3b3',
      enableZoom: true,
      hoverColor: '#eee',
      hoverOpacity: null,
      normalizeFunction: 'linear',
      scaleColors: ['#b6d6ff', '#005ace'],
      selectedColor: '#c9dfaf',
      selectedRegions: null,
      showTooltip: true,
    });
  }

  createBarChart(chartID, labelSet, series) {
    const dataWebsiteViewsChart = {
      labels: labelSet,
      series: [series],
    };
    const optionsWebsiteViewsChart = {
      axisX: {
        showGrid: false,
      },
      low: 0,
      high: 50,
      chartPadding: { top: 0, right: 5, bottom: 0, left: 0 },
    };
    const responsiveOptions: any = [
      [
        'screen and (max-width: 640px)',
        {
          seriesBarDistance: 5,
          axisX: {
            labelInterpolationFnc: (value) => {
              return value[0];
            },
          },
        },
      ],
    ];
    const websiteViewsChart = new Chartist.Bar(
      '#' + chartID,
      dataWebsiteViewsChart,
      optionsWebsiteViewsChart,
      responsiveOptions
    );
  }
}
