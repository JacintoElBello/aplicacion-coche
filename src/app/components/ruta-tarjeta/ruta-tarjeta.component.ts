import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ruta-tarjeta',
  templateUrl: './ruta-tarjeta.component.html',
  styleUrls: ['./ruta-tarjeta.component.css']
})
export class RutaTarjetaComponent implements OnInit {

  @Input() ruta: any = {};
  @Input() index: number;

  @Output() rutaSeleccionada: EventEmitter<number>;

  constructor(  private router: Router  ) {
    this.rutaSeleccionada = new EventEmitter();
   }

  ngOnInit(): void {
  }
  // tslint:disable-next-line:typedef
  verRuta(){

   // this.rutaSeleccionada.emit(this.index);
    this.router.navigate(['/ruta', this.index]);
}


}
