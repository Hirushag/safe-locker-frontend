import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomService } from 'src/app/services/room.service';
import { NotificationUtilsService } from 'src/app/utils/notification-utils.service';

@Component({
  selector: 'app-edit-room',
  templateUrl: './edit-room.component.html',
  styleUrls: ['./edit-room.component.scss']
})
// export class EditRoomComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }
// }
export class EditRoomComponent implements OnInit {
  roomform: FormGroup;
    roomId: String
  

  constructor(
    private roomService: RoomService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private notificationUtils: NotificationUtilsService
  ) {

    this.roomId = this.route.snapshot.queryParamMap.get('roomId');
  }

  ngOnInit(): void {
    this.roomform = this.formBuilder.group({
     // roomId: [null, [Validators.required]],
      roomName: [null, [Validators.required,
                       Validators.minLength(2),
                       Validators.pattern(/^[a-zA-Z\s]+$/)]],
      roomType: [null, [Validators.required]],
      price:[null,],
      roomChildren: [null,],
      roomAdults: [null,],
      roomDescription: [null,]
      
    });
    this.loadRoomData();
  }

  get room() {
    return this.roomform.controls;
  }

  updateRoom() {
    this.notificationUtils.promptConfirmation().then(
      () => {
        this.notificationUtils.showMainLoading();
        // this.authService.editUser(this.userId, this.userForm.value).subscribe(
          this.roomService.editRoom(this.roomId,  
            {"roomName": this.room.roomName.value,
            "roomType":this.room.roomType.value,
            "price":this.room.price.value,
            "children":this.room.roomChildren.value,
            "adults":this.room.roomAdults.value,
            "description":this.room.roomDescription.value,

          }).subscribe(
          () => {
            this.notificationUtils.hideMainLoading();
            this.router.navigateByUrl('/rooms/view');
            this.notificationUtils.showSuccessMessage('Room updated.');
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

  loadRoomData() {
    console.log(this.roomId);
    this.notificationUtils.showMainLoading();
    this.roomService.getRoomById(this.roomId).subscribe(
      (data) => {
        this.notificationUtils.hideMainLoading();
        this.roomform.patchValue({
         
          roomName: data.roomName,
          roomType: data.roomType,
          price:data.price,
          roomChildren:data.children,
          roomAdults:data.adults,
          roomDescription:data.description,
         
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
