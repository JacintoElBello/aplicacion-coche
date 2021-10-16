import { UserService } from './user.service';
import { Router } from '@angular/router';


import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ParadasolicitadaService {

  paradas: Parada [] = [];
 // id = '609a5b54abd4c91b44611f83';
  constructor(

    private httpClient: HttpClient,
    private userService: UserService,
    private router: Router){


  }

  agregarParadaSolicitada(valoresParada: any) {

    const params = JSON.stringify(valoresParada);
    //const paramsOk = params.replace(/['”]+/g, '');
    // const paramsOk = params.replace(/"/g, "'");

    const url = 'http://localhost:3000/paradas/guardar';
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient.post(url, params, { headers: headers });


  }

  removeParadaSolicitada(id: string) {

    const params = JSON.stringify(id);

    const url = 'http://localhost:3000/paradas/eliminarParada/' + id;
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient.post(url, params, { headers: headers });


  }
  getParadas(){

    const url = 'http://localhost:3000/paradas/getParadas';
    return this.httpClient.get(url);

  }

  getParadaByRuta( id: string ){


    const params = JSON.stringify(id);

   // const url = 'http://localhost:3000/paradas/paradasbyruta/609a5b54abd4c91b44611f83';
    const url = 'http://localhost:3000/paradas/paradasbyruta/' + id;


    return this.httpClient.get(url);

  }

}



export interface Parada{

  parada: any;
  creador: string;
  ruta: any;
}
