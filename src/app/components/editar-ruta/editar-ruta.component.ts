import { Component, OnInit } from '@angular/core';
import { RutasService } from 'src/app/services/rutas.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common';
@Component({
  selector: 'app-editar-ruta',
  templateUrl: './editar-ruta.component.html',
  styleUrls: ['./editar-ruta.component.css']
})
export class EditarRutaComponent implements OnInit {

  ruta: any = {};
  rutaId: string;
  origen;
  destino;
  horaSalida;
  paradas;
  plazas;
  showMessage = false;
  cerrada;
  ocultaAlerta;

  getRuta() {

    this.rutasService.getRutaOk(this.rutaId).subscribe((res: any) => {
      this.ruta = res.ruta;

      this.paradas = this.ruta.paradas;

    });
  }
  constructor(
    private rutasService: RutasService,
    private router: Router,
    private activateRuta: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.rutaId = this.activateRuta.snapshot.paramMap.get('id');
    this.getRuta();
    // this.functionNr1();

  }

  onSubmit(form: NgForm) {

    if (form.invalid) { return; }
    this.ocultaAlerta = false;
    this.ruta = this.ruta;
    this.origen = this.ruta.origenLocalidad;
    this.destino = this.ruta.destino;
    this.horaSalida = this.ruta.horaSalida;
    this.paradas = this.ruta.paradas;
    this.plazas = this.ruta.plazas;
    this.showMessage = true;

    // this.router.navigate(['/ruta',this.ruta._id]);

    this.rutasService.editarRuta(this.ruta).subscribe((res: any) => {

    });
  }
change(){
  if (this.ruta.cerrada === false){

    this.ruta.cerrada = true;

  }else{
    this.ruta.cerrada = false;


  }

}
functionNr1() {


  setTimeout (() => {
       this.ocultaAlerta = true;

    }, 6000);



}
borrarParada(parada){

  const index: number = this.paradas.indexOf(parada);
  this.paradas.splice(index, 1);

}

back(): void {
  this.location.back();
}

}
