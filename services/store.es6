export class Store {
  constructor() {
    this._listeners = [];
  }

  addChangeListener(listener) {
    this._listeners.push(listener);
  }

  emitChange() {
    this._listeners.forEach((listener) => {
      listener();
    });
  }
}
