import { ManageToDoService } from './manage-to-do.service';
import { ToDo } from './to-do';

describe('ManageToDService', () => {
    let service: ManageToDoService;
    const fakeTodos = [1, 2, 3, 4].map(x => <ToDo>{
        id: x,
        title: 'todo ' + x,
        isCompleted: false
    });
    
    beforeEach(() => {
        spyOn(localStorage.__proto__, 'getItem').and.returnValue(JSON.stringify(fakeTodos));
        service = new ManageToDoService();
    });


    it('should return the saved Todos', () => {
        service.allToDos.subscribe((x: ToDo[]) => {
            expect(localStorage.__proto__.getItem).toHaveBeenCalled();
            expect(x.length).toBe(fakeTodos.length);

        });
    });

    it('should add new todo in list ', () => {
        service.getSavedTodos();
        service.addNewTodo(<ToDo>{ title: `todo ${6}`, isCompleted: false });
        service.allToDos.subscribe((x: ToDo[]) => {
            expect(x.length).toBe(fakeTodos.length + 1);
        });
    });

    it('should delete the todo in list', () => {
        service.getSavedTodos();
        service.deleteTodoById(1);
        service.allToDos.subscribe((x: ToDo[]) => {
            expect(x.length).toBe(fakeTodos.length - 1);
        });
    });


})
