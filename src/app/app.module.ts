import { ParadasolicitadaService } from './services/paradasolicitada.service';
import { UserService } from './services/user.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';





import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { RutasComponent } from './components/rutas/rutas.component';
import { RutaComponent } from './components/ruta/ruta.component';


//rutas
import {APP_ROUTING} from './app.routes';



import { RutasService } from './services/rutas.service';
import { BuscadorComponent } from './components/buscador/buscador.component';
import { RutaTarjetaComponent } from './components/ruta-tarjeta/ruta-tarjeta.component';
import { RegistroComponent } from './components/registro/registro.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { CrearRutaComponent } from './components/crear-ruta/crear-ruta.component';
import { MisrutasComponent } from './components/misrutas/misrutas.component';
import { EditarRutaComponent } from './components/editar-ruta/editar-ruta.component';
import { ParadaSolicitadaComponent } from './components/parada-solicitada/parada-solicitada.component';
import { ModalComponent } from './components/modal/modal.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { RecuperarPasswordComponent } from './components/recuperar-password/recuperar-password.component';
import { ResetPassComponent } from './components/reset-pass/reset-pass.component';






@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    RutasComponent,
    RutaComponent,
    BuscadorComponent,
    RutaTarjetaComponent,
    RegistroComponent,
    LoginComponent,
    CrearRutaComponent,
    MisrutasComponent,
    EditarRutaComponent,
    ParadaSolicitadaComponent,
    ModalComponent,
    ResetPasswordComponent,
    RecuperarPasswordComponent,
    ResetPassComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    APP_ROUTING,


  ],
  providers: [
    RutasService,
    UserService,
    ParadasolicitadaService
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
