import { Component, OnInit } from '@angular/core';
import { RoomService } from 'src/app/services/room.service';
import { NotificationUtilsService } from 'src/app/utils/notification-utils.service';
import * as moment from 'moment';
import { ReservationService } from 'src/app/services/reservation.service';

@Component({
  selector: 'app-book-reservation',
  templateUrl: './book-reservation.component.html',
  styleUrls: ['./book-reservation.component.scss'],
})
export class BookReservationComponent implements OnInit {
  checkin: string;
  checkOut: string;
  roomList = [];
  constructor(
    private roomService: RoomService,
    private notification: NotificationUtilsService,
    private reservationService: ReservationService
  ) {}

  ngOnInit(): void {}

  searchAvailableRooms() {
    if (!this.checkOut) {
      this.notification.showErrorMessage('Checkout Not Selected.');
      return;
    }
    if (!this.checkin) {
      this.notification.showErrorMessage('Check in Not Selected.');
      return;
    }
    if (!(this.checkOut > this.checkin)) {
      this.notification.showErrorMessage(
        'Checkout cannot be smaller than check in.'
      );
      return;
    }
    if (!(new Date(this.checkin) > new Date())) {
      this.notification.showErrorMessage(
        'Check in date should be far from today dateq.'
      );
      return;
    }
    this.roomList = [];
    this.notification.showMainLoading();
    this.roomService
      .getAvailableRooms(
        moment(this.checkin).format('YYYY-MM-DD'),
        moment(this.checkOut).format('YYYY-MM-DD')
      )
      .subscribe(
        (data) => {
          this.roomList = data;
          this.notification.hideMainLoading();
        },
        (error) => {
          this.notification.hideMainLoading();
        }
      );
  }

  bookRoom(roomData) {
    this.notification.promptConfirmation('This will confirm booking.').then(
      () => {
        this.notification.showMainLoading();
        this.reservationService
          .createReservation({
            checkIN: moment(this.checkin).format('YYYY-MM-DD'),
            checkOut: moment(this.checkOut).format('YYYY-MM-DD'),
            children: roomData.children,
            adults: roomData.adults,
            roomId: roomData.roomId,
            customerId: sessionStorage.getItem('customerId'),
          })
          .subscribe(
            (data) => {
              this.notification.showSuccessMessage('Reservation Confirmed.');
              this.notification.hideMainLoading();
              this.searchAvailableRooms();
            },
            (error) => {
              this.notification.hideMainLoading();
              this.notification.showErrorMessage(
                'Error Creating reservation : ' + error.message
              );
            }
          );
      },
      () => {}
    );
  }
}
