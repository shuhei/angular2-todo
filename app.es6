import {TodoStore} from 'services';
import {Component, Template, Foreach, If, bootstrap} from 'angular2/angular2';

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
  store: TodoStore;

  constructor(store: TodoStore) {
    this.store = store;
  }

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
    if (!this.description) {
      return;
    }
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
    <p *if="hasUndone()">{{ countUndone() }} todos left.</p>
    <p *if="!hasUndone()">Yay, no todos left!</p>
  `,
  directives: [
    Foreach,
    If,
    TodoItemComponent,
    TodoFormComponent
  ]
})
class TodoListComponent {
  store: TodoStore;

  constructor(store: TodoStore) {
    this.store = store;
    this.todos = this.store.todos;

    this.store.add({ description: 'foo', done: false });
    this.store.add({ description: 'bar', done: false });
  }

  countUndone() {
    return this.store.countUndone();
  }

  hasUndone() {
    return this.store.countUndone() > 0;
  }
}

bootstrap(TodoListComponent);
