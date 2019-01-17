import { Component, OnInit, Input } from '@angular/core';
import { List } from '../models.interface';

@Component({
  selector: 'app-show-list',
  templateUrl: './show-list.component.html',
  styleUrls: ['./show-list.component.scss']
})
export class ShowListComponent implements OnInit {
  @Input() lists: Array<List>;
  constructor() { }

  ngOnInit() {
  }

}
