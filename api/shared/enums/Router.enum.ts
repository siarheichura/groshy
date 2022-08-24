export enum ROUTER_ENUM {
  BASE = '/api/groshy',

  REGISTRATION = '/registration',
  LOGIN = '/login',
  LOGOUT = '/logout',
  ACTIVATE = '/activate',
  REFRESH = '/refresh',
  USER = '/user',
  UserUpdate = '/user-update',
  ChangePassword = '/change-password',

  Wallets = '/wallets',
  Expense = '/expense',
  ExpenseStatistics = '/expense/statistics',
  FirstExpense = '/expense-first',
  Income = '/income',
  IncomeStatistics = '/income/statistics',
  FirstIncome = '/income-first',
  Categories = '/categories',

  Img = '/img',

  WALLETS = '/wallets',
  WALLET = '/wallet',
  OPERATIONS = '/operations',
  CATEGORIES = '/categories',
  BASIC_CATEGORIES = '/basiccategories',
  STATISTICS = '/statistics',

  // DYNAMIC
  LINK = ':/link',
  TYPE = '/:type',
  WALLET_ID = '/:walletId',
  USER_ID = '/:userId',
  OPERATION_ID = '/:operationId',
  CATEGORY_ID = '/:categoryId',
  START_DATE = '/:startDate',
  FINISH_DATE = '/:finishDate',
}
