import {Component, Template, Foreach, bootstrap} from 'angular2/angular2';

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

class TodoStore extends Store {
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

  countLeft() {
    return this._todos.filter((t) => !t.done).length;
  }
}

@Component({
  selector: 'todo-item',
  bind: {
    'todo': 'todo'
  }
})
@Template({
  inline: `
    <li [class.done]="todo.done">
      <label>
        <input type="checkbox"
               (click)="toggle()"
               [checked]="todo.done">
        {{ todo.description }}
      </label>
    </li>

    <style>
      label {
        cursor: pointer;
      }
      .done {
        text-decoration: line-through;
      }
    </style>
  `
})
class TodoItemComponent {
  toggle() {
    this.todo.done = !this.todo.done;
  }
}

@Component({
  selector: 'todo-form'
  // TIPS: Don't put `componentServices: [TodoStore]` here. It will make another instance.
})
@Template({
  inline: `
    <input type="text" [value]="description" (keyup)="update($event)">
    <button (click)="add()">Add</button>
  `
})
class TodoFormComponent {
  store: TodoStore;
  description: string;

  constructor(store: TodoStore) {
    this.store = store;
    this.description = '';
  }

  update($event: Event) {
    const value = $event.target.value;
    this.description = value;
  }

  add() {
    this.store.add({
      description: this.description,
      done: false
    });
    this.description = '';
  }
}

@Component({
  selector: 'todo-list',
  // TODO: `componentServices` was renamed as `services` in 2.0.0-alpha.13.
  // https://github.com/angular/angular/commit/dd3e6271c259d1fb3e150a4a43bf2f3dac1413e8
  componentServices: [
    TodoStore
  ]
})
@Template({
  inline: `
    <h1>Todo</h1>
    <todo-form></todo-form>
    <ul>
      <todo-item *foreach="#todo in todos" [todo]="todo"></todo-item>
    </ul>
    <p>{{ countLeft() }} todos left</p>
  `,
  directives: [
    Foreach,
    TodoItemComponent,
    TodoFormComponent
  ]
})
class TodoListComponent {
  store: TodoStore;

  constructor(store: TodoStore) {
    this.store = store;
    // TIPS: Actually we don't need this because of change detection on `this.todos`.
    this.store.addChangeListener(this.updateTodos.bind(this));

    this.store.add({ description: 'foo', done: false });
    this.store.add({ description: 'bar', done: false });

    this.updateTodos();
  }

  countLeft() {
    return this.store.countLeft();
  }

  updateTodos() {
    this.todos =  this.store.getAll();
  }
}

bootstrap(TodoListComponent);
