import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoomsRoutingModule } from './rooms-routing.module';
import { ViewRoomsComponent } from './view-room/view-room.component';
import { CreateRoomComponent } from './create-room/create-room.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { EditRoomComponent } from './edit-room/edit-room.component';


@NgModule({
  declarations: [ViewRoomsComponent, CreateRoomComponent,EditRoomComponent],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MaterialModule,
    FormsModule,
    RoomsRoutingModule
  ]
})
export class RoomsModule { }
