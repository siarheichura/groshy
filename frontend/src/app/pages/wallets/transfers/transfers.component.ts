import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core'

@Component({
  selector: 'app-transfers',
  templateUrl: './transfers.component.html',
  styleUrls: ['./transfers.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransfersComponent implements OnInit {
  constructor() {
  }

  ngOnInit(): void {
  }
}
