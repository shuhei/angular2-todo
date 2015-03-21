import {Component, Template, Foreach, bootstrap} from 'angular2/angular2';

@Component({
  selector: 'todo-item',
  bind: {
    'todo': 'todo'
  }
})
@Template({
  inline: `
    <li [class.done]="todo.done">
      <input type="checkbox"
             (click)="toggle()"
             [checked]="todo.done">
      {{ todo.name }}
    </li>
    <style>
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
  selector: 'todo-list'
})
@Template({
  inline: `
    <h1>Todo</h1>
    <p>{{ countLeft() }} todos left</p>
    <ul>
      <todo-item *foreach="#todo in todos" [todo]="todo"></todo-item>
    </ul>
  `,
  directives: [Foreach, TodoItemComponent]
})
class TodoListComponent {
  constructor() {
    this.todos = [
      { name: 'foo', done: false },
      { name: 'bar', done: false }
    ];
  }

  countLeft() {
    return this.todos.filter((t) => !t.done).length;
  }
}

bootstrap(TodoListComponent);
