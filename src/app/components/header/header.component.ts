import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {MaterialModule} from '../../materials/material.core';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
    RouterLinkActive,
    MaterialModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

}
