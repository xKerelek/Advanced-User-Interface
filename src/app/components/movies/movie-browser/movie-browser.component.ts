import {
  Component,
  inject,
  signal,
  ViewChild,
  ElementRef,
  afterNextRender,
  OnDestroy
} from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TmdbService} from '../../../core/services/tmdb.service';
import { FavoriteService } from '../../../core/services/favorite.service';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';
import {Movie} from '../../../shared/models/movie.interface';

@Component({
  selector: 'app-movie-browser',
  standalone: true,
  imports: [CommonModule, FormsModule, NgOptimizedImage],
  templateUrl: './movie-browser.component.html',
  animations: [
    trigger('listAnimation', [
      transition('* <=> *', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(20px)' }),
          stagger('80ms', [
            animate('250ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ], { optional: true })
      ])
    ])
  ]
})
export class MovieBrowserComponent implements OnDestroy {
  private tmdbService = inject(TmdbService);
  favoriteService = inject(FavoriteService);

  searchInput = signal('');
  debouncedSearch = signal('');
  private debounceTimer: any;
  skeletonArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  query = this.tmdbService.getInfiniteMovies(this.debouncedSearch);

  selectedMovieId = signal<number | null>(null);
  detailsQuery = this.tmdbService.getMovieDetails(this.selectedMovieId);

  @ViewChild('loadMoreTrigger') loadMoreTrigger!: ElementRef;
  private observer: IntersectionObserver | null = null;

  constructor() {
    afterNextRender(() => {
      this.setupObserver();
    });
  }

  setupObserver() {
    this.observer = new IntersectionObserver((entries) => {
      const isVisible = entries[0].isIntersecting;

      if (isVisible && this.query.hasNextPage() && !this.query.isFetchingNextPage()) {
        this.query.fetchNextPage();
      }
    }, { rootMargin: '200px' });

    setTimeout(() => {
      if (this.loadMoreTrigger?.nativeElement) {
        this.observer?.observe(this.loadMoreTrigger.nativeElement);
      }
    }, 500);
  }

  ngOnDestroy() {
    this.observer?.disconnect();
    if (this.debounceTimer) clearTimeout(this.debounceTimer);
  }

  openModal(id: number) {
    this.selectedMovieId.set(id);
  }

  closeModal() {
    this.selectedMovieId.set(null);
  }

  onToggleFavorite(event: Event, movie: Movie) {
    event.stopPropagation();
    this.favoriteService.toggleFavorite(movie);
  }

  onSearchChange(value: string) {
    this.searchInput.set(value);
    clearTimeout(this.debounceTimer);
    this.debounceTimer = setTimeout(() => {
      this.debouncedSearch.set(value);
    }, 300);
  }
}
