import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToDoViewComponent } from './to-do-view/to-do-view.component';
import { ManageToDoService } from './manage-to-do.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToDoItemPopupComponent } from './to-do-item-popup/to-do-item-popup.component';
import { ToDoCardComponent } from './to-do-card/to-do-card.component';
import {
  MatNativeDateModule,
  MatFormFieldModule,
  MatDialogModule,
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatSelectModule,
  MatCardModule,
  MatIconModule,
  MatTooltipModule,
  MatCheckboxModule,
} from '@angular/material';


@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatButtonModule,
    MatRippleModule,
    MatSelectModule,
    MatDialogModule,
    MatTooltipModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatNativeDateModule,
    ReactiveFormsModule,
  ],
  exports: [
    ToDoViewComponent
  ],
  entryComponents: [ToDoItemPopupComponent],
  declarations: [ToDoViewComponent, ToDoItemPopupComponent, ToDoCardComponent],
  providers: [ManageToDoService]
})
export class TodoModule { }
