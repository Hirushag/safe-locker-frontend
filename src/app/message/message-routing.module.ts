import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CreateMessageComponent} from './create-message/create-message.component';


const routes: Routes = [
  {
    path: 'create',
    component: CreateMessageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MessageRoutingModule { }
