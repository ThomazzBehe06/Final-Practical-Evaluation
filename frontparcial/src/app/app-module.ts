import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';

import { Navbarcomponent } from './components/navbarcomponent/navbarcomponent';
import { Footercomponent } from './components/footercomponent/footercomponent';
import { Principalcomponent } from './components/principalcomponent/principalcomponent';
import { Noencontradocomponent } from './components/noencontradocomponent/noencontradocomponent';
import { Nosotroscomponent } from './components/nosotroscomponent/nosotroscomponent';
import { Logincomponent } from './components/logincomponent/logincomponent';
import { Usuarioscomponent } from './components/usuarioscomponent/usuarioscomponent';
import { Listacomponent } from './components/listacomponent/listacomponent';
import { Servicecomponent } from './components/servicecomponent/servicecomponent';
import { Admincomponent } from './components/admincomponent/admincomponent';
import { Productocomponent } from './components/productocomponent/productocomponent';

@NgModule({
  declarations: [
    App,
    Navbarcomponent,
    Footercomponent,
    Principalcomponent,
    Noencontradocomponent,
    Nosotroscomponent,
    Logincomponent,
    Usuarioscomponent,
    Listacomponent,
    Servicecomponent,
    Admincomponent,
    Productocomponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [provideBrowserGlobalErrorListeners(), provideHttpClient()],
  bootstrap: [App],
})
export class AppModule {}
