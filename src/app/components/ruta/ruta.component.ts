import { CentrosService, Centro } from './../../services/centros.service';

import { NgForm } from '@angular/forms';
import {
  ParadasolicitadaService,
  Parada,
} from '../../services/paradasolicitada.service';
import { ParadaSolicitadaModel } from 'src/app/models/paradaSolicitadaModel';
import { Component, Input, Output, EventEmitter,Renderer2, ElementRef, ViewChild, AfterViewInit  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RutasService } from '../../services/rutas.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from 'src/app/services/user.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-ruta',
  templateUrl: './ruta.component.html',
  styleUrls: ['./ruta.component.css'],
})
export class RutaComponent {
  ruta: any = {};
  rutaId: string;
  paradaSolicitada: ParadaSolicitadaModel;
  public paradasSinFiltro: Parada[] = [];
  public paradasSolicitadas = [];
  public paradasSolicitadasId = [];
  public centros: Centro[] = [];
  isClickedOnce = false;
  parada;
  userLogged = this.userService.usuarioLogged._id;
  userLogged2 = this.userService.usuarioLogged;

  user;
  paradas;
  paradaNombre;
  paradaCreador;
  paradaCreadorEmail;
  paradaId;
  paradaParaAceptar;
  tipo;
  destinoLocalidad;
  origen;
  inscritoEnRuta;
  haSolicitadoParada;
  paradaUpdate;
  paradaAceptada;

  unidoOk;
  modalMensaje;

  constructor(
    private rutasService: RutasService,
    private router: Router,
    private userService: UserService,
    private activateRuta: ActivatedRoute,
    private paradaSolicitadaService: ParadasolicitadaService,
    private centrosService: CentrosService,
    private el: ElementRef,
    private renderer: Renderer2,
    private location: Location
  ) {}

  @ViewChild('exampleModal', { static: false }) divModal: ElementRef;

  showDiv = {
    previous : false,

  }
  showDivUnido = {
    previous : false,

  }
  getRuta() {
    this.rutasService.getRutaOk(this.rutaId).subscribe((res: any) => {

      this.ruta = res.ruta;

      this.destinoLocalidad = this.ruta.destinoLocalidad;

      this.getCentros();
      this.paradasSolicitadas = this.ruta.paradasSolicitadas;


      /* compreuba si user está en creaqdores d paradas solicitadas----------------*/

      let l;
      for (l = 0; l < this.paradasSolicitadas.length; l++) {


        if (this.paradasSolicitadas[0].creador._id === this.userLogged) {
           this.haSolicitadoParada = true;

          // return true;
         }
      }





      /*----------------------------------------------------------------------------*/
      /* comprueba si el user está ya en la ruta para pintar el botón de unirse o no*/
      let i;
      for (i = 0; i < this.ruta.usuarios.length; i++) {
        if (this.ruta.usuarios[i]._id === this.userLogged2._id) {
          this.inscritoEnRuta = true;

          return true;
        }
      }
      /*-----------------------------------------------------------------------*/

    });
  }

  getParadaByRuta() {
    this.paradaSolicitadaService.getParadaByRuta(this.rutaId).subscribe((res: any) => {
      this.paradasSinFiltro = res.parada;

      for (let i = 0; i < this.paradasSinFiltro.length; i++) {
        let paradas = this.paradasSinFiltro[i];

        this.paradasSolicitadas.push(paradas.parada);
      //  this.paradasSolicitadasId.push(paradas._id);
        this.ruta.paradasSolicitadas = this.paradasSolicitadas;
      }
    });
  }



  ngOnInit(): void {
    this.paradaSolicitada = new ParadaSolicitadaModel();
    this.rutaId = this.activateRuta.snapshot.paramMap.get('id');

    this.getRuta();


   // this.getParadaByRuta();

  }
  getCentros() {
    let id = this.destinoLocalidad;
    this.centrosService.getCentros(id).subscribe((res: any) => {
      this.centros = res.centros;

    });
  }
  // reloadComponent() {
  //   let currentUrl = this.router.url;
  //       this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  //       this.router.onSameUrlNavigation = 'reload';
  //       this.router.navigate([currentUrl]);
  //   }
  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.showDiv.previous = !this.showDiv.previous;
    this.tipo = 'paradaSolicitada';
    this.paradaSolicitada.creador = this.userLogged2;
    this.paradaSolicitada.ruta = this.ruta._id;

    this.ruta.paradasSolicitadas.push(this.paradaSolicitada);

    this.rutasService.editarRuta(this.ruta, this.tipo).subscribe((res: any) => {

    });

       /* enviar alerta en home al creador */

    this.ruta.creador.alertas.push( this.paradaSolicitada.creador.username + ' ' + 'ha solicitado parada en' + ' ' + this.paradaSolicitada.parada);


    this.userService.editUser(this.ruta.creador).subscribe((res: any) => {

    });

    this.isClickedOnce = true;
    // this.reloadComponent();
    if (this.ruta.paradas.indexOf(this.paradaSolicitada.parada) < 0) {

      this.paradaSolicitadaService
        .agregarParadaSolicitada(this.paradaSolicitada)
        .subscribe((res: any) => {
          this.getParadaByRuta();
        });
    } else {
      alert(
        'Esa para ya existe en la ruta. Puedes unirte ya!' + this.paradaSolicitada.parada + 'la parada'
      );
    }
  }



  aceptarParada(parada) {
    this.paradaNombre = parada.parada;
    this.paradaCreador = parada.creador;


    this.paradaId = parada._id;
    this.tipo = 'aceptaParada';


    /*-------------------------------*/

    if ( parada.creador === this.userService.usuarioLogged){
    this.inscritoEnRuta = true;

    }else{
      this.paradaAceptada = true;
    }

    this.ruta.paradas.push(this.paradaNombre);

    this.ruta.plazas = this.ruta.plazas - 1;
    this.ruta.usuarios.push(this.paradaCreador);


    // this.ruta.paradasSolicitadas.splice(
    //   this.ruta.paradasSolicitadas.indexOf(
    //     (dato) => dato.this.paradaNombre === this.paradaNombre
    //   ),
    //   1
    // );

    for( let i = 0; i < this.ruta.paradasSolicitadas.length; i++){

      if ( this.ruta.paradasSolicitadas[i] === parada) {

        this.ruta.paradasSolicitadas.splice(i, 1);
          i--;
      }
  }

   /* enviar alerta en home al solicitante */

    this.paradaCreador.alertas.push( this.ruta.creador.username + ' ' + 'ha aceptado tu solicitud de parada en' + ' ' + this.paradaNombre);
    alert(this.paradaCreador.alertas);

    this.userService.editUser(this.paradaCreador).subscribe((res: any) => {

    });
    /* ENVIAR EMAIL AL SOLICITANTE D LA PARADA */
    this.paradaCreadorEmail = this.paradaCreador.email;
    this.rutasService.editarRuta(this.ruta, this.tipo, this.paradaCreadorEmail).subscribe((res: any) => {
      // console.log(res);
    });

      // this.paradaSolicitadaService.removeParadaSolicitada(this.paradaId).subscribe((res: any) => {

      // });

    return;
  }

  rechazarParada(parada) {

    this.paradaId = parada;
    this.tipo = 'rechazaParada';
    this.paradaCreador = parada.creador;

    this.paradaNombre = parada.parada;


    this.ruta.paradasSolicitadas.splice(
      this.ruta.paradasSolicitadas.indexOf(
        (dato) => dato.this.paradaNombre === this.paradaNombre
      ),
      1
    );

     /* enviar alerta en home al solicitante */

     this.paradaCreador.alertas.push( this.ruta.creador.username + ' ' + 'ha rechazado tu solicitud de parada en' + ' ' + this.paradaNombre);

     this.userService.editUser(this.paradaCreador).subscribe((res: any) => {

     });
    this.paradaCreadorEmail = this.paradaCreador.email;
    this.rutasService.editarRuta(this.ruta, this.tipo, this.paradaCreadorEmail).subscribe((res: any) => {

    });
    //this.rutasService.editarRuta(this.ruta, this.tipo, this.ruta.creador).subscribe((res: any) => {});

    // this.paradaSolicitadaService
    //   .removeParadaSolicitada(this.paradaId)
    //   .subscribe((res: any) => {});
  }

  // UNIRME a RUTA
  unirmeRuta() {
    this.tipo = 'unirme';
    this.unidoOk = true;
    //this.showDivUnido.previous = !this.showDivUnido.previous;

    this.ruta.plazas = this.ruta.plazas - 1;
    this.ruta.usuarios.push(this.userLogged2);

    this.rutasService
      .editarRuta(this.ruta, this.tipo)
      .subscribe((res: any) => {});
    //this.modalMensaje = 'OK MUY BIEN',  this.open();
    // this.open();
    // this.reloadComponent();
  }

  open(){
    this.renderer.removeClass(this.divModal.nativeElement, 'none' );
    this.renderer.addClass(this.divModal.nativeElement, 'modal' );
  }

  close(){
    this.renderer.removeClass(this.divModal.nativeElement, 'modal' );
    this.renderer.addClass(this.divModal.nativeElement, 'none' );
  }

  back(): void {
    this.location.back();
  }
}
