import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CarrosListagemComponent } from './components/carros-listagem/carros-listagem.component';
import { CarrosFormComponent } from './components/carros-form/carros-form.component';
import { CarrosDetalheComponent } from './components/carros-detalhe/carros-detalhe.component';

const carrosRoutes: Routes = [
  { path: '',  component: CarrosListagemComponent },
  { path: 'new', component: CarrosFormComponent },
  { path: ':id/edit', component: CarrosFormComponent },
  { path: ':id/detail', component: CarrosDetalheComponent }
];

@NgModule({
  imports: [RouterModule.forChild(carrosRoutes)],
  exports: [RouterModule]
})
export class CarroRoutingModule { }
