import { Component, ChangeDetectionStrategy } from '@angular/core';


@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  loginDone: boolean;
  constructor() { }

  /**
   * used to save the login details
   * @param  {boolean} data
   */
  handleLoginDone = (data: boolean) => this.loginDone = data;


}
