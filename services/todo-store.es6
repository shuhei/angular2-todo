import {Store} from 'services/store';

// TODO: Use unique ID.
export class TodoStore extends Store {
  constructor() {
    super();
    this._todos = [];
  }

  getAll() {
    return this._todos;
  }

  countUndone() {
    return this._todos.filter((t) => !t.done).length;
  }

  add(todo) {
    this._todos.push(todo);
    this.emitChange();
  }

  toggleDone(todo) {
    todo.done = !todo.done;
    this.emitChange();
  }
}
