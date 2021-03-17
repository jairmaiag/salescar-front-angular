import { HttpClient } from '@angular/common/http';

import { take } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { ModelGeneric } from '../model/model.generic';

export class CrudGenericService<T extends ModelGeneric> {

  private API: string;

  constructor(protected http: HttpClient, private recurso: string) {
    this.API = `${environment.API}${recurso}`;
  }

  listar() {
    return this.http.get<T[]>(this.API);
  }

  localizarPorId(id: number) {
    return this.http.get<T>(`${this.API}/${id}`).pipe(take(1));
  }


  salvar(dados: T) {
    if (dados.id) {
      return this.atualizar(dados);
    }
    return this.incluir(dados);
  }

  private incluir(dados: T) {
    return this.http.post(this.API, dados).pipe(take(1));
  }

  private atualizar(dados: T) {
    return this.http.put(this.API, dados).pipe(take(1));
  }

  excluir(dados: T) {
    return this.http.delete(`${this.API}/${dados.id}`).pipe(take(1));
  }
}
