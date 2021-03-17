import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-confirma-modal',
  templateUrl: './confirma-modal.component.html',
  styleUrls: ['./confirma-modal.component.css']
})
export class ConfirmaModalComponent implements OnInit {

  @Input() titulo: string = '';
  @Input() mensagem: string = '';
  @Input() botaoCancelar: string = 'Cancelar';
  @Input() botaoConfirmar: string = 'Confirmar';

  confirmouAcao: Subject<boolean>;

  constructor(public bsModalRef: BsModalRef) {
    this.confirmouAcao = new Subject();
  }

  ngOnInit(): void {
  }

  fehcarModal() {
    this.fechar(false);
  }
  confirmar() {
    this.fechar(true);
  }
  private fechar(valor: boolean) {
    this.confirmouAcao.next(valor);
    this.bsModalRef.hide();
  }
}
