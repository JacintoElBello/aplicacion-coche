

import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserService } from './../../services/user.service';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent implements OnInit {
  email;
  showMessage = false;

  constructor(public userService: UserService, private router: Router) {}

  ngOnInit(): void {}

  checkMessage(){

    if (this.showMessage === false){
      this.showMessage = true;
      alert('dfff');
    }


  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
    }

    this.userService.resetPasswordEmail(this.email).subscribe(
      (res: any) => {

      },
      (error) => {

      },
      () => {
       this.showMessage = true;
       this.checkMessage();

      }
    );
  }
}
