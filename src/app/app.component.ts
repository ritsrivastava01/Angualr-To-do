import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ManageToDoService } from './to-do/manage-to-do.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  loginDone: boolean;
  constructor(private manageTodoService: ManageToDoService) { }

  /**
   * used to save the login details
   * @param  {boolean} data
   */
  handleLoginDone = (data: boolean) => {
    this.loginDone = data;
    if (!this.loginDone) {
      // Need to clear the  to-do list
      this.manageTodoService.removeAllTodos();
    }
  }


}
