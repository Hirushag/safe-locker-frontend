import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReservationRoutingModule } from './reservation-routing.module';
import { ViewReservationComponent } from './view-reservation/view-reservation.component';
import { BookReservationComponent } from './book-reservation/book-reservation.component';
import { MaterialModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ViewReservationComponent, BookReservationComponent],
  imports: [
    CommonModule,
    ReservationRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class ReservationModule {}
