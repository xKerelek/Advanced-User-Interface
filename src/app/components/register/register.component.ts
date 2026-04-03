import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';
import {MaterialModule} from '../../materials/material.core';


@Component({
  selector: 'app-register',
  imports: [
    RouterLink,
    MaterialModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

}
