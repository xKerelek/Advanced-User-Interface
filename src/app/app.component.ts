import { Component } from '@angular/core';
import {HeaderComponent} from './components/header/header.component';
import {RouterOutlet} from '@angular/router';
import Plausible from 'plausible-tracker';
import { trigger, transition, style, animate, query } from '@angular/animations';

@Component({
  selector: 'app-root',
  imports: [
    HeaderComponent,
    RouterOutlet,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  animations: [
    trigger('routeAnimations', [
      transition('* <=> *', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateX(-16px)' })
        ], { optional: true }),
        query(':enter', [
          animate('280ms ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
        ], { optional: true })
      ])
    ])
  ]
})
export class AppComponent {
  title = 'todo-list';

  constructor() {
    // RODO: Używamy Plausible (privacy-first). Zbieramy wyłącznie anonimowe zdarzenia
    // (pageviews, kliknięcia) bez użycia ciasteczek (cookies) i bez fingerprintingu.
    // Dane są niezbędne wyłącznie do optymalizacji ścieżek UX (minimalizacja danych).
    const plausible = Plausible({
      domain: 'localhost',
      trackLocalhost: true,
    });
    plausible.enableAutoPageviews();
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
