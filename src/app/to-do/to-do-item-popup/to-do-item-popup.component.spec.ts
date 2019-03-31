import { async } from 'q';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ToDoItemPopupComponent } from './to-do-item-popup.component';
import { MatFormFieldModule, MatInputModule, MatSelectModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


// mock the dialogDataRef
const dialogDataRef = {
    close: () => { }
};

describe('To-do popup component', () => {
    let component: ToDoItemPopupComponent;
    let fixture: ComponentFixture<ToDoItemPopupComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                FormsModule,
                MatFormFieldModule,
                MatInputModule,
                MatSelectModule,
                BrowserAnimationsModule
            ],
            declarations: [
                ToDoItemPopupComponent
            ],
            providers: [
                { provide: MAT_DIALOG_DATA, useValue: {} },
                { provide: MatDialogRef, useValue: dialogDataRef }
            ]
        }).compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(ToDoItemPopupComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
})