import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable } from "rxjs";

import { ModeloService } from 'src/app/modules/modelo/service/modelo-service';
import { CarroService } from '../../service/carro.service';
import { Modelo } from 'src/app/modules/modelo/model/modelo';
import { UtilService } from 'src/app/modules/util/service/util.service';
import { OpcionalService } from 'src/app/modules/opcional/service/opcional.service';
import { Opcional } from 'src/app/modules/opcional/model/opcional';

@Component({
  selector: 'app-carros-form',
  templateUrl: './carros-form.component.html',
  styleUrls: ['./carros-form.component.css']
})
export class CarrosFormComponent implements OnInit {
  titulo: string = 'Incluisão de carro';
  modelos$: Observable<Modelo[]> | undefined;
  opcionais: Opcional[] = [];
  opcionaisCarro: Opcional[] = [];
  opcionaisClicados: Opcional[] = [];
  form: FormGroup;
  enviado: boolean = false;
  registroNovo: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private carroService: CarroService,
    private modeloService: ModeloService,
    private opcionalService: OpcionalService,
    private fb: FormBuilder,
    private util: UtilService,
    private location: Location
  ) {
    this.form = this.fb.group({
      id: [null],
      placa: [null, [Validators.required, Validators.minLength(7), Validators.maxLength(7)]],
      renavam: [null, [Validators.required, Validators.minLength(9), Validators.maxLength(9)]],
      valorvenda: [null],
      modelo: [null, [Validators.required]],
      opcionais: [null],
      opcionaisDisponiveis: [null],
      opcionaisSeleciondos: [null]
    });
  }

  ngOnInit(): void {
    this.listarModelos();
    this.listarOpcionais();
    let id = this.route.snapshot.params['id'];
    if (id > 0) {
      this.titulo = 'Alteração de carro';
      const entidade$ = this.carroService.localizarPorId(id);
      entidade$.subscribe(resp => {
        this.registroNovo = false;
        this.opcionaisCarro = resp.opcionais;
        this.opcionais = this.atualizarListas(this.opcionaisCarro, this.opcionais);
        this.form.patchValue({
          id: resp.id,
          placa: resp.placa,
          renavam: resp.renavam,
          valorvenda: resp.valorvenda,
          modelo: resp.modelo,
          opcionais: resp.opcionais
        })
      },
        error => {
          this.util.alertaError('Erro ao acessar o banco.');
          this.router.navigate(['/']);
        });
    }
  }
  toUpperCase(valor: any) {
    this.form.get('placa')?.setValue(valor.target.value.toUpperCase().replace("-", ""));
  }
  listarModelos() {
    this.modelos$ = this.modeloService.listar();
  }
  listarOpcionais() {
    this.opcionalService.listar().pipe().subscribe(resp => {
      this.opcionais = resp;
    });
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
      this.carroService.salvar(this.form.value)
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
  compararCampos(mod1: any, mod2: any) {
    return mod1 && mod2 ? (mod1.id === mod2.id && mod1.nome && mod2.nome) : mod1 === mod2;
  }

  adicionarOuRemoverTodosOpcionais(operacao: string) {
    if (operacao == '+') {
      this.opcionais.forEach(opcional => this.opcionaisCarro.push(opcional));
      this.opcionais = [];
    } else {
      this.opcionaisCarro.forEach(opcional => this.opcionais.push(opcional));
      this.opcionaisCarro = [];
    }
    this.form.get('opcionais')?.setValue(this.opcionaisCarro);

  }

  aciconarOuremoverOpcionaisSelecionados(lista: string, operacao: string) {
    let opts = this.form.get(lista);
    if (opts?.value?.length) {
      for (let i = 0; i < opts?.value.length; i++) {
        if (operacao === '+') {
          this.opcionaisCarro.push(opts?.value[i]);
        } else {
          this.opcionais.push(opts?.value[i]);
        }
      }
    }
    opts?.reset();
    if (operacao === '+') {
      this.opcionais = this.atualizarListas(this.opcionaisCarro, this.opcionais);
    } else {
      this.opcionaisCarro = this.atualizarListas(this.opcionais, this.opcionaisCarro);
    }
    this.form.get('opcionais')?.setValue(this.opcionaisCarro);
  }

  atualizarListas(origem: Opcional[], destino: Opcional[]): Opcional[] {
    let opciaonaisFicam: Opcional[] = [];
    if (origem.length > 0) {
      destino.forEach(opco => {
        if (!this.localizarElemento(origem, opco)) {
          opciaonaisFicam.push(opco);
        }
      });
    } else {
      opciaonaisFicam = destino;
    }
    return opciaonaisFicam;
  }

  localizarElemento(lista: Opcional[], item: Opcional) {
    if (lista.length == 0) {
      return false;
    }
    return lista.filter(opc => opc.id === item.id).length > 0
  }
}
