import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

import { ListItem } from '@shared/interfaces/ListItem.interface';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent {
  @Input() title: string;
  @Input() items: ListItem[];

  @Output() onAdd = new EventEmitter();
  @Output() onClick = new EventEmitter();

  constructor() {}

  onItemClick(id: string): void {
    this.onClick.emit(id);
  }

  onAddItem(): void {
    this.onAdd.emit();
  }
}
