import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Modelo } from '../model/modelo';
import { CrudGenericService } from '../../util/service/crud.generic.service';
import { FrabricanteService } from '../../fabricante/service/frabricante.service';

@Injectable({
  providedIn: 'root'
})
export class ModeloService extends CrudGenericService<Modelo> {

  constructor(protected http: HttpClient, private fabricanteService: FrabricanteService) {
    super(http, 'modelos');
  }

  listarFabricantes() {
    return this.fabricanteService.listar();
  }
}
