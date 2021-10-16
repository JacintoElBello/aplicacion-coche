import { Router } from '@angular/router';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent implements OnInit {

  register2(myForm: NgForm) {


    this.userService.register(myForm.value).subscribe((res: any) => {

    });
  }

  constructor(public userService: UserService, private router: Router) {}

  ngOnInit(): void {}

  register() {
    this.userService.register(this.credentials).subscribe((res: any) => {

    });
  }


}
