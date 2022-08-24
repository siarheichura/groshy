import dayjs from 'dayjs';
import { OperationModel } from '../models/Operation';
import { DayOperationsI, Operation } from "../shared/interfaces/Operation";
import {OperationDto} from "../dtos/operation.dto";
import { walletService } from "./wallet.service";
import { OPERATION_TYPES_ENUM } from "../shared/enums/OperationTypes.enum";
import { OPERATORS_ENUM } from "../shared/enums/Operators.enum";
import { categoryService } from "./category.service";
import axios from 'axios'

const currencyApiUrl = 'https://api.exchangerate.host/'
const convert = (from: string, to: string) => `convert?from=${from}&to=${to}`
const getAllRates = (base?: string) => base ? `latest?base=${base}` : 'latest'

class OperationService {
  async getOperationsByPeriod(userId: string, type: string, startDate: string, finishDate?: string) {
    const operations = await OperationModel.find({
      user: userId,
      type: type,
      date: {
        $gte: dayjs(startDate),
        $lt: finishDate ? dayjs(finishDate) : dayjs(startDate),
      },
    });
    return this.getDayOperationsByPeriod(operations, startDate, finishDate)
  }

  async addOperation(operationData: Operation) {
    const operation = await OperationModel.create(operationData)
    const operator = operation.type === OPERATION_TYPES_ENUM.EXPENSE ? OPERATORS_ENUM.DECREASE : OPERATORS_ENUM.INCREASE
    await walletService.updateWalletBalance(operation.wallet, operation.amount, operator)
    return new OperationDto(operation)
  }

  async editOperation(id: string, updatedOperation: Operation) {
    const operation = await OperationModel.findById(id)
    const operator1 = operation.type === OPERATION_TYPES_ENUM.EXPENSE ? OPERATORS_ENUM.DECREASE : OPERATORS_ENUM.INCREASE
    const operator2 = operation.type === OPERATION_TYPES_ENUM.EXPENSE ? OPERATORS_ENUM.INCREASE : OPERATORS_ENUM.DECREASE
    await walletService.updateWalletBalance(operation.wallet, operation.amount, operator2)
    await operation.update(updatedOperation)
    await walletService.updateWalletBalance(updatedOperation.wallet, updatedOperation.amount, operator1)
    return new OperationDto(operation)
  }

  async deleteOperation(id: string) {
    const operation = await OperationModel.findByIdAndDelete(id)
    const operator = operation.type === OPERATION_TYPES_ENUM.EXPENSE ? OPERATORS_ENUM.INCREASE : OPERATORS_ENUM.DECREASE
    await walletService.updateWalletBalance(operation.wallet, operation.amount, operator)
    return new OperationDto(operation)
  }

  async getOperationsStatistics(userId: string, type: string, startDate: string, finishDate?: string) {
    const operations = await OperationModel.find({
      user: userId,
      type: type,
      date: {
        $gte: dayjs(startDate),
        $lt: finishDate ? dayjs(finishDate) : dayjs(startDate),
      },
    }, 'category amount currency')

    const convertedOperations = await Promise.all(
      operations.map(async operation => {
        const convertResp = await axios.get(`${currencyApiUrl}${convert(operation.currency, 'USD')}`)
        const convertRate = convertResp.data.info.rate
        const convertedAmount = Math.round(convertRate * operation.amount * 100) / 100
        return { category: operation.category, amount: convertedAmount, currency: 'USD' }
      })
    )

    const categories = await categoryService.getUserCategories(userId, type)

    const result = categories.map(category => {
      const value = convertedOperations
        .filter(operation => operation.category === category.name)
        .reduce((prev, curr) => {
          return prev + curr.amount
        }, 0)
      return { name: category.name, value }
    })

    return result
  }

  async deleteAllWalletOperations(walletId: string) {
    await OperationModel.deleteMany({wallet: walletId})
    return
  }

  getDayOperationsByPeriod(operations: Operation[], startDate: string, finishDate: string): DayOperationsI[] {
    const dayjsStartDate = dayjs(startDate)
    const dayjsFinishDate = dayjs(finishDate)
    const daysTemplateArr = Array(dayjsFinishDate.diff(dayjsStartDate, 'day') + 1).fill(null)

    const result = daysTemplateArr.map((item, index) => {
      const date = dayjsStartDate.add(index, 'day')
      const dayOperations = operations.filter(operation =>
        dayjs(operation.date).isSame(date, 'day')
      )
      const dayOperationsDto = dayOperations.map(operation => new OperationDto(operation))
      const sum = dayOperations.reduce((prev, curr) => prev + curr.amount, 0)
      return { date, operations: dayOperationsDto, sum }
    })

    return result
  }
}

export const operationService = new OperationService();
