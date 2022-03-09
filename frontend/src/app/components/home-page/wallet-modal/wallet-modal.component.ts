import { Component, OnInit } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-wallet-modal',
  templateUrl: './wallet-modal.component.html',
  styleUrls: ['./wallet-modal.component.scss'],
})
export class WalletModalComponent implements OnInit {
  constructor(private modal: NzModalRef) {}

  ngOnInit(): void {}

  onConfirm(data: unknown) {
    this.modal.close(data);
  }

  onClose() {
    this.modal.close();
  }
}
