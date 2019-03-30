/*
  This component shows as login popup
  - Validate the login details
  - if UID/PWD is valid, then login the application and notify the parent
*/
import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-login-popup',
  templateUrl: './login-popup.component.html',
  styleUrls: ['./login-popup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class LoginPopupComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private fb: FormBuilder,
    private dialogRef: MatDialogRef<LoginPopupComponent>,
    @Inject(MAT_DIALOG_DATA) private loginResult: boolean) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      userId: ['', Validators.required],
      password: ['', Validators.compose([Validators.required,
      Validators.pattern('[a-z0-9]*')
      ])
      ]
    });
  }

  // convenience getter for easy access to form fields
  // tslint:disable-next-line:typedef
  get frm() { return this.loginForm.controls; }

  /**
   * Rest the login form
   * @returns void
   */
  resetForm = (): void => this.loginForm.reset();

  /**
  * handle login
  * Check if from is valid OR not
  * if from is valid then continue Otherwise show error
  */
  loginClicked = () => {
    if (this.loginForm.valid) {
      this.loginResult = true;
      this.dialogRef.close(this.loginResult);
    }

  }
}
