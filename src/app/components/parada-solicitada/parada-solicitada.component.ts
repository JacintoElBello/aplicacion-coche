import { ParadaSolicitadaModel } from './../../models/paradaSolicitadaModel';
import { ParadasolicitadaService } from './../../services/paradasolicitada.service';
import { UserService } from './../../services/user.service';


import { RutaComponent } from './../ruta/ruta.component';
import { Router } from '@angular/router';
import { RutasService } from './../../services/rutas.service';
import { Component, OnInit } from '@angular/core';
import { EmailValidator, NgForm } from '@angular/forms';



@Component({
  selector: 'app-parada-solicitada',
  templateUrl: './parada-solicitada.component.html',
  styleUrls: ['./parada-solicitada.component.css']
})
export class ParadaSolicitadaComponent implements OnInit {

  paradaSolicitada: ParadaSolicitadaModel;
  userLogged;
  paradas;
  rutaId;

  getParadas(){

    this.paradaService.getParadas().subscribe((res: any) => {

        this.paradas = res.paradas;

    });
  }


  // getParadaByRuta(){ funciona bien

  //   this.paradaService.getParadaByRuta().subscribe((res: any) => {
  //       console.log('coge rutas', res);
  //       this.paradas = res.paradas;
  //       console.log(this.paradas, 'paradas d la ruta');
  //   });
  // }


constructor(
    private paradaService: ParadasolicitadaService,
    private rutaService: RutasService,
    private userService: UserService,
    private router: Router ) { }

  ngOnInit(): void {
    this.paradaSolicitada = new ParadaSolicitadaModel();
    //this.getParadas();
  //  this.getParadaByRuta();

  }


  onSubmit( form: NgForm){

    if ( form.invalid ) { return; }

    this.paradaSolicitada.creador =  this.userService.usuarioLogged._id;
    this.paradaService.agregarParadaSolicitada(this.paradaSolicitada).subscribe((res: any) => {

    }) ;
  }
}
