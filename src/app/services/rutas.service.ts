import { ParamsSearch } from './../models/paramsSearch';
import { UserService } from './user.service';
import { Router } from '@angular/router';



import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Injectable()
export class RutasService{

  rutas: Ruta [] = [];
   params = {
    origenProvincia:  '',
    origenLocalidad:    '',
    destinoProvincia:  '',
    destinoLocalidad:  '',
    tienesCoche: '',
    sinCoche: '',
    destinoCentro: '',
    mostrarRutaConParada: ''

  };

  constructor(

    private httpClient: HttpClient,
    private userService: UserService,
    private router: Router){



  }
  clearSearch() {
    this.params.origenProvincia = '';
    this.params.origenLocalidad = '';
    this.params.destinoProvincia = '';
    this.params.destinoLocalidad = '';
    this.params.destinoCentro = '';
    this.params.tienesCoche = '';
    this.params.sinCoche = '';
    this.params.mostrarRutaConParada = '';
  }
  getParams(origenProvincia, origenLocalidad, destinoProvincia, destinoLocalidad, tienesCoche, sinCoche, aceptaParadas, destinoCentro){

    this.params.origenProvincia = origenProvincia;
    this.params.origenLocalidad = origenLocalidad;
    this.params.destinoProvincia = destinoProvincia;
    this.params.destinoLocalidad = destinoLocalidad;
    this.params.destinoCentro = destinoCentro;
    this.params.tienesCoche = tienesCoche;
    this.params.sinCoche = sinCoche;
    this.params.mostrarRutaConParada = aceptaParadas;



    return;

  }
  agregarRuta(valoresRuta: any) {

    const params = JSON.stringify(valoresRuta);
    //const paramsOk = params.replace(/['”]+/g, '');
    // const paramsOk = params.replace(/"/g, "'");

    const url = 'http://localhost:3000/rutas/guardar';
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient.post(url, params, { headers: headers });


  }

  getRutas(){

    const url = 'http://localhost:3000/rutas/getRutas';
    return this.httpClient.get(url);

  }


  getMisRutas(user: string ){

    const params = JSON.stringify(user);

    const url = 'http://localhost:3000/rutas/getMisRutas/' + user ;
    return this.httpClient.get(url);

  }

  getRutasFiltradas(origenLocalidad: string, destinoLocalidad: string, tienesCoche: string, sinCoche: string, aceptaParadas: string, destinoCentro: string){
   // getRutasFiltradas(origenLocalidad: string, destinoLocalidad: string, sinCoche: string, aceptaParadas: string, destinoCentro: string){
    // const params = JSON.stringify([destinoCentro, destinoLocalidad]);
    // console.log('las rutas', params);

    const url = 'http://localhost:3000/rutas/getRutasFiltradas/' + origenLocalidad + '/'  + destinoLocalidad + '/' + tienesCoche + '/' + sinCoche + '/' + aceptaParadas + '/'+ destinoCentro ;
   // const url = 'http://localhost:3000/rutas/getRutasFiltradas/' + origenLocalidad + '/'  + destinoLocalidad + '/' + sinCoche + '/'  + aceptaParadas + '/' + destinoCentro ;

    return this.httpClient.get(url);

  }

  getRutaOk(id: string){

    const url = 'http://localhost:3000/rutas/' + id ;
    return this.httpClient.get(url);

  }


  // tslint:disable-next-line:typedef
   getRuta(idx: string){
      return this.rutas[idx];
   }


 getParada(parada: string){

  return parada;

 }


 editarRuta(ruta: any, tipo?, creador?){

  const params = ruta;
  const url = 'http://localhost:3000/rutas/' + ruta._id + '/' + tipo + '/' + creador;
  const headers = new HttpHeaders().set('Content-Type', 'application/json');
  return this.httpClient.put(url, params, { headers: headers });

  }


}

export interface Ruta{
  origen: string;
  destinoLocalidad: string;
  destinoCentro: string;
  paradas: any;
  plazas: number;
  creador: string;
  paradasSolicitadas: [];
  cerrada: boolean;


}
