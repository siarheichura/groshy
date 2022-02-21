import { TabsEnum } from 'src/app/shared/enums/TabsEnum';

export interface SharedState {
  loading: boolean;
  currentTab: string;
}

export const initialSharedState: SharedState = {
  loading: false,
  currentTab: TabsEnum.Expenses,
};
