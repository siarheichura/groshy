import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Expense } from 'src/app/shared/interfaces/Expense';
import { Income } from 'src/app/shared/interfaces/Income';

@Component({
  selector: 'app-moneymove-card',
  templateUrl: './moneymove-card.component.html',
  styleUrls: ['./moneymove-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MoneymoveCardComponent implements OnInit {
  @Input() item: Expense | Income;
  @Input() walletCurrency: string | null;

  constructor() {}

  ngOnInit(): void {}
}
