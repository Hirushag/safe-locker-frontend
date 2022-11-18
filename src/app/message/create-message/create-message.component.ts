import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-create-message',
  templateUrl: './create-message.component.html',
  styleUrls: ['./create-message.component.scss']
})
export class CreateMessageComponent implements OnInit {

  message: any;
  user: any;
  accessToken: any;

  constructor(private userService: UserService) {
    this.user = JSON.parse(sessionStorage.getItem('user'));
    this.accessToken = sessionStorage.getItem('accessToken');
  }

  ngOnInit(): void {
  }

  submitMessage() {

    const message = {
      message : this.message
    };

    console.log(message);

    this.userService.submitMessage(message, this.user.username)
      .subscribe(data => {
        console.log(data);
      });

  }
}
