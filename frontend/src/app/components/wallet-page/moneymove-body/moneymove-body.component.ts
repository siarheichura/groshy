import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';

import { Expense } from 'src/app/shared/interfaces/Expense';
import { Income } from 'src/app/shared/interfaces/Income';

@Component({
  selector: 'app-moneymove-body',
  templateUrl: './moneymove-body.component.html',
  styleUrls: ['./moneymove-body.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MoneymoveBodyComponent implements OnInit {
  @Input() items: Expense[] | Income[] | null;
  @Input() amount: number | null;
  @Input() walletCurrency: string | null;

  sum: number | undefined;

  constructor() {}

  ngOnInit(): void {}
}
