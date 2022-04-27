import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { PartidaComponent } from './components/partida/partida.component';
import { RegisterComponent } from './components/register/register.component';
import { UnirsePartidaComponent } from './components/unirse-partida/unirse-partida.component';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'}, //Redirigir en ruta vacía
  {path: 'signup', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'unirse', component: UnirsePartidaComponent},
  {path: 'jugar', component: PartidaComponent},
  //{path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
