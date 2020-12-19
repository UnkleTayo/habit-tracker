import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Habit } from './models/habit';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'habit-tracker';
  adding: boolean = false;
  editing: boolean = false;
  editingIndex: number;

  habitForm = new FormGroup({
    name: new FormControl(''),
    frequency: new FormControl(''),
    description: new FormControl(''),
  });

  public habits: Habit[] = JSON.parse(localStorage.getItem('Habits')) || [];

  onSubmit() {
    const habit = this.habitForm.value as Habit;

    if (this.editing) {
      this.habits.splice(this.editingIndex, 1, habit);
      localStorage.setItem('Habits', JSON.stringify(this.habits));
    } else {
      this.habits.push(habit);
      localStorage.setItem('Habits', JSON.stringify(this.habits));
    }

    this.editing = false;
    this.adding = false;
    this.exitForm();
  }

  setEditForm(habit: Habit, index: number) {
    this.habitForm.patchValue({
      name: habit.name,
      frequency: habit.frequency,
      description: habit.description,
    });
    this.editing = true;
    this.editingIndex = index;
  }

  onDelete(index: number) {
    const remainingHabits: Habit[] = this.habits.splice(index, 1);
    localStorage.setItem('Habits', JSON.stringify(this.habits));
  }

  exitForm() {
    this.adding = false;
    this.editing = false;
    this.habitForm.reset();
  }

  ngOnInit() {}
}
