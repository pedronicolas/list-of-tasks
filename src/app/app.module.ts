import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BoardComponent } from './board/board.component';
import { ShowListComponent } from './show-list/show-list.component';
import { AddNewListComponent } from './add-new-list/add-new-list.component';
import { ListComponent } from './list/list.component';
import { TaskComponent } from './task/task.component';
import { DataManagerService } from './data-manager.service';
import {FormsModule} from '@angular/forms';
import { RegisterViewComponent } from './register-view/register-view.component';
import { LoginViewComponent } from './login-view/login-view.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ApiService } from './api.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    ShowListComponent,
    AddNewListComponent,
    ListComponent,
    TaskComponent,
    RegisterViewComponent,
    LoginViewComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, HttpClientModule
  ],
  providers: [DataManagerService, ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
