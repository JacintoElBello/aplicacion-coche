
import { LocalidadesService, Localidad } from './../../services/localidades.service';
import { ProvinciasService, Provincia } from './../../services/provincias.service';
import { CentrosService, Centro } from './../../services/centros.service';
import { UserService } from './../../services/user.service';
import { RutaModel } from './../../models/ruta.model';
import { ProvinciaModel } from './../../models/provincia.model';
import { LocalidadModel } from 'src/app/models/localidades.model';
import { RutaComponent } from './../ruta/ruta.component';
import { Router } from '@angular/router';
import { RutasService } from './../../services/rutas.service';
import { Component, OnInit, Renderer2, ElementRef, ViewChild, AfterViewInit  } from '@angular/core';
import { EmailValidator, NgForm } from '@angular/forms';







@Component({
  selector: 'app-crear-ruta',
  templateUrl: './crear-ruta.component.html',
  styleUrls: ['./crear-ruta.component.css']
})
export class CrearRutaComponent implements OnInit {

  ruta: RutaModel;
  provincia: ProvinciaModel;
  localidad: LocalidadModel;
  public centros: Centro [] = [];
  public localidadesFiltradas: Localidad [] = [];
  public localidadesDestino: Localidad [] = [];
  public localidadesOrigen: Localidad [] = [];
  public provincias: Provincia [] = [];
  showFormOk = false;
  selectDestino;
  selectOrigen;
  origenLocalidad;
  destinoLocalidad;
  destinoCentro;
  modalMensaje;

  constructor(
    private rutasService: RutasService,
    private userService: UserService,
    private centrosService: CentrosService,
    private localidadesService: LocalidadesService,
    private provinciasService: ProvinciasService,
    private router: Router,
    private el: ElementRef,
    private renderer: Renderer2 ) { }

    @ViewChild('exampleModal', { static: false }) divModal: ElementRef;

  ngOnInit(): void {
    this.ruta = new RutaModel();

    this.provincia = new ProvinciaModel();
   // this.getCentros();
    this.getProvincias();
    // this.getLocalidades();
    if (this.rutasService.params.origenProvincia !== '') {
      this.getParams();
  }



  }



  selectChange(){
    this.getLocalidadesDestino();
  }

  selectChangeOrigen(){
    this.getLocalidadesOrigen();
  }

  selectChangeCentro(){

    this.getCentros();
  }

  getProvincias(){

    this.provinciasService.getProvincias().subscribe((res: any) => {

        this.provincias = res.provincias;

    });
  }

  getLocalidadesDestino(){
    let id = this.selectDestino;
    this.localidadesService.getLocalidades(id).subscribe((res: any) => {

        this.localidadesDestino = res.localidades;

    });
  }
  getLocalidadesOrigen(){
    let id = this.selectOrigen;
    this.localidadesService.getLocalidades(id).subscribe((res: any) => {

        this.localidadesOrigen = res.localidades;

    });
  }

  getCentros() {
    let id = this.destinoLocalidad;

    this.centrosService.getCentros(id).subscribe((res: any) => {
      this.centros = res.centros;
    });

  }



  onSubmit( form: NgForm){

    if ( form.invalid ) {
      //  this.modalMensaje = 'ERROR',  this.open();
       return; }


    // this.ruta.creador = this.userService.usuarioLogged._id;
    this.ruta.cerrada = false;
    this.ruta.creador = this.userService.usuarioLogged;
    this.showFormOk = true;
    this.ruta.origenLocalidad = this.origenLocalidad;
    this.ruta.destinoCentro = this.destinoCentro;
    this.ruta.destinoLocalidad = this.destinoLocalidad;

    // if (this.ruta.destinoCentro == null){
    //   this.ruta.destinoCentro = null;
    // }

   // this.modalMensaje = 'ERROR',  this.open();
    this.rutasService.agregarRuta(this.ruta).subscribe((res: any) => {

    }) ;
  }

  open(){
    this.renderer.removeClass(this.divModal.nativeElement, 'none' );
    this.renderer.addClass(this.divModal.nativeElement, 'modal' );
  }

  close(){
    this.renderer.removeClass(this.divModal.nativeElement, 'modal' );
    this.renderer.addClass(this.divModal.nativeElement, 'none' );
  }

  getParams(){

    this.selectOrigen = this.rutasService.params.origenProvincia;
    this.origenLocalidad = this.rutasService.params.origenLocalidad;
    this.destinoLocalidad = this.rutasService.params.destinoLocalidad;
    this.selectDestino = this.rutasService.params.destinoProvincia;
    this.destinoCentro = this.rutasService.params.destinoCentro;


        this.selectChangeOrigen();
        this.selectChange();
        this.selectChangeCentro();


  }


}
