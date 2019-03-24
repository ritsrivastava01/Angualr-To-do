import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { TodoModule } from './to-do/to-do.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule, MatIconModule, MatSnackBarModule } from '@angular/material';
import { HeaderModule } from './header/header.module';


@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    TodoModule,
    HeaderModule
  ],

  declarations: [AppComponent],
  bootstrap: [AppComponent]
})

export class AppModule { }
