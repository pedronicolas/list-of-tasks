import {NgModule} from '@angular/core';
import {Routes,RouterModule} from '@angular/router';
import {BoardComponent} from './board/board.component';

const routes: Routes = [{
    path: '',
    component: BoardComponent
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
