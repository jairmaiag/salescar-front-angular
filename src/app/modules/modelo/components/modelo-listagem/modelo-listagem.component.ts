import { Component, OnInit } from '@angular/core';

import { BsModalRef } from 'ngx-bootstrap/modal'

import { EMPTY, Observable, Subject } from "rxjs";
import { catchError, switchMap, take } from "rxjs/operators";

import { ModeloService } from 'src/app/modules/modelo/service/modelo-service';
import { Modelo } from 'src/app/modules/modelo/model/modelo';
import { UtilService } from 'src/app/modules/util/service/util.service';

@Component({
  selector: 'app-modelo-listagem',
  templateUrl: './modelo-listagem.component.html',
  styleUrls: ['./modelo-listagem.component.css']
})
export class ModeloListagemComponent implements OnInit {

  modelos$: Observable<Modelo[]> | undefined;
  erro$ = new Subject<boolean>();
  registroSelecionado: Modelo = { id: 0, nome: '', fabricante: { id: 0, nome: '' } };

  modalRef: BsModalRef = new BsModalRef();

  constructor(
    private modeloService: ModeloService,
    private util: UtilService
  ) {
  }

  ngOnInit(): void {
    this.listar();

  }

  listar() {
    this.modelos$ = this.modeloService.listar()
      .pipe(
        catchError(error => {
          this.tratarErro();
          return EMPTY;
        })
      );
  }

  tratarErro() {
    this.util.alertaError('Error ao carregar a lista.');
  }

  deletar(dados: Modelo) {
    this.registroSelecionado = dados;
    const resultado$ = this.util.mostrarModalConfirmar('Exclusao', 'Confirmar a exclusão do registro?', 'Sim', 'Não');
    resultado$.asObservable()
      .pipe(
        take(1),
        switchMap(result => result ? this.modeloService.excluir(dados) : EMPTY)
      )
      .subscribe(
        success => {
          this.listar();
          this.util.alertaSucesso('Registro excluido.')
        },
        error => {
          this.util.alertaError('Error ao excluir registro.');
        }
      );
  }
}
