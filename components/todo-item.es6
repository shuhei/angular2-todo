import {TodoStore} from 'services/todo-store';
import {Component, Template} from 'angular2/angular2';

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
export class TodoItemComponent {
  store: TodoStore;

  constructor(store: TodoStore) {
    this.store = store;
  }

  toggle() {
    this.store.toggleDone(this.todo);
  }
}
