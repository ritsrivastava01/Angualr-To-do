import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatInputModule,
  MatDialogModule,
  MatToolbarModule,
  MatIconModule,
  MatSnackBarModule,
} from '@angular/material';
import { LoginPopupComponent } from './login-popup/login-popup.component';
import { HeaderComponent } from './header.component';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    MatToolbarModule,
    MatSnackBarModule,
    ReactiveFormsModule
  ],
  exports: [
    HeaderComponent
  ],
  entryComponents: [LoginPopupComponent],
  declarations: [LoginPopupComponent, HeaderComponent]
})
export class HeaderModule { }
