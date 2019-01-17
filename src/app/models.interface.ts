export interface Task{
    listId:number,
    taskId:number,
    text:string,
    description:string,
    completed: boolean,
    color:string,
    createdAt: Date,
    modifiedAt: Date
  }
  
  
export interface List{
    listId:number,
    createdAt:Date,
    modifiedAt: Date,
    name:string,
    tasks:Array<Task>
  }

  