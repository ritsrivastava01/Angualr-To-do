/*
  This component is perform below feature:
    - show the to-do as card
    - notify the pared if todo is deleted/updated
*/
import { Component, Input, EventEmitter, Output, ChangeDetectionStrategy } from '@angular/core';
import { ToDo, ToDoEnum } from '../to-do';

@Component({
  selector: 'app-to-do-card',
  templateUrl: './to-do-card.component.html',
  styleUrls: ['./to-do-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToDoCardComponent {
  // Local variables
  ToDoEnum = ToDoEnum;
  @Input() todo: ToDo;
  @Output() deleteClicked: EventEmitter<ToDo> = new EventEmitter();
  @Output() todoUpdated: EventEmitter<ToDo> = new EventEmitter();

  constructor() { }

  /**
   * Notify to parent with updated todo
   */
  todoUpdate = () => this.todoUpdated.emit(this.todo);

  /**
   * Notify to parent to delete todo
   */
  deleteTodo = () => this.deleteClicked.emit(this.todo);
}
