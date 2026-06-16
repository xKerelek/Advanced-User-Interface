import { Component } from '@angular/core';
import {MaterialModule} from '../../../materials/material.core';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-settings',
  imports: [MaterialModule, FormsModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent {
  email: string = 'user@example.com';
  darkMode: boolean = false;

  emailNotifications: boolean = true;
  pushNotifications: boolean = false;
  smsNotifications: boolean = false;

  publicProfile: boolean = true;
  showActivity: boolean = false;

  saveSettings() {
    console.log('Settings saved');
  }

  savePassword() {
    console.log('Password saved');
  }
}
