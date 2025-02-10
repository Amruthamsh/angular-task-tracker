import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UiService } from '../../services/ui.service';
import { Subscription } from 'rxjs';
import { Task } from '../../Task';

@Component({
  selector: 'app-add-task',
  imports: [ReactiveFormsModule],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css',
})
export class AddTaskComponent {
  @Output() onAddTask: EventEmitter<Task> = new EventEmitter();

  addTaskForm = new FormGroup({
    text: new FormControl(''),
    day: new FormControl(''),
    reminder: new FormControl(false),
  });

  showAddTask!: boolean;
  subscription!: Subscription;

  constructor(private uiService: UiService) {
    this.subscription = this.uiService
      .onToggle()
      .subscribe((value) => (this.showAddTask = value));
  }

  onSubmit() {
    if (!this.addTaskForm.value.text) {
      alert('Please add a task!');
      return;
    }

    if (!this.addTaskForm.value.day) {
      alert('Please add a day!');
      return;
    }

    const newTask: Task = {
      text: this.addTaskForm.value.text,
      day: this.addTaskForm.value.day,
      reminder: this.addTaskForm.value.reminder || false,
    };

    this.onAddTask.emit(newTask);

    console.log('Form Submitted');
    this.addTaskForm.reset();
  }
}
