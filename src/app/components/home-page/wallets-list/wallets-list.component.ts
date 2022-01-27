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
  @Input() wallets: Wallet[];
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

  onEditItem(event: Event, id: string): void {
    event.stopPropagation();
    this.onEdit.emit(id);
  }

  onDeleteButtonClick(event: Event, id: string): void {
    event.stopPropagation();
    this.onDelete.emit(id);
  }
}
