import { UserService } from './../../services/user.service';
import { CentrosService, Centro } from './../../services/centros.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RutasService, Ruta } from '../../services/rutas.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-rutas',
  templateUrl: './rutas.component.html',
  styleUrls: ['./rutas.component.css'],
})
export class RutasComponent implements OnInit {
  public rutas: Ruta[] = [];
  public centros: Centro[] = [];
  destino;
  sincoche;
  filtro = false;
  user;


  getRutas() {
    this.rutasService.getRutas().subscribe((res: any) => {
      this.rutas = res.rutas;
    });
  }


  getCentros() {
    this.centrosService.getCentros().subscribe((res: any) => {
      this.centros = res.centros;
    });
  }

  constructor(
    private rutasService: RutasService,
    private centrosService: CentrosService,
    private router: Router,
    public userService: UserService  ) {}

  ngOnInit(): void {
    // this.getRutas();
    this.getCentros();

  }

  onSubmit( form: NgForm){

    if ( form.invalid ) { return; }
    this.user = this.userService.getUser();

    if (this.user.coche === false){

      this.sincoche = false;

    }else{
      this.sincoche = true;

    }


    this.rutasService.getRutasFiltradas(this.destino, this.sincoche).subscribe((res: any) => {

    this.rutas = res.rutasFiltradas;
    this.filtro = true;
     });
  }

  eliminarFiltro(){

    this.getRutas();

  }
  // tslint:disable-next-line:typedef
  verRuta(id: string) {
    this.router.navigate(['/ruta', id]);
  }



}
