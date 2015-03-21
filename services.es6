export class TodoStore {
  constructor() {
    super();
    this.todos = [];
  }

  add(todo) {
    this.todos.push(todo);
  }

  countUndone() {
    return this.todos.filter((t) => !t.done).length;
  }
}
