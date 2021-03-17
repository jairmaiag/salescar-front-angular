import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Opcional } from '../model/opcional';
import { CrudGenericService } from '../../util/service/crud.generic.service';

@Injectable({
  providedIn: 'root'
})
export class OpcionalService extends CrudGenericService<Opcional>{

  constructor(protected http: HttpClient) {
    super(http, 'opcionais');
  }
}
