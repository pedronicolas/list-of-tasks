import { Component } from '@angular/core';
import {DataManagerService} from './data-manager.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'list-of-tasks';
}
