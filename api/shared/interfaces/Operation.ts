import { Types } from 'mongoose'
import { Dayjs } from 'dayjs'
import { OperationDto } from '../../dtos/operation.dto'

export interface Operation {
  id: string
  type: string
  category: string
  amount: number
  currency: string
  comment: string
  checkImg: string
  date: Date
  wallet: Types.ObjectId
  walletName: string
  user: Types.ObjectId
}

export interface DayOperationsI {
  date: Dayjs
  operations: OperationDto[]
  sum: number
}
