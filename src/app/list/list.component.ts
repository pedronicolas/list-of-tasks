import { Component, OnInit, Input } from '@angular/core';
import { List } from '../models.interface';
import { DataManagerService } from '../data-manager.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
@Input() list: List;
editing = false;  
oldName:string;
constructor(private dataService:DataManagerService) { }

  delete(){
  if(confirm('Do you want to delete the list: ' + this.list.name)){
    this.dataService.deleteList(this.list.listId);}  
  }

  addNewTask(ev){
    if(ev.target.value.trim()!== ''){
      this.dataService.addNewTask(this.list.listId,ev.target.value.trim());
      ev.target.value = '';  
    }  
    
  }
  editName(){
    this.oldName = this.list.name;
    this.dataService.editListName(this.list.listId,this.list.name);
    this.editing = false;
  }
  edit(){
    this.oldName = this.list.name;
    this.editing = true;
  }

  cancelEdit(){
    this.list.name = this.oldName;
    this.editing = false;
  }
}

