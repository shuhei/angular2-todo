import {Component, Template, Foreach, If} from 'angular2/angular2';
import {TodoStore} from 'services/todo-store';
import {TodoItemComponent} from 'components/todo-item';
import {TodoFormComponent} from 'components/todo-form';

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
    <p *if="hasUndone">{{ undoneCount }} todos left.</p>
    <p *if="!hasUndone">Yay, no todos left!</p>
  `,
  directives: [
    Foreach,
    If,
    TodoItemComponent,
    TodoFormComponent
  ]
})
export class TodoListComponent {
  store: TodoStore;

  constructor(store: TodoStore) {
    this.store = store;
    this.store.addChangeListener(this.update.bind(this));

    this.store.add({ description: 'foo', done: false });
    this.store.add({ description: 'bar', done: false });

    this.update();
  }

  // React-like re-rendering. Actually we don't need to do this if we put
  // everything in expressions.
  update() {
    this.todos =  this.store.getAll();
    this.undoneCount = this.store.countUndone();
    this.hasUndone = this.undoneCount > 0;
  }
}
