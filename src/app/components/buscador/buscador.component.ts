import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RutasService, Ruta } from '../../services/rutas.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.css'],
})
export class BuscadorComponent implements OnInit {
  rutas: any[] = [];
  termino: string;
  origen: string;
  destino: string;

  public rutasSinFiltro: Ruta[] = [];
  public rutasFiltradas = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private _rutasService: RutasService
  ) {}

  ngOnInit(): void {
    // this.activatedRoute.params.subscribe(params =>{
    //  this.termino = params['termino'];
    //   // this.rutas = this._rutasService.buscarRuta(params['termino']);
    //  this.getRutas();
    // });
  }

  buscarRuta() {
  //  this._rutasService.buscarRuta(this.origen, this.destino);
  }
  verRuta(idx: number) {
    this.router.navigate(['/ruta', idx]);
  }

  // getRutas() {
  //   this._rutasService.getRutas().subscribe((res: any) => {
  //     this.rutasSinFiltro = res.rutas;

  //     for (let i = 0; i < this.rutasSinFiltro.length; i++) {
  //       let ruta = this.rutasSinFiltro[i];

  //       // tslint:disable-next-line:prefer-const
  //       let origen = ruta.origen.toLowerCase();
  //      // let destino = ruta.destino.toLowerCase();

  //       if (
  //         origen.indexOf(this.termino) >= 0 ||
  //         destino.indexOf(this.termino) >= 0
  //       ) {
  //         ruta.idx = i;

  //         this.rutasFiltradas.push(ruta);
  //       }
  //     }
  //   });
  // }
}
