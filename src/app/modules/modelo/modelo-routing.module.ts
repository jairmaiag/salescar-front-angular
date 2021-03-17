import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ModeloDetalheComponent } from './components/modelo-detalhe/modelo-detalhe.component';
import { ModeloFormComponent } from './components/modelo-form/modelo-form.component';
import { ModeloListagemComponent } from './components/modelo-listagem/modelo-listagem.component';

const routes: Routes = [
  { path: '', component: ModeloListagemComponent },
  { path: 'new', component: ModeloFormComponent },
  { path: ':id/edit', component: ModeloFormComponent },
  { path: ':id/detail', component: ModeloDetalheComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModeloRoutingModule { }
