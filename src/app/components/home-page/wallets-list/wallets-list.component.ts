import { WalletService } from './../../../services/wallet.service';
import { CreateWalletFormComponent } from './../create-wallet-form/create-wallet-form.component';
import { NzModalService } from 'ng-zorro-antd/modal';
import { RouterEnum } from './../../../shared/enums/RouterEnum';
import { Wallet } from './../../../shared/interfaces/Wallet';

import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  ChangeDetectorRef,
} from '@angular/core';

@Component({
  selector: 'app-wallets-list',
  templateUrl: './wallets-list.component.html',
  styleUrls: ['./wallets-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WalletsListComponent implements OnInit {
  @Input() wallets: Wallet[];
  @Input() loading: boolean;

  walletRoute: string = RouterEnum.Wallet;

  constructor(
    private modal: NzModalService,
    private cdr: ChangeDetectorRef,
    private walletService: WalletService
  ) {}

  ngOnInit(): void {}

  onAddButtonClick() {
    const modal = this.modal.create({
      nzTitle: 'Wallet Creation',
      nzWidth: '400px',
      nzContent: CreateWalletFormComponent,
      nzComponentParams: { wallets: this.wallets },
      nzFooter: null,
    });
  }

  onDeleteButtonClick(event: Event, id: string): void {
    event.stopPropagation();
    this.walletService.removeWallet(id).subscribe((response) => {
      this.wallets = this.wallets.filter((wallet) => {
        return wallet._id !== id;
      });
      this.cdr.detectChanges();
    });
  }
}
