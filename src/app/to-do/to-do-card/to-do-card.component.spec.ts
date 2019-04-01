import { ToDoCardComponent } from './to-do-card.component';
import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { MatCheckboxModule, MatIconModule, MatCardModule, MatIcon, MatCheckbox } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { ToDo, ToDoEnum } from '../to-do';
import { By } from '@angular/platform-browser';

describe('To-Do Component', () => {
    let component: ToDoCardComponent;
    let fixture: ComponentFixture<ToDoCardComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                FormsModule,
                MatCheckboxModule,
                MatIconModule,
                MatCardModule,
            ],
            declarations: [ToDoCardComponent]
        });
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ToDoCardComponent);
        component = fixture.componentInstance;
    });

    it('should create the component with family todo Type', () => {
        component.todo = getTodo(false, ToDoEnum.FAMILY);
        fixture.detectChanges();
        expect(component).toBeTruthy();

        const todoCategory: HTMLElement = fixture.debugElement.query(By.css('.category')).nativeElement;
        expect(todoCategory).toBeTruthy();
        expect(todoCategory.className).toContain('family');

    });

    it('should create the component with Public todo Type', () => {
        component.todo = getTodo(false, ToDoEnum.PUBLIC);
        fixture.detectChanges();
        expect(component).toBeTruthy();

        const todoCategory: HTMLElement = fixture.debugElement.query(By.css('.category')).nativeElement;
        expect(todoCategory).toBeTruthy();
        expect(todoCategory.className).toContain('public');

    });

    it('should create the component with Personal todo Type', () => {
        component.todo = getTodo(false, ToDoEnum.PERSONAL);
        fixture.detectChanges();
        expect(component).toBeTruthy();

        const todoCategory: HTMLElement = fixture.debugElement.query(By.css('.category')).nativeElement;
        expect(todoCategory).toBeTruthy();
        expect(todoCategory.className).toContain('personal');

    });

    it('should create the component with Friend todo Type', () => {
        component.todo = getTodo(false, ToDoEnum.FRIEND);
        fixture.detectChanges();
        expect(component).toBeTruthy();

        const todoCategory: HTMLElement = fixture.debugElement.query(By.css('.category')).nativeElement;
        expect(todoCategory).toBeTruthy();
        expect(todoCategory.className).toContain('friend');

    });

    it('should emit the todo with updated value', () => {
        spyOn(component.todoUpdated, 'emit');
        component.todo = getTodo(false, ToDoEnum.FRIEND);
        expect(component.todo.isCompleted).toBe(false);
        fixture.detectChanges();
        const checkboxCompleteHTML: HTMLInputElement = fixture.debugElement.query(By.directive(MatCheckbox)).nativeElement;
        const inputElement = <HTMLInputElement>checkboxCompleteHTML.querySelector('input');
        inputElement.click();
        fixture.detectChanges();
        expect(component.todo.isCompleted).toBe(true);
        expect(component.todoUpdated.emit).toHaveBeenCalledWith(component.todo);
    });

    it('should emit the todo for delete ', () => {
        spyOn(component.deleteClicked, 'emit');
        component.todo = getTodo(false, ToDoEnum.FRIEND);
        fixture.detectChanges();
        const deleteButton: HTMLElement = fixture.debugElement.query(By.directive(MatIcon)).nativeElement;
        deleteButton.click();
        expect(component.deleteClicked.emit).toHaveBeenCalledWith(component.todo);
    });

    function getTodo(completed: boolean, todoType: ToDoEnum): ToDo {
        return <ToDo>{
            id: 1,
            title: 'todo1',
            isCompleted: completed,
            category: todoType

        };
    }
})