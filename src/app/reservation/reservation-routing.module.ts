import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookReservationComponent } from './book-reservation/book-reservation.component';
import { ViewReservationComponent } from './view-reservation/view-reservation.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', redirectTo: 'view' },
      {
        path: 'reserve',
        component: BookReservationComponent,
      },
      {
        path: 'view',
        component: ViewReservationComponent,
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReservationRoutingModule {}
