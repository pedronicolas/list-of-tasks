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

  getLists(){
    const options = {headers:{ Authorization: `Bearer ${this.jwt}`}}; 
    this.http
      .get('https://apitrello.herokuapp.com/list', options)
      .toPromise()
      .then(console.log)
      .catch(console.error);
  }

  
}
