import { Routes } from '@angular/router';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {AddTodoFormComponent} from './components/add-todo-form/add-todo-form.component';
import {RegisterComponent} from './components/register/register.component';
import {UserInfoComponent} from './components/user-info/user-info.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent, pathMatch: 'full' },
  { path: 'add-todo', component: AddTodoFormComponent, },
  { path: 'register', component: RegisterComponent, },
  { path: 'user-info', component: UserInfoComponent, },
  { path: '**', redirectTo: ''},
];
