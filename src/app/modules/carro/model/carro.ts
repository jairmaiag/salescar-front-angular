import { Modelo } from '../../modelo/model/modelo';
import { Opcional } from '../../opcional/model/opcional';
import { ModelGeneric } from '../../util/model/model.generic';

export interface Carro extends ModelGeneric {
  placa: string,
  renavam: string,
  valorvenda: number
  cadastro: Date,
  modelo: Modelo,
  opcionais: Opcional[]
}
