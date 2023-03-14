import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Todo } from 'src/models/todo.model';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    public title = 'Minhas tarefas';
    public todos: Todo[];
    public form: FormGroup;

    constructor(
        private fb: FormBuilder
    ) {
        this.form = this.fb.group({
            title: ['', Validators.compose([
                Validators.minLength(1),
                Validators.maxLength(60),
                Validators.required,
            ])]
        });

        this.todos = JSON.parse(localStorage.getItem('todos') ?? '[]');
    }

    add() {
        const title = this.form.controls.title.value;
        const id = this.todos.length + 1;

        let todo = new Todo(title, id, false);
        this.todos.push(todo);

        this.save();
        this.clearForm();
    }

    remove(todo: Todo) {
        const index = this.todos.indexOf(todo);
        if (index !== -1) {
            this.todos.splice(index, 1);
        }
        this.save();
    }

    markAsDone(todo: Todo) {
        todo.Done = true;
        this.save();
    }

    maskAsUndone(todo: Todo) {
        todo.Done = false;
        this.save();
    }

    clearForm() {
        this.form.reset();
    }

    save() {
        localStorage.setItem('todos', JSON.stringify(this.todos));
    }
}
