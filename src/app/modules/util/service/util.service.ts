import { Injectable } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AlertModalComponent } from '../components/alert-modal/alert-modal.component';
import { ConfirmaModalComponent } from '../components/confirma-modal/confirma-modal.component';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor(private bsModalService: BsModalService) { }

  private alertaGenerico(mensagem: string, tipo: string, tempoExibicao?: number) {
    const bsModalRef: BsModalRef = this.bsModalService.show(AlertModalComponent);
    bsModalRef.content.tipo = tipo;
    bsModalRef.content.mensagem = mensagem;
    if (tempoExibicao) {
      setTimeout(() => bsModalRef.hide(), tempoExibicao);
    }
  }
  alertaError(mensagem: string) {
    this.alertaGenerico(mensagem, 'danger');
  }

  alertaSucesso(mensagem: string) {
    this.alertaGenerico(mensagem, 'success', 2000);
  }
  mostrarModalConfirmar(titulo: string, mensagem: string, rotuloBotaoConfirmar?: string, rotuloBotaoCancelar?: string) {
    const bsModalRef: BsModalRef = this.bsModalService.show(ConfirmaModalComponent);
    bsModalRef.content.titulo = titulo;
    bsModalRef.content.mensagem = mensagem;
    if (rotuloBotaoCancelar) {
      bsModalRef.content.botaoCancelar = rotuloBotaoCancelar;
    }
    if (rotuloBotaoConfirmar) {
      bsModalRef.content.botaoConfirmar = rotuloBotaoConfirmar;
    }
    return (<ConfirmaModalComponent>bsModalRef.content).confirmouAcao;
  }
}
