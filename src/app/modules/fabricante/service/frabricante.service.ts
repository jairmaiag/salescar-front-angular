import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { CrudGenericService } from '../../util/service/crud.generic.service';
import { Fabricante } from '../model/fabricante';

@Injectable({
  providedIn: 'root'
})
export class FrabricanteService extends CrudGenericService<Fabricante>{

  constructor(protected http: HttpClient) {
    super(http, 'fabricantes');
  }

}
