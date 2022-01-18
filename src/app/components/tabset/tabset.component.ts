import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tabset',
  templateUrl: './tabset.component.html',
  styleUrls: ['./tabset.component.scss'],
})
export class TabsetComponent implements OnInit {
  tabs = ['Expenses', 'Income'];

  constructor() {}

  ngOnInit(): void {}
}
