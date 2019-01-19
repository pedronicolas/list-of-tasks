import { Injectable } from '@angular/core';
import { List, Task } from "./models.interface";
import { listLazyRoutes } from '@angular/compiler/src/aot/lazy_routes';
import { ApiService } from './api.service';
import { Router } from '@angular/router';
import { async } from 'q';

@Injectable({
  providedIn: 'root'
})



export class DataManagerService {
  
  constructor(private api: ApiService, private router: Router) { }
  
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

  loadDataFromBackend() {
    this.api
      .getLists()
      .then((rawLists: Array<any>) => {
        console.log(rawLists);
        const lists = rawLists.map(rawList => ({
          listId: rawList.id,
          createdAt: rawList.createdAt,
          modifiedAt: rawList.updatedAt,
          name: rawList.name,
          tasks: [],
        }));
        Promise.all(
          lists.map(async (list: List) => {
            list.tasks = await this.api.getTasks(list.listId);
            list.tasks = list.tasks.map((rawTask: any) => ({
              listId: rawTask.idlist,
              taskId: rawTask.id,
              text: rawTask.task,
              completed: false,
              color: 'white',
              createdAt: new Date(rawTask.createdAt),
              modifiedAt: new Date(rawTask.updatedAt),
            }));
            return list;
          }),
        ).then(lists => {
          this.data.lists = lists;
        });
      })
      .catch(() => this.router.navigate(['/login']));
  }

  getData(){
    this.loadDataFromBackend();
    return this.data;
  }
  
  addNewList(name:string){
  this.api.newList(name)
    .then(res=>{
      console.log(res);
      this.loadDataFromBackend();
    })
  
  
    //   const now = new Date();
  //   const newList: List = {
  //     listId:Date.now(),
  //     createdAt: now,
  //     modifiedAt: now,
  //     name,
  //     tasks:[],
  // }
  // this.data.lists.push(newList);
}
  
  deleteList(listId:number){
    //this.data.lists = this.data.lists.filter(list=> list.listId !== listId)
  
    this.api.deleteList(listId).then(res => {
      this.loadDataFromBackend();
    });
  
  }

  // addTask(listId:number,task:string){
  //   this.api.addTask(listId,task).then(res=> this.loadDataFromBackend());
  // }



  addNewTask(listId:number,text:string){
    this.api.addTask(listId,text).then(res=> this.loadDataFromBackend());
    //   const now = new Date();
  //   const newTask = 
  //     {
  //       listId,
  //       taskId:Date.now(),
  //       text,
  //       description: '',
  //       completed: false,
  //       color:'white',
  //       createdAt: now,
  //       modifiedAt: now,
  //     };
    
  //  this.data.lists[this.buscaIdLista(listId)].tasks.push(newTask);
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
  }

  editListName(idList:number,listText:string){
    this.api.editList(idList,listText).then(res=> this.loadDataFromBackend());
    
    // this.data.lists = this.data.lists
    // .map(listObj=> listObj.listId === list.listId ? list : listObj);


  }

  editTaskText(taskId:number,taskText:string){
    //this.data.lists[task.listId].tasks[task.taskId].text = task.text;
    this.api.editTask(taskId,taskText).then(res=> this.loadDataFromBackend());
  }

  changeColor(task:Task, color1:string){
    task.color = color1;
    console.log(task.color);
    
  }

  


}
