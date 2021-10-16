import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from './../../models/user.model';
import { Router } from '@angular/router';
import { UserService } from './../../services/user.service';
import { EmailValidator, NgForm } from '@angular/forms';

@Component({
  selector: 'app-reset-pass',
  templateUrl: './reset-pass.component.html',
  styleUrls: ['./reset-pass.component.css']
})
export class ResetPassComponent implements OnInit {
  email: string;
  constructor(public userService: UserService, private router: Router) { }

  ngOnInit(): void {

  }
  onSubmit(form: NgForm) {
    if (form.invalid) {
    }

    this.userService.resetPasswordEmail(this.email).subscribe(
      (res: any) => {

      },
      (error) => {
        alert('erro');
      },
      () => {
        alert('ok');
      }
    );
  }
}
