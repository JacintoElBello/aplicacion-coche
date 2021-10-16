import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  showAlerts;
  alertaTxt;
  alertas;

  constructor(
    private userService: UserService,
  ) { }


  checkAlerts() {

    if (this.userService.usuarioLogged.alertas) {
      this.showAlerts = true;
      this.alertas = this.userService.usuarioLogged.alertas;


    }

  }

  deleteAlert(alerta){

    if (this.userService.usuarioLogged.alertas.lenght < 1){
      this.showAlerts = false;
    }

    this.alertas = this.userService.usuarioLogged.alertas;
    let index = this.alertas.indexOf(alerta);
    this.alertas.splice(index, 1);
    this.userService.editUser(this.userService.usuarioLogged).subscribe((res: any) => {

    });

  }

ngOnInit(): void {
  if ( this.userService.usuarioLogged){
  this.checkAlerts();
  }
}

}
