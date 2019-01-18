import { Component, OnInit, Input } from '@angular/core';
import { Task } from '../models.interface';
import { DataManagerService } from '../data-manager.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent  {
@Input() task: Task;
oldText: string;
editing;

  constructor(private dataService: DataManagerService ) { }

  deleteTask(){
    if(confirm('Do you want to delete the task?')){
      this.dataService.deleteTask(this.task);
    }  
  }

  addDescription(ev){
    this.dataService.addNewDescription(this.task,ev.target.value.trim());
    ev.target.value = '';
  }

  isTrue(){
      this.dataService.changeTaskCompleted(this.task);
      console.log(this.task);
      
      
  }

  editTextTask(){
    this.oldText = this.task.text;
    this.dataService.editTaskText(this.task);
    this.editing = false;
  }
  editTask(){
    this.oldText = this.task.text;
    this.editing = true;
  }

  cancelEditTask(){
    this.task.text = this.oldText;
    this.editing = false;
  }

  changeColor(ev){
      this.dataService.changeColor(this.task,ev.target.value.trim());
  }
  
}

