const getActionName = (moduleName: string, actionName: string) => `${moduleName} ${actionName}`
export const getActionNameFn = (moduleName: string) => (actionName: string) => getActionName(moduleName, actionName)
