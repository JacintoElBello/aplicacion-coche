import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProvinciasService {

  constructor(

    private httpClient: HttpClient,
    private router: Router){

  }

getProvincias(){

  const url = 'http://localhost:3000/provincias/getprovincias';
  return this.httpClient.get(url);

}

}
export interface Provincia{
  nm: string;
  id: string;

}

