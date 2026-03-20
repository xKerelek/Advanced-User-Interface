import { Routes } from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {AddTodoFormComponent} from './components/add-todo-form/add-todo-form.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'add-todo', component: AddTodoFormComponent, },
  { path: '**', redirectTo: ''},
];
