import { Component } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-wallet-modal',
  templateUrl: './wallet-modal.component.html',
  styleUrls: ['./wallet-modal.component.scss'],
})
export class WalletModalComponent {
  constructor(private modal: NzModalRef) {}

  onConfirm(data: unknown) {
    this.modal.close(data);
  }

  onClose() {
    this.modal.close();
  }
}
