import { Injectable } from '@angular/core';
import { List, Task } from "./models.interface";
import { ApiService } from './api.service';
import { Router } from '@angular/router';
import { async } from 'q';

@Injectable({
  providedIn: 'root'
})



export class DataManagerService {
  
  constructor(private api: ApiService, private router: Router) { }
  
  data: {lists: Array<List>} = {
    lists:[]
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
}
  
  deleteList(listId:number){ 
    this.api.deleteList(listId).then(res => {
      this.loadDataFromBackend();
    
    this.api.deleteTaskAll(listId).catch(()=>this.loadDataFromBackend());  
    });
  
  }

  


  addNewTask(listId:number,text:string){
    this.api.addTask(listId,text).then(res=> this.loadDataFromBackend());
  }

  deleteTask(task1: Task){
  let listToClean = this.buscaIdLista(task1.listId);
  this.data.lists[listToClean].tasks = this.data.lists[listToClean]
        .tasks
        .filter((task)=> task1.taskId !== task.taskId);
  
    
  }

  deleteTaskAll(idList:number){
    /*
      AUNQUE SE CARGA EN EL CATCH, ES CORRECTA.
    */
    this.api.deleteTaskAll(idList).catch(res=>this.loadDataFromBackend());
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

  changeTaskCompleted(task:Task){
    task.completed = !task.completed;  
  }

  editListName(idList:number,listText:string){
    this.api.editList(idList,listText).then(res=> this.loadDataFromBackend());
  }

  editTaskText(taskId:number,taskText:string){
    this.api.editTask(taskId,taskText).then(res=> this.loadDataFromBackend());
  }

  changeColor(task:Task, color1:string){
    task.color = color1;
    console.log(task.color);
    
  }

  


}
