import { HomePageRoutingModule } from './home-page-routing.module';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HomePageComponent } from './home-page.component';
import { WalletsListComponent } from './wallets-list/wallets-list.component';
import { CreateWalletModalComponent } from './create-wallet-modal/create-wallet-modal.component';

// Ng Zorro
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';

@NgModule({
  declarations: [
    HomePageComponent,
    WalletsListComponent,
    CreateWalletModalComponent,
  ],
  imports: [
    CommonModule,
    HomePageRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NzSpinModule,
    NzButtonModule,
    NzModalModule,
    NzFormModule,
    NzInputModule,
    NzSelectModule,
  ],
  providers: [],
})
export class HomePageModule {}
