import { Dayjs } from "dayjs"
import { DayOperations } from "@shared/interfaces/Operation.interface"
import { OperationsStatistics } from "@shared/interfaces/OperationsStatistics.interface"

export interface Period {
  startDate: Dayjs,
  finishDate: Dayjs
}

export interface OperationsState {
  type: string
  period: Period
  operations: DayOperations[]
  statistics: OperationsStatistics[]
}

export const initialOperationsState: OperationsState = {
  type: null,
  period: null,
  operations: [],
  statistics: []
}
