import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { ModalModule } from 'ngx-bootstrap/modal';
import { NgxMaskModule } from 'ngx-mask';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { UtilModule } from './modules/util/util.module';
import { HomeComponent } from './home/home.component';
import { CarroModule } from './modules/carro/carro.module';
import { FabricanteModule } from './modules/fabricante/fabricante.module';
import { OpcionalModule } from './modules/opcional/opcional.module';

// export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ModalModule.forRoot(),
    NgxMaskModule.forRoot(),
    UtilModule,
    CarroModule,
    FabricanteModule,
    OpcionalModule
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'en-US' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
