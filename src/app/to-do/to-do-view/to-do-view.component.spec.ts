import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ToDoViewComponent } from './to-do-view.component';
import { ToDo, ToDoEnum } from '../to-do';
import { MatDialog, MatFormFieldModule, MatHint } from '@angular/material';
import { ManageToDoService } from '../manage-to-do.service';
import { Component, Input, DebugElement } from '@angular/core';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

@Component({
    selector: 'app-to-do-card',
    template: '{{todo?.title}}'
})
class ToDoCardMockComponent {
    @Input() todo: ToDo;
};

const fakeTodos = [1, 2, 3, 4].map(x => <ToDo>{
    id: x,
    title: 'todo ' + x,
    isCompleted: false
});

// mock the dialogDataRef
class MdDialogMock {
    // When the component calls this.dialog.open(...) we'll return an object
    // with an afterClosed method that allows to subscribe to the dialog result observable.
    open() {
        return {
            afterClosed: () => of([<ToDo>{
                title: 'title 6',
                isCompleted: false,
                category: ToDoEnum.FAMILY
            }])
        };
    }
};

class ToDoViewPage {
    component: ToDoViewComponent;
    componentDebug: DebugElement;
    constructor(fixture: ComponentFixture<ToDoViewComponent>) {
        this.componentDebug = fixture.debugElement;
        this.component = fixture.componentInstance;
    }

    noTodoMessageElement(): DebugElement {
        return this.componentDebug.query(By.css('.no-todo'));
    }

    matHintHTMLElement(): HTMLElement {
        return this.componentDebug.query(By.directive(MatHint)).nativeElement;
    }

    todoCardHTML(): DebugElement[] {
        return this.componentDebug.queryAll(By.directive(ToDoCardMockComponent));
    }

    getAddButton(): DebugElement {
        return this.componentDebug.query(By.css('#btn-addTodo'));
    }

}
describe('to-do view component', () => {
    let component: ToDoViewComponent;
    let fixture: ComponentFixture<ToDoViewComponent>;
    let service: ManageToDoService;
    let todoViewPage: ToDoViewPage;
    let dialog: MdDialogMock;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                MatFormFieldModule
            ],
            declarations: [
                ToDoViewComponent,
                ToDoCardMockComponent
            ],
            providers: [
                ManageToDoService,
                { provide: MatDialog, useClass: MdDialogMock }
            ]
        }).compileComponents();
        fixture = TestBed.createComponent(ToDoViewComponent);
        component = fixture.componentInstance;
        service = fixture.debugElement.injector.get(ManageToDoService);
        spyOn(localStorage.__proto__, 'getItem').and.returnValue(JSON.stringify(fakeTodos));
        // assume user logged in
        component.showContent = true;
        fixture.detectChanges();
        todoViewPage = new ToDoViewPage(fixture);
        dialog = TestBed.get(MatDialog);
    }));

    it('should create the component', () => {
        expect(Component).toBeTruthy();
        expect(todoViewPage.noTodoMessageElement().nativeElement).toBeTruthy();
        // tslint:disable-next-line:max-line-length
        expect(todoViewPage.noTodoMessageElement().nativeElement.textContent.trim()).toBe(`No To-Do Item added. Please click on 'Add' button.`);

    });

    it('should show saved todos', fakeAsync(() => {
        component.todoList = of(fakeTodos);
        fixture.detectChanges();
        tick();
        expect(component.inCompleteTodoCount).toBe(4);
        expect(todoViewPage.matHintHTMLElement().textContent.trim()).toBe('4 item left.');
    }));

    it('should add the todo in list', fakeAsync(() => {
        spyOn(dialog, 'open').and.callThrough();
        todoViewPage.getAddButton().nativeElement.click();
        fixture.detectChanges();
        tick();
        expect(dialog.open).toHaveBeenCalled();
        expect(todoViewPage.todoCardHTML().length).toBe(5);
        expect(component.inCompleteTodoCount).toBe(5);
        expect(todoViewPage.matHintHTMLElement().textContent.trim()).toBe('5 item left.');
    }));

    it('should handle the todo delete button', fakeAsync(() => {
        spyOn(service, 'deleteTodoById');
        component.todoList = of(fakeTodos);
        fixture.detectChanges();
        component.deleteToDoClicked(fakeTodos[0]);
        fixture.detectChanges();
        tick();
        expect(service.deleteTodoById).toHaveBeenCalled();
        expect(service.deleteTodoById).toHaveBeenCalledWith(fakeTodos[0].id);
        expect(service.deleteTodoById).toHaveBeenCalledTimes(1);

    }));
    it('should handle the update todo', fakeAsync(() => {
        spyOn(service, 'toggleTodoComplete');
        component.todoList = of(fakeTodos);
        fixture.detectChanges();
        component.updateTodo(fakeTodos[0]);
        fixture.detectChanges();
        tick();
        expect(service.toggleTodoComplete).toHaveBeenCalled();
        expect(service.toggleTodoComplete).toHaveBeenCalledWith(fakeTodos[0]);
        expect(service.toggleTodoComplete).toHaveBeenCalledTimes(1);

    }));




});
