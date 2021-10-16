import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-recuperar-password',
  templateUrl: './recuperar-password.component.html',
  styleUrls: ['./recuperar-password.component.css']
})
export class RecuperarPasswordComponent implements OnInit {
  usuario = {};
  url = this.router.url;
  verified = false;
  password;
  confirmPassword;
  passwordOk;

  constructor(public userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.checkUser();
  }

  checkPassword() {
    if (this.password === this.confirmPassword) {
      this.passwordOk = true;
    } else {
      this.passwordOk = false;
    }
  }

  checkUser() {

    this.url = this.url.replace('/recuperar-password/', '');
    this.userService.getUserToken(this.url).subscribe((res: any) => {

      if (res.usuario.length === 0) {

      } else {
        this.verified = true;
        this.usuario = res.usuario;
      }
    });

  }
  onSubmit(form: NgForm) {


    if (form.invalid) {

    }

    // this.usuario.password = this.password;

    this.userService.editUser(this.usuario).subscribe((res: any) => {

    });



  }

}
