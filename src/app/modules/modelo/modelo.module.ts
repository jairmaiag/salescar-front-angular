import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { ModeloRoutingModule } from './modelo-routing.module';
import { ModeloListagemComponent } from './components/modelo-listagem/modelo-listagem.component';
import { ModeloFormComponent } from './components/modelo-form/modelo-form.component';
import { ModeloDetalheComponent } from './components/modelo-detalhe/modelo-detalhe.component';
import { ModeloService } from './service/modelo-service';

@NgModule({
  declarations: [ModeloListagemComponent, ModeloFormComponent, ModeloDetalheComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ModeloRoutingModule
  ],
  providers: [ModeloService]
})
export class ModeloModule { }
