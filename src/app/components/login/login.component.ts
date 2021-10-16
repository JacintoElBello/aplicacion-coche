import { UsuarioModel } from './../../models/user.model';
import { Router } from '@angular/router';
import { UserService } from './../../services/user.service';
import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { EmailValidator, NgForm } from '@angular/forms';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  user: UsuarioModel;
  showErrorMessage;
  token;


  private timerHandle: number = null;



  constructor(public userService: UserService, private router: Router) {}

  ngOnInit(): void {

    this.user = new UsuarioModel();


  }

  onSubmit( form: NgForm){


    if ( form.invalid ) {
      // this.showErrorMessage = true;
      // return;
    }
    this.userService.login(this.user).subscribe((res: any) => {

        console.log(res);

        let token = JSON.stringify(res.token);
        this.token = token;
        res.usuario.token = res.token;
        const user = JSON.stringify(res.usuario);
        this.userService.editUser(res.usuario).subscribe(
          (res) => {
            //ya se ha guardado el token

            localStorage.setItem('usuario', user);
            localStorage.setItem('token', token);
            this.userService.usuarioLogged = JSON.parse(localStorage.getItem('usuario'));

            this.router.navigateByUrl('rutas');
            this.userService.usuarioLogged.token = token;
          }
        )
    },
    (error) => {
      this.showErrorMessage = true;
    },
    () => {

      this.userService.editUser( this.userService.usuarioLogged).subscribe((res: any) => {

      });

      this.userService.loggedIn = true;

    }

    );
  }

}
