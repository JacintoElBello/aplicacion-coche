
import { Router } from '@angular/router';
import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CentrosService {

  constructor(

    private httpClient: HttpClient,
    private router: Router){

  }

// getCentros(){

//     const url = 'http://localhost:3000/centros/getCentros';
//     return this.httpClient.get(url);

//   }

  getCentros(id: string){

    const params = JSON.stringify(id);
    const url = 'http://localhost:3000/centros/getCentros/' + id;
    return this.httpClient.get(url);

  }




}


export interface Centro{
  nombre: string;
  localidad: string;
  provincia: string;
  comunidad: string;

}
