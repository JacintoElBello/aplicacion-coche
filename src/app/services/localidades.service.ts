import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LocalidadesService {

  constructor(

    private httpClient: HttpClient,
    private router: Router){

  }

getLocalidades(id: string){

  const params = JSON.stringify(id);

  const url = 'http://localhost:3000/localidades/getlocalidades/' + id;
  return this.httpClient.get(url);

}

}

export interface Localidad{
  nm: string;
  id: string;

}
