import {TodoStore} from 'services/todo-store';
import {Component, Template} from 'angular2/angular2';

@Component({
  selector: 'todo-item',
  bind: {
    'todo': 'todo'
  }
})
@Template({
  url: 'components/todo-item.html'
})
export class TodoItemComponent {
  store: TodoStore;

  constructor(store: TodoStore) {
    this.store = store;
  }

  toggle() {
    this.store.toggleDone(this.todo);
  }

  delete() {
    this.store.delete(this.todo);
  }
}
