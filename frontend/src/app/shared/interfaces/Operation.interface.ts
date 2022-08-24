export interface Operation {
  id: string
  type: string
  category: string
  amount: number
  currency: string
  date: Date
  comment?: string
  checkImg?: string
  walletName: string
}

export interface DayOperations {
  date: Date
  operations: Operation[]
  sum: number
}
