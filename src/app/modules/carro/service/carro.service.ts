import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Carro } from '../model/carro';
import { CrudGenericService } from '../../util/service/crud.generic.service';

@Injectable({
  providedIn: 'root'
})
export class CarroService extends CrudGenericService<Carro> {

  constructor(protected http: HttpClient) {
    super(http, 'carros');
  }

}
