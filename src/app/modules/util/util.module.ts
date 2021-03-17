import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlertModalComponent } from './components/alert-modal/alert-modal.component';
import { ConfirmaModalComponent } from './components/confirma-modal/confirma-modal.component';

@NgModule({
  declarations: [AlertModalComponent, ConfirmaModalComponent],
  imports: [
    CommonModule,
  ],
  exports: [AlertModalComponent, ConfirmaModalComponent],
  providers: [],
})
export class UtilModule { }
