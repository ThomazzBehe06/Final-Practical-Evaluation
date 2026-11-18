import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Principalcomponent } from './components/principalcomponent/principalcomponent';
import { Noencontradocomponent } from './components/noencontradocomponent/noencontradocomponent';
import { Nosotroscomponent } from './components/nosotroscomponent/nosotroscomponent';
import { Logincomponent } from './components/logincomponent/logincomponent';
import { Usuarioscomponent } from './components/usuarioscomponent/usuarioscomponent';

const routes: Routes = [
  { path: '', redirectTo: 'principal', pathMatch: 'full' },
  { path: 'principal', component: Principalcomponent },
  { path: 'nosotros', component: Nosotroscomponent },
  { path: 'login', component: Logincomponent },
  { path: 'usuarios', component: Usuarioscomponent },
  { path: '**', component: Noencontradocomponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
