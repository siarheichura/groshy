import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { ListItem } from './../../interfaces/ListItem';
import { loadingSelector } from 'src/app/store/shared/shared.selectros';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent implements OnInit {
  @Input() title: string;
  @Input() items: ListItem[];

  @Output() onAdd = new EventEmitter();
  @Output() onClick = new EventEmitter();

  constructor(private store: Store) {}

  ngOnInit(): void {}

  onItemClick(id: string): void {
    this.onClick.emit(id);
  }

  onAddItem(): void {
    this.onAdd.emit();
  }
}
