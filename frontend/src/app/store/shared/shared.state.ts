import { OPERATION_TYPES } from '@shared/enums/OperationTypes.enum'

export interface SharedState {
  loading: boolean;
  currentTab: string;
  operationType: string;
}

export const initialSharedState: SharedState = {
  loading: false,
  currentTab: '',
  operationType: OPERATION_TYPES.EXPENSE,
}
