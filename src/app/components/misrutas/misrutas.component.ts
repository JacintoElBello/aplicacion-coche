import { UserService } from './../../services/user.service';
import { Component, OnInit, Renderer2, ElementRef, ViewChild, AfterViewInit  } from '@angular/core';
import { RutasService, Ruta } from '../../services/rutas.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-misrutas',
  templateUrl: './misrutas.component.html',
  styleUrls: ['./misrutas.component.css'],
})
export class MisrutasComponent implements OnInit {
  public rutasSinFiltro: Ruta[] = [];
  public rutasFiltradas = [];
  rutas: any[] = [];
  public misRutas: Ruta[] = [];


  termino: string;
  ruta: any = {};
  user = this.userService.usuarioLogged._id;
  esElCreador;
  arrayCreadores = [];
  haSolicitadoParada;
  creador;
  paradasSolicitadas;
  rutaBorrar;
  showMessage = false;

  constructor(
    private rutasService: RutasService,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private router: Router,
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

  @ViewChild('exampleModal', { static: false }) divModal: ElementRef;

  getMisRutas() {


    // this.user = this.userService.usuarioLogged._id;
    this.rutasService.getMisRutas(this.user).subscribe((res: any) => {
      this.misRutas = res.misRutas;



      /* crea arry de creeadores*/
      for (let i = 0; i < this.misRutas.length; i++) {
        let creador: any = this.misRutas[i].creador;
        this.creador = this.misRutas[i].creador;

        let paradasSolici: any = this.misRutas[i].paradasSolicitadas;

        for (let e = 0; e < paradasSolici.length; e++) {
          this.paradasSolicitadas = paradasSolici[e];
        //  console.log(paradasSolici[e].creador._id, this.userService.usuarioLogged._id);
          if (paradasSolici[e].creador._id === this.userService.usuarioLogged._id){

            this.haSolicitadoParada = true;


          }
        }

        // this.arrayCreadores.push(creador);
        if (this.user === creador._id){
          this.esElCreador = true;

        }

        // if (creador._id.indexOf(this.user) >= 0) {
        //   this.esElCreador = true;
        // } else {
        //   this.esElCreador = false;
        // }

        // console.log(this.esElCreador, 'el creador o no');
      }
      /**************************/
    });
  }

  open(){
    this.renderer.removeClass(this.divModal.nativeElement, 'none' );
    this.renderer.addClass(this.divModal.nativeElement, 'modal' );
  }

  close(){
    this.renderer.removeClass(this.divModal.nativeElement, 'modal' );
    this.renderer.addClass(this.divModal.nativeElement, 'none' );
  }


  ngOnInit(): void {
    this.getMisRutas();
    //this.getTuRuta();
  }

  // tslint:disable-next-line:typedef
  verRuta(idx: number) {
    this.router.navigate(['/ruta', idx]);
  }

  confirmaBorrar(rutaBorrar){

    let index = rutaBorrar.usuarios.indexOf(this.user);
    rutaBorrar.usuarios.splice(index, 1);
    rutaBorrar.plazas ++;

    this.rutasService.editarRuta(rutaBorrar).subscribe((res: any) => {

      this.showMessage = true;
      this.getMisRutas();

    });
  }

  borrarmeDeRuta(ruta){

    this.rutaBorrar = ruta;
    this.open();



   }

}
