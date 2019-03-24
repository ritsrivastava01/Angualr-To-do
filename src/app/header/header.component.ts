/*
This component perform the below functionality:
  - Show the login popup if used is not logged in application
  - After get notification from login popup, save the login details in local storage
  - Handle the logout feature and remove the local storage and show the login popup again
  - If user already logged in then notify the parent as user already logged in
  - Notify the parent the status of login(Login OR logout)
*/
import { Component, OnInit, EventEmitter, Output, ChangeDetectionStrategy } from '@angular/core';
import { LoginPopupComponent } from './login-popup/login-popup.component';
import { MatDialog } from '@angular/material';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class HeaderComponent implements OnInit {
  name = 'To-Do';
  @Output() loginDone: EventEmitter<boolean> = new EventEmitter();
  loginStatus: boolean;

  constructor(private dialog: MatDialog, private snackBar: MatSnackBar) { }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.loginStatus = localStorage.getItem('login') ? true : false;
    if (this.loginStatus) {
      this.showSnackBar('You are already Logged in');
      this.notifyParent();
    } else {
      setTimeout(() => {
        this.openLoginPopUp();
      }, 1000);
    }

  }

  /**
   * Logout click Handler
   * @returns void
   */
  logoutClick = (): void => {
    localStorage.removeItem('login');
    // remove all saved todos as well
    localStorage.removeItem('todo');
    this.loginStatus = !this.loginStatus;
    this.showSnackBar('You Logged out successfully');
    this.notifyParent();
    this.openLoginPopUp();
  }
  /**
   * open the login popup
   */
  openLoginPopUp = () => {
    const dialogRef = this.dialog.open(LoginPopupComponent, {
      width: '300px',
      height: '300px',
      disableClose: true,
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loginStatus = result;
      localStorage.setItem('login', 'done');
      this.notifyParent();
      this.showSnackBar('You are logged in successfully');

    });


  }
  /**
   * Notify the parent if login/logout done
   * @returns void
   */
  notifyParent = (): void => this.loginDone.emit(this.loginStatus);

  /**
   * Shows the snack bar message
   * @param  {string} snackBarMessage: snackbar message
   * @returns void
   */
  private showSnackBar = (snackBarMessage: string): void => {
    setTimeout(() => {
      this.snackBar.open(snackBarMessage, null, {
        duration: 2000,
      });
    }, 500);

  }
}
