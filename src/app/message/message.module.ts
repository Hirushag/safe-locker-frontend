import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessageRoutingModule } from './message-routing.module';
import { CreateMessageComponent } from './create-message/create-message.component';
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [CreateMessageComponent],
  imports: [
    CommonModule,
    MessageRoutingModule,
    FormsModule
  ]
})
export class MessageModule { }
