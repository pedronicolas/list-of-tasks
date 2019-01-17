import { Injectable } from '@angular/core';
import { List, Task } from "./models.interface";
import { listLazyRoutes } from '@angular/compiler/src/aot/lazy_routes';

@Injectable({
  providedIn: 'root'
})

export class DataManagerService {
  data: {lists: Array<List>} = {
    lists:[
      {
        listId:0,
        createdAt: new Date(),
        modifiedAt: new Date(),
        name:'to do',
        tasks:[
          {
            listId:0,
            taskId:0,
            text:'aprender angular',
            description: '',
            completed: false,
            color:'white',
            createdAt: new Date(),
            modifiedAt: new Date()
          }
        ]
      }
    ]

  }

  getData(){
    return this.data;
  }
  
  addNewList(name:string){
    const now = new Date();
    const newList: List = {
      listId:Date.now(),
      createdAt: now,
      modifiedAt: now,
      name,
      tasks:[],
  }
  this.data.lists.push(newList);
}
  
  deleteList(listId:number){
    this.data.lists = this.data.lists.filter(list=> list.listId !== listId)
  }



  addNewTask(listId:number,text:string){
    const now = new Date();
    const newTask = 
      {
        listId,
        taskId:Date.now(),
        text,
        description: '',
        completed: false,
        color:'white',
        createdAt: now,
        modifiedAt: now,
      };
    
   this.data.lists[this.buscaIdLista(listId)].tasks.push(newTask);
  }

  deleteTask(task1: Task){
  let listToClean = this.buscaIdLista(task1.listId);
  this.data.lists[listToClean].tasks = this.data.lists[listToClean]
        .tasks
        .filter((task)=> task1.taskId !== task.taskId);
  
    
  }

  buscaIdLista(id:number){ 
    let contador = 0;
    for(let id2 of this.data.lists){
      if(id2.listId === id){
        return contador;
      }
      contador ++;
    }
  }


  addNewDescription(task:Task, description:string){
    task.description = description;
  }



  changeTaskCompleted(task:Task){
    task.completed = !task.completed;
    if (task.completed===true){
      console.log('true');
    }
  }

constructor() { }
}
