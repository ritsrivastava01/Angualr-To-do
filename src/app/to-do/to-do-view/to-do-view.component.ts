/*
This component is used to show the list of to-dos by using
  - shows the to-dos in list card layout
  - This is responsible for handling the new/delete/update the to-do
*/

import { Component, Input, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ToDo } from '../to-do';
import { ToDoItemPopupComponent } from '../to-do-item-popup/to-do-item-popup.component';
import { ManageToDoService } from '../manage-to-do.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-to-do-view',
  templateUrl: './to-do-view.component.html',
  styleUrls: ['./to-do-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ToDoViewComponent implements OnInit {
  @Input() showContent: boolean;

  // todoList is Observable and listen any update on to-do list
  todoList: Observable<ToDo[]> = this.manageTodoService.allToDos;
  inCompleteTodoCount = 0;

  constructor(private dialog: MatDialog, private manageTodoService: ManageToDoService) { }

  ngOnInit() {
    // Get all saved to-do in last session
    this.manageTodoService.getSavedTodos();

    // Find the incomplete todo count
    this.todoList.subscribe((list: ToDo[]) => {
      this.inCompleteTodoCount = list.filter((x: ToDo) => x.isCompleted === false).length;
    });
  }

  /**
   * Use to open the TO DO dialog
   * @returns void
   */
  openToDoItemDialog = (): void => {
    const dialogRef = this.dialog.open(ToDoItemPopupComponent, {
      width: '300px',
      height: '300px',
      data: {}
    });

    // after close the popup, add new to-do in list
    dialogRef.afterClosed().subscribe((result: ToDo) => {
      if (result) {
        this.manageTodoService.addNewTodo(result);
      }
    });
  }

  /**
   * Delete button handler
   * @param  {ToDo} todo ==>  todo toBe delete
   */
  deleteToDoClicked = (todo: ToDo) => this.manageTodoService.deleteTodoById(todo.id);

  /**
   * Update todo chick handler
   * @param  {ToDo} todo==> updated todo
   */
  updateTodo = (todo: ToDo) => this.manageTodoService.toggleTodoComplete(todo);

}
