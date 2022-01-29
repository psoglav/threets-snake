export default class KeyBinding {
  bindings: Record<string, Function> = {}

  constructor() {
    window.addEventListener('keydown', (e) => {
      this.listener(e)
    })
  }

  bind(fn: Function, key: string) {
    this.bindings[key] = fn
  }

  listener(e: KeyboardEvent) {
    let action = this.bindings[e.key]
    if (action) action()
  }
}
