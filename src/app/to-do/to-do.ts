// ToDo Interface
export interface ToDo {
  id?: number;
  title: string;
  isCompleted?: boolean;
  category: ToDoEnum;

}

// Todo Enum
export enum ToDoEnum {
  PUBLIC = 'Public',
  PERSONAL = 'Personal',
  FAMILY = 'Family',
  FRIEND = 'Friend'
}
