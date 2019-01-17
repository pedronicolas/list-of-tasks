import { Component, OnInit } from '@angular/core';
import { DataManagerService } from '../data-manager.service';
import { List } from '../models.interface';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  data: {lists: Array<List>};
  constructor(private dataManager: DataManagerService) { 

  }

  ngOnInit() {
    this.data = this.dataManager.getData();
  }

}
