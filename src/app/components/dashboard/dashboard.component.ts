import {Component} from '@angular/core';
import {RouterLink} from '@angular/router';
import {MatIcon} from '@angular/material/icon';
import {MaterialModule} from '../../materials/material.core';
import {MatButton} from '@angular/material/button';

import Plausible from 'plausible-tracker';

@Component({
  selector: 'app-dashboard',
  imports: [
    RouterLink,
    MaterialModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  trackCta() {
    const plausible = Plausible({ domain: 'localhost', trackLocalhost: true });
    plausible.trackEvent('CTA Click', { props: { location: 'hero' } });
  }
}
