import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from "./home/home.component";

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    component: HomeComponent
  },
  {
    path: "carros",
    loadChildren: () =>
      import("./modules/carro/carro.module").then(
        (mod) => mod.CarroModule
      )
  },
  {
    path: "modelos",
    loadChildren: () =>
      import("./modules/modelo/modelo.module").then(
        (mod) => mod.ModeloModule
      )
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
