import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SendMailService {

  constructor(

    private httpClient: HttpClient,
    private router: Router){



  }



  sendMail(valoresEmail: any) {

    const params = JSON.stringify(valoresEmail);



    const url = 'http://localhost:3000/sendmail/guardar';
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient.post(url, params, { headers: headers });


  }


}
