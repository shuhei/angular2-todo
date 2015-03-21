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
    this.store.toggleDone(this.todo);
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
    <template [if]="hasUndone"><p>{{ undoneCount }} todos left.</p></template>
    <template [if]="!hasUndone"><p>Yay, no todos left!</p></template>
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
    this.store.addChangeListener(this.update.bind(this));

    this.store.add({ description: 'foo', done: false });
    this.store.add({ description: 'bar', done: false });

    this.update();
  }

  update() {
    this.todos =  this.store.getAll();
    this.undoneCount = this.store.countUndone();
    this.hasUndone = this.undoneCount > 0;
  }
}

bootstrap(TodoListComponent);
