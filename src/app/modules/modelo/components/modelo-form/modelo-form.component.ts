import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable } from "rxjs";

import { Fabricante } from '../../../fabricante/model/fabricante';
import { ModeloService } from '../../service/modelo-service';
import { UtilService } from 'src/app/modules/util/service/util.service';

@Component({
  selector: 'app-modelo-form',
  templateUrl: './modelo-form.component.html',
  styleUrls: ['./modelo-form.component.css']
})
export class ModeloFormComponent implements OnInit {
  titulo: string = 'Incluisão de modelo';
  fabricantes$: Observable<Fabricante[]> | undefined;
  form: FormGroup;
  enviado: boolean = false;
  registroNovo: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private modeloService: ModeloService,
    private fb: FormBuilder,
    private util: UtilService,
    private location: Location) {

    this.form = this.fb.group({
      id: [null],
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      fabricante: this.fb.group({
        id: [null, [Validators.required]]
      })
    });
  }

  ngOnInit(): void {
    this.listarFabricantes();
    let id = this.route.snapshot.params['id'];
    if (id > 0) {
      this.titulo = 'Alteração de modelo';
      const modelo$ = this.modeloService.localizarPorId(id);
      modelo$.subscribe(resp => {
        this.registroNovo = false;
        this.form.patchValue({
          id: resp.id,
          nome: resp.nome,
          fabricante: resp.fabricante
        })
      },
        error => {
          this.util.alertaError('Erro ao acessar o banco.');
          this.router.navigate(['/']);
        });
    }
  }
  listarFabricantes() {
    this.fabricantes$ = this.modeloService.listarFabricantes();
  }

  salvar() {
    this.enviado = true;
    if (this.form.valid) {
      let sucesso = 'Registro incluido!';
      let erro = 'Erro ao cadastrar.';
      if (!this.registroNovo) {
        sucesso = 'Registro atualizado!'
        erro = 'Erro ao atualizar.';
      }
      this.modeloService.salvar(this.form.value)
        .subscribe(
          success => {
            this.util.alertaSucesso(sucesso);
            this.location.back();
          },
          error => this.util.alertaError(erro));
    }
  }
  cancelar() {
    this.enviado = false;
    if (this.registroNovo) {
      this.form.reset();
    } else {
      this.location.back();
    }
  }

  temErros(campo: string) {
    return this.form.get(campo)?.errors;
  }
}
