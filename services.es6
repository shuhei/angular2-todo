class Store {
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

// TODO: Use unique ID.
export class TodoStore extends Store {
  constructor() {
    super();
    this._todos = [];
  }

  add(todo) {
    this._todos.push(todo);
    this.emitChange();
  }

  getAll() {
    return this._todos;
  }

  countUndone() {
    return this._todos.filter((t) => !t.done).length;
  }

  toggleDone(todo) {
    todo.done = !todo.done;
    this.emitChange();
  }
}
