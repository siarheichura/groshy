import { MoneyMoveTypes } from 'src/app/shared/enums/MoneyMoveTypes';

export interface SharedState {
  loading: boolean;
  currentTab: string;
}

export const initialSharedState: SharedState = {
  loading: false,
  currentTab: MoneyMoveTypes.Expenses,
};
