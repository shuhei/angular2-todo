import {Component, Template, bootstrap} from 'angular2/angular2';
import {TodoListComponent} from 'components/todo-list';

@Component({
  selector: 'todo-app'
})
@Template({
  inline: `
    <div>
      <todo-list></todo-list>
    </div>

    <style>
      div {
        padding: 0.5em 1em;
        margin: 2em auto;
        width: 30em;
      }
    </style>
  `,
  directives: [TodoListComponent]
})
class TodoApp {
}

bootstrap(TodoApp);
