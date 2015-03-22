import {TodoStore} from 'services/todo-store';
import {Component, Template} from 'angular2/angular2';

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
export class TodoFormComponent {
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
