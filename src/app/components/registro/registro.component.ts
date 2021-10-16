import { UsuarioModel } from './../../models/user.model';
import { Router } from '@angular/router';
import { UserService } from './../../services/user.service';
import {
  Component,
  ComponentFactoryResolver,
  OnInit,
  OnChanges,
  SimpleChanges,
  ChangeDetectionStrategy,
} from '@angular/core';
import {
  EmailValidator,
  FormControl,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent implements OnInit {
  registroOk;
  usuarios;
  existeUsuario = false;
  existeEmail = false;
  tfnoValidate;
  confirmPassword;
  passwordOk;
  tfno;

  // getUser() {
  //   console.log(this.userService.getUserName());
  // }

  user: UsuarioModel;

  onKey(event: any) {
    // without type info

    this.checkUserLive(event.target.value);
  }
  onKeyMail(event: any) {
    // without type info

    this.checkMailLive(event.target.value);
  }
  constructor(public userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.user = new UsuarioModel();
    this.getUsers();
  }

  onSubmit(form: NgForm) {
    this.existeUsuario = false;
    this.checkValues();
    this.checkPassword();
    this.user.alertas = [];
    // if (this.user.tfno === null){alert('fjfjfjfjf')}else{this.user.tfno = null; alert(this.user.tfno) }

    if (form.invalid || this.passwordOk !== true) {
      this.registroOk = false;
      return;
    }

    this.userService.register(this.user).subscribe((res: any) => {
      if(res.success===true) {
        this.registroOk = true;
      }else {
        alert('COmprueba los datos; ' + res.message);
      }
    });
  }

  checkUserLive(user) {
    console.log(this.usuarios);

    for (let i = 0; i < this.usuarios.length; i++) {
      let usuario = this.usuarios[i].username;
      if (usuario === user) {
        this.existeUsuario = false;
      }

      /* check username*/
      // if (usuario.indexOf(user) >= 0) {

      //   console.log('ok');

      // }
    }
  }
  checkMailLive(userMail) {
    for (let i = 0; i < this.usuarios.length; i++) {
      let email = this.usuarios[i].email;
      if (email !== userMail) {
        this.existeEmail = false;

      }
    }
  }

  clickme(value) {
    if (value !== '') {
      if (/\d{9}/.test(value)) {
        this.tfnoValidate = true;
      } else {
        this.tfnoValidate = false;
        return false;
      }
    } else {
    }
  }

  checkPassword() {
    if (this.user.password === this.confirmPassword) {
      this.passwordOk = true;
    } else {
      this.passwordOk = false;
    }
  }
  getUsers() {
    this.userService.getUsers().subscribe((res: any) => {
      this.usuarios = res.users;
    });
  }
  checkValues() {
    for (let i = 0; i < this.usuarios.length; i++) {
      let usuario = this.usuarios[i].username;
      let email = this.usuarios[i].email;

      /* check username*/
      if (usuario.indexOf(this.user.username) >= 0) {
        this.existeUsuario = true;
      }

      /* check email*/
      if (email.indexOf(this.user.email) >= 0) {
        this.existeEmail = true;
      }

      /* check tfno*/
    }
    /**************************/
    //});
  }
}
