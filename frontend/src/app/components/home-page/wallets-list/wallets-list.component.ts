import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

import { Wallet } from './../../../shared/interfaces/Wallet';

@Component({
  selector: 'app-wallets-list',
  templateUrl: './wallets-list.component.html',
  styleUrls: ['./wallets-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WalletsListComponent implements OnInit {
  @Input() items: Wallet[] | null;
  @Input() loading: boolean;

  @Output() onAdd = new EventEmitter();
  @Output() onEdit = new EventEmitter();
  @Output() onDelete = new EventEmitter();
  @Output() onClick = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onItemClick(id: string): void {
    this.onClick.emit(id);
  }

  onAddItem(): void {
    this.onAdd.emit();
  }

  onEditItem(id: string): void {
    this.onEdit.emit(id);
  }

  onDeleteItem(id: string): void {
    this.onDelete.emit(id);
  }
}
