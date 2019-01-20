import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  jwt:string;
  constructor(private http:HttpClient) { }

  register(username, password){
   return this.http.post('https://apitrello.herokuapp.com/users',{username,password})
    .toPromise();
    
  }

  login(username,password){
    const body = {username,password};
    return new Promise((resolve,reject)=>{
      this.http.post('https://apitrello.herokuapp.com/users/login',body)
    .toPromise()
    .then(result =>{
      console.log('then',result);
      reject('USER NOT FOUND');
    })
    .catch(maybeNotAnError=>{
      console.log('catch',maybeNotAnError);
      if(maybeNotAnError.status === 200){
        const jwt = maybeNotAnError.error.text;
        this.jwt = jwt;
        resolve(200);
        
      } else if (maybeNotAnError.status ===401) {
        reject('PASSWD INCORRECT');
      } else{
        reject('TRY AGAIN');
      }
      
    })
    })
    
  }

  getLists(): any {
    const options = { headers: { Authorization: `Bearer ${this.jwt}` } };
    return this.http.get('https://apitrello.herokuapp.com/list', options).toPromise();
  }

  getTasks(idlist: number): any {
    const options = { headers: { Authorization: `Bearer ${this.jwt}` } };
    return new Promise((resolve, reject) => {
      this.http
        .get('https://apitrello.herokuapp.com/list/tasks/' + idlist, options)
        .toPromise()
        .then(tasks => {
          if (tasks) {
            resolve(tasks);
          } else {
            resolve([]);
          }
        })
        .catch(error => {
          console.log(error);
          resolve([]);
        });
    });
  }
/*
        FUNCIONES PARA LISTAS.
*/

  newList(name:string):any{
    const options = {headers:{ Authorization: `Bearer ${this.jwt}`}}; 
    const body = { name };
    return this.http
    .post('https://apitrello.herokuapp.com/list/',body, options).toPromise();
  }

  deleteList(id:number):any{
    const options = {headers:{ Authorization: `Bearer ${this.jwt}`}};
    return this.http.delete('https://apitrello.herokuapp.com/list/' + id, options)
    .toPromise();
  }

  editList(idList:number,listText:string){
    const options = {headers:{ Authorization: `Bearer ${this.jwt}`}};
    const body = {name: listText};
    return this.http.put('https://apitrello.herokuapp.com/list/'+idList,body,options)
    .toPromise();
  }


  /*
        FUNCIONES PARA TAREAS.
  */
  addTask(idList:number, task:string){
    const options = {headers:{ Authorization: `Bearer ${this.jwt}`}}; 
    const body = { idlist:idList , task };
    return this.http.post('https://apitrello.herokuapp.com/tasks',body,options).toPromise();
  }

  editTask(idTask:number,task:string){
    const options = {headers:{ Authorization: `Bearer ${this.jwt}`}};
    const body = {task};
    //console.log('ok');
    return this.http.put('https://apitrello.herokuapp.com/tasks/'+idTask,body,options).toPromise();
    
  }

  deleteTaskAll(idList:number){
    const options = {headers:{ Authorization: `Bearer ${this.jwt}`}};
    return this.http.delete('https://apitrello.herokuapp.com/list/tasks/'+ idList,options).toPromise();
  }
}
