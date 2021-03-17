import { ModelGeneric } from '../../util/model/model.generic';
import { Fabricante } from '../../fabricante/model/fabricante';

export interface Modelo extends ModelGeneric {
  nome: string
  fabricante: Fabricante
}
