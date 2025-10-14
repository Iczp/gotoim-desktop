/* eslint-disable @typescript-eslint/no-unsafe-function-type */
export const eventBus = {
  // 事件总线
  $emit(eventName: string, ...args: any[]) {
    this[eventName]?.forEach((fn) => fn(...args))
  },
  $on(eventName: string, callback: Function) {
    if (!this[eventName]) this[eventName] = []
    this[eventName].push(callback)
  },
  $off(eventName: string, callback?: Function) {
    const callbacks = this[eventName]
    if (callbacks && !callback) {
      delete this[eventName]
    }
  },
}
