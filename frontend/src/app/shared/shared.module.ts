import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './components/header/header.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { ListComponent } from './components/list/list.component';
import { MoneyMoveDayCardComponent } from './components/money-move-day-card/money-move-day-card.component';
import { WalletFormComponent } from './components/wallet-form/wallet-form.component';

// NgZorro
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { CalculatorComponent } from './components/calculator/calculator.component';

@NgModule({
  declarations: [
    ErrorPageComponent,
    HeaderComponent,
    ListComponent,
    MoneyMoveDayCardComponent,
    WalletFormComponent,
    CalculatorComponent,
  ],

  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    RouterModule,
    NzResultModule,
    NzButtonModule,
    NzPopconfirmModule,
    NzFormModule,
    NzInputModule,
    NzSelectModule,
    NzDatePickerModule,
    NzTabsModule,
    NzAvatarModule,
    NzIconModule,
    NzBadgeModule,
    NzUploadModule,
  ],
  exports: [
    ReactiveFormsModule,
    RouterModule,
    FormsModule,
    NzFormModule,
    NzButtonModule,
    NzInputModule,
    NzMessageModule,
    NzSpinModule,
    NzModalModule,
    NzSelectModule,
    NzPopconfirmModule,
    NzDrawerModule,
    NzTabsModule,
    NzInputNumberModule,
    NzIconModule,
    NzCardModule,
    NzDividerModule,
    NzTagModule,
    NzPopoverModule,
    NzDatePickerModule,
    NzEmptyModule,
    NzCollapseModule,
    NzProgressModule,
    NzAlertModule,
    NzAvatarModule,
    NzBadgeModule,
    NzUploadModule,
    HeaderComponent,
    ListComponent,
    MoneyMoveDayCardComponent,
    WalletFormComponent,
    CalculatorComponent,
  ],
  providers: [],
})
export class SharedModule {}
