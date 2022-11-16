import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,Validator, Validators} from '@angular/forms';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  constructor() { }

  form = new FormGroup({

    Username: new FormControl('',Validators.required),
    Password: new FormControl('',Validators.required)
  });

  get username(){

    return this.form.get('Username');
  }

  ngOnInit(): void {

  }

}
