import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';

import { InitWalletExpenses } from 'src/app/shared/interfaces/Expense';
import { InitWalletIncome } from 'src/app/shared/interfaces/Income';

@Component({
  selector: 'app-moneymove-body',
  templateUrl: './moneymove-body.component.html',
  styleUrls: ['./moneymove-body.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MoneymoveBodyComponent implements OnInit {
  @Input() items: InitWalletExpenses | InitWalletIncome | null;
  @Input() walletCurrency: string | null;

  constructor() {}

  ngOnInit(): void {}
}
