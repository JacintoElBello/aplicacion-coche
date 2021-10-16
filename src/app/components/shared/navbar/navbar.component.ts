import { RutasService } from 'src/app/services/rutas.service';
import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';




@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {


  constructor(
    private router: Router,
    public auth: UserService,
    public userService: UserService,
    public rutasService: RutasService) {  }

   ngOnInit(): void {

  }
  // tslint:disable-next-line:typedef
  buscarRuta(termino: string){
  // console.log(termino);
   this.router.navigate(['/buscador', termino]);

  }

  logout(){
    this.auth.logout();
    localStorage.clear();
    this.rutasService.params.origenProvincia = '';
    this.rutasService.params.origenLocalidad = '';
    this.rutasService.params.destinoProvincia = '';
    this.rutasService.params.destinoLocalidad = '';
    this.rutasService.params.destinoCentro = '';
    this.rutasService.params.tienesCoche = '';
    this.rutasService.params.sinCoche = '';
  }

  clearSearch(){

    this.rutasService.params.origenProvincia = '';
    this.rutasService.params.origenLocalidad = '';
    this.rutasService.params.destinoProvincia = '';
    this.rutasService.params.destinoLocalidad = '';
    this.rutasService.params.destinoCentro = '';
    this.rutasService.params.tienesCoche = '';
    this.rutasService.params.sinCoche = '';

  }
}
