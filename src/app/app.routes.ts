



import { MisrutasComponent } from './components/misrutas/misrutas.component';


import { AuthguardService } from './services/authguard.service';
import { LoginComponent } from './components/login/login.component';

import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {RutasComponent} from './components/rutas/rutas.component';
import {RutaComponent} from './components/ruta/ruta.component';
import {BuscadorComponent} from './components/buscador/buscador.component';
import {RegistroComponent} from './components/registro/registro.component';
import { CrearRutaComponent } from './components/crear-ruta/crear-ruta.component';
import { EditarRutaComponent } from './components/editar-ruta/editar-ruta.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ResetPassComponent } from './components/reset-pass/reset-pass.component';
import { RecuperarPasswordComponent } from './components/recuperar-password/recuperar-password.component';






const APP_ROUTES: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'rutas', component: RutasComponent, /*canActivate : [AuthguardService]*/ },
  { path: 'registro', component: RegistroComponent },
  { path: 'login', component: LoginComponent },
  { path: 'crearRuta', component: CrearRutaComponent },
  { path: 'misRutas', component: MisrutasComponent },
  { path: 'ruta/:id', component: RutaComponent },
  { path: 'editarRuta/:id', component: EditarRutaComponent },
  { path: 'buscador/:termino', component: BuscadorComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'reset-pass', component: ResetPassComponent },

 { path: 'recuperar-password/:id', component: RecuperarPasswordComponent },


  { path: '**', component: HomeComponent },

];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);

