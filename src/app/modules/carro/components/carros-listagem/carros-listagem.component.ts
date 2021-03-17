import { Component, OnInit } from '@angular/core';

import { EMPTY, Observable, Subject } from "rxjs";
import { catchError, switchMap, take } from "rxjs/operators";

import { Router } from '@angular/router';
import { Carro } from '../../model/carro';

import { CarroService } from '../../service/carro.service';
import { UtilService } from 'src/app/modules/util/service/util.service';

declare var $: any;

@Component({
  selector: 'app-carros-listagem',
  templateUrl: './carros-listagem.component.html',
  styleUrls: ['./carros-listagem.component.css']
})
export class CarrosListagemComponent implements OnInit {

  carros: Array<any> = [];
  lista$: Observable<Carro[]> | undefined;

  constructor(
    private carroService: CarroService,
    private util: UtilService,
    private router: Router) { }

  ngOnInit(): void {
    this.listar();
  }
  novo() {
    this.router.navigate([`/carros/new`]);
  }

  listar() {
    this.lista$ = this.carroService.listar()
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
  deletar(dados: Carro) {
    const resultado$ = this.util.mostrarModalConfirmar('Exclusao', 'Confirmar a exclusão do registro?', 'Sim', 'Não');
    resultado$.asObservable()
      .pipe(
        take(1),
        switchMap(result => result ? this.carroService.excluir(dados) : EMPTY)
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
