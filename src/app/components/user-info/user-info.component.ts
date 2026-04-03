import { Component } from '@angular/core';
import {MaterialModule} from '../../materials/material.core';
import {TotalCardComponent} from './total-card/total-card.component';
import {SettingsComponent} from './settings/settings.component';

@Component({
  selector: 'app-user-info',
  imports: [MaterialModule, TotalCardComponent, SettingsComponent],
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.css'
})
export class UserInfoComponent {

}
