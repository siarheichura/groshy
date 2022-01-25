import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-create-wallet-modal',
  templateUrl: './create-wallet-modal.component.html',
  styleUrls: ['./create-wallet-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateWalletModalComponent implements OnInit {
  @Input() isModalVisible: boolean;

  constructor() {}

  ngOnInit(): void {}

  closeModal() {}

  addWallet() {}
}
