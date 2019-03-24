/*
  This Service is performed below functions:
    - fetched the save to-dos
    - save the new to-do in list and emits as Observer
    - Delete the any todo and emits as Observer
    - Update the status of to-do(complete/un-complete) and emits as Observer
*/
import { Injectable } from '@angular/core';
import { ToDo } from './to-do';
import { Subject } from 'rxjs';

@Injectable()
export class ManageToDoService {

  constructor() { }
  // Placeholder for last id so we can simulate
  // automatic incrementing of id's
  lastId = 0;
  private todoList: ToDo[] = [];
  public allToDos: Subject<ToDo[]> = new Subject<ToDo[]>();

  /**
   * Add the new todo in the list
   * @param  {ToDo} todo? ==> new todo
   * @returns ToDo ==> newly added Todo
   */
  public addNewTodo = (todo?: ToDo): ToDo => {
    // New Todo
    if (!todo.id) {
      todo.id = ++this.lastId;
      todo.isCompleted = false;
      this.todoList.push(todo);
    }
    this.saveLocalStorage();
    return todo;
  }

  /**
   * Delete the Todo
   * @param  {number} id==> todo id
   * @returns boolean ==> return status
   */
  public deleteTodoById = (id: number): boolean => {
    let deleted = false;
    const todoToBeRemove = this.todoList.findIndex(x => x.id === id);
    if (todoToBeRemove > -1) {
      this.todoList.splice(todoToBeRemove, 1);
      deleted = true;
    }
    this.saveLocalStorage();
    return deleted;
  }

  /**
   * used to toggleTodo Status
   * @param  {ToDo} todo==> Todo
   * @returns ToDo ==> updated todo
   */
  public toggleTodoComplete = (todo: ToDo): ToDo => {
    let todoToBeUpdate = this.todoList.find(x => x.id === todo.id);
    todoToBeUpdate = todo;
    this.saveLocalStorage();
    return todoToBeUpdate;
  }

  /**
  * Used to get the saved todo list from local Storage
  */
  getSavedTodos = (): void => {
    if (this.hasItem('todo')) {
      this.todoList = JSON.parse(localStorage.getItem('todo'));
      // add a bit delay before emits the value
      setTimeout(() => {
        this.notifyReceivers();
      });

    }
  }

  /**
   * Remove the all save tos- in local storage  and local list (todoList)
   */
  removeAllTodos = (): void => {
    this.todoList = [];
    // remove all saved todos as well
    localStorage.removeItem('todo');
  }

  /**
  * Check the list already saved in local storage OR not
  * @param  {string} key
  * @returns boolean
  */
  private hasItem = (key: string): boolean => (localStorage.getItem(key) !== null);

  /**
   * used to save the local storage
   * @returns void
   */
  private saveLocalStorage = (): void => {
    if (this.hasItem('todo')) {
      localStorage.removeItem('todo');
    }
    this.notifyReceivers();
    localStorage.setItem('todo', JSON.stringify(this.todoList));
  }

  /**
   * Notify the updated todo list
   */
  private notifyReceivers = () => this.allToDos.next(this.todoList);
}
