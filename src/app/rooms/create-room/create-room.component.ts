import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { NotificationUtilsService } from 'src/app/utils/notification-utils.service';
import { RoomService } from 'src/app/services/room.service';

@Component({
  selector: 'app-create-room',
  templateUrl: './create-room.component.html',
  styleUrls: ['./create-room.component.scss']
})

export class CreateRoomComponent implements OnInit {
  roomform: FormGroup;

  constructor(
    private roomService: RoomService,
    private formBuilder: FormBuilder,
    private router: Router,
    private notificationUtils: NotificationUtilsService
  ) { }

  ngOnInit(): void {
    this.roomform = this.formBuilder.group({
      // roomId: [null, [Validators.required]],
      roomName: [null, [Validators.required]],
      roomType: [null, [Validators.required]],
      price:[null,[Validators.required,]],
      roomChildren: [null,],
      roomAdults: [null,],
      roomDescription: [null,]

    });
  }

  get room() {
    return this.roomform.controls;
  }

  createRoom() {
    this.notificationUtils.promptConfirmation().then(
      () => {
        this.notificationUtils.showMainLoading();
        this.roomService.registerRoom({
          "roomName": this.room.roomName.value,
          "roomType": this.room.roomType.value,
          "price": this.room.price.value,
          "children": this.room.roomChildren.value,
          "adults": this.room.roomAdults.value,
          "description": this.room.roomDescription.value,
        }).subscribe(
          () => {
            this.roomform.reset();
            this.router.navigateByUrl('/rooms/view');
            this.notificationUtils.hideMainLoading();
            this.notificationUtils.showSuccessMessage('Room registered.');
          },
          (error) => {
            this.notificationUtils.hideMainLoading();
            this.notificationUtils.showErrorMessage(
              'Error creating Room : ' + error.message
            );
          }
        );
      },
      () => { }
    );
  }
}