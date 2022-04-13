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

  @Output() addItem = new EventEmitter();
  @Output() clickItem = new EventEmitter();

  constructor() {}

  onItemClick(id: string): void {
    this.clickItem.emit(id);
  }

  onAddItem(): void {
    this.addItem.emit();
  }
}
