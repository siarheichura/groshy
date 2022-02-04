import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent implements OnInit {
  @Input() title: string;
  @Input() items: any; // ???
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
