import { MoneyMoveTypes } from '@shared/enums/MoneyMoveTypes.enum';

export interface SharedState {
  loading: boolean;
  currentTab: string;
}

export const initialSharedState: SharedState = {
  loading: false,
  currentTab: MoneyMoveTypes.Expense,
};
