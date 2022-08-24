import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DayOperations, Operation } from "@shared/interfaces/Operation.interface";

@Component({
  selector: 'app-day-operations',
  templateUrl: './day-operations.component.html',
  styleUrls: ['./day-operations.component.scss']
})
export class DayOperationsComponent implements OnInit {
  @Input() dayOperations: DayOperations
  @Output() operationClick = new EventEmitter()
  @Output() deleteBtnClick = new EventEmitter()

  constructor() {}

  ngOnInit(): void {}

  onOperationClick(operation: Operation): void {
    this.operationClick.emit(operation);
  }

  onDeleteButtonClick(id: string, event: MouseEvent): void {
    event.stopPropagation()
    this.deleteBtnClick.emit(id)
  }
}
