
/*
  This component is responsible for:
    - Create new To-do
    - show the to-do category in drop down
*/
import { Component, OnInit, Inject, ChangeDetectionStrategy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ToDo, ToDoEnum } from '../to-do';
@Component({
  selector: 'app-to-do-item',
  templateUrl: './to-do-item-popup.component.html',
  styleUrls: ['./to-do-item-popup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ToDoItemPopupComponent implements OnInit {
  TodoCategories: Array<TodoCategoriesDropDown> = [];
  constructor(private dialogRef: MatDialogRef<ToDoItemPopupComponent>, @Inject(MAT_DIALOG_DATA) private newTodo: ToDo) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    // Generate the drop down values
    this.TodoCategories.push(<TodoCategoriesDropDown>{ key: 'Public', value: ToDoEnum.PUBLIC });
    this.TodoCategories.push(<TodoCategoriesDropDown>{ key: 'Family', value: ToDoEnum.FAMILY });
    this.TodoCategories.push(<TodoCategoriesDropDown>{ key: 'Friend', value: ToDoEnum.FRIEND });
    this.TodoCategories.push(<TodoCategoriesDropDown>{ key: 'Personal', value: ToDoEnum.PERSONAL });
  }

  /**
   * AddTodo button click handler
   */
  addTodo = () => {
    this.dialogRef.close(this.newTodo);
  }
}

/*
  Todo drop down list interface
*/
export interface TodoCategoriesDropDown {
  key: string;
  value: ToDoEnum;
}
