import { UserService } from './../../services/user.service';
import { CentrosService, Centro } from './../../services/centros.service';
import { Component, OnInit, Input, Output, EventEmitter, ViewChildren, QueryList, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { RutasService, Ruta } from '../../services/rutas.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { LocalidadModel } from 'src/app/models/localidades.model';
import { LocalidadesService, Localidad} from './../../services/localidades.service';
import { ProvinciasService, Provincia} from './../../services/provincias.service';
import { ProvinciaModel } from './../../models/provincia.model';

function hello() {


}

@Component({
  selector: 'app-rutas',
  templateUrl: './rutas.component.html',
  styleUrls: ['./rutas.component.css'],
})
export class RutasComponent implements OnInit {
  public rutas: Ruta[] = [];
  public centros: Centro[] = [];
  public localidadesDestino: Localidad[] = [];
  public localidadesOrigen: Localidad[] = [];
  public provincias: Provincia[] = [];
  public searchInput = '';
  public searchResult: Array<any> = [];
  public seriesList: Array<any> = [

 ];

  destinoCentro;
  destinoLocalidad;
  origenProvincia;
  origenLocalidad;
  mostrarRutaConParada;
  selected = [];

  sinCoche;
  filtro = false;
  user;
  esCreador;

  selectDestino;
  selectDestinoCentro;
  selectOrigen;

  provincia: ProvinciaModel;
  localidad: LocalidadModel;

  toggleClass = false;

  tienesCoche;

isShown:boolean;
showAlert;

isFavorite = false;
filtros: boolean = true;

filled;
showFiltros(){

  if (this.filtros === true){


  }

}
checkColor(){

  if (this.origenLocalidad !== ' '){
   }
    else{


  }

}

  selectChangeOrigen() {
    this.getLocalidadesOrigen();
    this.toggleClass = !this.toggleClass;
   // this.filled = true;


  }
  selectChange() {
    this.getLocalidadesDestino();
    this.toggleClass = !this.toggleClass;
    this.destinoCentro = ' ';

  }

  selectChangeCentro() {

    this.getCentros();
    this.toggleClass = !this.toggleClass;
    this.borraCentro();
  }

  toggleOk() {
    this.toggleClass = !this.toggleClass;
  }

  getLocalidadesDestino() {
    let id = this.selectDestino;
    this.localidadesService.getLocalidades(id).subscribe((res: any) => {
      this.localidadesDestino = res.localidades;
    });
  }
  getLocalidadesOrigen() {
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
  // getCentrosDestino() {

  //   let id = this.selectDestinoCentro;
  //   this.localidadesService.getLocalidades(id).subscribe((res: any) => {

  //     this.centros = res.localidades;

  //   });
  // }

  getRutas() {
    this.rutasService.getRutas().subscribe((res: any) => {
      this.rutas = res.rutas;
    });
  }

  getProvincias() {
    this.provinciasService.getProvincias().subscribe((res: any) => {
      this.provincias = res.provincias;

    });
  }

  getParams() {
    this.user = this.userService.getUser();
    this.selectOrigen = this.rutasService.params.origenProvincia;
    this.origenLocalidad = this.rutasService.params.origenLocalidad;
    this.destinoLocalidad = this.rutasService.params.destinoLocalidad;
    this.selectDestino = this.rutasService.params.destinoProvincia;

    this.tienesCoche = this.rutasService.params.tienesCoche;
    this.sinCoche = this.rutasService.params.sinCoche;
    this.mostrarRutaConParada = this.rutasService.params.sinCoche;


    // if (this.selectOrigen){

    this.selectChangeOrigen();
    this.selectChange();
    this.selectChangeCentro();

    this.destinoCentro = this.rutasService.params.destinoCentro;

    this.rutasService
      .getRutasFiltradas(
        this.origenLocalidad,
        this.destinoLocalidad,
        this.tienesCoche,
        this.sinCoche,
        this.mostrarRutaConParada,
        this.destinoCentro
      )
      .subscribe((res: any) => {
        this.rutas = res.rutasFiltradas;
        this.filtro = true;

        /*comprueba si el user es el creador de la ruta*/

        for (let i = 0; i < this.rutas.length; i++) {

        }
      });
    // }
  }


  constructor(
    private rutasService: RutasService,
    private centrosService: CentrosService,
    private router: Router,
    public userService: UserService,
    private localidadesService: LocalidadesService,
    private provinciasService: ProvinciasService
  ) {}



  fetchSeries(event: any) {

    if (event.target.value === '') {
      return this.searchResult = [];

    }

    this.searchResult = this.centros.filter((centros) => {

      return centros.nombre.toLowerCase().replace(/é/g, 'e').replace(/é/g, 'e').replace(/á/g, 'a').replace(/é/g, 'e').replace(/í/g, 'i').replace(/ó/g, 'o').replace(/ú/g, 'u').includes(event.target.value.toLowerCase().replace(/é/g, 'e').replace(/á/g, 'a').replace(/é/g, 'e').replace(/í/g, 'i').replace(/ó/g, 'o').replace(/ú/g, 'u'));
    });
  }


 clica(value){

  this.searchResult = [];
  this.destinoCentro = value;

}

borraCentro(){
  this.searchResult = [];
  this.destinoCentro = '';
}



  ngOnInit(): void {
    // this.getRutas();
    //this.getCentros();
    this.provincia = new ProvinciaModel();
    hello();

    this.getProvincias();

    if (this.rutasService.params.origenProvincia !== '') {
      this.getParams();
  }
  }


  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }

    if (this.isFavorite === true){
    this.isFavorite = false;
    setTimeout(() => {                           // <<<---using ()=> syntax
      this.isFavorite = true;
  }, 200);
  }else{
    this.isFavorite = true;
  }


    this.showAlert = false;

    this.user = this.userService.getUser();

    if (this.tienesCoche === 'no'){

      this.sinCoche = 'si';
    }

    /*envia datos a getParams*/

    this.rutasService.getParams(
      this.selectOrigen,
      this.origenLocalidad,
      this.selectDestino,
      this.destinoLocalidad,
      this.tienesCoche,
      this.sinCoche,
      this.mostrarRutaConParada,
      this.destinoCentro
    );

    /*-----------------------*/

    this.rutasService
      .getRutasFiltradas(
        this.origenLocalidad,
        this.destinoLocalidad,
        this.tienesCoche,
        this.sinCoche,
        this.mostrarRutaConParada,
        this.destinoCentro
      )
      .subscribe((res: any) => {
        this.rutas = res.rutasFiltradas;
        this.filtro = true;
        this.showAlert = true;

        /*comprueba si el user es el creador de la ruta*/

        for (let i = 0; i < this.rutas.length; i++) {
         // console.log(this.rutas[i].creador._id, 'array de cradores');
        }
      });
  }

  eliminarFiltro() {
    this.getRutas();
  }
  // tslint:disable-next-line:typedef
  verRuta(id: string) {
    this.router.navigate(['/ruta', id]);
  }
}
