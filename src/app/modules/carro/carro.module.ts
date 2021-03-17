import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgxMaskModule } from 'ngx-mask';

import { CarroService } from './service/carro.service';
import { CarroRoutingModule } from './carro-routing.modules';
import { CarrosListagemComponent } from './components/carros-listagem/carros-listagem.component';
import { CarrosFormComponent } from './components/carros-form/carros-form.component';
import { CarrosDetalheComponent } from './components/carros-detalhe/carros-detalhe.component';

@NgModule({
  declarations: [CarrosListagemComponent, CarrosFormComponent, CarrosDetalheComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgxMaskModule.forRoot(),
    ReactiveFormsModule,
    CarroRoutingModule
  ],
  providers: [CarroService]
})
export class CarroModule { }
